<?php

namespace App\Http\Controllers;

use App\Models\Staff;
use Illuminate\Http\Request;

class StaffController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return \Inertia\Inertia::render('karyawan data/index', [
            'staffs' => Staff::latest()->get()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return \Inertia\Inertia::render('karyawan data/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nip' => 'required|string|max:255|unique:staff,nik',
            'name' => 'required|string|max:255',
            'pangkat' => 'required|string|max:255',
            'jabatan' => 'required|string|max:255',
        ]);

        Staff::create([
            'nik' => $validated['nip'],
            'name' => $validated['name'],
            'pangkat' => $validated['pangkat'],
            'jabatan' => $validated['jabatan'],
            'departemen' => '-', // Default or optional
        ]);

        return redirect()->route('karyawan-data')->with('success', 'Staff member created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Staff $staff)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Staff $staff)
    {
        return view('staff.edit', compact('staff'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Staff $staff)
    {
        $validated = $request->validate([
            'nip' => 'required|string|max:255|unique:staff,nik,' . $staff->id,
            'name' => 'required|string|max:255',
            'pangkat' => 'required|string|max:255',
            'jabatan' => 'required|string|max:255',
        ]);

        $staff->update([
            'nik' => $validated['nip'],
            'name' => $validated['name'],
            'pangkat' => $validated['pangkat'],
            'jabatan' => $validated['jabatan'],
        ]);

        return redirect()->route('karyawan-data')->with('success', 'Staff member updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Staff $staff)
    {
        $staff->delete();
        return redirect()->route('karyawan-data')->with('success', 'Staff member deleted successfully.');
    }
}
