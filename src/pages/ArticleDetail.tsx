import { Link, useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import PageHeader from '../components/PageHeader';
import { SECTIONS, type SectionKey } from '../sections';
import { dateBadge, useScrollTop, usePageTitle } from '../lib';

const ArticleDetail: React.FC<{ kind: SectionKey }> = ({ kind }) => {
  const { id } = useParams<{ id: string }>();
  const { title: sectionTitle, base, items: data, group, hideDate } = SECTIONS[kind];
  const crumbs = group
    ? [{ label: group }, { label: sectionTitle, to: base }, { label: '正文' }]
    : [{ label: sectionTitle, to: base }, { label: '正文' }];
  const numId = Number(id);
  const idx = data.findIndex((a) => a.id === numId);
  const article = idx >= 0 ? data[idx] : null;
  const prev = idx > 0 ? data[idx - 1] : null; // 上一条 = 列表中更靠前（更新）
  const next = idx >= 0 && idx < data.length - 1 ? data[idx + 1] : null;

  useScrollTop(id);
  usePageTitle(article ? article.title : sectionTitle);

  if (!article) {
    return (
      <Layout>
        <PageHeader title={sectionTitle} crumbs={crumbs} />
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-20 text-center">
          <p className="text-slate-500 mb-4">文章不存在或已删除</p>
          <Link to={base} className="text-blue-700 font-semibold hover:underline">
            ‹ 返回{sectionTitle}
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <PageHeader title={sectionTitle} crumbs={crumbs} />
      <div className="max-w-[1000px] mx-auto px-4 md:px-6 py-7">
        <article className="bg-white border border-slate-200 rounded-xl px-5 py-8 md:px-14 md:py-10">
          <h1 className="text-[22px] md:text-[27px] font-extrabold text-slate-800 text-center leading-relaxed mb-5">
            {article.title}
          </h1>
          <div className="text-center text-[13px] text-slate-400 pb-5 border-b border-slate-100 mb-7">
            {!hideDate && (
              <>
                <span>发布时间：{dateBadge(article.date).full}</span>
                <span className="mx-2.5 text-slate-200">|</span>
              </>
            )}
            <span>来源：{article.author}</span>
            {article.type && (
              <>
                <span className="mx-2.5 text-slate-200">|</span>
                <span>{article.type}</span>
              </>
            )}
          </div>

          <div className="art-body" dangerouslySetInnerHTML={{ __html: article.content }} />

          <div className="mt-8 pt-5 border-t border-slate-100 text-[15px] leading-loose text-slate-600">
            <Link to={base} className="float-right text-blue-700 font-semibold hover:underline">
              返回列表 ›
            </Link>
            <div>
              <span className="text-slate-400">上一条：</span>
              {prev ? (
                <Link to={`${base}/${prev.id}`} className="hover:text-blue-700">
                  {prev.title}
                </Link>
              ) : (
                <span className="text-slate-400">（无）</span>
              )}
            </div>
            <div>
              <span className="text-slate-400">下一条：</span>
              {next ? (
                <Link to={`${base}/${next.id}`} className="hover:text-blue-700">
                  {next.title}
                </Link>
              ) : (
                <span className="text-slate-400">（无）</span>
              )}
            </div>
          </div>
        </article>
      </div>
    </Layout>
  );
};

export default ArticleDetail;
