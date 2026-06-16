import React from 'react';
import Layout from '../components/Layout';
import PageHeader from '../components/PageHeader';
import { MailIcon, MapPinIcon } from '../components/Icons';
import { contactInfo } from '../data/about';
import { useScrollTop, usePageTitle } from '../lib';

const Contact: React.FC = () => {
  useScrollTop();
  usePageTitle('联系我们', `深圳市数学学会联系方式：邮箱 ${contactInfo.email}，地址 ${contactInfo.address}。`);
  return (
    <Layout>
      <PageHeader title="联系我们" crumbs={[{ label: '联系我们' }]} />
      <div className="max-w-[1000px] mx-auto px-4 md:px-6 py-7">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_280px] gap-6">
          <div className="bg-white border border-slate-200 rounded-xl px-6 py-8 md:px-10">
            <h2 className="text-xl font-bold text-[#0f2a5c] border-l-4 border-blue-700 pl-3 mb-6">联系方式</h2>
            <ul className="space-y-5 text-[15px] text-slate-700">
              <li className="flex items-start gap-3">
                <span className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <MailIcon size={20} />
                </span>
                <span>
                  <span className="block text-[13px] text-slate-400">电子邮箱</span>
                  <a href={`mailto:${contactInfo.email}`} className="text-blue-700 hover:underline font-medium">
                    {contactInfo.email}
                  </a>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <MapPinIcon size={20} />
                </span>
                <span>
                  <span className="block text-[13px] text-slate-400">通讯地址</span>
                  <span className="font-medium">{contactInfo.address}</span>
                  <span className="block text-sm text-slate-500 mt-1">
                    {contactInfo.dept}　邮编：{contactInfo.zip}
                  </span>
                </span>
              </li>
            </ul>
            <div className="mt-8 pt-6 border-t border-slate-100 text-sm text-slate-500 leading-7">
              <p>{contactInfo.org}（{contactInfo.orgEn}）</p>
              <p>隶属于深圳市科学技术协会 · 经深圳市民政局注册的市级学术团体</p>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl px-6 py-8 flex flex-col items-center justify-center text-center">
            <img src="/assets/qrcode_for_szms.jpg" alt="深圳市数学学会公众号" className="w-44 h-44 object-contain rounded-lg border border-slate-100" />
            <p className="mt-4 text-sm text-slate-500">扫码关注「深圳市数学学会」公众号</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
