import React, { useEffect, useState } from 'react';
import { useToolbarRefs } from '@/app/providers/ToolbarProvider';
import { VStack } from '@/shared/ui/redesigned/Stack';
import cls from './ToolbarSettings.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getUserAuthData, isUserAdmin } from '@/entities/User';
import { Typography } from '@/shared/ui/material/Typography';
import { useDebounce } from '@/shared/lib/hooks/useDebounce/useDebounce';

export interface ToolbarSettingsProps {
    className?: string;
}

const Button: React.FC<{ label: string; onClick: () => void; active: boolean }> = ({ label, onClick, active }) => (
    <span
        className={classNames(cls.toolbarItem, {}, [active ? cls.activeButton : ''])}
        onClick={onClick}
    >
    <Typography
        color='primary'
        fontSize='16px'
        fontWeight='400'
        lineHeight='26px'
        className={cls.toolbarItem__text}
    >
      {label}
    </Typography>
  </span>
);

export const ToolbarSettings = (props: ToolbarSettingsProps) => {
    const {
        className,
        ...otherProps
    } = props;

    const {
        stopWordsRef,
        agencyNameRef,
        designSwitcherRef,
        notificationsRef,
        cookiesRef,
        visibleRef,
    } = useToolbarRefs();

    const { t } = useTranslation('settings');
    const TIME_DELAY = 700;
    const isAdmin = useSelector(isUserAdmin);
    const authData = useSelector(getUserAuthData);

    const buttonsData = [
        ...(isAdmin
            ? [
                { ref: stopWordsRef, label: t('Стоп слова'), name: 'stopWords' },
                { ref: agencyNameRef, label: t('Название агенства'), name: 'agencyName' },
            ]
            : []),
        { ref: designSwitcherRef, label: t('Общие настройки'), name: 'designSwitcher' },
        { ref: notificationsRef, label: t('Notifications'), name: 'notifications' },
        { ref: cookiesRef, label: t('Cookies'), name: 'cookies' },
        { ref: visibleRef, label: t('Visibility'), name: 'visible' },
    ];

    const [activeButton, setActiveButton] = useState(buttonsData[0].name);

    const classes = [
        className,
    ];

    const handleClickWithDelay = (ref: React.RefObject<HTMLElement>, buttonName: string) => {
        ref.current?.scrollIntoView({
            behavior: 'smooth',
        });

        setTimeout(() => {
            setActiveButton(buttonName);
        }, TIME_DELAY);
    };

    const handleScroll = useDebounce(() => {
        const container = document.getElementById('PAGE_ID');
        const currentScrollPosition = container?.scrollTop || 0;
        const containerHeight = container?.scrollHeight || 0;
        const windowHeight = window.innerHeight;

        for (const { ref, name } of buttonsData) {
            const offset = ref.current.offsetTop;

            if (currentScrollPosition + windowHeight > containerHeight) {
                setActiveButton('visible');
                break;
            }

            if (currentScrollPosition < offset) {
                setActiveButton(name);
                break;
            }
        }
    }, 100);

    useEffect(() => {
        document.getElementById('PAGE_ID')?.addEventListener('scroll', handleScroll);

        return () => {
            document.getElementById('PAGE_ID')?.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);

    if (!authData) {
        return null;
    }

    return (
        <div className={classNames(cls.wrapper, {}, classes)} {...otherProps}>
            <Card sx={{ minWidth: 250 }}>
                <CardContent>
                    <VStack gap="8" justify='start'>
                        {buttonsData.map(({ ref, label, name }) => (
                            <Button
                                key={name}
                                label={label}
                                onClick={() => handleClickWithDelay(ref, name)}
                                active={activeButton === name}
                            />
                        ))}
                    </VStack>
                </CardContent>
            </Card>
        </div>
    );
};

export default ToolbarSettings;
