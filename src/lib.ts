/** 把 'YYYY-MM-DD' 拆成日期徽章用的 {day, ym} 与完整串 */
export function dateBadge(d: string): { day: string; ym: string; full: string } {
  const parts = (d || '').split('-');
  if (parts.length !== 3) return { day: '--', ym: '----', full: d || '—' };
  return { day: parts[2], ym: `${parts[0]}-${parts[1]}`, full: d };
}

/** 文件扩展名（大写，去点） */
export function fileExt(path: string): string {
  const m = /\.([a-z0-9]+)$/i.exec(path);
  return m ? m[1].toUpperCase() : 'FILE';
}
