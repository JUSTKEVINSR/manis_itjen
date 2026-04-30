import re

with open('resources/js/Pages/karyawan data/index.tsx', 'r') as f:
    content = f.read()

# Fix pangkat_cpns_pns_pns
content = content.replace('pangkat_cpns_pns_pns', 'pangkat_cpns_pns')

# Fix diklat_struktural in diklat_fungsional onChange
content = content.replace("onChange={(e) => setData('diklat_struktural', e.target.value)}", "onChange={(e) => setData('diklat_fungsional', e.target.value)}")
# Wait, I might replace the valid one too!
# Let's be more specific.
