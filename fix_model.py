import re

with open('app/Models/Staff.php', 'r') as f:
    content = f.read()

old_fillable = "protected $fillable = ['name', 'nik', 'jabatan', 'departemen', 'phone', 'pangkat'];"
new_fillable = """protected $fillable = [
        'name', 'nik', 'jabatan', 'departemen', 'phone', 'pangkat',
        'tempat_lahir', 'tanggal_lahir', 'usia', 'tmt_pangkat',
        'tmt_jabatan', 'eselon', 'pangkat_cpns_pns', 'tmt_cpns', 'tmt_pns',
        'gaji_pokok', 'tmt_gaji', 'tingkat_pendidikan', 'pendidikan_umum',
        'diklat_struktural', 'diklat_fungsional', 'jenis_kelamin', 'peringkat', 'nip_lama'
    ];"""

content = content.replace(old_fillable, new_fillable)

with open('app/Models/Staff.php', 'w') as f:
    f.write(content)
