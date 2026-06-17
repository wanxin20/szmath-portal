export interface Article {
  id: number;
  title: string;
  date: string;
  author: string;
  type: string;
  content: string;
}

// 科普文章：暂无上线内容（科普报告已下线）。如需上线文章，按上方结构补充即可。
export const kepu: Article[] = [];
