<?php

namespace App\Http\Controllers;

use App\Models\Staff;
use Illuminate\Http\Request;
use Spatie\SimpleExcel\SimpleExcelWriter;

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
            'nip'                => 'required|string|max:255|unique:staff,nik',
            'name'               => 'required|string|max:255',
            'tempat_lahir'       => 'nullable|string|max:255',
            'tanggal_lahir'      => 'nullable|date',
            'usia'               => 'nullable|string|max:50',
            'pangkat'            => 'nullable|string|max:255',
            'tmt_pangkat'        => 'nullable|date',
            'jabatan'            => 'nullable|string|max:255',
            'tmt_jabatan'        => 'nullable|date',
            'eselon'             => 'nullable|string|max:255',
            'pangkat_cpns_pns'   => 'nullable|string|max:255',
            'tmt_cpns'           => 'nullable|date',
            'tmt_pns'            => 'nullable|date',
            'gaji_pokok'         => 'nullable|string|max:255',
            'tmt_gaji'           => 'nullable|date',
            'tingkat_pendidikan' => 'nullable|string|max:255',
            'pendidikan_umum'    => 'nullable|string|max:255',
            'diklat_struktural'  => 'nullable|string|max:255',
            'diklat_fungsional'  => 'nullable|string|max:255',
            'jenis_kelamin'      => 'nullable|string|max:50',
            'peringkat'          => 'nullable|string|max:255',
            'nip_lama'           => 'nullable|string|max:255',
        ]);

        Staff::create([
            'nik'                => $validated['nip'],
            'name'               => $validated['name'],
            'tempat_lahir'       => $validated['tempat_lahir'] ?? null,
            'tanggal_lahir'      => $validated['tanggal_lahir'] ?? null,
            'usia'               => $validated['usia'] ?? null,
            'pangkat'            => $validated['pangkat'] ?? null,
            'tmt_pangkat'        => $validated['tmt_pangkat'] ?? null,
            'jabatan'            => $validated['jabatan'] ?? null,
            'tmt_jabatan'        => $validated['tmt_jabatan'] ?? null,
            'eselon'             => $validated['eselon'] ?? null,
            'pangkat_cpns_pns'   => $validated['pangkat_cpns_pns'] ?? null,
            'tmt_cpns'           => $validated['tmt_cpns'] ?? null,
            'tmt_pns'            => $validated['tmt_pns'] ?? null,
            'gaji_pokok'         => $validated['gaji_pokok'] ?? null,
            'tmt_gaji'           => $validated['tmt_gaji'] ?? null,
            'tingkat_pendidikan' => $validated['tingkat_pendidikan'] ?? null,
            'pendidikan_umum'    => $validated['pendidikan_umum'] ?? null,
            'diklat_struktural'  => $validated['diklat_struktural'] ?? null,
            'diklat_fungsional'  => $validated['diklat_fungsional'] ?? null,
            'jenis_kelamin'      => $validated['jenis_kelamin'] ?? null,
            'peringkat'          => $validated['peringkat'] ?? null,
            'nip_lama'           => $validated['nip_lama'] ?? null,
            'departemen'         => '-',
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
            'nip'                => 'required|string|max:255|unique:staff,nik,' . $staff->id,
            'name'               => 'required|string|max:255',
            'tempat_lahir'       => 'nullable|string|max:255',
            'tanggal_lahir'      => 'nullable|date',
            'usia'               => 'nullable|string|max:50',
            'pangkat'            => 'nullable|string|max:255',
            'tmt_pangkat'        => 'nullable|date',
            'jabatan'            => 'nullable|string|max:255',
            'tmt_jabatan'        => 'nullable|date',
            'eselon'             => 'nullable|string|max:255',
            'pangkat_cpns_pns'   => 'nullable|string|max:255',
            'tmt_cpns'           => 'nullable|date',
            'tmt_pns'            => 'nullable|date',
            'gaji_pokok'         => 'nullable|string|max:255',
            'tmt_gaji'           => 'nullable|date',
            'tingkat_pendidikan' => 'nullable|string|max:255',
            'pendidikan_umum'    => 'nullable|string|max:255',
            'diklat_struktural'  => 'nullable|string|max:255',
            'diklat_fungsional'  => 'nullable|string|max:255',
            'jenis_kelamin'      => 'nullable|string|max:50',
            'peringkat'          => 'nullable|string|max:255',
            'nip_lama'           => 'nullable|string|max:255',
        ]);

        $staff->update([
            'nik'                => $validated['nip'],
            'name'               => $validated['name'],
            'tempat_lahir'       => $validated['tempat_lahir'] ?? null,
            'tanggal_lahir'      => $validated['tanggal_lahir'] ?? null,
            'usia'               => $validated['usia'] ?? null,
            'pangkat'            => $validated['pangkat'] ?? null,
            'tmt_pangkat'        => $validated['tmt_pangkat'] ?? null,
            'jabatan'            => $validated['jabatan'] ?? null,
            'tmt_jabatan'        => $validated['tmt_jabatan'] ?? null,
            'eselon'             => $validated['eselon'] ?? null,
            'pangkat_cpns_pns'   => $validated['pangkat_cpns_pns'] ?? null,
            'tmt_cpns'           => $validated['tmt_cpns'] ?? null,
            'tmt_pns'            => $validated['tmt_pns'] ?? null,
            'gaji_pokok'         => $validated['gaji_pokok'] ?? null,
            'tmt_gaji'           => $validated['tmt_gaji'] ?? null,
            'tingkat_pendidikan' => $validated['tingkat_pendidikan'] ?? null,
            'pendidikan_umum'    => $validated['pendidikan_umum'] ?? null,
            'diklat_struktural'  => $validated['diklat_struktural'] ?? null,
            'diklat_fungsional'  => $validated['diklat_fungsional'] ?? null,
            'jenis_kelamin'      => $validated['jenis_kelamin'] ?? null,
            'peringkat'          => $validated['peringkat'] ?? null,
            'nip_lama'           => $validated['nip_lama'] ?? null,
        ]);

        return redirect()->route('karyawan-data')->with('success', 'Staff member updated successfully.');
    }

    /**
     * Export all staff data to Excel.
     */
    public function export()
    {
        $staffs = Staff::all();

        $headers = [
            'NO',
            'N I P',
            'NAMA LENGKAP',
            'TEMPAT LAHIR',
            'TANGGAL LAHIR',
            'USIA',
            'PANGKAT GOL.RUANG',
            'TMT PANGKAT',
            'JABATAN',
            'TMT JABATAN',
            'ESELON',
            'PANGKAT CPNS',
            'TMT CPNS',
            'TMT PNS',
            'GAJI POKOK',
            'TMT GAJI',
            'TINGKAT PENDIDIKAN',
            'PENDIDIKAN UMUM',
            'DIKLAT STRUKTURAL',
            'DIKLAT FUNGSIONAL',
            'JENIS KELAMIN',
            'PERINGKAT',
            'NIP LAMA',
        ];

        $fileName = 'data_karyawan_' . now()->format('Ymd_His') . '.xlsx';

        $writer = SimpleExcelWriter::streamDownload($fileName);
        $writer->addHeader($headers);

        foreach ($staffs as $index => $staff) {
            $writer->addRow([
                $index + 1,
                $staff->nik,
                $staff->name,
                $staff->tempat_lahir,
                $staff->tanggal_lahir,
                $staff->usia,
                $staff->pangkat,
                $staff->tmt_pangkat,
                $staff->jabatan,
                $staff->tmt_jabatan,
                $staff->eselon,
                $staff->pangkat_cpns_pns,
                $staff->tmt_cpns,
                $staff->tmt_pns,
                $staff->gaji_pokok,
                $staff->tmt_gaji,
                $staff->tingkat_pendidikan,
                $staff->pendidikan_umum,
                $staff->diklat_struktural,
                $staff->diklat_fungsional,
                $staff->jenis_kelamin,
                $staff->peringkat,
                $staff->nip_lama,
            ]);
        }

        return $writer->toBrowserInlineWithHeaders();
    }

    /**
     * Import staff data from an uploaded Excel file.
     */
    public function import(Request $request)
    {
        $request->validate([
            'file' => 'required|file|mimes:xlsx,xls,csv|max:10240',
        ]);

        try {
            $file = $request->file('file');
            $reader = \Spatie\SimpleExcel\SimpleExcelReader::create($file->getRealPath(), $file->getClientOriginalExtension())
                ->useHeaders([
                    'no',
                    'nip',
                    'nama_lengkap',
                    'tempat_lahir',
                    'tanggal_lahir',
                    'usia',
                    'pangkat_gol_ruang',
                    'tmt_pangkat',
                    'jabatan',
                    'tmt_jabatan',
                    'eselon',
                    'pangkat_cpns',
                    'tmt_cpns',
                    'tmt_pns',
                    'gaji_pokok',
                    'tmt_gaji',
                    'tingkat_pendidikan',
                    'pendidikan_umum',
                    'diklat_struktural',
                    'diklat_fungsional',
                    'jenis_kelamin',
                    'peringkat',
                    'nip_lama'
                ]);

            $reader->getRows()->each(function (array $row) {
                // Skip header row or rows with no NIP
                if (empty($row['nip']) || strtolower($row['nip']) === 'nip') {
                    return;
                }

                Staff::updateOrCreate(
                    ['nik' => $row['nip']],
                    [
                        'name' => $row['nama_lengkap'] ?? null,
                        'tempat_lahir' => $row['tempat_lahir'] ?? null,
                        'tanggal_lahir' => !empty($row['tanggal_lahir']) ? $row['tanggal_lahir'] : null,
                        'usia' => $row['usia'] ?? null,
                        'pangkat' => $row['pangkat_gol_ruang'] ?? null,
                        'tmt_pangkat' => !empty($row['tmt_pangkat']) ? $row['tmt_pangkat'] : null,
                        'jabatan' => $row['jabatan'] ?? null,
                        'tmt_jabatan' => !empty($row['tmt_jabatan']) ? $row['tmt_jabatan'] : null,
                        'eselon' => $row['eselon'] ?? null,
                        'pangkat_cpns_pns' => $row['pangkat_cpns'] ?? null,
                        'tmt_cpns' => !empty($row['tmt_cpns']) ? $row['tmt_cpns'] : null,
                        'tmt_pns' => !empty($row['tmt_pns']) ? $row['tmt_pns'] : null,
                        'gaji_pokok' => $row['gaji_pokok'] ?? null,
                        'tmt_gaji' => !empty($row['tmt_gaji']) ? $row['tmt_gaji'] : null,
                        'tingkat_pendidikan' => $row['tingkat_pendidikan'] ?? null,
                        'pendidikan_umum' => $row['pendidikan_umum'] ?? null,
                        'diklat_struktural' => $row['diklat_struktural'] ?? null,
                        'diklat_fungsional' => $row['diklat_fungsional'] ?? null,
                        'jenis_kelamin' => $row['jenis_kelamin'] ?? null,
                        'peringkat' => $row['peringkat'] ?? null,
                        'nip_lama' => $row['nip_lama'] ?? null,
                        'departemen' => '-',
                    ]
                );
            });

            return redirect()->route('karyawan-data')->with('success', 'Data berhasil diimport dari Excel.');
        } catch (\Exception $e) {
            return redirect()->route('karyawan-data')->with('error', 'Gagal mengimport data: ' . $e->getMessage());
        }
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
