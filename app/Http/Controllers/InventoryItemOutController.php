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

    public function downloadRaw(InventoryItemOut $inventoryItemOut)
    {
        $templatePath = storage_path('app/public/templates/Test_BAST_.docx');
        
        if (!file_exists($templatePath)) {
            return back()->with('error', 'Template file not found.');
        }

        $templateProcessor = new \PhpOffice\PhpWord\TemplateProcessor($templatePath);

        // Define the variables to replace in the document
        $tanggal_kata = \App\Helpers\DateHelper::toIndonesianDateWords($inventoryItemOut->date_out);
        $templateProcessor->setValue('tanggal_surat', $tanggal_kata);
        
        $templateProcessor->setValue('nama_pihak_2', $inventoryItemOut->staff->name ?? '-');
        $templateProcessor->setValue('nip_pihak_2', $inventoryItemOut->staff->nik ?? '-');
        $templateProcessor->setValue('jabatan_pihak_2', $inventoryItemOut->staff->jabatan ?? '-');
        
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
        $templateProcessor->setValue('jenis_barang', $inventoryItemOut->inventory->item_name ?? '-');
        $templateProcessor->setValue('merk_barang', ($inventoryItemOut->inventory->merk ?? '') . ' ' . ($inventoryItemOut->inventory->type ?? ''));
        $templateProcessor->setValue('jumlah', $inventoryItemOut->quantity ?? '1');
        $templateProcessor->setValue('kelengkapan', $inventoryItemOut->kelengkapan ?? '-');

        $fileName = 'BAST_' . ($inventoryItemOut->staff->name ?? 'User') . '_' . time() . '.docx';
        $tempPath = storage_path('app/public/temp/' . $fileName);
        
        if (!file_exists(storage_path('app/public/temp'))) {
            mkdir(storage_path('app/public/temp'), 0777, true);
        }

        $templateProcessor->saveAs($tempPath);

        return response()->download($tempPath)->deleteFileAfterSend(true);
    }
}
