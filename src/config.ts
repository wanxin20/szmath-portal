// 站点配置：竞赛系统地址、导航结构、外部友情链接。

/** 竞赛平台地址（论文评选/教师论文竞赛/数智创新竞赛 + 报名/登录等功能） */
export const COMPETITION_URL = 'https://competition.szmath.com';

/** 竞赛系统下各功能的深链（旧站的报名/准考证/成绩查询/登录跳到这里） */
export const COMPETITION_LINKS = {
  home: COMPETITION_URL,
  // 竞赛报名 → 竞赛平台首页（用户在平台内选择具体系统报名）
  signup: COMPETITION_URL,
  // 登录 / 注册 → 各子系统登录页；统一先到平台首页选择系统
  login: COMPETITION_URL,
};

export interface NavItem {
  label: string;
  /** 站内路由（内部页面） */
  to?: string;
  /** 外部链接（竞赛系统等） */
  href?: string;
}

/** 顶部导航：保持与旧站一致的栏目顺序 */
export const NAV_ITEMS: NavItem[] = [
  { label: '主页', to: '/' },
  { label: '学会简介', to: '/about' },
  { label: '通知公告', to: '/announcements' },
  { label: '新闻中心', to: '/news' },
  { label: '资源下载', to: '/downloads' },
  { label: '竞赛报名', href: COMPETITION_LINKS.signup },
  { label: '成绩查询', href: COMPETITION_URL },
  { label: '联系我们', to: '/contact' },
];

/** 友情链接（旧站底部） */
export const FRIEND_LINKS = [
  { label: '中国数学会', href: 'http://www.cms.org.cn/' },
  { label: '深圳大学', href: 'http://www.szu.edu.cn' },
  { label: '复旦大学数学科学学院', href: 'http://www.scms.fudan.edu.cn/' },
  { label: '江苏数学', href: 'http://www.jsmaths.com.cn/main.asp' },
];
