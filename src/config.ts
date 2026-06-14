// 站点配置：竞赛系统地址、导航结构、外部友情链接。

/**
 * 竞赛平台地址。旧站的 竞赛报名 / 成绩查询 / 登录 / 注册 等功能都跳到这里——
 * 统一先到平台首页，由用户选择具体子系统（论文评选 / 教师论文竞赛 / 数智创新竞赛）。
 */
export const COMPETITION_URL = 'https://competition.szmath.com';

/** 页脚 ICP 备案号：拿到正式号后填入，留空则不显示 */
export const ICP_BEIAN = '';

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
  { label: '竞赛报名', href: COMPETITION_URL },
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
