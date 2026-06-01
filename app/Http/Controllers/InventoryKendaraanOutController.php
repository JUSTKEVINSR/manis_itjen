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
            'inventories' => InventoryKendaraan::all(),
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

        if ($inventory->quantity !== null && $inventory->quantity < $validated['quantity']) {
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
            if ($inventory->quantity !== null && $inventory->quantity < $diff) {
                return back()->withErrors(['quantity' => 'Not enough stock available for this modification.']);
            }
            if ($inventory->quantity !== null) {
                $inventory->decrement('quantity', $diff);
            }
        }
        // If it was Borrowed and now is Returned
        elseif ($oldStatus === 'Borrowed' && $newStatus === 'Returned') {
            // First, adjust for any quantity change in the record itself (though usually people just return what they took)
            // But let's assume they return the "newQuantity" amount.
            // Actually, simple: put back the OLD quantity that was out.
            if ($inventory->quantity !== null) {
                $inventory->increment('quantity', $oldQuantity);
            }
        }
        // If it was Returned and now is Borrowed (re-borrowing or correction)
        elseif ($oldStatus === 'Returned' && $newStatus === 'Borrowed') {
            if ($inventory->quantity !== null && $inventory->quantity < $newQuantity) {
                return back()->withErrors(['quantity' => 'Not enough stock available to re-borrow.']);
            }
            if ($inventory->quantity !== null) {
                $inventory->decrement('quantity', $newQuantity);
            }
        }

        $inventoryKendaraanOut->update($validated);

        return redirect()->back()->with('success', 'Inventory transaction updated successfully.');
    }

    public function destroy(InventoryKendaraanOut $inventoryKendaraanOut)
    {
        // Restore quantity
        if ($inventoryKendaraanOut->inventory->quantity !== null) {
            $inventoryKendaraanOut->inventory->increment('quantity', $inventoryKendaraanOut->quantity);
        }
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

    public function downloadRaw(InventoryKendaraanOut $inventoryKendaraanOut)
    {
        $templatePath = storage_path('app/public/templates/Test_BAST_.docx');
        
        if (!file_exists($templatePath)) {
            return back()->with('error', 'Template file not found.');
        }

        $templateProcessor = new \PhpOffice\PhpWord\TemplateProcessor($templatePath);

        // Define the variables to replace in the document
        $tanggal_kata = \App\Helpers\DateHelper::toIndonesianDateWords($inventoryKendaraanOut->date_out);
        $templateProcessor->setValue('tanggal_surat', $tanggal_kata);
        
        $templateProcessor->setValue('nama_pihak_2', $inventoryKendaraanOut->staff->name ?? '-');
        $templateProcessor->setValue('nip_pihak_2', $inventoryKendaraanOut->staff->nik ?? '-');
        $templateProcessor->setValue('jabatan_pihak_2', $inventoryKendaraanOut->staff->jabatan ?? '-');
        
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
        $templateProcessor->setValue('jenis_barang', $inventoryKendaraanOut->inventory->item_name ?? '-');
        $templateProcessor->setValue('merk_barang', ($inventoryKendaraanOut->inventory->merk ?? '') . ' ' . ($inventoryKendaraanOut->inventory->type ?? ''));
        $templateProcessor->setValue('jumlah', $inventoryKendaraanOut->quantity ?? '1');
        $templateProcessor->setValue('kelengkapan', $inventoryKendaraanOut->kelengkapan ?? '-');

        $fileName = 'BAST_KENDARAAN_' . ($inventoryKendaraanOut->staff->name ?? 'User') . '_' . time() . '.docx';
        $tempPath = storage_path('app/public/temp/' . $fileName);
        
        if (!file_exists(storage_path('app/public/temp'))) {
            mkdir(storage_path('app/public/temp'), 0777, true);
        }

        $templateProcessor->saveAs($tempPath);

        return response()->download($tempPath)->deleteFileAfterSend(true);
    }
}
