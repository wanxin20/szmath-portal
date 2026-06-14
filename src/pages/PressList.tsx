import React from 'react';
import ArticleListPage from '../components/ArticleListPage';
import { press } from '../data/press';

const PressList: React.FC = () => (
  <ArticleListPage title="新闻中心" items={press} basePath="/news" />
);

export default PressList;
