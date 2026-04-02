<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Edit Inventory Item') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 text-gray-900">
                    <form method="POST" action="{{ route('inventory.update', $inventory->id) }}" class="max-w-xl">
                        @csrf
                        @method('PUT')

                        <!-- Item Name -->
                        <div>
                            <x-input-label for="item_name" :value="__('Item Name')" />
                            <x-text-input id="item_name" class="block mt-1 w-full" type="text" name="item_name" :value="old('item_name', $inventory->item_name)" required autofocus autocomplete="off" />
                            <x-input-error :messages="$errors->get('item_name')" class="mt-2" />
                        </div>

                        <!-- Item Code -->
                        <div class="mt-4">
                            <x-input-label for="item_code" :value="__('Item Code (SKU)')" />
                            <x-text-input id="item_code" class="block mt-1 w-full" type="text" name="item_code" :value="old('item_code', $inventory->item_code)" required autocomplete="off" />
                            <x-input-error :messages="$errors->get('item_code')" class="mt-2" />
                        </div>

                        <!-- Category -->
                        <div class="mt-4">
                            <x-input-label for="category" :value="__('Category')" />
                            <x-text-input id="category" class="block mt-1 w-full" type="text" name="category" :value="old('category', $inventory->category)" required autocomplete="off" />
                            <x-input-error :messages="$errors->get('category')" class="mt-2" />
                        </div>

                        <!-- Quantity -->
                        <div class="mt-4">
                            <x-input-label for="quantity" :value="__('Quantity')" />
                            <x-text-input id="quantity" class="block mt-1 w-full" type="number" name="quantity" :value="old('quantity', $inventory->quantity)" min="0" required />
                            <x-input-error :messages="$errors->get('quantity')" class="mt-2" />
                        </div>

                        <!-- Location -->
                        <div class="mt-4">
                            <x-input-label for="location" :value="__('Location (Storage Room, Desk, etc.)')" />
                            <x-text-input id="location" class="block mt-1 w-full" type="text" name="location" :value="old('location', $inventory->location)" autocomplete="off" />
                            <x-input-error :messages="$errors->get('location')" class="mt-2" />
                        </div>

                        <!-- Condition -->
                        <div class="mt-4">
                            <x-input-label for="condition" :value="__('Condition')" />
                            <select id="condition" name="condition" class="block mt-1 w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm">
                                <option value="Good" @selected(old('condition', $inventory->condition) == 'Good')>Good</option>
                                <option value="Fair" @selected(old('condition', $inventory->condition) == 'Fair')>Fair</option>
                                <option value="Poor" @selected(old('condition', $inventory->condition) == 'Poor')>Poor</option>
                                <option value="Broken" @selected(old('condition', $inventory->condition) == 'Broken')>Broken</option>
                            </select>
                            <x-input-error :messages="$errors->get('condition')" class="mt-2" />
                        </div>

                        <div class="flex items-center justify-end mt-4">
                            <a class="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" href="{{ route('inventory.index') }}">
                                {{ __('Cancel') }}
                            </a>

                            <x-primary-button class="ms-4">
                                {{ __('Update') }}
                            </x-primary-button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</x-app-layout>
