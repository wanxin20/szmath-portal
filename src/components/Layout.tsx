import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NAV_ITEMS, FRIEND_LINKS, COMPETITION_URL, ICP_BEIAN } from '../config';
import { ARTICLE_CSS } from './articleStyles';
import { ExternalLinkIcon, MailIcon, MapPinIcon } from './Icons';
import { contactInfo } from '../data/about';

const COPYRIGHT_YEAR = new Date().getFullYear();

function isActive(pathname: string, to?: string): boolean {
  if (!to) return false;
  if (to === '/') return pathname === '/';
  return pathname.startsWith(to);
}

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-[#f3f7fc]">
      <style>{ARTICLE_CSS}</style>

      {/* 顶部：logo + 名称 + 登录/注册 */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-3 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <img src="/assets/SZMS_logo.png" alt="深圳市数学学会" className="h-12 w-12 object-contain" />
            <span>
              <span className="block text-[21px] md:text-[24px] font-black text-[#0f2a5c] tracking-wide leading-tight">
                深圳市数学学会
              </span>
              <span className="hidden sm:block text-[11px] text-slate-400 tracking-[0.15em]">
                SHENZHEN MATHEMATICAL SOCIETY
              </span>
            </span>
          </Link>
          <div className="flex items-center gap-2 text-sm">
            <a
              href={COMPETITION_URL}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-1.5 rounded-full border border-blue-600 text-blue-700 hover:bg-blue-50 transition font-medium"
            >
              登录
            </a>
            <a
              href={COMPETITION_URL}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-1.5 rounded-full bg-blue-700 text-white hover:bg-blue-800 transition font-medium"
            >
              注册
            </a>
          </div>
        </div>
      </div>

      {/* 蓝色导航 */}
      <nav className="bg-gradient-to-r from-[#1e40af] to-[#2563eb] shadow-sm sticky top-0 z-40">
        <div className="max-w-[1200px] mx-auto px-2 md:px-6 flex flex-wrap">
          {NAV_ITEMS.map((item) =>
            item.to ? (
              <Link
                key={item.label}
                to={item.to}
                className={`px-4 md:px-5 py-3.5 text-[15px] transition whitespace-nowrap ${
                  isActive(pathname, item.to)
                    ? 'bg-white/15 text-white font-bold'
                    : 'text-blue-50 hover:bg-white/10 hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            ) : (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="px-4 md:px-5 py-3.5 text-[15px] text-blue-50 hover:bg-white/10 hover:text-white transition whitespace-nowrap inline-flex items-center gap-1"
              >
                {item.label}
                <ExternalLinkIcon size={12} className="opacity-70" />
              </a>
            ),
          )}
        </div>
      </nav>

      <main className="flex-1 w-full">{children}</main>

      {/* 页脚 */}
      <footer className="bg-[#0f2a5c] text-[#9fb6d8] mt-12">
        <div className="max-w-[1200px] mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-3">
              <img src="/assets/SZMS_logo.png" alt="" className="h-10 w-10 object-contain bg-white/90 rounded p-0.5" />
              <b className="text-blue-50 text-base">深圳市数学学会</b>
            </div>
            <p className="leading-7 text-[#8ba6cc] max-w-md">
              成立于 2008 年，隶属于深圳市科学技术协会，是经深圳市民政局注册的市级学术团体。团结深圳市广大数学工作者，开展数学科学、数学教育和数学应用领域的科普、交流与研究。
            </p>
          </div>
          <div>
            <b className="block text-blue-50 text-base mb-3">友情链接</b>
            <ul className="space-y-2">
              {FRIEND_LINKS.map((l) => (
                <li key={l.label}>
                  <a href={l.href} target="_blank" rel="noreferrer" className="hover:text-white transition">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <b className="block text-blue-50 text-base mb-3">联系我们</b>
            <p className="flex items-start gap-2 mb-2 leading-6">
              <MailIcon size={16} className="mt-0.5 shrink-0" />
              {contactInfo.email}
            </p>
            <p className="flex items-start gap-2 leading-6">
              <MapPinIcon size={16} className="mt-0.5 shrink-0" />
              {contactInfo.address}
            </p>
          </div>
        </div>
        <div className="border-t border-[#1e3a8a]">
          <div className="max-w-[1200px] mx-auto px-6 py-4 text-center text-xs text-[#7396c4]">
            版权所有 © {COPYRIGHT_YEAR} 深圳市数学学会 · Shenzhen Mathematical Society
            {ICP_BEIAN && (
              <>
                <span className="mx-2">|</span>
                <a href="https://beian.miit.gov.cn/" target="_blank" rel="noreferrer" className="hover:text-white">
                  {ICP_BEIAN}
                </a>
              </>
            )}
            <span className="mx-2">|</span>
            <a href={COMPETITION_URL} target="_blank" rel="noreferrer" className="hover:text-white">
              竞赛系统入口
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
