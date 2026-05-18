<?php

namespace App\Http\Controllers;

use App\Models\InventoryKendaraan;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Validation\Rule;
use Spatie\SimpleExcel\SimpleExcelWriter;

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
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'item_name' => 'required|string|max:255',
            'item_code' => 'required|string|max:255',
            'category' => 'nullable|string|max:255',
            'quantity' => 'nullable|integer|min:0',
            'location' => 'nullable|string|max:255',
            'condition' => 'nullable|string|max:255',
            'nup' => 'nullable|string|max:255',
            'merk' => 'nullable|string|max:255',
            'type' => 'nullable|string|max:255',
            'bpkb' => 'nullable|string|max:255',
            'no_stnk' => 'nullable|string|max:255',
        ]);

        InventoryKendaraan::create($validated);

        return redirect()->route('inventory-kendaraan-data')->with('success', 'Kendaraan berhasil ditambahkan.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, InventoryKendaraan $inventory)
    {
        $validated = $request->validate([
            'item_name' => 'required|string|max:255',
            'item_code' => 'required|string|max:255',
            'category' => 'nullable|string|max:255',
            'quantity' => 'nullable|integer|min:0',
            'location' => 'nullable|string|max:255',
            'condition' => 'nullable|string|max:255',
            'nup' => 'nullable|string|max:255',
            'merk' => 'nullable|string|max:255',
            'type' => 'nullable|string|max:255',
            'bpkb' => 'nullable|string|max:255',
            'no_stnk' => 'nullable|string|max:255',
        ]);

        $inventory->update($validated);

        return redirect()->route('inventory-kendaraan-data')->with('success', 'Kendaraan berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(InventoryKendaraan $inventory)
    {
        $inventory->delete();
        return redirect()->route('inventory-kendaraan-data')->with('success', 'Kendaraan berhasil dihapus.');
    }

    /**
     * Export all kendaraan inventory data to Excel.
     */
    public function export()
    {
        $inventories = InventoryKendaraan::all();

        $headers = [
            'NO',
            'KODE BARANG',
            'NUP',
            'NAMA BARANG',
            'MERK',
            'TYPE',
            'NO BPKB',
            'NO STNK',
            'KATEGORI',
            'JUMLAH',
            'LOKASI',
            'KONDISI',
        ];

        $fileName = 'data_kendaraan_' . now()->format('Ymd_His') . '.xlsx';
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
                $inv->bpkb,
                $inv->no_stnk,

            ]);
        }

        return $writer->toBrowserInlineWithHeaders();
    }

    /**
     * Import kendaraan inventory data from an uploaded Excel file.
     */
    public function import(Request $request)
    {
        $request->validate([
            'file' => 'required|file|mimes:xlsx,xls,csv|max:10240',
        ]);

        try {
            $file = $request->file('file');
            $reader = \Spatie\SimpleExcel\SimpleExcelReader::create(
                $file->getRealPath(),
                $file->getClientOriginalExtension()
            )->useHeaders([
                        'no',
                        'item_code',
                        'nup',
                        'item_name',
                        'merk',
                        'type',
                        'bpkb',
                        'no_stnk',

                    ]);

            $reader->getRows()->each(function (array $row) {
                if (empty($row['item_code']) || strtolower($row['item_code']) === 'kode barang') {
                    return;
                }

                InventoryKendaraan::create(
                    [
                        'item_code' => $row['item_code'],
                        'item_name' => $row['item_name'] ?? null,
                        'nup' => $row['nup'] ?? null,
                        'merk' => $row['merk'] ?? null,
                        'type' => $row['type'] ?? null,
                        'bpkb' => $row['bpkb'] ?? null,
                        'no_stnk' => $row['no_stnk'] ?? null,

                    ]
                );
            });

            return redirect()->route('inventory-kendaraan-data')->with('success', 'Data kendaraan berhasil diimport.');
        } catch (\Exception $e) {
            return redirect()->route('inventory-kendaraan-data')->with('error', 'Gagal mengimport data: ' . $e->getMessage());
        }
    }
}
