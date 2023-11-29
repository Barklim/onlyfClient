import React from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Maintenance.module.scss';
import { HTMLAttributes } from 'react';
import { Typography } from '@/shared/ui/material/Typography';
import { IconButton } from '@/shared/ui/material/IconButton';
import { Warning } from '@mui/icons-material';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { useTranslation } from 'react-i18next';

interface TypographyProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
}

export const Maintenance = ((props: TypographyProps) => {
    const {
        className,
    } = props;
    const { t } = useTranslation();

    return (
        <HStack className={classNames(cls.MaintenanceWrapper, {}, [className])}>
            <Typography variant="subtitle1" color='primary'>
                {t('Находится в разарботке')}...
            </Typography>
            <IconButton>
                <Warning color='warning'/>
            </IconButton>
        </HStack>
    );
});
