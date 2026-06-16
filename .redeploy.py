# -*- coding: utf-8 -*-
import os, sys, time, paramiko
H, U, P = os.environ['SH_HOST'], os.environ['SH_USER'], os.environ['SH_PASS']
TAR = os.environ['SH_TAR']; DEST = os.environ['SH_DEST']
size = os.path.getsize(TAR)
def connect():
    c = paramiko.SSHClient(); c.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    c.connect(H,22,U,P,timeout=20,banner_timeout=20,auth_timeout=20); return c
def run(c,cmd,l=None):
    _,o,e=c.exec_command(cmd,timeout=120); out=(o.read()+e.read()).decode('utf-8','replace').strip()
    if l: print(f'--- {l} ---\n{out}')
    return out
def upload(c):
    ch=c.get_transport().open_session(); ch.settimeout(180); ch.exec_command('cat > /tmp/d.tar.gz')
    with open(TAR,'rb') as f:
        while True:
            b=f.read(32768)
            if not b: break
            while not ch.send_ready(): time.sleep(0.01)
            n=0
            while n<len(b): n+=ch.send(b[n:])
    ch.shutdown_write(); ch.recv_exit_status(); ch.close()
    return int(run(c,'stat -c %s /tmp/d.tar.gz 2>/dev/null||echo 0') or 0)==size
ok=False
for a in range(1,4):
    try:
        c=connect(); print(f'[尝试{a}] 上传 {size}B…')
        if upload(c): ok=True; break
        c.close()
    except Exception as ex: print(f'[尝试{a}] {type(ex).__name__}: {ex}'); time.sleep(2)
if not ok: print('!! 上传失败'); sys.exit(1)
run(c, f'rm -rf {DEST}/* && tar xzf /tmp/d.tar.gz -C {DEST} && chown -R root:root {DEST} && chmod -R a+rX {DEST} && rm -f /tmp/d.tar.gz', '替换 '+DEST)
print('文件数:', run(c, f'find {DEST} -type f|wc -l'))
print('新 js:', run(c, f"grep -oE 'assets/index-[A-Za-z0-9_]+\\.js' {DEST}/index.html|head -1"))
print('IP首页 HTTP:', run(c, f"curl -s -o /dev/null -w '%{{http_code}}' -H 'Host: {H}' http://127.0.0.1/"))
c.close(); print('✓ 完成')
