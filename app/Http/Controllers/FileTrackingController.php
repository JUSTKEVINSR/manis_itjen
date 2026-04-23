<?php

namespace App\Http\Controllers;

use App\Models\InventoryOut;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FileTrackingController extends Controller
{
    public function index()
    {
        $uploadedFiles = InventoryOut::with(['inventory', 'staff'])
            ->whereNotNull('surat_permohonan')
            ->latest()
            ->get();

        return Inertia::render('FileTracking/Index', [
            'uploadedFiles' => $uploadedFiles
        ]);
    }
}
