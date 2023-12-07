import React from 'react';
import { useToolbarRefs } from '@/app/providers/ToolbarProvider';
import { VStack } from '@/shared/ui/redesigned/Stack';
import cls from './ToolbarSettings.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';

export interface ToolbarSettingsProps {
    className?: string;
}

export const ToolbarSettings = (props: ToolbarSettingsProps) => {
    const {
        className,
        ...otherProps
    } = props;

    const classes = [
        className,
    ];

    const {
        stopWordsRef,
        agencyNameRef,
        designSwitcherRef,
        notificationsRef,
        cookiesRef,
        visibleRef,
    } = useToolbarRefs();

    const handleClickStopWords = () => {
        stopWordsRef.current.scrollIntoView({
            behavior: 'smooth',
        })
    };

    const handleClickAgencyName = () => {
        agencyNameRef.current.scrollIntoView({
            behavior: 'smooth',
        })
    };

    const handleClickDesignSwitcher = () => {
        designSwitcherRef.current.scrollIntoView({
            behavior: 'smooth',
        })
    };

    const handleClickNotifications = () => {
        notificationsRef.current.scrollIntoView({
            behavior: 'smooth',
        })
    };

    const handleClickCookies = () => {
        cookiesRef.current.scrollIntoView({
            behavior: 'smooth',
        })
    };

    const handleClickVisible = () => {
        visibleRef.current.scrollIntoView({
            behavior: 'smooth',
        })
    };

    return (
        <div className={classNames(cls.wrapper, {}, classes)} {...otherProps}>
            <VStack gap="8" justify='start'>
                <button onClick={handleClickStopWords}>Stop Words</button>
                <button onClick={handleClickAgencyName}>Agency Name</button>
                <button onClick={handleClickDesignSwitcher}>handleClickDesignSwitcher</button>
                <button onClick={handleClickNotifications}>handleClickNotifications</button>
                <button onClick={handleClickCookies}>handleClickCookies</button>
                <button onClick={handleClickVisible}>handleClickVisible</button>
            </VStack>
        </div>
    );
};

export default ToolbarSettings;
