import { memo } from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import cls from './Status.module.scss';

export enum StatusType {
    ONLINE = 'online',
    OFFLINE = 'offline',
}

interface TextProps {
    className?: string;
    status?: StatusType,
    'data-testid'?: string;
}

/**
 * Устарел, используем новые компоненты из папки redesigned
 * https://codepen.io/kermani/pen/BLJWRJ
 * @deprecated
 */
export const Status = memo((props: TextProps) => {
    const {
        className,
        status = StatusType.OFFLINE,
        'data-testid': dataTestId = 'Status',
    } = props;

    const mods: Mods = {
        [cls[status]]: true,
    };

    return (
        <div
            className={classNames(cls.statusWrapper, mods, [className])}
            data-testid={`${dataTestId}.Status`}
        >
            <div className={cls.centerDiv}>
                <div className={cls.bubble}>
                    <span className={cls.bubbleOuterDot}>
                        <span className={cls.bubbleInnerDot}></span>
                    </span>
                </div>
            </div>
        </div>
    );
});
