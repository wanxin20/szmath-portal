// 文章栏目元数据的唯一来源：标题、路由基址、数据。
// 列表页（ArticleListPage）与详情页（ArticleDetail）共用，避免重复。
import { announcements, type Article } from './data/announcements';
import { press } from './data/press';
import { kepu } from './data/kepu';
import { keyan } from './data/keyan';

export type SectionKey = 'announcement' | 'press' | 'kepu' | 'keyan';

export interface Section {
  title: string;
  base: string;
  items: Article[];
  /** 上级栏目名（用于面包屑，如"科学传播"），无则不显示 */
  group?: string;
}

export const SECTIONS: Record<SectionKey, Section> = {
  announcement: { title: '通知公告', base: '/announcements', items: announcements },
  press: { title: '新闻中心', base: '/news', items: press },
  kepu: { title: '科普文章', base: '/kepu', items: kepu, group: '科学传播' },
  keyan: { title: '科研动态', base: '/keyan', items: keyan, group: '科学传播' },
};
