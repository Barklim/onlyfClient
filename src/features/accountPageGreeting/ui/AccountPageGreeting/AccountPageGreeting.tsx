import { useTranslation } from 'react-i18next';
import { memo, useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { Modal } from '@/shared/ui/redesigned/Modal';
import { Text } from '@/shared/ui/deprecated/Text';
import { saveJsonSettings, useJsonSettings } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Drawer } from '@/shared/ui/redesigned/Drawer';

export const AccountPageGreeting = memo(() => {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const { isAccountsPageWasOpened } = useJsonSettings();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!isAccountsPageWasOpened) {
            setIsOpen(true);
            dispatch(saveJsonSettings({ isAccountsPageWasOpened: true }));
        }
    }, [dispatch, isAccountsPageWasOpened]);

    const onClose = () => setIsOpen(false);

    const text = (
        <Text
            title={t('GreetingsText')}
            text={t(
                'GreetingsSubText',
            )}
        />
    );

    if (isMobile) {
        return (
            <Drawer lazy isOpen={isOpen} onClose={onClose}>
                {text}
            </Drawer>
        );
    }

    return (
        <Modal lazy isOpen={isOpen} onClose={onClose}>
            {text}
        </Modal>
    );
});
