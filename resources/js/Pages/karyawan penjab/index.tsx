import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import { FormEventHandler, useEffect } from 'react';

interface Staff {
    id: number;
    name: string;
    nik: string;
    jabatan: string;
    pangkat: string;
}

interface PenanggungJawab {
    id: number;
    staff_id: number;
    position: number;
}

interface Props {
    staffs: Staff[];
    currentPenjab: { [key: string]: PenanggungJawab };
}

export default function KaryawanPenjab({ staffs, currentPenjab }: Props) {
    const { data, setData, post, processing, recentlySuccessful } = useForm({
        staff1: '',
        staff2: '',
    });

    useEffect(() => {
        if (currentPenjab[1]) {
            setData('staff1', currentPenjab[1].staff_id.toString());
        }
        if (currentPenjab[2]) {
            setData('staff2', currentPenjab[2].staff_id.toString());
        }
    }, [currentPenjab]);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('karyawan-penjab.store'));
    };

    const renderStaffDetail = (selectedId: string) => {
        const staff = staffs.find(s => s.id.toString() === selectedId);
        if (!staff) return null;

        return (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Detail Penanggung Jawab</h3>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-sm text-gray-500">Nama</p>
                        <p className="font-medium">{staff.name}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">NIP</p>
                        <p className="font-medium">{staff.nik}</p>
                    </div>
                    <div className="col-span-2">
                        <p className="text-sm text-gray-500">Jabatan</p>
                        <p className="font-medium">{staff.jabatan}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Pangkat</p>
                        <p className="font-medium">{staff.pangkat}</p>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Data Karyawan Penanggung Jawab
                </h2>
            }
        >
            <Head title="Data Karyawan Penanggung Jawab" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form onSubmit={submit}>
                                <div className="flex flex-wrap gap-6 mb-6">
                                    <div className="flex-1 min-w-[300px]">
                                        <InputLabel htmlFor="staff_select_1" value="Karyawan Penanggung Jawab 1" />
                                        <select
                                            id="staff_select_1"
                                            className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                            value={data.staff1}
                                            onChange={(e) => setData('staff1', e.target.value)}
                                        >
                                            <option value="">Pilih Karyawan 1...</option>
                                            {staffs.map((staff) => (
                                                <option key={staff.id} value={staff.id}>
                                                    {staff.name} - {staff.nik}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="flex-1 min-w-[300px]">
                                        <InputLabel htmlFor="staff_select_2" value="Karyawan Penanggung Jawab 2" />
                                        <select
                                            id="staff_select_2"
                                            className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                            value={data.staff2}
                                            onChange={(e) => setData('staff2', e.target.value)}
                                        >
                                            <option value="">Pilih Karyawan 2...</option>
                                            {staffs.map((staff) => (
                                                <option key={staff.id} value={staff.id}>
                                                    {staff.name} - {staff.nik}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="flex items-end gap-2">
                                        <button
                                            type="submit"
                                            className="px-6 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors shadow-sm disabled:opacity-50"
                                            disabled={processing}
                                        >
                                            {processing ? 'Saving...' : 'Save Penanggung Jawab'}
                                        </button>
                                        {recentlySuccessful && (
                                            <span className="text-sm text-green-600 self-center">Saved!</span>
                                        )}
                                    </div>
                                </div>
                            </form>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    {data.staff1 && renderStaffDetail(data.staff1)}
                                </div>
                                <div>
                                    {data.staff2 && renderStaffDetail(data.staff2)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
