import re

with open('resources/js/Pages/karyawan data/index.tsx', 'r') as f:
    content = f.read()

# Fix pangkat_cpns_pns_pns
content = content.replace('pangkat_cpns_pns_pns', 'pangkat_cpns_pns')

# Fix diklat_fungsional onChange
content = re.sub(
    r'<TextInput id="diklat_fungsional" type="text" name="diklat_fungsional" value=\{data\.diklat_fungsional\} onChange=\{\(e\) => setData\(\'diklat_struktural\', e\.target\.value\)\} className="mt-1 block w-full" placeholder="Diklat Fungsional" />',
    r'<TextInput id="diklat_fungsional" type="text" name="diklat_fungsional" value={data.diklat_fungsional} onChange={(e) => setData(\'diklat_fungsional\', e.target.value)} className="mt-1 block w-full" placeholder="Diklat Fungsional" />',
    content
)

with open('resources/js/Pages/karyawan data/index.tsx', 'w') as f:
    f.write(content)
