import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import Modal from '@/Components/Modal';
import { useState, FormEventHandler } from 'react';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import SecondaryButton from '@/Components/SecondaryButton';
import PrimaryButton from '@/Components/PrimaryButton';

export default function DataKaryawan({ staffs }: { staffs: any[] }) {
    const [confirmingAddition, setConfirmingAddition] = useState(false);
    const [confirmingEdition, setConfirmingEdition] = useState(false);
    const [confirmingDeletion, setConfirmingDeletion] = useState(false);
    const [confirmingImport, setConfirmingImport] = useState(false);
    const [importFile, setImportFile] = useState<File | null>(null);
    const [importError, setImportError] = useState<string>('');
    const [importProcessing, setImportProcessing] = useState(false);
    const [selectedStaff, setSelectedStaff] = useState<any>(null);

    const { data, setData, post, patch, delete: destroy, processing, errors, reset } = useForm({
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
    });

    const addKaryawan: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('karyawan.store'), {
            onSuccess: () => {
                setConfirmingAddition(false);
                reset();
            },
        });
    };

    const editKaryawan: FormEventHandler = (e) => {
        e.preventDefault();
        patch(route('karyawan.update', selectedStaff.id), {
            onSuccess: () => {
                setConfirmingEdition(false);
                reset();
            },
        });
    };

    const deleteKaryawan: FormEventHandler = (e) => {
        e.preventDefault();
        destroy(route('karyawan.destroy', selectedStaff.id), {
            onSuccess: () => {
                setConfirmingDeletion(false);
                reset();
            },
        });
    };

    const openEditModal = (staff: any) => {
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
    };

    const openDeleteModal = (staff: any) => {
        setSelectedStaff(staff);
        setConfirmingDeletion(true);
    };

    const closeModal = () => {
        setConfirmingAddition(false);
        setConfirmingEdition(false);
        setConfirmingDeletion(false);
        setConfirmingImport(false);
        setImportFile(null);
        setImportError('');
        reset();
    };

    const submitImport = (e: React.FormEvent) => {
        e.preventDefault();
        if (!importFile) {
            setImportError('Pilih file Excel terlebih dahulu.');
            return;
        }
        setImportProcessing(true);
        const formData = new FormData();
        formData.append('file', importFile);
        router.post(route('karyawan.import'), formData, {
            forceFormData: true,
            onSuccess: () => {
                setConfirmingImport(false);
                setImportFile(null);
                setImportError('');
            },
            onError: (errors) => {
                setImportError(errors.file ?? 'Terjadi kesalahan saat mengimport.');
            },
            onFinish: () => setImportProcessing(false),
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Data Karyawan
                </h2>
            }
        >
            <Head title="Data Karyawan" />

            <div className="py-12">
                <div className="mx-auto sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex justify-end mb-4 gap-2">
                                <button
                                    id="import-excel-btn"
                                    className="px-4 py-2 text-white bg-yellow-500 rounded-lg hover:bg-yellow-600 inline-flex items-center gap-1"
                                    onClick={() => setConfirmingImport(true)}
                                >
                                    ⬆ Import Excel
                                </button>
                                <a
                                    href={route('karyawan.export')}
                                    className="px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600 inline-flex items-center gap-1"
                                    id="export-excel-btn"
                                >
                                    ⬇ Export Excel
                                </a>
                                <button
                                    className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                                    onClick={() => setConfirmingAddition(true)}
                                >
                                    Tambah
                                </button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">No</th>
                                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">N I P</th>
                                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">NAMA LENGKAP</th>
                                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">TEMPAT DAN TGL.LAHIR</th>
                                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">USIA</th>
                                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">PANGKAT GOL.RUANG</th>
                                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">TMT PANGKAT</th>
                                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">JABATAN</th>
                                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">TMT JABATAN</th>
                                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">ESELON</th>
                                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">PANGKAT CPNS</th>
                                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">TMT CPNS</th>
                                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">TMT PNS</th>
                                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">GAJI POKOK</th>
                                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">TMT GAJI</th>
                                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">TINGKAT PENDIDIKAN</th>
                                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">PENDIDIKAN UMUM</th>
                                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">DIKLAT STRUKTURAL</th>
                                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">DIKLAT FUNGSIONAL</th>
                                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">JENIS KELAMIN</th>
                                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">PERINGKAT</th>
                                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">NIP LAMA</th>
                                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                                        {staffs.map((staff, index) => (
                                            <tr key={staff.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4">{index + 1}</td>
                                                <td className="px-6 py-4">{staff.nik}</td>
                                                <td className="px-6 py-4">{staff.name}</td>
                                                <td className="px-6 py-4">{staff.tempat_lahir}, {staff.tanggal_lahir}</td>
                                                <td className="px-6 py-4">{staff.usia}</td>
                                                <td className="px-6 py-4">{staff.pangkat}</td>
                                                <td className="px-6 py-4">{staff.tmt_pangkat}</td>
                                                <td className="px-6 py-4">{staff.jabatan}</td>
                                                <td className="px-6 py-4">{staff.tmt_jabatan}</td>
                                                <td className="px-6 py-4">{staff.eselon}</td>
                                                <td className="px-6 py-4">{staff.pangkat_cpns_pns}</td>
                                                <td className="px-6 py-4">{staff.tmt_cpns}</td>
                                                <td className="px-6 py-4">{staff.tmt_pns}</td>
                                                <td className="px-6 py-4">{staff.gaji_pokok}</td>
                                                <td className="px-6 py-4">{staff.tmt_gaji}</td>
                                                <td className="px-6 py-4">{staff.tingkat_pendidikan}</td>
                                                <td className="px-6 py-4">{staff.pendidikan_umum}</td>
                                                <td className="px-6 py-4">{staff.diklat_struktural}</td>
                                                <td className="px-6 py-4">{staff.diklat_fungsional}</td>
                                                <td className="px-6 py-4">{staff.jenis_kelamin}</td>
                                                <td className="px-6 py-4">{staff.peringkat}</td>
                                                <td className="px-6 py-4">{staff.nip_lama}</td>
                                                <td className="px-6 py-4 flex gap-2">
                                                    <button
                                                        className="text-blue-600 hover:text-blue-900"
                                                        onClick={() => openEditModal(staff)}
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        className="text-red-600 hover:text-red-900"
                                                        onClick={() => openDeleteModal(staff)}
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal show={confirmingAddition} onClose={closeModal}>
                <form onSubmit={addKaryawan} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Tambah Data Karyawan
                    </h2>


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

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>Batal</SecondaryButton>
                        <PrimaryButton className="ms-3" disabled={processing}>
                            Simpan
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>
            <Modal show={confirmingEdition} onClose={closeModal}>
                <form onSubmit={editKaryawan} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Edit Data Karyawan
                    </h2>

                    <p className="mt-1 text-sm text-gray-600">
                        Perbarui data karyawan.
                    </p>

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

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>Batal</SecondaryButton>
                        <PrimaryButton className="ms-3" disabled={processing}>
                            Simpan Perubahan
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>

            <Modal show={confirmingDeletion} onClose={closeModal}>
                <form onSubmit={deleteKaryawan} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Hapus Data Karyawan
                    </h2>

                    <p className="mt-1 text-sm text-gray-600">
                        Apakah Anda yakin ingin menghapus data karyawan <strong>{selectedStaff?.name}</strong>? Tindakan ini tidak dapat dibatalkan.
                    </p>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>Batal</SecondaryButton>
                        <PrimaryButton className="ms-3 bg-red-600 hover:bg-red-700" disabled={processing}>
                            Hapus
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>

            <Modal show={confirmingImport} onClose={closeModal}>
                <form onSubmit={submitImport} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Import Data Karyawan dari Excel
                    </h2>

                    <p className="mt-1 text-sm text-gray-600">
                        Upload file Excel (.xlsx atau .csv). Pastikan format kolom sesuai dengan template export.
                        Jika NIP sudah ada, data akan diperbarui secara otomatis.
                    </p>

                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Pilih File Excel
                        </label>
                        <input
                            id="import-file-input"
                            type="file"
                            accept=".xlsx,.xls,.csv"
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-yellow-700 hover:file:bg-yellow-100"
                            onChange={(e) => {
                                setImportFile(e.target.files?.[0] ?? null);
                                setImportError('');
                            }}
                        />
                        {importFile && (
                            <p className="mt-1 text-xs text-green-600">✓ File dipilih: {importFile.name}</p>
                        )}
                        {importError && (
                            <p className="mt-1 text-xs text-red-600">{importError}</p>
                        )}
                    </div>

                    <div className="mt-2 text-xs text-gray-400">
                        Format kolom yang diharapkan: NO, N I P, NAMA LENGKAP, TEMPAT LAHIR, TANGGAL LAHIR, USIA, PANGKAT GOL.RUANG, TMT PANGKAT, JABATAN, TMT JABATAN, ESELON, PANGKAT CPNS, TMT CPNS, TMT PNS, GAJI POKOK, TMT GAJI, TINGKAT PENDIDIKAN, PENDIDIKAN UMUM, DIKLAT STRUKTURAL, DIKLAT FUNGSIONAL, JENIS KELAMIN, PERINGKAT, NIP LAMA
                    </div>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>Batal</SecondaryButton>
                        <PrimaryButton
                            className="ms-3 bg-yellow-500 hover:bg-yellow-600"
                            disabled={importProcessing}
                        >
                            {importProcessing ? 'Mengimport...' : 'Import'}
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>
        </AuthenticatedLayout>
    );
}
