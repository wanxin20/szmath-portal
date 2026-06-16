# -*- coding: utf-8 -*-
"""把竞赛站的《结题成果科普性介绍》(U21A20455) 移入新主站「科研动态」(keyan.ts)。"""
import os, json, shutil

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))         # szmath-portal/
DATA = os.path.join(ROOT, 'src', 'data')
ART = os.path.join(ROOT, 'public', 'article-assets')
SRC = os.path.join(os.path.dirname(ROOT), 'math', 'backend', 'scripts', 'assets', 'news-u21a20455')
os.makedirs(ART, exist_ok=True)

# 1) 拷贝三张图（加 u21- 前缀防重名）
for i in (1, 2, 3):
    shutil.copyfile(os.path.join(SRC, f'fig{i}.jpg'), os.path.join(ART, f'u21-fig{i}.jpg'))

# 2) 读正文，替换占位符为本地路径
content = open(os.path.join(SRC, 'article.html'), encoding='utf-8').read()
for i in (1, 2, 3):
    content = content.replace(f'__FIG{i}__', f'/article-assets/u21-fig{i}.jpg')

article = {
    'id': 1,
    'title': '这些技术助力宽带电磁信号高效压缩采样与智能化处理——国家自然科学基金项目结题成果科普性介绍',
    'date': '2026-06-11',
    'author': '深圳市数学学会',
    'type': '科研动态',
    'content': content,
}

ARTICLE_TYPE = """export interface Article {
  id: number;
  title: string;
  date: string;
  author: string;
  type: string;
  content: string;
}"""

with open(os.path.join(DATA, 'keyan.ts'), 'w', encoding='utf-8') as f:
    f.write(ARTICLE_TYPE + '\n\n')
    f.write('export const keyan: Article[] = ')
    f.write(json.dumps([article], ensure_ascii=False, indent=2))
    f.write(';\n')

print('keyan.ts 写入 1 篇；图片:', [f'u21-fig{i}.jpg' for i in (1, 2, 3)])
print('残留占位符:', content.count('__FIG'))
