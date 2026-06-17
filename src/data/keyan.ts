export interface Article {
  id: number;
  title: string;
  date: string;
  author: string;
  type: string;
  content: string;
}

// 科研动态内容已并入科普文章(kepu)；本栏目暂空、且已从导航移除。
export const keyan: Article[] = [];
