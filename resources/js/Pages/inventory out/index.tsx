import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import Modal from '@/Components/Modal';
import { useState, FormEventHandler } from 'react';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import SecondaryButton from '@/Components/SecondaryButton';
import PrimaryButton from '@/Components/PrimaryButton';

export default function InventoryOut({ inventoryOuts, inventories, staffs }: { inventoryOuts: any[], inventories: any[], staffs: any[] }) {
    const [confirmingAddition, setConfirmingAddition] = useState(false);
    const [confirmingEdition, setConfirmingEdition] = useState(false);
    const [confirmingDeletion, setConfirmingDeletion] = useState(false);
    const [selectedInventoryOut, setSelectedInventoryOut] = useState<any>(null);

    const { data, setData, post, patch, delete: destroy, processing, errors, reset } = useForm({
        inventory_id: '',
        staff_id: '',
        quantity: 1,
        date_out: new Date().toISOString().split('T')[0],
        duration: '',
        return_date: '',
        kelengkapan: '',
        status: 'Borrowed',
        notes: '',
    });

    const addInventoryOut: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('inventory-out.store'), {
            onSuccess: () => {
                setConfirmingAddition(false);
                reset();
            },
        });
    };

    const editInventoryOut: FormEventHandler = (e) => {
        e.preventDefault();
        patch(route('inventory-out.update', selectedInventoryOut.id), {
            onSuccess: () => {
                setConfirmingEdition(false);
                reset();
            },
        });
    };

    const deleteInventoryOut: FormEventHandler = (e) => {
        e.preventDefault();
        destroy(route('inventory-out.destroy', selectedInventoryOut.id), {
            onSuccess: () => {
                setConfirmingDeletion(false);
                reset();
            },
        });
    };

    const openEditModal = (io: any) => {
        setSelectedInventoryOut(io);
        setData({
            inventory_id: io.inventory_id,
            staff_id: io.staff_id || '',
            quantity: io.quantity,
            date_out: io.date_out,
            duration: io.duration || '',
            return_date: io.return_date || '',
            kelengkapan: io.kelengkapan || '',
            status: io.status,
            notes: io.notes || '',
        });
        setConfirmingEdition(true);
    };

    const openDeleteModal = (io: any) => {
        setSelectedInventoryOut(io);
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
                    Inventory Out Bub
                </h2>
            }
        >
            <Head title="Inventory Bub" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex justify-end mb-4">
                                <button 
                                    className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                                    onClick={() => setConfirmingAddition(true)}
                                >
                                    Pull Item
                                </button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">No</th>
                                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">NIP</th>
                                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">Name User</th>
                                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">Jabatan</th>
                                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">Name Item</th>
                                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">Duration</th>
                                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">Return Date</th>
                                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">Kelengkapan</th>
                                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">Status</th>
                                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                                        {inventoryOuts.map((io, index) => (
                                            <tr key={io.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4">{index + 1}</td>
                                                <td className="px-6 py-4">{io.staff?.nik || '-'}</td>
                                                <td className="px-6 py-4">{io.staff?.name || 'Unknown'}</td>
                                                <td className="px-6 py-4">{io.staff?.jabatan || '-'}</td>
                                                <td className="px-6 py-4">{io.inventory?.item_name}</td>
                                                <td className="px-6 py-4">{io.duration || '-'}</td>
                                                <td className="px-6 py-4">{io.return_date || '-'}</td>
                                                <td className="px-6 py-4">{io.kelengkapan || '-'}</td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-2 py-1 rounded-full text-xs ${io.status === 'Borrowed' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                                                        {io.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 flex gap-2">
                                                    <button 
                                                        className="text-blue-600 hover:text-blue-900"
                                                        onClick={() => openEditModal(io)}
                                                    >
                                                        Edit
                                                    </button>
                                                    <button 
                                                        className="text-red-600 hover:text-red-900"
                                                        onClick={() => openDeleteModal(io)}
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                        {inventoryOuts.length === 0 && (
                                            <tr>
                                                <td colSpan={10} className="px-6 py-4 text-center text-gray-500">
                                                    Tidak ada data penarikan barang.
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
                <form onSubmit={addInventoryOut} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Pull Item (Penarikan Barang)
                    </h2>

                    <div className="mt-6">
                        <InputLabel htmlFor="inventory_id" value="Barang" />
                        <select
                            id="inventory_id"
                            value={data.inventory_id}
                            onChange={(e) => setData('inventory_id', e.target.value)}
                            className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                        >
                            <option value="">Pilih Barang</option>
                            {inventories.map((inv) => (
                                <option key={inv.id} value={inv.id}>{inv.item_name} (Stock: {inv.quantity})</option>
                            ))}
                        </select>
                        <InputError message={errors.inventory_id} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="staff_id" value="Karyawan (Peminjam)" />
                        <select
                            id="staff_id"
                            value={data.staff_id}
                            onChange={(e) => setData('staff_id', e.target.value)}
                            className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                        >
                            <option value="">Pilih Karyawan</option>
                            {staffs.map((s) => (
                                <option key={s.id} value={s.id}>{s.name} ({s.nik})</option>
                            ))}
                        </select>
                        <InputError message={errors.staff_id} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="quantity" value="Jumlah" />
                        <TextInput
                            id="quantity"
                            type="number"
                            value={data.quantity}
                            onChange={(e) => setData('quantity', parseInt(e.target.value))}
                            className="mt-1 block w-full"
                            min="1"
                        />
                        <InputError message={errors.quantity} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="date_out" value="Tanggal Pinjam" />
                        <TextInput
                            id="date_out"
                            type="date"
                            value={data.date_out}
                            onChange={(e) => setData('date_out', e.target.value)}
                            className="mt-1 block w-full"
                        />
                        <InputError message={errors.date_out} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="duration" value="Durasi" />
                        <TextInput
                            id="duration"
                            type="text"
                            value={data.duration}
                            onChange={(e) => setData('duration', e.target.value)}
                            className="mt-1 block w-full"
                            placeholder="Contoh: 7 Hari"
                        />
                        <InputError message={errors.duration} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="return_date" value="Tanggal Kembali" />
                        <TextInput
                            id="return_date"
                            type="date"
                            value={data.return_date}
                            onChange={(e) => setData('return_date', e.target.value)}
                            className="mt-1 block w-full"
                        />
                        <InputError message={errors.return_date} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="kelengkapan" value="Kelengkapan" />
                        <TextInput
                            id="kelengkapan"
                            type="text"
                            value={data.kelengkapan}
                            onChange={(e) => setData('kelengkapan', e.target.value)}
                            className="mt-1 block w-full"
                            placeholder="Contoh: Charger, Mouse"
                        />
                        <InputError message={errors.kelengkapan} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="status" value="Status" />
                        <select
                            id="status"
                            value={data.status}
                            onChange={(e) => setData('status', e.target.value)}
                            className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                        >
                            <option value="Borrowed">Dipinjam</option>
                            <option value="Returned">Dikembalikan</option>
                        </select>
                        <InputError message={errors.status} className="mt-2" />
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
                <form onSubmit={editInventoryOut} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Edit Penarikan Barang
                    </h2>

                    <div className="mt-6">
                        <InputLabel htmlFor="edit_inventory_id" value="Barang" />
                        <select
                            id="edit_inventory_id"
                            value={data.inventory_id}
                            onChange={(e) => setData('inventory_id', e.target.value)}
                            className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                        >
                            {inventories.map((inv) => (
                                <option key={inv.id} value={inv.id}>{inv.item_name}</option>
                            ))}
                        </select>
                        <InputError message={errors.inventory_id} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="edit_staff_id" value="Karyawan" />
                        <select
                            id="edit_staff_id"
                            value={data.staff_id}
                            onChange={(e) => setData('staff_id', e.target.value)}
                            className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                        >
                            {staffs.map((s) => (
                                <option key={s.id} value={s.id}>{s.name}</option>
                            ))}
                        </select>
                        <InputError message={errors.staff_id} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="edit_quantity" value="Jumlah" />
                        <TextInput
                            id="edit_quantity"
                            type="number"
                            value={data.quantity}
                            onChange={(e) => setData('quantity', parseInt(e.target.value))}
                            className="mt-1 block w-full"
                        />
                        <InputError message={errors.quantity} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="edit_status" value="Status" />
                        <select
                            id="edit_status"
                            value={data.status}
                            onChange={(e) => setData('status', e.target.value)}
                            className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                        >
                            <option value="Borrowed">Dipinjam</option>
                            <option value="Returned">Dikembalikan</option>
                        </select>
                        <InputError message={errors.status} className="mt-2" />
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
                <form onSubmit={deleteInventoryOut} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Hapus Penarikan Barang
                    </h2>

                    <p className="mt-1 text-sm text-gray-600">
                        Apakah Anda yakin ingin menghapus catatan penarikan ini?
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
