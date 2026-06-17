// 站点配置：竞赛系统地址、导航结构、外部友情链接。

/**
 * 竞赛平台地址。旧站的 竞赛报名 / 成绩查询 / 登录 / 注册 等功能都跳到这里——
 * 统一先到平台首页，由用户选择具体子系统（论文评选 / 教师论文竞赛 / 数智创新竞赛）。
 */
export const COMPETITION_URL = 'https://competition.szmath.com';

/** 页脚 ICP 备案号：拿到正式号后填入，留空则不显示 */
export const ICP_BEIAN = '';

export interface NavChild {
  label: string;
  to: string;
}

export interface NavItem {
  label: string;
  /** 站内路由（内部页面）。有 children 时作为父项的默认落地页 */
  to?: string;
  /** 外部链接（竞赛系统等） */
  href?: string;
  /** 下拉子栏目（如"科学传播"下的科普文章/科研动态） */
  children?: NavChild[];
}

/** 顶部导航 */
export const NAV_ITEMS: NavItem[] = [
  { label: '主页', to: '/' },
  { label: '学会简介', to: '/about' },
  { label: '通知公告', to: '/announcements' },
  { label: '新闻中心', to: '/news' },
  { label: '竞赛报名', href: COMPETITION_URL },
  { label: '联系我们', to: '/contact' },
];

/** 友情链接（旧站底部） */
export const FRIEND_LINKS = [
  { label: '中国数学会', href: 'http://www.cms.org.cn/' },
  { label: '深圳大学', href: 'http://www.szu.edu.cn' },
  { label: '复旦大学数学科学学院', href: 'http://www.scms.fudan.edu.cn/' },
  { label: '江苏数学', href: 'http://www.jsmaths.com.cn/main.asp' },
];
