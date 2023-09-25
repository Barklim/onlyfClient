import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input';
import {
    Button as ButtonDeprecated,
    ButtonTheme,
} from '@/shared/ui/deprecated/Button';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { HStack } from '@/shared/ui/redesigned/Stack';
import {
    addCommentFormActions,
    addCommentFormReducer,
} from '../../model/slices/addCommentFormSlice';
import {
    getAddCommentFormError,
    getAddCommentFormText,
} from '../../model/selectors/addCommentFormSelectors';
import cls from './AddCommentForm.module.scss';
import { ToggleFeatures } from '@/shared/lib/features';
import { Input } from '@/shared/ui/redesigned/Input';
import { Button } from '@/shared/ui/redesigned/Button';
import { Card } from '@/shared/ui/redesigned/Card';

export interface AddCommentFormProps {
    className?: string;
    onSendComment: (text: string) => void;
}

const reducers: ReducersList = {
    addCommentForm: addCommentFormReducer,
};

const AddCommentForm = memo((props: AddCommentFormProps) => {
    const { className, onSendComment } = props;
    const { t } = useTranslation();
    const text = useSelector(getAddCommentFormText);
    const error = useSelector(getAddCommentFormError);
    const dispatch = useAppDispatch();

    const onCommentTextChange = useCallback(
        (value: string) => {
            dispatch(addCommentFormActions.setText(value));
        },
        [dispatch],
    );

    const onSendHandler = useCallback(() => {
        onSendComment(text || '');
        onCommentTextChange('');
    }, [onCommentTextChange, onSendComment, text]);

    return (
        <DynamicModuleLoader reducers={reducers}>
            <ToggleFeatures
                feature="isAppRedesigned"
                on={
                    <Card padding="24" border="partial" fullWidth>
                        <HStack
                            data-testid="AddCommentForm"
                            justify="between"
                            max
                            gap="16"
                            className={classNames(
                                cls.AddCommentFormRedesigned,
                                {},
                                [className],
                            )}
                        >
                            <Input
                                className={cls.input}
                                placeholder={t('Введите текст комментария')}
                                value={text}
                                data-testid="AddCommentForm.Input"
                                onChange={onCommentTextChange}
                            />
                            <Button
                                data-testid="AddCommentForm.Button"
                                onClick={onSendHandler}
                            >
                                {t('Отправить')}
                            </Button>
                        </HStack>
                    </Card>
                }
                off={
                    <HStack
                        data-testid="AddCommentForm"
                        justify="between"
                        max
                        className={classNames(cls.AddCommentForm, {}, [
                            className,
                        ])}
                    >
                        <InputDeprecated
                            className={cls.input}
                            placeholder={t('Введите текст комментария')}
                            value={text}
                            data-testid="AddCommentForm.Input"
                            onChange={onCommentTextChange}
                        />
                        <ButtonDeprecated
                            data-testid="AddCommentForm.Button"
                            theme={ButtonTheme.OUTLINE}
                            onClick={onSendHandler}
                        >
                            {t('Отправить')}
                        </ButtonDeprecated>
                    </HStack>
                }
            />
        </DynamicModuleLoader>
    );
});

export default AddCommentForm;
