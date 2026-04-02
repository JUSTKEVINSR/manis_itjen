<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Edit Inventory Out Record') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 text-gray-900">

                     @if ($errors->any())
                        <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                            <ul>
                                @foreach ($errors->all() as $error)
                                    <li>{{ $error }}</li>
                                @endforeach
                            </ul>
                        </div>
                    @endif

                    <form method="POST" action="{{ route('inventory-out.update', $inventoryOut->id) }}" class="max-w-xl">
                        @csrf
                        @method('PUT')

                        <!-- Inventory Item -->
                        <div>
                            <x-input-label for="inventory_id" :value="__('Inventory Item')" />
                            <select id="inventory_id" name="inventory_id" required class="block mt-1 w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm">
                                <option value="" disabled>-- Select an Item --</option>
                                @foreach ($inventories as $inv)
                                    <option value="{{ $inv->id }}" @selected(old('inventory_id', $inventoryOut->inventory_id) == $inv->id)>
                                        {{ $inv->item_name }} (Code: {{ $inv->item_code }})
                                    </option>
                                @endforeach
                            </select>
                            <x-input-error :messages="$errors->get('inventory_id')" class="mt-2" />
                        </div>

                        <!-- Staff Member (Nullable) -->
                        <div class="mt-4">
                            <x-input-label for="staff_id" :value="__('Taken by (Staff)')" />
                            <select id="staff_id" name="staff_id" class="block mt-1 w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm">
                                <option value="">-- None / Standard Use --</option>
                                @foreach ($staffs as $st)
                                    <option value="{{ $st->id }}" @selected(old('staff_id', $inventoryOut->staff_id) == $st->id)>
                                        {{ $st->name }} ({{ $st->jabatan }})
                                    </option>
                                @endforeach
                            </select>
                            <x-input-error :messages="$errors->get('staff_id')" class="mt-2" />
                        </div>

                        <!-- Quantity -->
                        <div class="mt-4">
                            <x-input-label for="quantity" :value="__('Quantity Distributed/Out')" />
                            <x-text-input id="quantity" class="block mt-1 w-full" type="number" name="quantity" :value="old('quantity', $inventoryOut->quantity)" min="1" required autocomplete="off" />
                            <span class="text-xs text-gray-500 mt-1 block">Updating this quantity handles standard inventory refunding automatically.</span>
                            <x-input-error :messages="$errors->get('quantity')" class="mt-2" />
                        </div>

                        <!-- Date Out -->
                        <div class="mt-4">
                            <x-input-label for="date_out" :value="__('Date Out')" />
                            <x-text-input id="date_out" class="block mt-1 w-full" type="date" name="date_out" :value="old('date_out', $inventoryOut->date_out)" required />
                            <x-input-error :messages="$errors->get('date_out')" class="mt-2" />
                        </div>

                        <!-- Notes -->
                        <div class="mt-4">
                            <x-input-label for="notes" :value="__('Notes/Reason')" />
                            <textarea id="notes" name="notes" class="block mt-1 w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm" rows="3">{{ old('notes', $inventoryOut->notes) }}</textarea>
                            <x-input-error :messages="$errors->get('notes')" class="mt-2" />
                        </div>

                        <div class="flex items-center justify-end mt-4">
                            <a class="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" href="{{ route('inventory-out.index') }}">
                                {{ __('Cancel') }}
                            </a>

                            <x-primary-button class="ms-4">
                                {{ __('Update Record') }}
                            </x-primary-button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</x-app-layout>
