import { useEffect } from 'react';

/** 进入页面时滚动到顶部 */
export function useScrollTop(): void {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
}

/** 把 'YYYY-MM-DD' 拆成日期徽章用的 {day, ym} 与完整串 */
export function dateBadge(d: string): { day: string; ym: string; full: string } {
  const parts = (d || '').split('-');
  if (parts.length !== 3) return { day: '--', ym: '----', full: d || '—' };
  return { day: parts[2], ym: `${parts[0]}-${parts[1]}`, full: d };
}
