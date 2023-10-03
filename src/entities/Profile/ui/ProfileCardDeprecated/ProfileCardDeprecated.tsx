import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import cls from './ProfileCardDeprecated.module.scss';
import { ProfileCardProps } from '../ProfileCard/ProfileCard';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Input as InputMaterial } from '@/shared/ui/material/Input';
import { Loader } from '@/shared/ui/deprecated/Loader';
import {
    Text as TextDeprecated,
    TextAlign,
    TextTheme,
} from '@/shared/ui/deprecated/Text';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { UserRole } from '@/entities/User';

function maskWords(inputString: string, n: number): string {
    const words = inputString.split(" ");
    const maskedWords = words.map((word) => {
        if (word.length <= n) {
            return word; // Если слово короче или равно n, не изменяем его.
        } else {
            const firstNLetters = word.slice(0, n);
            const maskedPart = "*".repeat(word.length - n);
            return firstNLetters + maskedPart;
        }
    });

    return maskedWords.join(" ");
}

export const ProfileCardDeprecatedError = () => {
    const { t } = useTranslation();

    return (
        <HStack
            justify="center"
            max
            className={classNames(cls.ProfileCard, {}, [cls.error])}
        >
            <TextDeprecated
                theme={TextTheme.ERROR}
                title={t('Произошла ошибка при загрузке профиля')}
                text={t('Попробуйте обновить страницу')}
                align={TextAlign.CENTER}
            />
        </HStack>
    );
};

export const ProfileCardDeprecatedLoader = () => {
    return (
        <HStack
            justify="center"
            max
            className={classNames(cls.ProfileCard, { [cls.loading]: true })}
        >
            <Loader />
        </HStack>
    );
};

export const ProfileCardDeprecated = memo((props: ProfileCardProps) => {
    const {
        className,
        userAuthData,
        userByIdData,
        data,
        readonly,
        onChangeUsername,
        onChangeAvatar,
        onChangeStopWords,
    } = props;
    const { t } = useTranslation('profile');
    const isAdmin = userAuthData?.roles?.includes(UserRole.ADMIN) || false;
    const showStopWords = isAdmin && (userByIdData?.id === userAuthData?.id);
    let newData = data;
    let rows = 1;

    const modsFullWidth: Mods = {
        [cls.fullWidth]: true,
    };

    if (readonly && data) {
        newData = { ...data, stopWords: maskWords(data.stopWords || '', 2) };
    }

    if ( data) {
        if (data && data.stopWords) {
            rows = Math.ceil(data.stopWords.length / 77.4)
        }
    }

    return (
        <Card sx={{ minWidth: 275 }} className={classNames(cls.ProfileCard, {}, [className])}>
            <CardContent>
                <VStack
                    gap="8"
                    max
                    className={classNames(cls.ProfileCard, {}, [className])}
                >
                    <InputMaterial
                        variant="standard"
                        label={t('Введите имя')}
                        fullWidth
                        value={data?.username}
                        className={cls.input}
                        onChange={onChangeUsername}
                        disabled={readonly}
                        data-testid="ProfileCard.userName"
                    />
                    <InputMaterial
                        variant="standard"
                        label={t('Введите ссылку на аватар')}
                        fullWidth
                        value={data?.avatar}
                        className={classNames(cls.input, modsFullWidth, [className])}
                        onChange={onChangeAvatar}
                        disabled={readonly}
                        data-testid="ProfileCard.avatar"
                    />
                    {showStopWords ?
                        <InputMaterial
                            variant="filled"
                            label={t('Введите стоп слова')}
                            fullWidth
                            value={newData?.stopWords}
                            className={classNames(cls.input, modsFullWidth, [className])}
                            onChange={onChangeStopWords}
                            disabled={readonly}
                            rows={rows}
                            data-testid="ProfileCard.stopWords"
                        />
                        :
                        null
                    }
                </VStack>
            </CardContent>
            {data?.avatar && (
                <div className={cls.cardMediaWrapper}>
                    <CardMedia
                        className={cls.cardMedia}
                        component="img"
                        height={showStopWords ? 'auto' : 194}
                        width={200}
                        image={data?.avatar}
                        alt="Paella dish"
                    />
                </div>
            )}
        </Card>
    );
});
