import React from 'react';
import Layout from '../components/Layout';
import PageHeader from '../components/PageHeader';
import { DownloadIcon } from '../components/Icons';
import { downloads } from '../data/downloads';
import { fileExt } from '../lib';

const EXT_COLOR: Record<string, string> = {
  PDF: 'bg-red-50 text-red-600 border-red-200',
  DOC: 'bg-blue-50 text-blue-600 border-blue-200',
  DOCX: 'bg-blue-50 text-blue-600 border-blue-200',
  XLS: 'bg-emerald-50 text-emerald-600 border-emerald-200',
  XLSX: 'bg-emerald-50 text-emerald-600 border-emerald-200',
  PPT: 'bg-orange-50 text-orange-600 border-orange-200',
  PPTX: 'bg-orange-50 text-orange-600 border-orange-200',
};

const Downloads: React.FC = () => (
  <Layout>
    <PageHeader title="资源下载" crumbs={[{ label: '资源下载' }]} />
    <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-7">
      <div className="bg-white border border-slate-200 rounded-xl px-4 md:px-7 py-2">
        <ul>
          {downloads.map((d) => {
            const ext = fileExt(d.file);
            const color = EXT_COLOR[ext] || 'bg-slate-50 text-slate-600 border-slate-200';
            return (
              <li key={d.id} className="border-b border-dashed border-slate-200 last:border-none">
                <a
                  href={d.file}
                  target="_blank"
                  rel="noreferrer"
                  download
                  className="flex items-center gap-4 py-4 group"
                >
                  <span className={`shrink-0 w-12 h-12 rounded-lg border flex items-center justify-center text-[11px] font-bold ${color}`}>
                    {ext}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[16px] text-slate-800 group-hover:text-blue-700 transition font-medium line-clamp-2">
                      <span className="text-emerald-600 text-[12px] font-semibold mr-2">[{d.type}]</span>
                      {d.title}
                    </span>
                    <span className="block text-[13px] text-slate-400 mt-1">
                      {d.uploader} · {d.date}
                    </span>
                  </span>
                  <span className="shrink-0 inline-flex items-center gap-1.5 text-blue-600 text-sm font-medium opacity-70 group-hover:opacity-100 transition">
                    <DownloadIcon size={17} />
                    <span className="hidden md:inline">下载</span>
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  </Layout>
);

export default Downloads;
