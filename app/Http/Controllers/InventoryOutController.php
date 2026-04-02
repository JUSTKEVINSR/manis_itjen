<?php

namespace App\Http\Controllers;

use App\Models\Inventory;
use App\Models\InventoryOut;
use App\Models\Staff;
use Illuminate\Http\Request;

class InventoryOutController extends Controller
{
    public function index()
    {
        $inventoryOuts = InventoryOut::with(['inventory', 'staff'])->latest()->paginate(10);
        return view('inventory-out.index', compact('inventoryOuts'));
    }

    public function create()
    {
        $inventories = Inventory::where('quantity', '>', 0)->get();
        $staffs = Staff::all();
        return view('inventory-out.create', compact('inventories', 'staffs'));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'inventory_id' => 'required|exists:inventories,id',
            'staff_id' => 'nullable|exists:staff,id',
            'quantity' => 'required|integer|min:1',
            'date_out' => 'required|date',
            'notes' => 'nullable|string',
        ]);

        $inventory = Inventory::findOrFail($validated['inventory_id']);
        
        if ($inventory->quantity < $validated['quantity']) {
            return back()->withErrors(['quantity' => 'Not enough stock available.'])->withInput();
        }

        InventoryOut::create($validated);
        
        // Deduct from inventory stock
        $inventory->decrement('quantity', $validated['quantity']);

        return redirect()->route('inventory-out.index')->with('success', 'Inventory out recorded successfully.');
    }

    public function edit(InventoryOut $inventoryOut)
    {
        $inventories = Inventory::all();
        $staffs = Staff::all();
        return view('inventory-out.edit', compact('inventoryOut', 'inventories', 'staffs'));
    }

    public function update(Request $request, InventoryOut $inventoryOut)
    {
        $validated = $request->validate([
            'inventory_id' => 'required|exists:inventories,id',
            'staff_id' => 'nullable|exists:staff,id',
            'quantity' => 'required|integer|min:1',
            'date_out' => 'required|date',
            'notes' => 'nullable|string',
        ]);

        // Restore old quantity
        $inventoryOut->inventory->increment('quantity', $inventoryOut->quantity);

        // Deduct new quantity
        $newInventory = Inventory::findOrFail($validated['inventory_id']);
        if ($newInventory->quantity < $validated['quantity']) {
            // Put it back exactly as it was if failed
            $inventoryOut->inventory->decrement('quantity', $inventoryOut->quantity);
            return back()->withErrors(['quantity' => 'Not enough stock available for new modification.'])->withInput();
        }
        
        $newInventory->decrement('quantity', $validated['quantity']);
        $inventoryOut->update($validated);

        return redirect()->route('inventory-out.index')->with('success', 'Inventory out updated successfully.');
    }

    public function destroy(InventoryOut $inventoryOut)
    {
        // Restore quantity
        $inventoryOut->inventory->increment('quantity', $inventoryOut->quantity);
        $inventoryOut->delete();
        return redirect()->route('inventory-out.index')->with('success', 'Inventory out record deleted.');
    }
}
