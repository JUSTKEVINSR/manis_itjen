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

use App\Http\Controllers\InventoryItemController;
use App\Http\Controllers\InventoryKendaraanController;

Route::get('/inventory-item-data', [InventoryItemController::class, 'index'])->middleware(['auth', 'verified'])->name('inventory-item-data');
Route::post('/inventory-item-data', [InventoryItemController::class, 'store'])->middleware(['auth', 'verified'])->name('inventory-item.store');
Route::patch('/inventory-item-data/{inventory}', [InventoryItemController::class, 'update'])->middleware(['auth', 'verified'])->name('inventory-item.update');
Route::delete('/inventory-item-data/{inventory}', [InventoryItemController::class, 'destroy'])->middleware(['auth', 'verified'])->name('inventory-item.destroy');

Route::get('/inventory-kendaraan-data', [InventoryKendaraanController::class, 'index'])->middleware(['auth', 'verified'])->name('inventory-kendaraan-data');
Route::post('/inventory-kendaraan-data', [InventoryKendaraanController::class, 'store'])->middleware(['auth', 'verified'])->name('inventory-kendaraan.store');
Route::patch('/inventory-kendaraan-data/{inventory}', [InventoryKendaraanController::class, 'update'])->middleware(['auth', 'verified'])->name('inventory-kendaraan.update');
Route::delete('/inventory-kendaraan-data/{inventory}', [InventoryKendaraanController::class, 'destroy'])->middleware(['auth', 'verified'])->name('inventory-kendaraan.destroy');


use App\Http\Controllers\InventoryItemOutController;
use App\Http\Controllers\InventoryKendaraanOutController;
use App\Http\Controllers\InventoryRecallController;
use App\Http\Controllers\FileTrackingController;
use App\Http\Controllers\TemplateController;



Route::get('/inventory-item-out', [InventoryItemOutController::class, 'index'])->middleware(['auth', 'verified'])->name('inventory-item-out');
Route::post('/inventory-item-out', [InventoryItemOutController::class, 'store'])->middleware(['auth', 'verified'])->name('inventory-item-out.store');
Route::patch('/inventory-item-out/{inventoryItemOut}', [InventoryItemOutController::class, 'update'])->middleware(['auth', 'verified'])->name('inventory-item-out.update');
Route::delete('/inventory-item-out/{inventoryItemOut}', [InventoryItemOutController::class, 'destroy'])->middleware(['auth', 'verified'])->name('inventory-item-out.destroy');
Route::post('/inventory-item-out/{inventoryItemOut}/upload-surat', [InventoryItemOutController::class, 'uploadSurat'])->middleware(['auth', 'verified'])->name('inventory-item-out.upload-surat');

Route::get('/inventory-kendaraan-out', [InventoryKendaraanOutController::class, 'index'])->middleware(['auth', 'verified'])->name('inventory-kendaraan-out');
Route::post('/inventory-kendaraan-out', [InventoryKendaraanOutController::class, 'store'])->middleware(['auth', 'verified'])->name('inventory-kendaraan-out.store');
Route::patch('/inventory-kendaraan-out/{inventoryKendaraanOut}', [InventoryKendaraanOutController::class, 'update'])->middleware(['auth', 'verified'])->name('inventory-kendaraan-out.update');
Route::delete('/inventory-kendaraan-out/{inventoryKendaraanOut}', [InventoryKendaraanOutController::class, 'destroy'])->middleware(['auth', 'verified'])->name('inventory-kendaraan-out.destroy');
Route::post('/inventory-kendaraan-out/{inventoryKendaraanOut}/upload-surat', [InventoryKendaraanOutController::class, 'uploadSurat'])->middleware(['auth', 'verified'])->name('inventory-kendaraan-out.upload-surat');


Route::get('/inventory-recall', [InventoryRecallController::class, 'index'])->middleware(['auth', 'verified'])->name('inventory-recall');
Route::post('/inventory-recall', [InventoryRecallController::class, 'store'])->middleware(['auth', 'verified'])->name('inventory-recall.store');
Route::patch('/inventory-recall/{inventoryRecall}', [InventoryRecallController::class, 'update'])->middleware(['auth', 'verified'])->name('inventory-recall.update');
Route::delete('/inventory-recall/{inventoryRecall}', [InventoryRecallController::class, 'destroy'])->middleware(['auth', 'verified'])->name('inventory-recall.destroy');
Route::post('/inventory-recall/{inventoryRecall}/upload-surat', [InventoryRecallController::class, 'uploadSurat'])->middleware(['auth', 'verified'])->name('inventory-recall.upload-surat');


Route::get('/file-tracking', [FileTrackingController::class, 'index'])->middleware(['auth', 'verified'])->name('file-tracking');

Route::get('/templates', [TemplateController::class, 'index'])->middleware(['auth', 'verified'])->name('templates.index');
Route::post('/templates', [TemplateController::class, 'store'])->middleware(['auth', 'verified'])->name('templates.store');
Route::delete('/templates/{template}', [TemplateController::class, 'destroy'])->middleware(['auth', 'verified'])->name('templates.destroy');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
