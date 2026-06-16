# -*- coding: utf-8 -*-
"""把"科普报告"(id 46) 从通知公告移到科普文章；生成 kepu.ts / keyan.ts，并重写 announcements.ts。"""
import re, os, json

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA = os.path.join(ROOT, 'src', 'data')

ARTICLE_TYPE = """export interface Article {
  id: number;
  title: string;
  date: string;
  author: string;
  type: string;
  content: string;
}"""

def load_array(fn):
    txt = open(os.path.join(DATA, fn), encoding='utf-8').read()
    m = re.search(r'=\s*(\[.*\])\s*;\s*$', txt, re.S)
    return json.loads(m.group(1))

def write_ts(fn, varname, items):
    with open(os.path.join(DATA, fn), 'w', encoding='utf-8') as f:
        f.write(ARTICLE_TYPE + '\n\n')
        f.write('export const %s: Article[] = ' % varname)
        f.write(json.dumps(items, ensure_ascii=False, indent=2))
        f.write(';\n')

anns = load_array('announcements.ts')
kepu = [a for a in anns if a['id'] == 46]
rest = [a for a in anns if a['id'] != 46]
for a in kepu:
    a['type'] = '科普文章'

write_ts('announcements.ts', 'announcements', rest)
write_ts('kepu.ts', 'kepu', kepu)
write_ts('keyan.ts', 'keyan', [])

print('announcements: %d 条（移出科普报告后）' % len(rest))
print('kepu(科普文章): %d 条' % len(kepu), '->', [a['title'][:30] for a in kepu])
print('keyan(科研动态): 0 条（空，待填）')
