<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Using raw SQL for MySQL column reordering as it's more reliable than multiple change() calls
        DB::statement("ALTER TABLE staff MODIFY COLUMN nik VARCHAR(255) AFTER id");
        DB::statement("ALTER TABLE staff MODIFY COLUMN name VARCHAR(255) AFTER nik");
        DB::statement("ALTER TABLE staff MODIFY COLUMN tempat_lahir VARCHAR(255) NULL AFTER name");
        DB::statement("ALTER TABLE staff MODIFY COLUMN tanggal_lahir DATE NULL AFTER tempat_lahir");
        DB::statement("ALTER TABLE staff MODIFY COLUMN usia VARCHAR(50) NULL AFTER tanggal_lahir");
        DB::statement("ALTER TABLE staff MODIFY COLUMN pangkat VARCHAR(255) NULL AFTER usia");
        DB::statement("ALTER TABLE staff MODIFY COLUMN tmt_pangkat DATE NULL AFTER pangkat");
        DB::statement("ALTER TABLE staff MODIFY COLUMN jabatan VARCHAR(255) NULL AFTER tmt_pangkat");
        DB::statement("ALTER TABLE staff MODIFY COLUMN tmt_jabatan DATE NULL AFTER jabatan");
        DB::statement("ALTER TABLE staff MODIFY COLUMN eselon VARCHAR(255) NULL AFTER tmt_jabatan");
        DB::statement("ALTER TABLE staff MODIFY COLUMN pangkat_cpns_pns VARCHAR(255) NULL AFTER eselon");
        DB::statement("ALTER TABLE staff MODIFY COLUMN tmt_cpns DATE NULL AFTER pangkat_cpns_pns");
        DB::statement("ALTER TABLE staff MODIFY COLUMN tmt_pns DATE NULL AFTER tmt_cpns");
        DB::statement("ALTER TABLE staff MODIFY COLUMN gaji_pokok VARCHAR(255) NULL AFTER tmt_pns");
        DB::statement("ALTER TABLE staff MODIFY COLUMN tmt_gaji DATE NULL AFTER gaji_pokok");
        DB::statement("ALTER TABLE staff MODIFY COLUMN tingkat_pendidikan VARCHAR(255) NULL AFTER tmt_gaji");
        DB::statement("ALTER TABLE staff MODIFY COLUMN pendidikan_umum VARCHAR(255) NULL AFTER tingkat_pendidikan");
        DB::statement("ALTER TABLE staff MODIFY COLUMN diklat_struktural VARCHAR(255) NULL AFTER pendidikan_umum");
        DB::statement("ALTER TABLE staff MODIFY COLUMN diklat_fungsional VARCHAR(255) NULL AFTER diklat_struktural");
        DB::statement("ALTER TABLE staff MODIFY COLUMN jenis_kelamin VARCHAR(50) NULL AFTER diklat_fungsional");
        DB::statement("ALTER TABLE staff MODIFY COLUMN peringkat VARCHAR(255) NULL AFTER jenis_kelamin");
        DB::statement("ALTER TABLE staff MODIFY COLUMN nip_lama VARCHAR(255) NULL AFTER peringkat");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Reordering back is usually not strictly necessary for "down", 
        // but we could implement it if needed.
    }
};
