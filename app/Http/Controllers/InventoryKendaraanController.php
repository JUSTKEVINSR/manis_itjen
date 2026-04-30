<?php

namespace App\Http\Controllers;

use App\Models\Inventory;
use App\Models\InventoryKendaraan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InventoryKendaraanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('inventory data/index kendaraan', [
            'inventories' => InventoryKendaraan::latest()->get()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'item_name' => 'required|string|max:255',
            'item_code' => 'required|string|max:255|unique:inventories,item_code',
            'category' => 'required|string|max:255',
            'quantity' => 'required|integer|min:0',
            'location' => 'nullable|string|max:255',
            'condition' => 'required|string|max:255',
            'nup' => 'nullable|string|max:255',
            'merk' => 'nullable|string|max:255',
            'type' => 'nullable|string|max:255',
            'bpkb' => 'nullable|string|max:255',
            'no_stnk' => 'nullable|string|max:255',
        ]);

        InventoryKendaraan::create($validated);

        return redirect()->route('inventory-kendaraan-data')->with('success', 'Item added to inventory successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(InventoryKendaraan $inventory)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(InventoryKendaraan $inventory)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, InventoryKendaraan $inventory)
    {
        $validated = $request->validate([
            'item_name' => 'required|string|max:255',
            'item_code' => 'required|string|max:255|unique:inventories,item_code,' . $inventory->id,
            'category' => 'required|string|max:255',
            'quantity' => 'required|integer|min:0',
            'location' => 'nullable|string|max:255',
            'condition' => 'required|string|max:255',
            'nup' => 'nullable|string|max:255',
            'merk' => 'nullable|string|max:255',
            'type' => 'nullable|string|max:255',
            'bpkb' => 'nullable|string|max:255',
            'no_stnk' => 'nullable|string|max:255',
        ]);

        $inventory->update($validated);

        return redirect()->route('inventory-kendaraan-data')->with('success', 'Inventory item updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(InventoryKendaraan $inventory)
    {
        $inventory->delete();
        return redirect()->route('inventory-kendaraan-data')->with('success', 'Inventory item deleted successfully.');
    }
}
