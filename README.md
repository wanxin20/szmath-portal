# 深圳市数学学会官网（www.szmath.com 重构）

旧站（ASP.NET MVC）的现代化重构版。React + Vite + TypeScript + Tailwind，
内容为旧站抓取的静态数据（冻结），无需后端/数据库。

## 页面

| 路由 | 页面 | 数据来源 |
|---|---|---|
| `/` | 主页（轮播 + 通知/新闻/资源三栏 + 竞赛系统入口） | 静态 |
| `/about` | 学会简介（简介 + 完整章程） | `src/data/about.ts` |
| `/announcements` `/announcements/:id` | 通知公告（19 条）列表 + 详情 | `src/data/announcements.ts` |
| `/news` `/news/:id` | 新闻中心（6 条）列表 + 详情 | `src/data/press.ts` |
| `/downloads` | 资源下载（9 个真题 PDF） | `src/data/downloads.ts` |
| `/contact` | 联系我们 | `src/data/about.ts` |

竞赛相关功能（**竞赛报名 / 成绩查询 / 登录 / 注册**）跳转到竞赛平台
`https://competition.szmath.com`（见 `src/config.ts` 的 `COMPETITION_URL`）。

## 开发 / 构建

```bash
npm install
npm run dev       # 本地开发 http://localhost:5180
npm run build     # 产物输出到 dist/
npm run preview   # 预览生产构建
```

## 部署（域名 www.szmath.com 指向本站）

把 `dist/` 部署为静态站点。本站用 **BrowserRouter（干净 URL）**，nginx 需要
SPA 回退到 `index.html`：

```nginx
server {
    listen 80;
    server_name www.szmath.com szmath.com;
    root /var/www/szmath/;          # dist 内容放这里
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;   # SPA 回退（关键）
    }

    # 静态资源缓存
    location ~* \.(js|css|png|jpg|jpeg|gif|svg|pdf|woff2?)$ {
        expires 30d;
        add_header Cache-Control "public";
    }
}
```

> 如果不方便配 `try_files`，可改用 HashRouter（`src/App.tsx` 把 `BrowserRouter`
> 换成 `HashRouter`），URL 变成 `/#/about`，任意静态托管都能用、无需 nginx 配置。

## 待补充

- 页脚备案号：拿到正式 ICP 备案号后填 `src/components/Layout.tsx` 的 `ICP_BEIAN`。
- 极少数 2016–2017 旧公告正文里的附件下载链接（`/uploadfile/...`）在原服务器
  已 404（原站本身也打不开），未本地化，属历史死链。

## 数据来源

`.scraped-data/` 内是抓取与处理脚本（`download_assets.py` / `process_data.py` /
`process_about.py`），原始抓取 JSON 已 gitignore。重新抓取/更新数据时可参考。
