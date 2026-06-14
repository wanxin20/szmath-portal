import React from 'react';
import ArticleListPage from '../components/ArticleListPage';
import { SECTIONS } from '../sections';

const AnnouncementList: React.FC = () => <ArticleListPage section={SECTIONS.announcement} />;

export default AnnouncementList;
