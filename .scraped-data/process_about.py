# -*- coding: utf-8 -*-
"""从 about.html / contact.html 提取干净正文，生成 src/data/about.ts。"""
import re, os, json

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
PAGES = os.path.join(os.path.dirname(ROOT), 'math', '.tmp-szmath', 'pages')
DATA_DIR = os.path.join(ROOT, 'src', 'data')

def body_text_lines(fn):
    html = open(os.path.join(PAGES, fn), encoding='utf-8').read()
    m = re.search(r'<div class="container body-content"[^>]*>(.*?)(<footer|<div id="footer)', html, re.S)
    seg = m.group(1) if m else html
    seg = re.sub(r'<script.*?</script>', '', seg, flags=re.S)
    seg = re.sub(r'<style.*?</style>', '', seg, flags=re.S)
    # 把块级标签转成换行
    seg = re.sub(r'<(p|div|h[1-6]|br|li|tr)[^>]*>', '\n', seg, flags=re.I)
    seg = re.sub(r'<[^>]+>', '', seg)
    seg = seg.replace('&nbsp;', ' ')
    seg = re.sub(r'&[a-zA-Z]+;', ' ', seg)
    lines = []
    for l in seg.splitlines():
        l = re.sub(r'\s+', ' ', l).strip()
        if not l:
            continue
        # 过滤 CSS 噪声：含 { } 或 以 ; 结尾 或 css 属性行
        if '{' in l or '}' in l or l.endswith(';') or l.endswith(':'):
            continue
        if re.match(r'^[\.#@\-a-zA-Z][\w\-\s,>:#.()]*$', l) and not re.search(r'[一-鿿]', l):
            continue  # 纯英文/CSS 选择器行（无中文）
        lines.append(l)
    return lines

# 导航项也会混进来，去掉
NAV = {'主页','学会简介','通知公告','新闻中心','资源下载','竞赛报名','打印准考证','成绩查询','联系我们','注册','登录'}

lines = [l for l in body_text_lines('about.html') if l not in NAV]
# 第一个"学会简介"作为标题，之后是正文
# 构建 HTML：识别 标题 / 章 / 条
html_parts = []
for l in lines:
    if l == '学会简介':
        continue  # 页面已有大标题
    if l == '深圳市数学学会章程':
        html_parts.append('<h2 class="sec-title">深圳市数学学会章程</h2>')
    elif re.match(r'^第[一二三四五六七八九十百]+章', l):
        html_parts.append('<h3 class="chap-title">%s</h3>' % l)
    else:
        html_parts.append('<p>%s</p>' % l)
about_html = '\n'.join(html_parts)

# 提取简介首段（用于首页/SEO 摘要）
intro = next((l for l in lines if l.startswith('深圳市数学学会成立')), '')

# contact
clines = [l for l in body_text_lines('contact.html') if l not in NAV]
email = next((re.sub(r'^.*邮箱[:：]\s*', '', l) for l in clines if '邮箱' in l), 'szuzwj@qq.com')
addr = next((re.sub(r'^.*地址[:：]\s*', '', l) for l in clines if '地址' in l), '深圳市南山区南海大道深圳大学科技楼')

out = os.path.join(DATA_DIR, 'about.ts')
with open(out, 'w', encoding='utf-8') as f:
    f.write('export const aboutIntro = %s;\n\n' % json.dumps(intro, ensure_ascii=False))
    f.write('export const aboutHtml = %s;\n\n' % json.dumps(about_html, ensure_ascii=False))
    f.write('export const contactInfo = %s;\n' % json.dumps({
        'email': email.strip(),
        'address': addr.strip(),
        'org': '深圳市数学学会',
        'orgEn': 'Shenzhen Mathematical Society',
        'dept': '深圳大学数学与计算科学学院办公室（深圳大学科技楼418室）',
        'zip': '518060',
    }, ensure_ascii=False, indent=2))
print('about.ts 写入完成')
print('intro:', intro[:60])
print('email:', email.strip(), '| addr:', addr.strip())
print('约章 HTML 段数:', about_html.count('<p>') + about_html.count('<h'))
