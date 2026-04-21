import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import Modal from '@/Components/Modal';
import { useState, FormEventHandler } from 'react';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import SecondaryButton from '@/Components/SecondaryButton';
import PrimaryButton from '@/Components/PrimaryButton';

export default function InventoryData({ inventories }: { inventories: any[] }) {
    const [confirmingAddition, setConfirmingAddition] = useState(false);
    const [confirmingEdition, setConfirmingEdition] = useState(false);
    const [confirmingDeletion, setConfirmingDeletion] = useState(false);
    const [selectedInventory, setSelectedInventory] = useState<any>(null);

    const { data, setData, post, patch, delete: destroy, processing, errors, reset } = useForm({
        item_name: '',
        item_code: '',
        category: '',
        quantity: 0,
        location: '',
        condition: 'Good',
    });

    const addInventory: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('inventory.store'), {
            onSuccess: () => {
                setConfirmingAddition(false);
                reset();
            },
        });
    };

    const editInventory: FormEventHandler = (e) => {
        e.preventDefault();
        patch(route('inventory.update', selectedInventory.id), {
            onSuccess: () => {
                setConfirmingEdition(false);
                reset();
            },
        });
    };

    const deleteInventory: FormEventHandler = (e) => {
        e.preventDefault();
        destroy(route('inventory.destroy', selectedInventory.id), {
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
            category: inventory.category,
            quantity: inventory.quantity,
            location: inventory.location || '',
            condition: inventory.condition,
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
        reset();
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Inventory Data Bub
                </h2>
            }
        >
            <Head title="Inventory Data Bub" />

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
                                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">NIB</th>
                                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">Name</th>
                                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">Category</th>
                                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">Quantity</th>
                                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">Location</th>
                                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">Condition</th>
                                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                                        {inventories.map((inventory, index) => (
                                            <tr key={inventory.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4">{index + 1}</td>
                                                <td className="px-6 py-4">{inventory.item_code}</td>
                                                <td className="px-6 py-4">{inventory.item_name}</td>
                                                <td className="px-6 py-4">{inventory.category}</td>
                                                <td className="px-6 py-4">{inventory.quantity}</td>
                                                <td className="px-6 py-4">{inventory.location || '-'}</td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-2 py-1 rounded-full text-xs ${inventory.condition === 'Good' ? 'bg-green-100 text-green-800' : (inventory.condition === 'Moderate' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800')}`}>
                                                        {inventory.condition}
                                                    </span>
                                                </td>
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
                        <InputLabel htmlFor="item_code" value="NIB" />
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

                    <div className="mt-4">
                        <InputLabel htmlFor="category" value="Kategori" />
                        <TextInput
                            id="category"
                            type="text"
                            value={data.category}
                            onChange={(e) => setData('category', e.target.value)}
                            className="mt-1 block w-full"
                            placeholder="Kategori Barang"
                        />
                        <InputError message={errors.category} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="quantity" value="Jumlah" />
                        <TextInput
                            id="quantity"
                            type="number"
                            value={data.quantity}
                            onChange={(e) => setData('quantity', parseInt(e.target.value))}
                            className="mt-1 block w-full"
                            placeholder="0"
                        />
                        <InputError message={errors.quantity} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="location" value="Lokasi" />
                        <TextInput
                            id="location"
                            type="text"
                            value={data.location}
                            onChange={(e) => setData('location', e.target.value)}
                            className="mt-1 block w-full"
                            placeholder="Lokasi Penyimpanan"
                        />
                        <InputError message={errors.location} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="condition" value="Kondisi" />
                        <select
                            id="condition"
                            value={data.condition}
                            onChange={(e) => setData('condition', e.target.value)}
                            className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                        >
                            <option value="Good">Baik</option>
                            <option value="Moderate">Cukup</option>
                            <option value="Poor">Rusak</option>
                        </select>
                        <InputError message={errors.condition} className="mt-2" />
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

                    <div className="mt-4">
                        <InputLabel htmlFor="edit_category" value="Kategori" />
                        <TextInput
                            id="edit_category"
                            type="text"
                            value={data.category}
                            onChange={(e) => setData('category', e.target.value)}
                            className="mt-1 block w-full"
                            placeholder="Kategori Barang"
                        />
                        <InputError message={errors.category} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="edit_quantity" value="Jumlah" />
                        <TextInput
                            id="edit_quantity"
                            type="number"
                            value={data.quantity}
                            onChange={(e) => setData('quantity', parseInt(e.target.value))}
                            className="mt-1 block w-full"
                            placeholder="0"
                        />
                        <InputError message={errors.quantity} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="edit_location" value="Lokasi" />
                        <TextInput
                            id="edit_location"
                            type="text"
                            value={data.location}
                            onChange={(e) => setData('location', e.target.value)}
                            className="mt-1 block w-full"
                            placeholder="Lokasi Penyimpanan"
                        />
                        <InputError message={errors.location} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="edit_condition" value="Kondisi" />
                        <select
                            id="edit_condition"
                            value={data.condition}
                            onChange={(e) => setData('condition', e.target.value)}
                            className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                        >
                            <option value="Good">Baik</option>
                            <option value="Moderate">Cukup</option>
                            <option value="Poor">Rusak</option>
                        </select>
                        <InputError message={errors.condition} className="mt-2" />
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
        </AuthenticatedLayout>
    );
}
