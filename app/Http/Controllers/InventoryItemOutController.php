<?php

namespace App\Http\Controllers;

use App\Models\InventoryItem;
use App\Models\InventoryItemOut;
use App\Models\Staff;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Validation\Rule;

class InventoryItemOutController extends Controller
{
    public function index()
    {
        return Inertia::render('inventory out/index item out', [
            'inventoryItemOuts' => InventoryItemOut::with(['inventory', 'staff'])->latest()->get(),
            'inventories' => InventoryItem::all(),
            'staffs' => Staff::all()
        ]);
    }

    public function recallIndex()
    {
        return Inertia::render('inventory-item-out-recall/index', [
            'inventories' => InventoryItem::all(),
            'borrowedItems' => InventoryItemOut::with(['inventory', 'staff'])->where('status', 'Borrowed')->get()
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
                Rule::exists('inventory_items', 'id'),
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

        $inventory = InventoryItem::findOrFail($validated['inventory_id']);



        InventoryItemOut::create($validated);



        return redirect()->route('inventory-item-out')->with('success', 'Inventory out recorded successfully.');
    }

    public function edit(InventoryItemOut $inventoryItemOut)
    {
        //
    }

    public function update(Request $request, InventoryItemOut $inventoryItemOut)
    {
        $validated = $request->validate([
            'inventory_id' => [
                'required',
                Rule::exists('inventory_items', 'id'),
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

        $oldQuantity = $inventoryItemOut->quantity;
        $oldStatus = $inventoryItemOut->status;
        $newQuantity = $validated['quantity'];
        $newStatus = $validated['status'];

        $inventory = $inventoryItemOut->inventory;

        // Quantity tracking is disabled.

        $inventoryItemOut->update($validated);

        return redirect()->back()->with('success', 'Inventory transaction updated successfully.');
    }

    public function destroy(InventoryItemOut $inventoryItemOut)
    {
        // Quantity tracking is disabled.
        $inventoryItemOut->delete();
        return redirect()->route('inventory-item-out')->with('success', 'Inventory out record deleted.');
    }

    public function uploadSurat(Request $request, InventoryItemOut $inventoryItemOut)
    {
        $request->validate([
            'surat_permohonan' => 'required|file|mimes:pdf|max:2048',
        ]);

        if ($request->hasFile('surat_permohonan')) {
            // Delete old file if exists
            if ($inventoryItemOut->surat_permohonan) {
                \Illuminate\Support\Facades\Storage::disk('public')->delete($inventoryItemOut->surat_permohonan);
            }

            $path = $request->file('surat_permohonan')->store('surat_permohonan', 'public');
            $inventoryItemOut->update(['surat_permohonan' => $path]);
        }

        return back()->with('success', 'Surat permohonan uploaded successfully.');
    }
}
