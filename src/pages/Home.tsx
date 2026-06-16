import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import {
  BellIcon,
  NewspaperIcon,
  BookOpenIcon,
  FileTextIcon,
  TrophyIcon,
  ArrowRightIcon,
  ClipboardIcon,
} from '../components/Icons';
import { announcements } from '../data/announcements';
import { press } from '../data/press';
import { kepu } from '../data/kepu';
import { COMPETITION_URL } from '../config';
import { usePageTitle } from '../lib';

const CAROUSEL = [
  { img: '/assets/carousel4.png', title: '科普报告：选题——做好数学教育研究的第一步' },
  { img: '/assets/carousel1.png', title: '深圳市数学学会' },
  { img: '/assets/carousel2.jpg', title: '团结深圳市广大数学工作者' },
  { img: '/assets/carousel3.jpg', title: '开展数学科学、教育与应用研究' },
];

const SYSTEMS = [
  {
    name: '论文评选',
    desc: '深圳市数学学会论文评选、报名、提交与评审',
    icon: <FileTextIcon size={26} />,
    cls: 'from-indigo-600 to-indigo-500 shadow-indigo-600/30',
    accent: 'text-indigo-600',
  },
  {
    name: '教师论文竞赛',
    desc: '教育教学改革项目管理、申报与评审',
    icon: <ClipboardIcon size={26} />,
    cls: 'from-emerald-600 to-emerald-500 shadow-emerald-600/30',
    accent: 'text-emerald-600',
  },
  {
    name: '数智创新竞赛',
    desc: '湾区数学与智能+科技创新竞赛',
    icon: <TrophyIcon size={26} />,
    cls: 'from-amber-500 to-amber-400 shadow-amber-500/30',
    accent: 'text-amber-600',
  },
];

const Carousel: React.FC = () => {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % CAROUSEL.length), 5000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="relative h-[280px] md:h-[420px] overflow-hidden rounded-xl shadow-lg bg-slate-900">
      {CAROUSEL.map((c, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-700 ${i === idx ? 'opacity-100' : 'opacity-0'}`}
        >
          <img src={c.img} alt={c.title} className="w-full h-full object-cover" />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-6 py-5">
            <p className="text-white text-base md:text-xl font-semibold drop-shadow">{c.title}</p>
          </div>
        </div>
      ))}
      <div className="absolute bottom-3 right-4 flex gap-2">
        {CAROUSEL.map((_, i) => (
          <button
            key={i}
            aria-label={`第 ${i + 1} 张`}
            onClick={() => setIdx(i)}
            className={`w-2.5 h-2.5 rounded-full transition ${i === idx ? 'bg-white' : 'bg-white/45'}`}
          />
        ))}
      </div>
    </div>
  );
};

interface PanelProps {
  title: string;
  icon: React.ReactNode;
  moreTo: string;
  children: React.ReactNode;
}
const Panel: React.FC<PanelProps> = ({ title, icon, moreTo, children }) => (
  <section className="bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col">
    <header className="flex items-center justify-between px-5 py-3.5 border-b-2 border-slate-100">
      <h2 className="text-lg font-bold text-[#0f2a5c] flex items-center gap-2">
        <span className="text-blue-600">{icon}</span>
        {title}
      </h2>
      <Link to={moreTo} className="text-[13px] text-slate-400 hover:text-blue-700 transition">
        more ›
      </Link>
    </header>
    <ul className="px-5 py-2 flex-1">{children}</ul>
  </section>
);

const Row: React.FC<{ to: string; title: string; date: string }> = ({ to, title, date }) => (
  <li className="border-b border-dotted border-slate-100 last:border-none">
    <Link to={to} className="flex items-center justify-between gap-3 py-2.5 group">
      <span className="truncate text-[14.5px] text-slate-700 group-hover:text-blue-700 transition">
        <span className="text-blue-400 mr-2">•</span>
        {title}
      </span>
      <span className="shrink-0 text-xs text-slate-400">{date}</span>
    </Link>
  </li>
);

const Home: React.FC = () => {
  usePageTitle(
    undefined,
    '深圳市数学学会官方网站——学会简介、通知公告、新闻动态、科学传播与数学竞赛信息。',
  );
  return (
    <Layout>
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-6 md:py-8">
        <Carousel />

        {/* 三栏资讯 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-7">
          <Panel title="通知公告" icon={<BellIcon size={19} />} moreTo="/announcements">
            {announcements.slice(0, 6).map((a) => (
              <Row key={a.id} to={`/announcements/${a.id}`} title={a.title} date={a.date} />
            ))}
          </Panel>
          <Panel title="新闻中心" icon={<NewspaperIcon size={19} />} moreTo="/news">
            {press.slice(0, 6).map((p) => (
              <Row key={p.id} to={`/news/${p.id}`} title={p.title} date={p.date} />
            ))}
          </Panel>
          <Panel title="科学传播" icon={<BookOpenIcon size={19} />} moreTo="/kepu">
            {kepu.length > 0 ? (
              kepu.slice(0, 6).map((k) => (
                <Row key={k.id} to={`/kepu/${k.id}`} title={k.title} date={k.date} />
              ))
            ) : (
              <li className="py-10 text-center text-slate-400 text-sm">暂无内容</li>
            )}
          </Panel>
        </div>

        {/* 竞赛系统入口 */}
        <div className="mt-9">
          <div className="flex items-end justify-between mb-4">
            <h2 className="text-xl font-bold text-[#0f2a5c] border-l-4 border-blue-700 pl-3">竞赛系统</h2>
            <a
              href={COMPETITION_URL}
              target="_blank"
              rel="noreferrer"
              className="text-[13px] text-blue-700 hover:underline"
            >
              进入竞赛平台 ›
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {SYSTEMS.map((s) => (
              <a
                key={s.name}
                href={COMPETITION_URL}
                target="_blank"
                rel="noreferrer"
                className="group bg-white border border-slate-200 rounded-xl p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-700/10 hover:border-blue-200"
              >
                <span
                  className={`w-[52px] h-[52px] rounded-2xl text-white flex items-center justify-center mb-4 shadow-lg bg-gradient-to-br ${s.cls}`}
                >
                  {s.icon}
                </span>
                <h3 className="text-lg font-bold text-slate-800 mb-1.5">{s.name}</h3>
                <p className="text-[13px] text-slate-400 mb-4 leading-relaxed">{s.desc}</p>
                <span className={`inline-flex items-center gap-1.5 text-sm font-semibold ${s.accent}`}>
                  进入系统
                  <span className="group-hover:translate-x-1 transition-transform">
                    <ArrowRightIcon size={15} />
                  </span>
                </span>
              </a>
            ))}
          </div>
          <p className="mt-4 text-center text-[13px] text-slate-400">
            竞赛报名、准考证打印、成绩查询等功能均在竞赛平台办理
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
