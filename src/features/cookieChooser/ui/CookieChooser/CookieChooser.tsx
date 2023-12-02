import { useTranslation } from 'react-i18next';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { Modal } from '@/shared/ui/redesigned/Modal';
import { saveJsonSettings, useJsonSettings } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Drawer } from '@/shared/ui/redesigned/Drawer';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import cls from './CookieChooser.module.scss';
import { Button } from '@mui/material';
import { Typography } from '@/shared/ui/material/Typography';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { COOKIE_NECESSARY_LOCALSTORAGE_KEY, COOKIE_ANALYTICAL_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';

export const CookieChooser = memo(() => {
    const { t } = useTranslation('');
    const [isOpen, setIsOpen] = useState(false);
    const [cookieNec, setCookieNec] = useState<string | null>(localStorage.getItem(COOKIE_NECESSARY_LOCALSTORAGE_KEY));
    const [cookieAn, setCookieAn] = useState<string | null>(localStorage.getItem(COOKIE_ANALYTICAL_LOCALSTORAGE_KEY));
    const { isCookieDefined } = useJsonSettings();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!cookieNec && !cookieAn) {
            setIsOpen(true);
            dispatch(saveJsonSettings({ isCookieDefined: true }));
        }
    }, [dispatch, isCookieDefined]);

    const onClose = () => setIsOpen(false);

    const acceptNecessary = useCallback(() => {
        localStorage.setItem(COOKIE_NECESSARY_LOCALSTORAGE_KEY, 'true')
        localStorage.setItem(COOKIE_ANALYTICAL_LOCALSTORAGE_KEY, 'false')
        onClose()
    }, []);

    const acceptAll = useCallback(() => {
        localStorage.setItem(COOKIE_NECESSARY_LOCALSTORAGE_KEY, 'false')
        localStorage.setItem(COOKIE_ANALYTICAL_LOCALSTORAGE_KEY, 'true')
        onClose()
    }, []);

    const textTitle = <Typography variant='h5' color='primary' fontWeight='700'>{t('Cookie modal title')}</Typography>
    const text1 = <Typography variant="subtitle1" color="primary">{t('Cookie modal text1')}</Typography>
    const text2 = <Typography variant="subtitle1" color="primary">{t('Cookie modal text2')}</Typography>
    const text3 = (
        <Typography variant="subtitle1" color="primary">
            {t('Cookie modal text3')} &nbsp;
            <AppLink to={'/'} className={cls.link}>
                Cookies page
            </AppLink>
            .
        </Typography>
    );

    const content = (
        <VStack gap={'16'}>
            {textTitle}

            <VStack gap={'16'} className={cls.contentWrapper}>
                {text1}
                {text2}
                {text3}
            </VStack>

            <HStack gap={'16'} justify={'center'} max>
                <Button size="medium" onClick={acceptNecessary} variant={'outlined'}>
                    <Typography
                        variant="subtitle2"
                        color='rgb(78, 103, 131)'
                        fontSize='12px'
                        fontWeight='500'
                        lineHeight='1.57'
                    >
                        {t('Accept necessary')} <br/>cookies
                    </Typography>
                </Button>

                <Button size="medium" onClick={acceptAll} variant={'contained'}>
                    <Typography
                        variant="subtitle2"
                        color="primary"
                        fontSize='12px'
                        fontWeight='500'
                        lineHeight='1.57'
                    >
                        {t('Accept all')} <br/>cookies
                    </Typography>
                </Button>
            </HStack>
        </VStack>
    )

    if (isMobile) {
        return (
            <Drawer lazy isOpen={isOpen} onClose={onClose}>
                {content}
            </Drawer>
        );
    }

    return (
        <Modal lazy isOpen={isOpen} onClose={onClose} position={'rightBottom'} width={'386px'}>
            {content}
        </Modal>
    );
});
