import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import Modal from '@/Components/Modal';
import { useState, FormEventHandler, useRef } from 'react';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import SecondaryButton from '@/Components/SecondaryButton';
import PrimaryButton from '@/Components/PrimaryButton';

export default function InventoryData({ inventories }: { inventories: any[] }) {
    const [confirmingAddition, setConfirmingAddition] = useState(false);
    const [confirmingEdition, setConfirmingEdition] = useState(false);
    const [confirmingDeletion, setConfirmingDeletion] = useState(false);
    const [confirmingImport, setConfirmingImport] = useState(false);
    const [selectedInventory, setSelectedInventory] = useState<any>(null);
    const importFileRef = useRef<HTMLInputElement>(null);

    const importForm = useForm({ file: null as File | null });

    const importInventory: FormEventHandler = (e) => {
        e.preventDefault();
        importForm.post(route('inventory-kendaraan.import'), {
            forceFormData: true,
            onSuccess: () => {
                setConfirmingImport(false);
                importForm.reset();
            },
        });
    };

    const { data, setData, post, patch, delete: destroy, processing, errors, reset } = useForm({
        item_name: '',
        item_code: '',
        nup: '',
        merk: '',
        type: '',
        bpkb: '',
        no_stnk: '',
    });

    const addInventory: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('inventory-kendaraan.store'), {
            onSuccess: () => {
                setConfirmingAddition(false);
                reset();
            },
        });
    };

    const editInventory: FormEventHandler = (e) => {
        e.preventDefault();
        patch(route('inventory-kendaraan.update', selectedInventory.id), {
            onSuccess: () => {
                setConfirmingEdition(false);
                reset();
            },
        });
    };

    const deleteInventory: FormEventHandler = (e) => {
        e.preventDefault();
        destroy(route('inventory-kendaraan.destroy', selectedInventory.id), {
            onSuccess: () => {
                setConfirmingDeletion(false);
                reset();
            },
        });
    };

    const openEditModal = (inventory: any) => {
        setSelectedInventory(inventory);
        setData({
            item_name: inventory.item_name,
            item_code: inventory.item_code,
            nup: inventory.nup || '',
            merk: inventory.merk || '',
            type: inventory.type || '',
            bpkb: inventory.bpkb || '',
            no_stnk: inventory.no_stnk || '',
        });
        setConfirmingEdition(true);
    };

    const openDeleteModal = (inventory: any) => {
        setSelectedInventory(inventory);
        setConfirmingDeletion(true);
    };

    const closeModal = () => {
        setConfirmingAddition(false);
        setConfirmingEdition(false);
        setConfirmingDeletion(false);
        setConfirmingImport(false);
        reset();
        importForm.reset();
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Inventory Data Kendaraan
                </h2>
            }
        >
            <Head title="Inventory Data Kendaraan" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
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
                                    href={route('inventory-kendaraan.export')}
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
                                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">Kode Barang</th>
                                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">NUP</th>
                                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">Nama Barang </th>
                                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">Merk</th>
                                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">Type</th>
                                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">No BPKB</th>
                                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">No STNK</th>

                                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                                        {inventories.map((inventory, index) => (
                                            <tr key={inventory.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4">{index + 1}</td>
                                                <td className="px-6 py-4">{inventory.item_code}</td>
                                                <td className="px-6 py-4">{inventory.nup}</td>
                                                <td className="px-6 py-4">{inventory.item_name}</td>
                                                <td className="px-6 py-4">{inventory.merk}</td>
                                                <td className="px-6 py-4">{inventory.type}</td>
                                                <td className="px-6 py-4">{inventory.bpkb}</td>
                                                <td className="px-6 py-4">{inventory.no_stnk}</td>

                                                <td className="px-6 py-4 flex gap-2">
                                                    <button
                                                        className="text-blue-600 hover:text-blue-900"
                                                        onClick={() => openEditModal(inventory)}
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        className="text-red-600 hover:text-red-900"
                                                        onClick={() => openDeleteModal(inventory)}
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                        {inventories.length === 0 && (
                                            <tr>
                                                <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                                                    Tidak ada data inventory.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add Modal */}
            <Modal show={confirmingAddition} onClose={closeModal}>
                <form onSubmit={addInventory} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Tambah Data Inventory
                    </h2>

                    <p className="mt-1 text-sm text-gray-600">
                        Masukkan data inventory baru secara lengkap.
                    </p>

                    <div className="mt-6">
                        <InputLabel htmlFor="item_code" value="Kode Barang" />
                        <TextInput
                            id="item_code"
                            type="text"
                            value={data.item_code}
                            onChange={(e) => setData('item_code', e.target.value)}
                            className="mt-1 block w-full"
                            isFocused
                            placeholder="Nomor Induk Barang"
                        />
                        <InputError message={errors.item_code} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="item_name" value="Nama Barang" />
                        <TextInput
                            id="item_name"
                            type="text"
                            value={data.item_name}
                            onChange={(e) => setData('item_name', e.target.value)}
                            className="mt-1 block w-full"
                            placeholder="Nama Lengkap Barang"
                        />
                        <InputError message={errors.item_name} className="mt-2" />
                    </div>



                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <div>
                            <InputLabel htmlFor="nup" value="NUP" />
                            <TextInput
                                id="nup"
                                type="text"
                                value={data.nup}
                                onChange={(e) => setData('nup', e.target.value)}
                                className="mt-1 block w-full"
                                placeholder="Nomor Urut Pendaftaran"
                            />
                            <InputError message={errors.nup} className="mt-2" />
                        </div>
                        <div>
                            <InputLabel htmlFor="merk" value="Merk" />
                            <TextInput
                                id="merk"
                                type="text"
                                value={data.merk}
                                onChange={(e) => setData('merk', e.target.value)}
                                className="mt-1 block w-full"
                                placeholder="Merk Kendaraan"
                            />
                            <InputError message={errors.merk} className="mt-2" />
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mt-4">
                        <div>
                            <InputLabel htmlFor="type" value="Tipe" />
                            <TextInput
                                id="type"
                                type="text"
                                value={data.type}
                                onChange={(e) => setData('type', e.target.value)}
                                className="mt-1 block w-full"
                                placeholder="Tipe (Mobil/Motor)"
                            />
                            <InputError message={errors.type} className="mt-2" />
                        </div>
                        <div>
                            <InputLabel htmlFor="bpkb" value="BPKB" />
                            <TextInput
                                id="bpkb"
                                type="text"
                                value={data.bpkb}
                                onChange={(e) => setData('bpkb', e.target.value)}
                                className="mt-1 block w-full"
                                placeholder="No BPKB"
                            />
                            <InputError message={errors.bpkb} className="mt-2" />
                        </div>
                        <div>
                            <InputLabel htmlFor="no_stnk" value="No STNK" />
                            <TextInput
                                id="no_stnk"
                                type="text"
                                value={data.no_stnk}
                                onChange={(e) => setData('no_stnk', e.target.value)}
                                className="mt-1 block w-full"
                                placeholder="Nomor STNK"
                            />
                            <InputError message={errors.no_stnk} className="mt-2" />
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

            {/* Edit Modal */}
            <Modal show={confirmingEdition} onClose={closeModal}>
                <form onSubmit={editInventory} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Edit Data Inventory
                    </h2>

                    <p className="mt-1 text-sm text-gray-600">
                        Perbarui data inventory.
                    </p>

                    <div className="mt-6">
                        <InputLabel htmlFor="edit_item_code" value="NIB" />
                        <TextInput
                            id="edit_item_code"
                            type="text"
                            value={data.item_code}
                            onChange={(e) => setData('item_code', e.target.value)}
                            className="mt-1 block w-full"
                            placeholder="Nomor Induk Barang"
                        />
                        <InputError message={errors.item_code} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="edit_item_name" value="Nama Barang" />
                        <TextInput
                            id="edit_item_name"
                            type="text"
                            value={data.item_name}
                            onChange={(e) => setData('item_name', e.target.value)}
                            className="mt-1 block w-full"
                            placeholder="Nama Lengkap Barang"
                        />
                        <InputError message={errors.item_name} className="mt-2" />
                    </div>



                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <div>
                            <InputLabel htmlFor="edit_nup" value="NUP" />
                            <TextInput
                                id="edit_nup"
                                type="text"
                                value={data.nup}
                                onChange={(e) => setData('nup', e.target.value)}
                                className="mt-1 block w-full"
                                placeholder="Nomor Urut Pendaftaran"
                            />
                            <InputError message={errors.nup} className="mt-2" />
                        </div>
                        <div>
                            <InputLabel htmlFor="edit_merk" value="Merk" />
                            <TextInput
                                id="edit_merk"
                                type="text"
                                value={data.merk}
                                onChange={(e) => setData('merk', e.target.value)}
                                className="mt-1 block w-full"
                                placeholder="Merk Kendaraan"
                            />
                            <InputError message={errors.merk} className="mt-2" />
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mt-4">
                        <div>
                            <InputLabel htmlFor="edit_type" value="Tipe" />
                            <TextInput
                                id="edit_type"
                                type="text"
                                value={data.type}
                                onChange={(e) => setData('type', e.target.value)}
                                className="mt-1 block w-full"
                                placeholder="Tipe (Mobil/Motor)"
                            />
                            <InputError message={errors.type} className="mt-2" />
                        </div>
                        <div>
                            <InputLabel htmlFor="edit_bpkb" value="BPKB" />
                            <TextInput
                                id="edit_bpkb"
                                type="text"
                                value={data.bpkb}
                                onChange={(e) => setData('bpkb', e.target.value)}
                                className="mt-1 block w-full"
                                placeholder="No BPKB"
                            />
                            <InputError message={errors.bpkb} className="mt-2" />
                        </div>
                        <div>
                            <InputLabel htmlFor="edit_no_stnk" value="No STNK" />
                            <TextInput
                                id="edit_no_stnk"
                                type="text"
                                value={data.no_stnk}
                                onChange={(e) => setData('no_stnk', e.target.value)}
                                className="mt-1 block w-full"
                                placeholder="Nomor STNK"
                            />
                            <InputError message={errors.no_stnk} className="mt-2" />
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

            {/* Delete Modal */}
            <Modal show={confirmingDeletion} onClose={closeModal}>
                <form onSubmit={deleteInventory} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Hapus Data Inventory
                    </h2>

                    <p className="mt-1 text-sm text-gray-600">
                        Apakah Anda yakin ingin menghapus barang <strong>{selectedInventory?.item_name}</strong>? Tindakan ini tidak dapat dibatalkan.
                    </p>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>Batal</SecondaryButton>
                        <PrimaryButton className="ms-3 bg-red-600 hover:bg-red-700" disabled={processing}>
                            Hapus
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>

            {/* Import Modal */}
            <Modal show={confirmingImport} onClose={closeModal}>
                <form onSubmit={importInventory} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Import Data Kendaraan dari Excel
                    </h2>

                    <p className="mt-1 text-sm text-gray-600">
                        Upload file Excel (.xlsx) untuk mengimpor data kendaraan secara massal.
                    </p>

                    <div className="mt-6">
                        <InputLabel htmlFor="import_file" value="File Excel" />
                        <input
                            id="import_file"
                            type="file"
                            accept=".xlsx,.xls"
                            ref={importFileRef}
                            onChange={(e) => importForm.setData('file', e.target.files?.[0] ?? null)}
                            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                        {importForm.errors.file && (
                            <p className="mt-2 text-sm text-red-600">{importForm.errors.file}</p>
                        )}
                    </div>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>Batal</SecondaryButton>
                        <PrimaryButton className="ms-3" disabled={importForm.processing}>
                            Import
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>
        </AuthenticatedLayout>
    );
}
