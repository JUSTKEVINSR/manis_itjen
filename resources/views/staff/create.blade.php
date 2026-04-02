<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Add New Staff') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 text-gray-900">
                    <form method="POST" action="{{ route('staff.store') }}" class="max-w-xl">
                        @csrf

                        <!-- Name -->
                        <div>
                            <x-input-label for="name" :value="__('Name')" />
                            <x-text-input id="name" class="block mt-1 w-full" type="text" name="name" :value="old('name')" required autofocus autocomplete="name" />
                            <x-input-error :messages="$errors->get('name')" class="mt-2" />
                        </div>

                        <!-- NIK -->
                        <div class="mt-4">
                            <x-input-label for="nik" :value="__('NIK (Employee ID)')" />
                            <x-text-input id="nik" class="block mt-1 w-full" type="text" name="nik" :value="old('nik')" required autocomplete="off" />
                            <x-input-error :messages="$errors->get('nik')" class="mt-2" />
                        </div>

                        <!-- Jabatan -->
                        <div class="mt-4">
                            <x-input-label for="jabatan" :value="__('Jabatan (Position)')" />
                            <x-text-input id="jabatan" class="block mt-1 w-full" type="text" name="jabatan" :value="old('jabatan')" required autocomplete="off" />
                            <x-input-error :messages="$errors->get('jabatan')" class="mt-2" />
                        </div>

                        <!-- Departemen -->
                        <div class="mt-4">
                            <x-input-label for="departemen" :value="__('Departemen (Department)')" />
                            <x-text-input id="departemen" class="block mt-1 w-full" type="text" name="departemen" :value="old('departemen')" required autocomplete="off" />
                            <x-input-error :messages="$errors->get('departemen')" class="mt-2" />
                        </div>

                        <!-- Phone -->
                        <div class="mt-4">
                            <x-input-label for="phone" :value="__('Phone Number')" />
                            <x-text-input id="phone" class="block mt-1 w-full" type="text" name="phone" :value="old('phone')" autocomplete="tel" />
                            <x-input-error :messages="$errors->get('phone')" class="mt-2" />
                        </div>

                        <div class="flex items-center justify-end mt-4">
                            <a class="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" href="{{ route('staff.index') }}">
                                {{ __('Cancel') }}
                            </a>

                            <x-primary-button class="ms-4">
                                {{ __('Save') }}
                            </x-primary-button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</x-app-layout>
