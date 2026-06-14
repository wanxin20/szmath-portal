import React from 'react';
import ArticleListPage from '../components/ArticleListPage';
import { announcements } from '../data/announcements';

const AnnouncementList: React.FC = () => (
  <ArticleListPage title="通知公告" items={announcements} basePath="/announcements" />
);

export default AnnouncementList;
