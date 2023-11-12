import React, { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './NotificationItem.module.scss';
import { Notification } from '../../model/types/notification';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Typography } from '@/shared/ui/material/Typography';
import { Icon } from '@/shared/ui/redesigned/Icon';
import Xmark from '@/shared/assets/icons/xmark.svg';

interface NotificationItemProps {
    className?: string;
    skeleton?: any;
    item?: Notification;
}

export const NotificationItem = memo((props: NotificationItemProps) => {
    const { className, item, skeleton } = props;

    if (skeleton) {
        return skeleton;
    }

    let day = 0;
    let month = 0;
    let year = 0;
    let hours = 0;
    let minutes = 0;

    const dateObject = item?.created_at ? new Date(item.created_at) : null;


    if (dateObject) {
        day = dateObject.getDate();
        month = dateObject.getMonth() + 1;
        year = dateObject.getFullYear();

        hours = dateObject.getHours();
        minutes = dateObject.getMinutes();

        const formattedDate = `${day}.${month}.${year} (${hours}:${minutes})`;
    }

    const content = (
        <VStack
            gap="8"
            max
            className={classNames(cls.NotificationItem, {}, [className])}
        >
            <HStack
                justify="between" max
            >
                {item ? (
                    <>
                        <Typography
                            color='#27272B'
                            fontWeight={'700'}
                            fontSize={'14px'}
                            lineHeight={'24px'}
                        >
                            {item && (
                                <>{item?.title}</>
                            )}
                        </Typography>

                        <Icon
                            fill="#72899d"
                            width={20}
                            height={20}
                            Svg={Xmark}
                            clickable
                            onClick={() => { console.log('clicked') }}
                        />
                    </>
                ) : null}
            </HStack>

            {item && item.text ? (
                <Typography
                    color='primary'
                    fontWeight={'400'}
                    fontSize={'16px'}
                >
                    <div dangerouslySetInnerHTML={{ __html: item.text }} />
                </Typography>
            ) : null}

            <Typography
                color='#72899d'
                fontWeight={'700'}
                fontSize={'12px'}
                lineHeight={'20px'}
            >
                {item && (
                    <>
                        {`${day}.${month}.${year}`} &nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp; {`${hours}:${minutes}`}
                    </>
                )}
            </Typography>
        </VStack>
    );

    // if (item.href) {
    //     return (
    //         <a
    //             className={cls.link}
    //             target="_blank"
    //             href={item.href}
    //             rel="noreferrer"
    //         >
    //             {content}
    //         </a>
    //     );
    // }

    return content;
});
