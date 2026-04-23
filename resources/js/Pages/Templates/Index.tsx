import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import Modal from '@/Components/Modal';
import { useState, FormEventHandler } from 'react';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import SecondaryButton from '@/Components/SecondaryButton';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Templates({ templates }: { templates: any[] }) {
    const [confirmingAddition, setConfirmingAddition] = useState(false);
    const [confirmingDeletion, setConfirmingDeletion] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState<any>(null);

    const { data, setData, post, processing, errors, reset, delete: destroy } = useForm({
        name: '',
        file: null as File | null,
        description: '',
    });

    const uploadTemplate: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('templates.store'), {
            onSuccess: () => {
                setConfirmingAddition(false);
                reset();
            },
            forceFormData: true,
        });
    };

    const deleteTemplate: FormEventHandler = (e) => {
        e.preventDefault();
        destroy(route('templates.destroy', selectedTemplate.id), {
            onSuccess: () => {
                setConfirmingDeletion(false);
                setSelectedTemplate(null);
            },
        });
    };

    const openDeleteModal = (template: any) => {
        setSelectedTemplate(template);
        setConfirmingDeletion(true);
    };

    const closeModal = () => {
        setConfirmingAddition(false);
        setConfirmingDeletion(false);
        reset();
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Manage Templates
                </h2>
            }
        >
            <Head title="Templates" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-medium text-gray-900">Daftar Tamplate File</h3>
                                <button
                                    onClick={() => setConfirmingAddition(true)}
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium shadow-sm"
                                >
                                    Upload Tamplate Baru
                                </button>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">No</th>
                                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">Nama Tamplate</th>
                                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">Deskripsi</th>
                                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">File</th>
                                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                                        {templates.map((template, index) => (
                                            <tr key={template.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4">{index + 1}</td>
                                                <td className="px-6 py-4 font-medium text-gray-900">{template.name}</td>
                                                <td className="px-6 py-4 text-xs">{template.description || '-'}</td>
                                                <td className="px-6 py-4">
                                                    <a 
                                                        href={`/storage/${template.file_path}`} 
                                                        target="_blank" 
                                                        className="text-indigo-600 hover:underline flex items-center gap-1"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                                        </svg>
                                                        Download
                                                    </a>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <button 
                                                        onClick={() => openDeleteModal(template)}
                                                        className="text-red-500 hover:text-red-700 transition-colors"
                                                    >
                                                        Hapus
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                        {templates.length === 0 && (
                                            <tr>
                                                <td colSpan={5} className="px-6 py-10 text-center text-gray-500">
                                                    Belum ada tamplate yang tersedia.
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
                <form onSubmit={uploadTemplate} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Upload Tamplate File
                    </h2>

                    <div className="mt-4">
                        <InputLabel htmlFor="name" value="Nama Tamplate" />
                        <TextInput
                            id="name"
                            type="text"
                            className="mt-1 block w-full"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            required
                            isFocused
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="description" value="Deskripsi (Opsional)" />
                        <textarea
                            id="description"
                            className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            rows={3}
                        />
                        <InputError message={errors.description} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="file" value="Pilih File" />
                        <input
                            id="file"
                            type="file"
                            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                            onChange={(e) => setData('file', e.target.files?.[0] || null)}
                            required
                        />
                        <InputError message={errors.file} className="mt-2" />
                    </div>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>Batal</SecondaryButton>
                        <PrimaryButton className="ms-3" disabled={processing}>
                            Upload
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>

            {/* Delete Modal */}
            <Modal show={confirmingDeletion} onClose={closeModal}>
                <form onSubmit={deleteTemplate} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Hapus Tamplate
                    </h2>

                    <p className="mt-1 text-sm text-gray-600">
                        Apakah Anda yakin ingin menghapus tamplate "{selectedTemplate?.name}"? Tindakan ini tidak dapat dibatalkan.
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
