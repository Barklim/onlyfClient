import { useTranslation } from 'react-i18next';
import React, { memo, useEffect, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { ListBox } from '@/shared/ui/redesigned/Popups';
import { Text } from '@/shared/ui/redesigned/Text';
import { getFeatureFlag, updateFeatureFlag } from '@/shared/lib/features';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { AccountSortField, getUserAuthData } from '@/entities/User';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { useForceUpdate } from '@/shared/lib/render/forceUpdate';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from '@/features/SettingsSections/ui/SettingsStopWords/SettingsStopWords.module.scss';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import { Typography } from '@/shared/ui/material/Typography';
import { Maintenance } from '@/shared/ui/material/Maintenance';
import { Select as SelectMui } from '@/shared/ui/material/Select';
import { SelectOption } from '@/shared/ui/deprecated/Select';
import { SortOrder } from '@/shared/types/sort';
import { useToolbarRefs } from '@/app/providers/ToolbarProvider';

interface UiDesignSwitcherProps {
    className?: string;
}

export const UiDesignSwitcher = memo((props: UiDesignSwitcherProps) => {
    const { className } = props;
    const { t } = useTranslation('settings');
    const isAppRedesigned = getFeatureFlag('isAppRedesigned');
    const dispatch = useAppDispatch();
    const authData = useSelector(getUserAuthData);
    const [isLoading, setIsLoading] = useState(false);
    const forceUpdate = useForceUpdate();
    const { designSwitcherRef } = useToolbarRefs();
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        designSwitcherRef.current = ref.current;
    }, [designSwitcherRef]);

    type InterfaceModeOption = 'new' | 'old';

    const orderOptions = useMemo<SelectOption<InterfaceModeOption>[]>(
        () => [
            {
                value: 'new',
                content: t('Новый'),
            },
            {
                value: 'old',
                content: t('Старый'),
            },
        ],
        [t],
    );

    const onChange = async (value: string) => {
        if (authData) {
            setIsLoading(true);
            await dispatch(
                updateFeatureFlag({
                    userId: authData.id,
                    newFeatures: {
                        isAppRedesigned: value === 'new',
                    },
                }),
            ).unwrap();
            setIsLoading(false);
            forceUpdate();
        }
    };

    return (
        <Card ref={ref} sx={{ minWidth: 275 }} className={classNames(cls.fullWidth, {}, [])}>
            <CardContent>
                <VStack
                    gap="16"
                    max
                >
                    <Typography variant='h5' color='primary' fontWeight='700'>
                        {t('Общие настройки')}
                    </Typography>
                    <Maintenance/>
                    <HStack gap="16">
                        <Text text={t('Вариант интерфейса')} />
                        {isLoading ? (
                            <Skeleton width={100} height={40} />
                        ) : (
                            <SelectMui
                                options={orderOptions}
                                value={isAppRedesigned ? 'new' : 'old'}
                                className={className}
                                onChange={onChange}
                            />
                        )}
                    </HStack>
                </VStack>
            </CardContent>
        </Card>
    );
});
