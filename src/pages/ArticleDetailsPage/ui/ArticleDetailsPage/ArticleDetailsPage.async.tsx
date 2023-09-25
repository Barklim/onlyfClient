import { lazy } from 'react';

export const ArticleDetailsPageAsync = lazy(
    () => import('./ArticleDetailsPage'),
);
