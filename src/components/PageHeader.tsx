import React from 'react';
import { Link } from 'react-router-dom';

interface Crumb {
  label: string;
  to?: string;
}

/** 内页统一横幅 + 面包屑 */
const PageHeader: React.FC<{ title: string; crumbs: Crumb[] }> = ({ title, crumbs }) => (
  <>
    <div className="bg-gradient-to-r from-[#0f2a5c] via-[#1e40af] to-[#2563eb] text-white">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-7 md:py-9">
        <h1 className="text-2xl md:text-[30px] font-bold tracking-widest">{title}</h1>
      </div>
    </div>
    <div className="bg-white border-b border-slate-200">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-3 text-[13px] text-slate-500">
        当前位置：
        <Link to="/" className="text-blue-700 hover:underline">
          主页
        </Link>
        {crumbs.map((c) => (
          <span key={c.label}>
            <span className="mx-1.5 text-slate-300">›</span>
            {c.to ? (
              <Link to={c.to} className="text-blue-700 hover:underline">
                {c.label}
              </Link>
            ) : (
              <span className="text-slate-600">{c.label}</span>
            )}
          </span>
        ))}
      </div>
    </div>
  </>
);

export default PageHeader;
