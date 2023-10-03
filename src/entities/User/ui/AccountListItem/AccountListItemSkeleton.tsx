import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Card as CardDeprecated } from '@/shared/ui/deprecated/Card';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { AccountView } from '../../model/consts/userConsts';
import cls from './AccountListItem.module.scss';

interface AccountListItemSkeletonProps {
    className?: string;
    view: AccountView;
}

export const AccountListItemSkeleton = memo(
    (props: AccountListItemSkeletonProps) => {
        const { className, view } = props;

        const mainClass = cls.AccountListItem;

        const Skeleton = SkeletonDeprecated;

        if (view === AccountView.BIG) {
            const cardContent = (
                <div className={cls.skeletonBig}>
                    <div className={cls.skeletonCardMedia}>
                        <Skeleton
                            width={300}
                            height={225}
                            className={cls.username}
                        />
                    </div>
                    <div className={cls.skeletonCardTextWrapper}>
                        <Skeleton width={150} height={24} className={cls.title} />
                        <Skeleton width={200} height={90} className={cls.img} />
                        <Skeleton width={90} height={24} />
                    </div>
                </div>
            );
            return (
                <div
                    className={classNames(mainClass, {}, [
                        className,
                        cls[view],
                    ])}
                >
                    <CardDeprecated className={cls.card}>
                        {cardContent}
                    </CardDeprecated>
                </div>
            );
        }

        const cardContent = (
            <div className={cls.skeletonSmall}>
                <div className={cls.skeletonCardMedia}>
                    <Skeleton
                        height={200}
                        className={cls.img}
                    />
                </div>
                <div className={cls.skeletonCardTextWrapper}>
                    <Skeleton width={130} height={24} />
                    <Skeleton width={90} height={24} />
                </div>
            </div>
        );

        return (
            <div className={classNames(mainClass, {}, [className, cls[view]])}>
                <CardDeprecated className={cls.card}>
                    {cardContent}
                </CardDeprecated>
            </div>
        );
    },
);
