// 文章正文排版样式。旧站正文是 ueditor/Word 粘贴的 HTML（带大量内联样式、表格、图片），
// 这里做响应式与可读性兜底：图片/表格不溢出、行距舒适、章节标题统一。
export const ARTICLE_CSS = `
.art-body { font-size: 16.5px; color: #374151; line-height: 1.95; word-break: break-word; }
.art-body p { margin: 0 0 14px; }
.art-body img { max-width: 100% !important; height: auto !important; display: inline-block; border-radius: 4px; }
.art-body a { color: #1d4ed8; text-decoration: underline; word-break: break-all; }
.art-body table { max-width: 100% !important; border-collapse: collapse; margin: 12px 0; display: block; overflow-x: auto; }
.art-body td, .art-body th { border: 1px solid #d6dee8; padding: 6px 10px; }
.art-body .sec-title { font-size: 20px; font-weight: 800; color: #0f2a5c; margin: 22px 0 12px; padding-left: 12px; border-left: 4px solid #1d4ed8; }
.art-body .chap-title { font-size: 17px; font-weight: 700; color: #1e3a8a; margin: 20px 0 8px; }
.art-body span { line-height: inherit !important; }
.art-body * { max-width: 100%; }
`;
