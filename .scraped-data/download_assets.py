# -*- coding: utf-8 -*-
import urllib.request, urllib.parse, os, ssl, json

ctx = ssl.create_default_context(); ctx.check_hostname = False; ctx.verify_mode = ssl.CERT_NONE
BASE = "http://www.szmath.com"
UA = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))  # szmath-portal/

def dl(path, outdir, outname=None):
    p = path.replace(chr(92), '/')  # backslash -> slash
    if not p.startswith('http'):
        if not p.startswith('/'):
            p = '/' + p
        url = BASE + urllib.parse.quote(p, safe='/')
    else:
        url = p
    name = outname or os.path.basename(p)
    outpath = os.path.join(ROOT, outdir, name)
    os.makedirs(os.path.dirname(outpath), exist_ok=True)
    try:
        req = urllib.request.Request(url, headers=UA)
        with urllib.request.urlopen(req, timeout=45, context=ctx) as r:
            data = r.read()
        open(outpath, 'wb').write(data)
        print("OK  %8dB  %s" % (len(data), name))
        return name
    except Exception as e:
        print("ERR %s -> %s" % (url, e))
        return None

# logo + qr
dl('/Images/SZMS_logo.png', 'public/assets')
dl('/Images/qrcode_for_szms.jpg', 'public/assets')

# carousel images -> rename to carousel1..4
carousel = [
    chr(92).join(['', 'Resources', 'CarouselImages', '1516420648_1__副本.png']),
    chr(92).join(['', 'Resources', 'CarouselImages', '2012111413380521_副本.jpg']),
    chr(92).join(['', 'Resources', 'CarouselImages', '2012111413382032_副本.jpg']),
    chr(92).join(['', 'Resources', 'CarouselImages', '科普报告.png']),
]
for i, c in enumerate(carousel, 1):
    ext = os.path.splitext(c)[1]
    dl(c, 'public/assets', 'carousel%d%s' % (i, ext))

# PDFs from downloads.json -> keep original chinese filename
downloads = json.load(open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'downloads.json'), encoding='utf-8'))
for r in downloads:
    dl(r['Url'], 'public/downloads')
