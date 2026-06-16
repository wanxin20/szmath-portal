import React from 'react';
import Layout from '../components/Layout';
import PageHeader from '../components/PageHeader';
import { aboutHtml, aboutIntro } from '../data/about';
import { useScrollTop, usePageTitle } from '../lib';

const About: React.FC = () => {
  useScrollTop();
  usePageTitle('学会简介', aboutIntro);
  return (
    <Layout>
      <PageHeader title="学会简介" crumbs={[{ label: '学会简介' }]} />
      <div className="max-w-[1000px] mx-auto px-4 md:px-6 py-7">
        <div className="bg-white border border-slate-200 rounded-xl px-5 py-8 md:px-14 md:py-10">
          <h2 className="text-2xl font-bold text-[#0f2a5c] text-center mb-2">深圳市数学学会</h2>
          <p className="text-center text-sm text-slate-400 tracking-[0.2em] mb-8">
            SHENZHEN MATHEMATICAL SOCIETY
          </p>
          <div className="art-body" dangerouslySetInnerHTML={{ __html: aboutHtml }} />
        </div>
      </div>
    </Layout>
  );
};

export default About;
