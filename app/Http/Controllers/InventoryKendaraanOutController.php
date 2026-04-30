<?php

namespace App\Http\Controllers;

use App\Models\InventoryKendaraan;
use App\Models\InventoryKendaraanOut;
use App\Models\Staff;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Validation\Rule;

class InventoryKendaraanOutController extends Controller
{
    public function index()
    {
        return Inertia::render('inventory out/index kendar out', [
            'inventoryKendaraanOuts' => InventoryKendaraanOut::with(['inventory', 'staff'])->latest()->get(),
            'inventories' => InventoryKendaraan::where('quantity', '>', 0)->get(),
            'staffs' => Staff::all()
        ]);
    }

    public function recallIndex()
    {
        return Inertia::render('inventory recall/index', [
            'inventories' => InventoryKendaraan::all(),
            'borrowedItems' => InventoryKendaraanOut::with(['inventory', 'staff'])->where('status', 'Borrowed')->get()
        ]);
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'inventory_id' => [
                'required',
                Rule::exists('inventories', 'id')->where(function ($query) {
                    return $query->where('type_inventory', 'kendaraan');
                }),
            ],
            'staff_id' => 'nullable|exists:staff,id',
            'quantity' => 'required|integer|min:1',
            'date_out' => 'required|date',
            'duration' => 'nullable|string|max:255',
            'return_date' => 'nullable|date',
            'kelengkapan' => 'nullable|string|max:255',
            'status' => 'required|string|max:255',
            'notes' => 'nullable|string',
        ]);

        $inventory = InventoryKendaraan::findOrFail($validated['inventory_id']);

        if ($inventory->quantity < $validated['quantity']) {
            return back()->withErrors(['quantity' => 'Not enough stock available.'])->withInput();
        }

        InventoryKendaraanOut::create($validated);

        // Deduct from inventory stock
        $inventory->decrement('quantity', $validated['quantity']);

        return redirect()->route('inventory-kendaraan-out')->with('success', 'Inventory out recorded successfully.');
    }

    public function edit(InventoryKendaraanOut $inventoryKendaraanOut)
    {
        //
    }

    public function update(Request $request, InventoryKendaraanOut $inventoryKendaraanOut)
    {
        $validated = $request->validate([
            'inventory_id' => [
                'required',
                Rule::exists('inventories', 'id')->where(function ($query) {
                    return $query->where('type_inventory', 'kendaraan');
                }),
            ],
            'staff_id' => 'nullable|exists:staff,id',
            'quantity' => 'required|integer|min:1',
            'date_out' => 'required|date',
            'duration' => 'nullable|string|max:255',
            'return_date' => 'nullable|date',
            'kelengkapan' => 'nullable|string|max:255',
            'status' => 'required|string|max:255',
            'notes' => 'nullable|string',
        ]);

        $oldQuantity = $inventoryKendaraanOut->quantity;
        $oldStatus = $inventoryKendaraanOut->status;
        $newQuantity = $validated['quantity'];
        $newStatus = $validated['status'];

        $inventory = $inventoryKendaraanOut->inventory;

        // If status was Borrowed and is still Borrowed, but quantity changed
        if ($oldStatus === 'Borrowed' && $newStatus === 'Borrowed') {
            $diff = $newQuantity - $oldQuantity;
            if ($inventory->quantity < $diff) {
                return back()->withErrors(['quantity' => 'Not enough stock available for this modification.']);
            }
            $inventory->decrement('quantity', $diff);
        }
        // If it was Borrowed and now is Returned
        elseif ($oldStatus === 'Borrowed' && $newStatus === 'Returned') {
            // First, adjust for any quantity change in the record itself (though usually people just return what they took)
            // But let's assume they return the "newQuantity" amount.
            // Actually, simple: put back the OLD quantity that was out.
            $inventory->increment('quantity', $oldQuantity);
        }
        // If it was Returned and now is Borrowed (re-borrowing or correction)
        elseif ($oldStatus === 'Returned' && $newStatus === 'Borrowed') {
            if ($inventory->quantity < $newQuantity) {
                return back()->withErrors(['quantity' => 'Not enough stock available to re-borrow.']);
            }
            $inventory->decrement('quantity', $newQuantity);
        }

        $inventoryKendaraanOut->update($validated);

        return redirect()->back()->with('success', 'Inventory transaction updated successfully.');
    }

    public function destroy(InventoryKendaraanOut $inventoryKendaraanOut)
    {
        // Restore quantity
        $inventoryKendaraanOut->inventory->increment('quantity', $inventoryKendaraanOut->quantity);
        $inventoryKendaraanOut->delete();
        return redirect()->route('inventory-kendaraan-out')->with('success', 'Inventory out record deleted.');
    }

    public function uploadSurat(Request $request, InventoryKendaraanOut $inventoryKendaraanOut)
    {
        $request->validate([
            'surat_permohonan' => 'required|file|mimes:pdf|max:2048',
        ]);

        if ($request->hasFile('surat_permohonan')) {
            // Delete old file if exists
            if ($inventoryKendaraanOut->surat_permohonan) {
                \Illuminate\Support\Facades\Storage::disk('public')->delete($inventoryKendaraanOut->surat_permohonan);
            }

            $path = $request->file('surat_permohonan')->store('surat_permohonan', 'public');
            $inventoryKendaraanOut->update(['surat_permohonan' => $path]);
        }

        return back()->with('success', 'Surat permohonan uploaded successfully.');
    }
}
