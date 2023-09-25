import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { useParams } from 'react-router-dom';
import { ArticleDetails } from '@/entities/Article';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { Page } from '@/widgets/Page';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { ArticleRecommendationsList } from '@/features/articleRecommendationsList';
import { ArticleDetailsComments } from '../ArticleDetailsComments/ArticleDetailsComments';
import cls from './ArticleDetailsPage.module.scss';
import { articleDetailsPageReducer } from '../../model/slices';
import { ArticleDetailsPageHeader } from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader';
import { ToggleFeatures } from '@/shared/lib/features';
import { Card } from '@/shared/ui/deprecated/Card';
import { ArticleRating } from '@/features/articleRating';
import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout';
import { DetailsContainer } from '../DetailsContainer/DetailsContainer';
import { AdditionalInfoContainer } from '../AdditionalInfoContainer/AdditionalInfoContainer';

interface ArticleDetailsPageProps {
    className?: string;
}

const reducers: ReducersList = {
    articleDetailsPage: articleDetailsPageReducer,
};

const ArticleDetailsPage = (props: ArticleDetailsPageProps) => {
    const { className } = props;
    const { t } = useTranslation('article-details');
    const { id } = useParams<{ id: string }>();

    if (!id) {
        return null;
    }

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <ToggleFeatures
                feature="isAppRedesigned"
                on={
                    <StickyContentLayout
                        content={
                            <Page
                                className={classNames(
                                    cls.ArticleDetailsPage,
                                    {},
                                    [className],
                                )}
                            >
                                <VStack gap="16" max>
                                    <DetailsContainer />
                                    <ArticleRating articleId={id} />
                                    <ArticleRecommendationsList />
                                    <ArticleDetailsComments id={id} />
                                </VStack>
                            </Page>
                        }
                        right={<AdditionalInfoContainer />}
                    />
                }
                off={
                    <Page
                        className={classNames(cls.ArticleDetailsPage, {}, [
                            className,
                        ])}
                    >
                        <VStack gap="16" max>
                            <ArticleDetailsPageHeader />
                            <ArticleDetails id={id} />
                            <ToggleFeatures
                                feature="isArticleRatingEnabled"
                                on={<ArticleRating articleId={id} />}
                                off={
                                    <Card>
                                        {t('Оценка статей скоро появится!')}
                                    </Card>
                                }
                            />
                            <ArticleRecommendationsList />
                            <ArticleDetailsComments id={id} />
                        </VStack>
                    </Page>
                }
            />
        </DynamicModuleLoader>
    );
};

export default memo(ArticleDetailsPage);
