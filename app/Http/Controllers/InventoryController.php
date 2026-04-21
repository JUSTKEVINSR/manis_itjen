<?php

namespace App\Http\Controllers;

use App\Models\Inventory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InventoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('inventory data/index', [
            'inventories' => Inventory::latest()->get()
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
        ]);

        Inventory::create($validated);

        return redirect()->route('inventory-data')->with('success', 'Item added to inventory successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Inventory $inventory)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Inventory $inventory)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Inventory $inventory)
    {
        $validated = $request->validate([
            'item_name' => 'required|string|max:255',
            'item_code' => 'required|string|max:255|unique:inventories,item_code,' . $inventory->id,
            'category' => 'required|string|max:255',
            'quantity' => 'required|integer|min:0',
            'location' => 'nullable|string|max:255',
            'condition' => 'required|string|max:255',
        ]);

        $inventory->update($validated);

        return redirect()->route('inventory-data')->with('success', 'Inventory item updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Inventory $inventory)
    {
        $inventory->delete();
        return redirect()->route('inventory-data')->with('success', 'Inventory item deleted successfully.');
    }
}
