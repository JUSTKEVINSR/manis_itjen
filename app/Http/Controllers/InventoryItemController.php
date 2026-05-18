<?php

namespace App\Http\Controllers;

use App\Models\InventoryItem;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InventoryItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('inventory data/index item', [
            'inventories' => InventoryItem::latest()->get()
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
            'item_code' => 'nullable|string|max:255', // Unique constraint dropped recently
            'nup' => 'nullable|string|max:255',
            'merk' => 'nullable|string|max:255',
            'type' => 'nullable|string|max:255',
            'category' => 'nullable|string|max:255',
            'quantity' => 'nullable|integer|min:0',
            'location' => 'nullable|string|max:255',
            'condition' => 'nullable|string|max:255',
        ]);

        // Provide defaults for fields not included in the frontend form to satisfy DB schema
        $validated['category'] = $validated['category'] ?? '-';
        $validated['quantity'] = $validated['quantity'] ?? 0;
        $validated['condition'] = $validated['condition'] ?? 'Good';

        InventoryItem::create($validated);

        return redirect()->route('inventory-item-data')->with('success', 'Item added to inventory successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(InventoryItem $inventory)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(InventoryItem $inventory)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, InventoryItem $inventory)
    {
        $validated = $request->validate([
            'item_name' => 'required|string|max:255',
            'item_code' => 'nullable|string|max:255', // Unique constraint dropped recently
            'nup' => 'nullable|string|max:255',
            'merk' => 'nullable|string|max:255',
            'type' => 'nullable|string|max:255',
            'category' => 'nullable|string|max:255',
            'quantity' => 'nullable|integer|min:0',
            'location' => 'nullable|string|max:255',
            'condition' => 'nullable|string|max:255',
        ]);

        // Provide defaults for fields not included in the frontend form to satisfy DB schema
        $validated['category'] = $validated['category'] ?? '-';
        $validated['quantity'] = $validated['quantity'] ?? 0;
        $validated['condition'] = $validated['condition'] ?? 'Good';

        $inventory->update($validated);

        return redirect()->route('inventory-item-data')->with('success', 'Inventory item updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(InventoryItem $inventory)
    {
        $inventory->delete();
        return redirect()->route('inventory-item-data')->with('success', 'Inventory item deleted successfully.');
    }
}
