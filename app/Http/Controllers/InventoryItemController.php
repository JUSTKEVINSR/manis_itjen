<?php

namespace App\Http\Controllers;

use App\Models\InventoryItem;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\SimpleExcel\SimpleExcelWriter;
use Spatie\SimpleExcel\SimpleExcelReader;

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

    /**
     * Export all item inventory data to Excel.
     */
    public function export()
    {
        $inventories = InventoryItem::all();

        $headers = [
            'NO',
            'KODE BARANG',
            'NUP',
            'NAMA BARANG',
            'MERK',
            'TYPE',
            'KATEGORI',
            'JUMLAH',
            'LOKASI',
            'KONDISI',
        ];

        $fileName = 'data_inventory_item_' . now()->format('Ymd_His') . '.xlsx';
        $writer = SimpleExcelWriter::streamDownload($fileName);
        $writer->addHeader($headers);

        foreach ($inventories as $index => $inv) {
            $writer->addRow([
                $index + 1,
                $inv->item_code,
                $inv->nup,
                $inv->item_name,
                $inv->merk,
                $inv->type,
                $inv->category,
                $inv->quantity,
                $inv->location,
                $inv->condition,
            ]);
        }

        return $writer->toBrowserInlineWithHeaders();
    }

    /**
     * Import item inventory data from an uploaded Excel file.
     */
    public function import(Request $request)
    {
        $request->validate([
            'file' => 'required|file|mimes:xlsx,xls,csv|max:10240',
        ]);

        try {
            $file = $request->file('file');
            $reader = SimpleExcelReader::create(
                $file->getRealPath(),
                $file->getClientOriginalExtension()
            )->useHeaders([
                'no',
                'item_code',
                'nup',
                'item_name',
                'merk',
                'type',
                'category',
                'quantity',
                'location',
                'condition',
            ]);

            $reader->getRows()->each(function (array $row) {
                if (empty($row['item_code']) || strtolower($row['item_code']) === 'kode barang') {
                    return;
                }

                InventoryItem::create([
                    'item_code' => $row['item_code'],
                    'item_name' => $row['item_name'] ?? null,
                    'nup' => $row['nup'] ?? null,
                    'merk' => $row['merk'] ?? null,
                    'type' => $row['type'] ?? null,
                    'category' => $row['category'] ?? '-',
                    'quantity' => isset($row['quantity']) ? (int) $row['quantity'] : 0,
                    'location' => $row['location'] ?? null,
                    'condition' => $row['condition'] ?? 'Good',
                ]);
            });

            return redirect()->route('inventory-item-data')->with('success', 'Data item berhasil diimport.');
        } catch (\Exception $e) {
            return redirect()->route('inventory-item-data')->with('error', 'Gagal mengimport data: ' . $e->getMessage());
        }
    }
}
