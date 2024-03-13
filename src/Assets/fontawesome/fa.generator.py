import re
from itertools import chain
from os.path import isfile, join
from os import path, listdir, rename

all_icon_names = []

cur_path = path.dirname(path.realpath(__file__))

svg_path = f'{cur_path}/svg'

svg_files = [f for f in listdir(svg_path) if isfile(join(svg_path, f))]

for file in svg_files:
    # Read file content
    svg_file = open(f'{svg_path}/{file}', "r+")
    content = svg_file.read()
    content = re.sub(f'id="({file[0]}-)*', f'id="{file[0]}-', content)
    svg_file.close()
    # Write new content
    svg_file = open(f'{svg_path}/{file}', "w")
    svg_file.write(content)
    svg_file.close()

for file in svg_files:
    svg_file = open(f'{svg_path}/{file}', "r")
    content = svg_file.read()
    svg_file.close()
    icon_names = re.findall('symbol id="(.*?)"', content)
    all_icon_names = chain.from_iterable([all_icon_names, icon_names])
    if not file.endswith('.fa.svg'):
        rename(f'{svg_path}/{file}',
               f'{svg_path}/{file.replace(".svg","")}.fa.svg')

all_icon_names = list(map(lambda n: f"'{n}'", all_icon_names))

ts_file = open(f'{cur_path}/fa.names.ts', 'w')
ts_file.write('export type IconNames = ' + ("|".join(all_icon_names)))
ts_file.close()

svg_bundle = open(f'{cur_path}/fa.bundle.svg', 'w')
svg_bundle.write(
    '<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns="http://www.w3.org/2000/svg" style="display: none;"></svg>')
svg_bundle.close()
