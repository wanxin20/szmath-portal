import React from 'react';
import ArticleListPage from '../components/ArticleListPage';
import { SECTIONS } from '../sections';

const PressList: React.FC = () => <ArticleListPage section={SECTIONS.press} />;

export default PressList;
