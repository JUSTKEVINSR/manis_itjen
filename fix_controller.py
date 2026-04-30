import re

with open('app/Http/Controllers/StaffController.php', 'r') as f:
    content = f.read()

store_old = """    public function store(Request $request)
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
        ]);"""

store_new = """    public function store(Request $request)
    {
        $validated = $request->validate([
            'nip' => 'required|string|max:255|unique:staff,nik',
            'name' => 'required|string|max:255',
            'tempat_lahir' => 'nullable|string|max:255',
            'tanggal_lahir' => 'nullable|date',
            'usia' => 'nullable|string|max:50',
            'pangkat' => 'nullable|string|max:255',
            'tmt_pangkat' => 'nullable|date',
            'jabatan' => 'nullable|string|max:255',
            'tmt_jabatan' => 'nullable|date',
            'eselon' => 'nullable|string|max:255',
            'pangkat_cpns_pns' => 'nullable|string|max:255',
            'tmt_cpns' => 'nullable|date',
            'tmt_pns' => 'nullable|date',
            'gaji_pokok' => 'nullable|string|max:255',
            'tmt_gaji' => 'nullable|date',
            'tingkat_pendidikan' => 'nullable|string|max:255',
            'pendidikan_umum' => 'nullable|string|max:255',
            'diklat_struktural' => 'nullable|string|max:255',
            'diklat_fungsional' => 'nullable|string|max:255',
            'jenis_kelamin' => 'nullable|string|max:50',
            'peringkat' => 'nullable|string|max:255',
            'nip_lama' => 'nullable|string|max:255',
        ]);

        Staff::create([
            'nik' => $validated['nip'],
            'name' => $validated['name'],
            'tempat_lahir' => $validated['tempat_lahir'] ?? null,
            'tanggal_lahir' => $validated['tanggal_lahir'] ?? null,
            'usia' => $validated['usia'] ?? null,
            'pangkat' => $validated['pangkat'] ?? null,
            'tmt_pangkat' => $validated['tmt_pangkat'] ?? null,
            'jabatan' => $validated['jabatan'] ?? null,
            'tmt_jabatan' => $validated['tmt_jabatan'] ?? null,
            'eselon' => $validated['eselon'] ?? null,
            'pangkat_cpns_pns' => $validated['pangkat_cpns_pns'] ?? null,
            'tmt_cpns' => $validated['tmt_cpns'] ?? null,
            'tmt_pns' => $validated['tmt_pns'] ?? null,
            'gaji_pokok' => $validated['gaji_pokok'] ?? null,
            'tmt_gaji' => $validated['tmt_gaji'] ?? null,
            'tingkat_pendidikan' => $validated['tingkat_pendidikan'] ?? null,
            'pendidikan_umum' => $validated['pendidikan_umum'] ?? null,
            'diklat_struktural' => $validated['diklat_struktural'] ?? null,
            'diklat_fungsional' => $validated['diklat_fungsional'] ?? null,
            'jenis_kelamin' => $validated['jenis_kelamin'] ?? null,
            'peringkat' => $validated['peringkat'] ?? null,
            'nip_lama' => $validated['nip_lama'] ?? null,
            'departemen' => '-', // Default or optional
        ]);"""

update_old = """    public function update(Request $request, Staff $staff)
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
        ]);"""

update_new = """    public function update(Request $request, Staff $staff)
    {
        $validated = $request->validate([
            'nip' => 'required|string|max:255|unique:staff,nik,' . $staff->id,
            'name' => 'required|string|max:255',
            'tempat_lahir' => 'nullable|string|max:255',
            'tanggal_lahir' => 'nullable|date',
            'usia' => 'nullable|string|max:50',
            'pangkat' => 'nullable|string|max:255',
            'tmt_pangkat' => 'nullable|date',
            'jabatan' => 'nullable|string|max:255',
            'tmt_jabatan' => 'nullable|date',
            'eselon' => 'nullable|string|max:255',
            'pangkat_cpns_pns' => 'nullable|string|max:255',
            'tmt_cpns' => 'nullable|date',
            'tmt_pns' => 'nullable|date',
            'gaji_pokok' => 'nullable|string|max:255',
            'tmt_gaji' => 'nullable|date',
            'tingkat_pendidikan' => 'nullable|string|max:255',
            'pendidikan_umum' => 'nullable|string|max:255',
            'diklat_struktural' => 'nullable|string|max:255',
            'diklat_fungsional' => 'nullable|string|max:255',
            'jenis_kelamin' => 'nullable|string|max:50',
            'peringkat' => 'nullable|string|max:255',
            'nip_lama' => 'nullable|string|max:255',
        ]);

        $staff->update([
            'nik' => $validated['nip'],
            'name' => $validated['name'],
            'tempat_lahir' => $validated['tempat_lahir'] ?? null,
            'tanggal_lahir' => $validated['tanggal_lahir'] ?? null,
            'usia' => $validated['usia'] ?? null,
            'pangkat' => $validated['pangkat'] ?? null,
            'tmt_pangkat' => $validated['tmt_pangkat'] ?? null,
            'jabatan' => $validated['jabatan'] ?? null,
            'tmt_jabatan' => $validated['tmt_jabatan'] ?? null,
            'eselon' => $validated['eselon'] ?? null,
            'pangkat_cpns_pns' => $validated['pangkat_cpns_pns'] ?? null,
            'tmt_cpns' => $validated['tmt_cpns'] ?? null,
            'tmt_pns' => $validated['tmt_pns'] ?? null,
            'gaji_pokok' => $validated['gaji_pokok'] ?? null,
            'tmt_gaji' => $validated['tmt_gaji'] ?? null,
            'tingkat_pendidikan' => $validated['tingkat_pendidikan'] ?? null,
            'pendidikan_umum' => $validated['pendidikan_umum'] ?? null,
            'diklat_struktural' => $validated['diklat_struktural'] ?? null,
            'diklat_fungsional' => $validated['diklat_fungsional'] ?? null,
            'jenis_kelamin' => $validated['jenis_kelamin'] ?? null,
            'peringkat' => $validated['peringkat'] ?? null,
            'nip_lama' => $validated['nip_lama'] ?? null,
        ]);"""

content = content.replace(store_old, store_new)
content = content.replace(update_old, update_new)

with open('app/Http/Controllers/StaffController.php', 'w') as f:
    f.write(content)
