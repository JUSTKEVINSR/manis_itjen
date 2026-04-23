import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
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
    const [selectedStaff, setSelectedStaff] = useState<any>(null);

    const { data, setData, post, patch, delete: destroy, processing, errors, reset } = useForm({
        nip: '',
        name: '',
        pangkat: '',
        jabatan: '',
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
            nip: staff.nik,
            name: staff.name,
            pangkat: staff.pangkat,
            jabatan: staff.jabatan,
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
        reset();
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
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex justify-end mb-4">
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
                                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">NIP</th>
                                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">Name</th>
                                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">Pangkat</th>
                                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">Jabatan</th>
                                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">Action</th>

                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                                        {staffs.map((staff, index) => (
                                            <tr key={staff.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4">{index + 1}</td>
                                                <td className="px-6 py-4">{staff.nik}</td>
                                                <td className="px-6 py-4">{staff.name}</td>
                                                <td className="px-6 py-4">{staff.pangkat}</td>
                                                <td className="px-6 py-4">{staff.jabatan}</td>
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

                    <p className="mt-1 text-sm text-gray-600">
                        Masukkan data karyawan baru secara lengkap.
                    </p>

                    <div className="mt-6">
                        <InputLabel htmlFor="nip" value="NIP" />
                        <TextInput
                            id="nip"
                            type="text"
                            name="nip"
                            value={data.nip}
                            onChange={(e) => setData('nip', e.target.value)}
                            className="mt-1 block w-full"
                            isFocused
                            placeholder="NIP"
                        />
                        <InputError message={errors.nip} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="name" value="Nama" />
                        <TextInput
                            id="name"
                            type="text"
                            name="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="mt-1 block w-full"
                            placeholder="Nama Lengkap"
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="pangkat" value="Pangkat" />
                        <TextInput
                            id="pangkat"
                            type="text"
                            name="pangkat"
                            value={data.pangkat}
                            onChange={(e) => setData('pangkat', e.target.value)}
                            className="mt-1 block w-full"
                            placeholder="Pangkat"
                        />
                        <InputError message={errors.pangkat} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="jabatan" value="Jabatan" />
                        <TextInput
                            id="jabatan"
                            type="text"
                            name="jabatan"
                            value={data.jabatan}
                            onChange={(e) => setData('jabatan', e.target.value)}
                            className="mt-1 block w-full"
                            placeholder="Jabatan"
                        />
                        <InputError message={errors.jabatan} className="mt-2" />
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

                    <div className="mt-6">
                        <InputLabel htmlFor="edit_nip" value="NIP" />
                        <TextInput
                            id="edit_nip"
                            type="text"
                            value={data.nip}
                            onChange={(e) => setData('nip', e.target.value)}
                            className="mt-1 block w-full"
                            placeholder="NIP"
                        />
                        <InputError message={errors.nip} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="edit_name" value="Nama" />
                        <TextInput
                            id="edit_name"
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="mt-1 block w-full"
                            placeholder="Nama Lengkap"
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="edit_pangkat" value="Pangkat" />
                        <TextInput
                            id="edit_pangkat"
                            type="text"
                            value={data.pangkat}
                            onChange={(e) => setData('pangkat', e.target.value)}
                            className="mt-1 block w-full"
                            placeholder="Pangkat"
                        />
                        <InputError message={errors.pangkat} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="edit_jabatan" value="Jabatan" />
                        <TextInput
                            id="edit_jabatan"
                            type="text"
                            value={data.jabatan}
                            onChange={(e) => setData('jabatan', e.target.value)}
                            className="mt-1 block w-full"
                            placeholder="Jabatan"
                        />
                        <InputError message={errors.jabatan} className="mt-2" />
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
        </AuthenticatedLayout>
    );
}
