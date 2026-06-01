<?php

namespace App\Http\Controllers;

use App\Models\InventoryItem;
use App\Models\InventoryItemOut;
use App\Models\Staff;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InventoryRecallController extends Controller
{
    public function index()
    {
        return Inertia::render('inventory recall/index', [
            'inventoryRecalls' => InventoryItemOut::with(['inventory', 'staff'])->latest()->get(),
            'inventories' => InventoryItem::all(),
            'staffs' => Staff::all()
        ]);
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'inventory_id' => 'required|exists:inventory_items,id',
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

        return redirect()->route('inventory-recall')->with('success', 'Inventory recall recorded successfully.');
    }

    public function edit(InventoryItemOut $inventoryRecall)
    {
        //
    }

    public function update(Request $request, InventoryItemOut $inventoryRecall)
    {
        $validated = $request->validate([
            'inventory_id' => 'required|exists:inventory_items,id',
            'staff_id' => 'nullable|exists:staff,id',
            'quantity' => 'required|integer|min:1',
            'date_out' => 'required|date',
            'duration' => 'nullable|string|max:255',
            'return_date' => 'nullable|date',
            'kelengkapan' => 'nullable|string|max:255',
            'status' => 'required|string|max:255',
            'notes' => 'nullable|string',
        ]);

        $inventory = $inventoryRecall->inventory;

        // Quantity tracking is disabled.

        $inventoryRecall->update($validated);

        return redirect()->back()->with('success', 'Inventory transaction updated successfully.');
    }

    public function destroy(InventoryItemOut $inventoryRecall)
    {
        // Quantity tracking is disabled.
        $inventoryRecall->delete();
        return redirect()->route('inventory-recall')->with('success', 'Inventory recall record deleted.');
    }

    public function uploadSurat(Request $request, InventoryItemOut $inventoryRecall)
    {
        $request->validate([
            'surat_permohonan' => 'required|file|mimes:pdf|max:2048',
        ]);

        if ($request->hasFile('surat_permohonan')) {
            // Delete old file if exists
            if ($inventoryRecall->surat_permohonan) {
                \Illuminate\Support\Facades\Storage::disk('public')->delete($inventoryRecall->surat_permohonan);
            }

            $path = $request->file('surat_permohonan')->store('surat_permohonan', 'public');
            $inventoryRecall->update(['surat_permohonan' => $path]);
        }

        return back()->with('success', 'Surat permohonan uploaded successfully.');
    }

    public function downloadRaw(InventoryItemOut $inventoryRecall)
    {
        $templatePath = storage_path('app/public/templates/Test_BAST_PENARIKAN.docx');
        
        if (!file_exists($templatePath)) {
            return back()->with('error', 'Template file not found.');
        }

        $templateProcessor = new \PhpOffice\PhpWord\TemplateProcessor($templatePath);

        // Define the variables to replace in the document
        $tanggal_kata = \App\Helpers\DateHelper::toIndonesianDateWords($inventoryRecall->date_out);
        $templateProcessor->setValue('tanggal_surat', $tanggal_kata);
        
        $templateProcessor->setValue('nama_pihak_2', $inventoryRecall->staff->name ?? '-');
        $templateProcessor->setValue('nip_pihak_2', $inventoryRecall->staff->nik ?? '-');
        $templateProcessor->setValue('jabatan_pihak_2', $inventoryRecall->staff->jabatan ?? '-');
        
        // Pihak pertama (Penanggung Jawab 1)
        $penjab1 = \App\Models\PenanggungJawab::with('staff')->where('position', 1)->first();
        $templateProcessor->setValue('nama_pihak_1', $penjab1->staff->name ?? '-');
        $templateProcessor->setValue('nip_pihak_1', $penjab1->staff->nik ?? '-');
        $templateProcessor->setValue('jabatan_pihak_1', $penjab1->staff->jabatan ?? '-');

        // Mengetahui (Penanggung Jawab 2)
        $penjab2 = \App\Models\PenanggungJawab::with('staff')->where('position', 2)->first();
        $templateProcessor->setValue('nama_mengetahui', $penjab2->staff->name ?? '-');
        $templateProcessor->setValue('nip_mengetahui', $penjab2->staff->nik ?? '-');
        $templateProcessor->setValue('jabatan_mengetahui', $penjab2->staff->jabatan ?? '-');

        $templateProcessor->setValue('no', '1');
        $templateProcessor->setValue('jenis_barang', $inventoryRecall->inventory->item_name ?? '-');
        $templateProcessor->setValue('merk_barang', ($inventoryRecall->inventory->merk ?? '') . ' ' . ($inventoryRecall->inventory->type ?? ''));
        $templateProcessor->setValue('jumlah', $inventoryRecall->quantity ?? '1');
        $templateProcessor->setValue('kelengkapan', $inventoryRecall->kelengkapan ?? '-');

        $fileName = 'BAST_RECALL_' . ($inventoryRecall->staff->name ?? 'User') . '_' . time() . '.docx';
        $tempPath = storage_path('app/public/temp/' . $fileName);
        
        if (!file_exists(storage_path('app/public/temp'))) {
            mkdir(storage_path('app/public/temp'), 0777, true);
        }

        $templateProcessor->saveAs($tempPath);

        return response()->download($tempPath)->deleteFileAfterSend(true);
    }
}
