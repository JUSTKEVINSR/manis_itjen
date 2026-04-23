<?php

namespace App\Http\Controllers;

use App\Models\PenanggungJawab;
use App\Models\Staff;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PenanggungJawabController extends Controller
{
    public function index()
    {
        return Inertia::render('karyawan penjab/index', [
            'staffs' => Staff::latest()->get(),
            'currentPenjab' => PenanggungJawab::all()->keyBy('position')
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'staff1' => 'nullable|exists:staff,id',
            'staff2' => 'nullable|exists:staff,id',
        ]);

        if ($validated['staff1']) {
            PenanggungJawab::updateOrCreate(
                ['position' => 1],
                ['staff_id' => $validated['staff1']]
            );
        } else {
            PenanggungJawab::where('position', 1)->delete();
        }

        if ($validated['staff2']) {
            PenanggungJawab::updateOrCreate(
                ['position' => 2],
                ['staff_id' => $validated['staff2']]
            );
        } else {
            PenanggungJawab::where('position', 2)->delete();
        }

        return redirect()->back()->with('success', 'Penanggung Jawab updated successfully.');
    }
}
