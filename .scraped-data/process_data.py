# -*- coding: utf-8 -*-
"""下载文章内嵌资源 + 重写为本地路径 + 解析日期 + 生成 TS 静态数据文件。"""
import json, re, os, ssl, urllib.request, urllib.parse, datetime, html

ctx = ssl.create_default_context(); ctx.check_hostname = False; ctx.verify_mode = ssl.CERT_NONE
BASE = "http://www.szmath.com"
UA = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)                       # szmath-portal/
ART_DIR = os.path.join(ROOT, 'public', 'article-assets')
DATA_DIR = os.path.join(ROOT, 'src', 'data')
os.makedirs(ART_DIR, exist_ok=True); os.makedirs(DATA_DIR, exist_ok=True)

def parse_date(v):
    m = re.search(r'/Date\((\d+)', str(v))
    if not m:
        return ''
    ts = int(m.group(1)) / 1000
    # 统一按北京时间 UTC+8 显示
    dt = datetime.datetime.utcfromtimestamp(ts) + datetime.timedelta(hours=8)
    return dt.strftime('%Y-%m-%d')

_dl_cache = {}
def download_asset(url_path):
    """下载单个资源到 public/article-assets/，返回本地路径 /article-assets/<name>。"""
    raw = url_path.replace(chr(92), '/').strip()
    # 绝对 szmath.com URL -> 取 path
    m = re.match(r'https?://www\.szmath\.com(/.*)', raw, re.I)
    if m:
        raw = m.group(1)
    if raw.startswith('http'):
        return None  # 外部图片(非本站)，跳过重写
    if not raw.startswith('/'):
        raw = '/' + raw
    if raw in _dl_cache:
        return _dl_cache[raw]
    # 扁平化文件名（原名已是唯一 hash），ueditor 图标加前缀避免重名
    base = os.path.basename(raw)
    if '/ueditor/' in raw or '/themes/' in raw:
        base = 'ueicon_' + base
    local = '/article-assets/' + base
    outpath = os.path.join(ART_DIR, base)
    if not os.path.exists(outpath):
        url = BASE + urllib.parse.quote(raw, safe='/')
        try:
            req = urllib.request.Request(url, headers=UA)
            with urllib.request.urlopen(req, timeout=45, context=ctx) as r:
                open(outpath, 'wb').write(r.read())
            print("  OK  %s" % base)
        except Exception as e:
            print("  ERR %s -> %s" % (base, e))
            _dl_cache[raw] = None
            return None
    _dl_cache[raw] = local
    return local

def rewrite_content(content):
    if not content:
        return ''
    def repl(m):
        attr, q, url = m.group(1), m.group(2), m.group(3)
        if re.search(r'/ueditorUpload/|/uploadfile/|/Resources/|/Storage/|szmath\.com/Scripts/ueditor', url, re.I):
            local = download_asset(url)
            if local:
                return '%s=%s%s%s' % (attr, q, local, q)
        return m.group(0)
    return re.sub(r'(href|src)=(["\'])([^"\']+)\2', repl, content)

def gen_articles(name, out_name):
    rows = json.load(open(os.path.join(HERE, name + '.json'), encoding='utf-8'))
    items = []
    print("处理 %s (%d 条) 的内嵌资源..." % (name, len(rows)))
    for r in rows:
        items.append({
            'id': r['Id'],
            'title': r['Title'],
            'date': parse_date(r.get('ReleaseTime')),
            'author': (r.get('Author') or '深圳市数学学会').strip(),
            'type': r.get('ArticleTypeDisplay') or '',
            'content': rewrite_content(r.get('Content', '') or ''),
        })
    items.sort(key=lambda x: (x['date'], x['id']), reverse=True)
    return items

def write_ts(filename, varname, type_decl, items):
    out = os.path.join(DATA_DIR, filename)
    with open(out, 'w', encoding='utf-8') as f:
        f.write(type_decl + '\n\n')
        f.write('export const %s: %s[] = ' % (varname, type_decl.split()[2]))
        f.write(json.dumps(items, ensure_ascii=False, indent=2))
        f.write(';\n')
    print("写入 %s (%d 条)" % (filename, len(items)))

ARTICLE_TYPE = """export interface Article {
  id: number;
  title: string;
  date: string;
  author: string;
  type: string;
  content: string;
}"""

announcements = gen_articles('announcements', 'announcements')
press = gen_articles('press', 'press')
write_ts('announcements.ts', 'announcements', ARTICLE_TYPE, announcements)
write_ts('press.ts', 'press', ARTICLE_TYPE.replace('Article', 'Article'), press)

# downloads
dls = json.load(open(os.path.join(HERE, 'downloads.json'), encoding='utf-8'))
dl_items = []
for r in dls:
    fname = os.path.basename(r['Url'].replace(chr(92), '/'))
    dl_items.append({
        'id': r['Id'],
        'title': r['Title'],
        'file': '/downloads/' + fname,
        'uploader': (r.get('Uploader') or '深圳市数学学会').strip(),
        'date': parse_date(r.get('UploadTime')),
        'type': r.get('ResourceTypeDisplay') or '历年真题',
    })
dl_items.sort(key=lambda x: (x['date'], x['id']), reverse=True)
DL_TYPE = """export interface ResourceItem {
  id: number;
  title: string;
  file: string;
  uploader: string;
  date: string;
  type: string;
}"""
write_ts('downloads.ts', 'downloads', DL_TYPE, dl_items)
print("\n完成。文章资源目录：", ART_DIR)
