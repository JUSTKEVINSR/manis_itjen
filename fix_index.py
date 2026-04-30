import re

with open('resources/js/Pages/karyawan data/index.tsx', 'r') as f:
    content = f.read()

# Replace useForm
content = re.sub(r'const \{ data, setData.*?useForm\(\{.*?\}\);', '''const { data, setData, post, patch, delete: destroy, processing, errors, reset } = useForm({
        nip: '',
        name: '',
        tempat_lahir: '',
        tanggal_lahir: '',
        usia: '',
        pangkat: '',
        tmt_pangkat: '',
        jabatan: '',
        tmt_jabatan: '',
        eselon: '',
        pangkat_cpns_pns: '',
        tmt_cpns: '',
        tmt_pns: '',
        gaji_pokok: '',
        tmt_gaji: '',
        tingkat_pendidikan: '',
        pendidikan_umum: '',
        diklat_struktural: '',
        diklat_fungsional: '',
        jenis_kelamin: '',
        peringkat: '',
        nip_lama: '',
    });''', content, flags=re.DOTALL)

# Replace openEditModal
content = re.sub(r'const openEditModal = \(staff: any\) => \{.*?setConfirmingEdition\(true\);\n    \};', '''const openEditModal = (staff: any) => {
        setSelectedStaff(staff);
        setData({
            nip: staff.nik || '',
            name: staff.name || '',
            tempat_lahir: staff.tempat_lahir || '',
            tanggal_lahir: staff.tanggal_lahir || '',
            usia: staff.usia || '',
            pangkat: staff.pangkat || '',
            tmt_pangkat: staff.tmt_pangkat || '',
            jabatan: staff.jabatan || '',
            tmt_jabatan: staff.tmt_jabatan || '',
            eselon: staff.eselon || '',
            pangkat_cpns_pns: staff.pangkat_cpns_pns || '',
            tmt_cpns: staff.tmt_cpns || '',
            tmt_pns: staff.tmt_pns || '',
            gaji_pokok: staff.gaji_pokok || '',
            tmt_gaji: staff.tmt_gaji || '',
            tingkat_pendidikan: staff.tingkat_pendidikan || '',
            pendidikan_umum: staff.pendidikan_umum || '',
            diklat_struktural: staff.diklat_struktural || '',
            diklat_fungsional: staff.diklat_fungsional || '',
            jenis_kelamin: staff.jenis_kelamin || '',
            peringkat: staff.peringkat || '',
            nip_lama: staff.nip_lama || '',
        });
        setConfirmingEdition(true);
    };''', content, flags=re.DOTALL)

# Fix spelling and mapping
content = content.replace('Pedidikan Umumm', 'Pendidikan Umum')
content = content.replace('pangkat_cpns', 'pangkat_cpns_pns')
content = content.replace('tempat_tgl_lahir', 'tempat_lahir')

