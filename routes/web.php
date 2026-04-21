<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

use App\Http\Controllers\StaffController;

Route::get('/karyawan-data', [StaffController::class, 'index'])->middleware(['auth', 'verified'])->name('karyawan-data');
Route::post('/karyawan-data', [StaffController::class, 'store'])->middleware(['auth', 'verified'])->name('karyawan.store');
Route::patch('/karyawan-data/{staff}', [StaffController::class, 'update'])->middleware(['auth', 'verified'])->name('karyawan.update');
Route::delete('/karyawan-data/{staff}', [StaffController::class, 'destroy'])->middleware(['auth', 'verified'])->name('karyawan.destroy');

use App\Http\Controllers\PenanggungJawabController;

Route::get('/karyawan-penjab', [PenanggungJawabController::class, 'index'])->middleware(['auth', 'verified'])->name('karyawan-penjab');
Route::post('/karyawan-penjab', [PenanggungJawabController::class, 'store'])->middleware(['auth', 'verified'])->name('karyawan-penjab.store');

use App\Http\Controllers\InventoryController;

Route::get('/inventory-data', [InventoryController::class, 'index'])->middleware(['auth', 'verified'])->name('inventory-data');
Route::post('/inventory-data', [InventoryController::class, 'store'])->middleware(['auth', 'verified'])->name('inventory.store');
Route::patch('/inventory-data/{inventory}', [InventoryController::class, 'update'])->middleware(['auth', 'verified'])->name('inventory.update');
Route::delete('/inventory-data/{inventory}', [InventoryController::class, 'destroy'])->middleware(['auth', 'verified'])->name('inventory.destroy');

use App\Http\Controllers\InventoryOutController;

Route::get('/inventory-out', [InventoryOutController::class, 'index'])->middleware(['auth', 'verified'])->name('inventory-out');
Route::get('/inventory-recall', [InventoryOutController::class, 'recallIndex'])->middleware(['auth', 'verified'])->name('inventory-recall');
Route::post('/inventory-out', [InventoryOutController::class, 'store'])->middleware(['auth', 'verified'])->name('inventory-out.store');
Route::patch('/inventory-out/{inventoryOut}', [InventoryOutController::class, 'update'])->middleware(['auth', 'verified'])->name('inventory-out.update');
Route::delete('/inventory-out/{inventoryOut}', [InventoryOutController::class, 'destroy'])->middleware(['auth', 'verified'])->name('inventory-out.destroy');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
