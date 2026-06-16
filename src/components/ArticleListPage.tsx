import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from './Layout';
import PageHeader from './PageHeader';
import { dateBadge, usePageTitle } from '../lib';
import type { Section } from '../sections';

const PAGE_SIZE = 12;

const ArticleListPage: React.FC<{ section: Section }> = ({ section }) => {
  const { title, items, base: basePath, group } = section;
  const [page, setPage] = useState(1);
  usePageTitle(title);
  const crumbs = group ? [{ label: group }, { label: title }] : [{ label: title }];
  const totalPages = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
  const pageItems = items.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <Layout>
      <PageHeader title={title} crumbs={crumbs} />
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-7">
        <div className="bg-white border border-slate-200 rounded-xl px-4 md:px-7 py-2">
          {pageItems.length === 0 ? (
            <div className="py-20 text-center text-slate-400">暂无内容</div>
          ) : (
            <ul>
              {pageItems.map((a) => {
                const d = dateBadge(a.date);
                return (
                  <li key={a.id} className="border-b border-dashed border-slate-200 last:border-none">
                    <Link to={`${basePath}/${a.id}`} className="flex items-center gap-5 py-5 group">
                      <span className="shrink-0 w-[72px] h-[72px] bg-[#f5f9ff] border border-blue-100 rounded-lg text-center text-blue-700 flex flex-col justify-center">
                        <span className="text-[26px] font-extrabold leading-none">{d.day}</span>
                        <span className="text-xs text-blue-400 mt-1">{d.ym}</span>
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-[17px] text-slate-800 leading-relaxed group-hover:text-blue-700 transition font-medium line-clamp-2">
                          {a.title}
                        </span>
                        <span className="block text-[13px] text-slate-400 mt-1">
                          {a.type || title} · {a.author}
                        </span>
                      </span>
                      <span className="hidden md:block shrink-0 text-blue-600 opacity-0 group-hover:opacity-100 transition">
                        查看 ›
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 py-6 text-sm">
              <button
                disabled={page <= 1}
                onClick={() => setPage((p) => p - 1)}
                className="border border-slate-200 rounded-md px-3 py-1.5 text-slate-600 disabled:opacity-40 hover:border-blue-300"
              >
                ‹ 上一页
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`border rounded-md px-3.5 py-1.5 ${
                    p === page
                      ? 'bg-blue-700 border-blue-700 text-white'
                      : 'border-slate-200 text-slate-600 hover:border-blue-300'
                  }`}
                >
                  {p}
                </button>
              ))}
              <button
                disabled={page >= totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="border border-slate-200 rounded-md px-3 py-1.5 text-slate-600 disabled:opacity-40 hover:border-blue-300"
              >
                下一页 ›
              </button>
              <span className="text-slate-400 ml-1">共 {items.length} 条</span>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ArticleListPage;