form_fields = """
                    <div className="grid grid-cols-4 gap-6 ">
                        <div className="mt-4">
                            <InputLabel htmlFor="nip" value="NIP" />
                            <TextInput id="nip" type="text" name="nip" value={data.nip} onChange={(e) => setData('nip', e.target.value)} className="mt-1 block w-full" isFocused placeholder="NIP" />
                            <InputError message={errors.nip} className="mt-2" />
                        </div>
                        <div className="mt-4">
                            <InputLabel htmlFor="name" value="Nama" />
                            <TextInput id="name" type="text" name="name" value={data.name} onChange={(e) => setData('name', e.target.value)} className="mt-1 block w-full" placeholder="Nama Lengkap" />
                            <InputError message={errors.name} className="mt-2" />
                        </div>
                        <div className="mt-4">
                            <InputLabel htmlFor="tempat_lahir" value="Tempat Lahir" />
                            <TextInput id="tempat_lahir" type="text" name="tempat_lahir" value={data.tempat_lahir} onChange={(e) => setData('tempat_lahir', e.target.value)} className="mt-1 block w-full" placeholder="Tempat Lahir" />
                            <InputError message={errors.tempat_lahir} className="mt-2" />
                        </div>
                        <div className="mt-4">
                            <InputLabel htmlFor="tanggal_lahir" value="Tanggal Lahir" />
                            <TextInput id="tanggal_lahir" type="date" name="tanggal_lahir" value={data.tanggal_lahir} onChange={(e) => setData('tanggal_lahir', e.target.value)} className="mt-1 block w-full" />
                            <InputError message={errors.tanggal_lahir} className="mt-2" />
                        </div>
                    </div>

                    <div className="grid grid-cols-4 gap-6 ">
                        <div className="mt-4">
                            <InputLabel htmlFor="usia" value="Usia" />
                            <TextInput id="usia" type="text" name="usia" value={data.usia} onChange={(e) => setData('usia', e.target.value)} className="mt-1 block w-full" placeholder="Usia" />
                            <InputError message={errors.usia} className="mt-2" />
                        </div>
                        <div className="mt-4">
                            <InputLabel htmlFor="pangkat" value="Pangkat" />
                            <TextInput id="pangkat" type="text" name="pangkat" value={data.pangkat} onChange={(e) => setData('pangkat', e.target.value)} className="mt-1 block w-full" placeholder="Pangkat" />
                            <InputError message={errors.pangkat} className="mt-2" />
                        </div>
                        <div className="mt-4">
                            <InputLabel htmlFor="tmt_pangkat" value="TMT Pangkat" />
                            <TextInput id="tmt_pangkat" type="date" name="tmt_pangkat" value={data.tmt_pangkat} onChange={(e) => setData('tmt_pangkat', e.target.value)} className="mt-1 block w-full" />
                            <InputError message={errors.tmt_pangkat} className="mt-2" />
                        </div>
                        <div className="mt-4">
                            <InputLabel htmlFor="jabatan" value="Jabatan" />
                            <TextInput id="jabatan" type="text" name="jabatan" value={data.jabatan} onChange={(e) => setData('jabatan', e.target.value)} className="mt-1 block w-full" placeholder="Jabatan" />
                            <InputError message={errors.jabatan} className="mt-2" />
                        </div>
                    </div>

                    <div className="grid grid-cols-4 gap-6 ">
                        <div className="mt-4">
                            <InputLabel htmlFor="tmt_jabatan" value="TMT Jabatan" />
                            <TextInput id="tmt_jabatan" type="date" name="tmt_jabatan" value={data.tmt_jabatan} onChange={(e) => setData('tmt_jabatan', e.target.value)} className="mt-1 block w-full" />
                            <InputError message={errors.tmt_jabatan} className="mt-2" />
                        </div>
                        <div className="mt-4">
                            <InputLabel htmlFor="eselon" value="Eselon" />
                            <TextInput id="eselon" type="text" name="eselon" value={data.eselon} onChange={(e) => setData('eselon', e.target.value)} className="mt-1 block w-full" placeholder="Eselon" />
                            <InputError message={errors.eselon} className="mt-2" />
                        </div>
                        <div className="mt-4">
                            <InputLabel htmlFor="pangkat_cpns_pns" value="Pangkat CPNS/PNS" />
                            <TextInput id="pangkat_cpns_pns" type="text" name="pangkat_cpns_pns" value={data.pangkat_cpns_pns} onChange={(e) => setData('pangkat_cpns_pns', e.target.value)} className="mt-1 block w-full" placeholder="Pangkat CPNS/PNS" />
                            <InputError message={errors.pangkat_cpns_pns} className="mt-2" />
                        </div>
                        <div className="mt-4">
                            <InputLabel htmlFor="tmt_cpns" value="TMT CPNS" />
                            <TextInput id="tmt_cpns" type="date" name="tmt_cpns" value={data.tmt_cpns} onChange={(e) => setData('tmt_cpns', e.target.value)} className="mt-1 block w-full" />
                            <InputError message={errors.tmt_cpns} className="mt-2" />
                        </div>
                    </div>

                    <div className="grid grid-cols-4 gap-6 ">
                        <div className="mt-4">
                            <InputLabel htmlFor="tmt_pns" value="TMT PNS" />
                            <TextInput id="tmt_pns" type="date" name="tmt_pns" value={data.tmt_pns} onChange={(e) => setData('tmt_pns', e.target.value)} className="mt-1 block w-full" />
                            <InputError message={errors.tmt_pns} className="mt-2" />
                        </div>
                        <div className="mt-4">
                            <InputLabel htmlFor="gaji_pokok" value="Gaji Pokok" />
                            <TextInput id="gaji_pokok" type="text" name="gaji_pokok" value={data.gaji_pokok} onChange={(e) => setData('gaji_pokok', e.target.value)} className="mt-1 block w-full" placeholder="Gaji Pokok" />
                            <InputError message={errors.gaji_pokok} className="mt-2" />
                        </div>
                        <div className="mt-4">
                            <InputLabel htmlFor="tmt_gaji" value="TMT Gaji" />
                            <TextInput id="tmt_gaji" type="date" name="tmt_gaji" value={data.tmt_gaji} onChange={(e) => setData('tmt_gaji', e.target.value)} className="mt-1 block w-full" />
                            <InputError message={errors.tmt_gaji} className="mt-2" />
                        </div>
                        <div className="mt-4">
                            <InputLabel htmlFor="tingkat_pendidikan" value="Tingkat Pendidikan" />
                            <TextInput id="tingkat_pendidikan" type="text" name="tingkat_pendidikan" value={data.tingkat_pendidikan} onChange={(e) => setData('tingkat_pendidikan', e.target.value)} className="mt-1 block w-full" placeholder="Tingkat Pendidikan" />
                            <InputError message={errors.tingkat_pendidikan} className="mt-2" />
                        </div>
                    </div>

                    <div className="grid grid-cols-4 gap-6 ">
                        <div className="mt-4">
                            <InputLabel htmlFor="pendidikan_umum" value="Pendidikan Umum" />
                            <TextInput id="pendidikan_umum" type="text" name="pendidikan_umum" value={data.pendidikan_umum} onChange={(e) => setData('pendidikan_umum', e.target.value)} className="mt-1 block w-full" placeholder="Pendidikan Umum" />
                            <InputError message={errors.pendidikan_umum} className="mt-2" />
                        </div>
                        <div className="mt-4">
                            <InputLabel htmlFor="diklat_struktural" value="Diklat Struktural" />
                            <TextInput id="diklat_struktural" type="text" name="diklat_struktural" value={data.diklat_struktural} onChange={(e) => setData('diklat_struktural', e.target.value)} className="mt-1 block w-full" placeholder="Diklat Struktural" />
                            <InputError message={errors.diklat_struktural} className="mt-2" />
                        </div>
                        <div className="mt-4">
                            <InputLabel htmlFor="diklat_fungsional" value="Diklat Fungsional" />
                            <TextInput id="diklat_fungsional" type="text" name="diklat_fungsional" value={data.diklat_fungsional} onChange={(e) => setData('diklat_fungsional', e.target.value)} className="mt-1 block w-full" placeholder="Diklat Fungsional" />
                            <InputError message={errors.diklat_fungsional} className="mt-2" />
                        </div>
                        <div className="mt-4">
                            <InputLabel htmlFor="jenis_kelamin" value="Jenis Kelamin" />
                            <TextInput id="jenis_kelamin" type="text" name="jenis_kelamin" value={data.jenis_kelamin} onChange={(e) => setData('jenis_kelamin', e.target.value)} className="mt-1 block w-full" placeholder="Jenis Kelamin" />
                            <InputError message={errors.jenis_kelamin} className="mt-2" />
                        </div>
                    </div>

                    <div className="grid grid-cols-4 gap-6 ">
                        <div className="mt-4">
                            <InputLabel htmlFor="peringkat" value="Peringkat" />
                            <TextInput id="peringkat" type="text" name="peringkat" value={data.peringkat} onChange={(e) => setData('peringkat', e.target.value)} className="mt-1 block w-full" placeholder="Peringkat" />
                            <InputError message={errors.peringkat} className="mt-2" />
                        </div>
                        <div className="mt-4">
                            <InputLabel htmlFor="nip_lama" value="NIP Lama" />
                            <TextInput id="nip_lama" type="text" name="nip_lama" value={data.nip_lama} onChange={(e) => setData('nip_lama', e.target.value)} className="mt-1 block w-full" placeholder="NIP Lama" />
                            <InputError message={errors.nip_lama} className="mt-2" />
                        </div>
                    </div>
"""

# Replace add form fields
content = re.sub(r'<div className="grid grid-cols-4 gap-6 ">.*?</form>', form_fields + '''
                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>Batal</SecondaryButton>
                        <PrimaryButton className="ms-3" disabled={processing}>
                            Simpan
                        </PrimaryButton>
                    </div>
                </form>''', content, flags=re.DOTALL, count=1)

# Replace edit form fields
content = re.sub(r'<p className="mt-1 text-sm text-gray-600">\s*Perbarui data karyawan\.\s*</p>.*?<div className="mt-6 flex justify-end">', '''<p className="mt-1 text-sm text-gray-600">
                        Perbarui data karyawan.
                    </p>
''' + form_fields + '''
                    <div className="mt-6 flex justify-end">''', content, flags=re.DOTALL, count=1)


with open('resources/js/Pages/karyawan data/index.tsx', 'w') as f:
    f.write(content)
