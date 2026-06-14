// 文章栏目元数据的唯一来源：标题、路由基址、数据。
// 列表页（AnnouncementList / PressList）与详情页（ArticleDetail）共用，避免三处重复。
import { announcements, type Article } from './data/announcements';
import { press } from './data/press';

export type SectionKey = 'announcement' | 'press';

export interface Section {
  title: string;
  base: string;
  items: Article[];
}

export const SECTIONS: Record<SectionKey, Section> = {
  announcement: { title: '通知公告', base: '/announcements', items: announcements },
  press: { title: '新闻中心', base: '/news', items: press },
};
