import { useEffect } from 'react';

const SITE_NAME = '深圳市数学学会';

/** 滚动到顶部。传 dep（如路由 id）则在其变化时也重新滚顶；不传仅首次挂载。 */
export function useScrollTop(dep?: unknown): void {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [dep]);
}

/**
 * 设置页面标题（与可选的 meta description），离开时还原。
 * title 为空 → 仅站名；否则 "<title> - 深圳市数学学会"。
 */
export function usePageTitle(title?: string, description?: string): void {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title ? `${title} - ${SITE_NAME}` : `${SITE_NAME} - 官方网站`;

    let meta: HTMLMetaElement | null = null;
    let prevDesc: string | null = null;
    if (description) {
      meta = document.querySelector('meta[name="description"]');
      if (meta) {
        prevDesc = meta.getAttribute('content');
        meta.setAttribute('content', description);
      }
    }
    return () => {
      document.title = prevTitle;
      if (meta && prevDesc !== null) meta.setAttribute('content', prevDesc);
    };
  }, [title, description]);
}

/** 把 'YYYY-MM-DD' 拆成日期徽章用的 {day, ym} 与完整串 */
export function dateBadge(d: string): { day: string; ym: string; full: string } {
  const parts = (d || '').split('-');
  if (parts.length !== 3) return { day: '--', ym: '----', full: d || '—' };
  return { day: parts[2], ym: `${parts[0]}-${parts[1]}`, full: d };
}
