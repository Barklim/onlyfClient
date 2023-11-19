import React, { memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Print from '@mui/icons-material/Print';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Typography } from '@/shared/ui/material/Typography';
import cls from './TableTableProfile.module.scss';
import { useSelector } from 'react-redux';
import { fetchUserData, getUserByIdData, isUserAdmin, isUserManager, userByIdReducer, UserRole } from '@/entities/User';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { incidentReducer } from '@/features/editableProfileCard/model/slice/incidents';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchIncidentData } from '@/features/editableProfileCard/model/services/fetchIncidentData/fetchIncidentData';
import { fetchProfileData } from '@/features/editableProfileCard/model/services/fetchProfileData/fetchProfileData';
import { getIncidentData } from '@/features/editableProfileCard/model/selectors/incidents/getIncidents';
import { Incident } from '@/features/editableProfileCard/model/types/incidentsSchema';
import { mockIncidents } from '@/shared/const/global';

function createData(
    number: number,
    name: string,
    calories: string,
    fat: string,
    carbs: string,
    protein: number,
    purchased: number,
    status: boolean,
    day: number,
) {
    return { name, number, calories, fat, carbs, protein, purchased, status, day};
}

const createRowsData = (resultArray: AggregatedIncident[]) => {
    const newRows = [] as any[];

    resultArray.forEach((item: AggregatedIncident, index) => {

        let dataWorkShiftHoursStart = '';
        let dataWorkShiftHoursEnd = '';

        switch (item.workShift) {
            case '1':
                dataWorkShiftHoursStart = '00'
                dataWorkShiftHoursEnd = '08'
                break;
            case '2':
                dataWorkShiftHoursStart = '08'
                dataWorkShiftHoursEnd = '16'
                break;
            case '3':
                dataWorkShiftHoursStart = '16'
                dataWorkShiftHoursEnd = '24'
                break;
            default:
                break;
        }

        const start = `${item.start.toLocaleString('en-us', { month: 'short' })} ${('0' + item.start.getDate()).slice(-2)} | ${dataWorkShiftHoursStart}`;
        const end = `${item.end.toLocaleString('en-us', { month: 'short' })} ${('0' + item.end.getDate()).slice(-2)} | ${dataWorkShiftHoursEnd}`;

        newRows.push(
            createData(index, start, end, String(item.incidentCount), '1%', 0, 0, true, item.day as number)
        )
    })

    return newRows;
}

type AggregatedData = {
    [key: string]: {
        id: number;
        workShift: string;
        incidentCount: number;
        day: number;
        start?: Date;
        end?: Date;
    };
};

type AggregatedIncident = {
    id?: number;
    workShift?: string;
    incidentCount?: number;
    day?: number;
    start?: any;
    end?: any;
};

const reducers: ReducersList = {
    incidents: incidentReducer,
};

const getDayOfYear = (dateWithoutTimeZoneUtc: Date) => {
    const timezoneOffsetInMinutes = new Date().getTimezoneOffset();
    const date = new Date(dateWithoutTimeZoneUtc.getTime() + timezoneOffsetInMinutes * 60 * 1000);

    const start = new Date(date.getFullYear(), 0, 0);
    const diff = date.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    return dayOfYear + 1;
};

function getTypeByTime(incidentCreatedAt: any, id: any) {
    const createdAtDate = new Date(incidentCreatedAt);
    const hours = createdAtDate.getHours();

    if (hours >= 0 && hours < 8) {
        return '3';
    } else if (hours >= 8 && hours < 16) {
        return '1';
    } else {
        return '2';
    }
}

export const TableProfile = memo(() => {
    const { t } = useTranslation('profile');
    const userByIdData = useSelector(getUserByIdData)
    const isManager = userByIdData?.roles?.includes(UserRole.MANAGER) || false;;
    const showStatistics = isManager;
    const dispatch = useAppDispatch();
    const incidentData = useSelector(getIncidentData);
    // const incidentData = mockIncidents

    const aggregatedData: AggregatedData = incidentData?.reduce((acc, incident) => {
        const workShift = getTypeByTime(incident?.incident_created_at, incident?.id);
        const key = `${new Date(incident?.incident_created_at).toISOString().split('T')[0]}_${workShift}`;

        if (!acc[key]) {
            // @ts-ignore
            acc[key] = {
                id: incident?.id,
                workShift: workShift,
                incidentCount: 1,
                day: getDayOfYear(new Date(incident?.incident_created_at)),
                start: undefined,
                end: undefined,
            } as AggregatedData;
        } else {
            acc[key].incidentCount += 1;
        }

        if (acc[key]?.day !== undefined && acc[key]?.workShift !== undefined && acc[key].start === undefined && acc[key].end === undefined) {
            const dateWithoutTimeZoneUtc = new Date(incident?.incident_created_at);

            const timezoneOffsetInMinutes = new Date().getTimezoneOffset();
            const date = new Date(dateWithoutTimeZoneUtc.getTime() + timezoneOffsetInMinutes * 60 * 1000);

            const setHoursWithDate = (originalDate: Date, hours: number, minutes: number, seconds: number, milliseconds: number) => {
                const newDate = new Date(originalDate);
                newDate.setHours(hours, minutes, seconds, milliseconds);
                return newDate;
            };

            switch (workShift) {
                case '1':
                    acc[key].start = setHoursWithDate(date, 0, 0, 0, 0);
                    acc[key].end = setHoursWithDate(date, 8, 0, 0, 0);
                    break;
                case '2':
                    acc[key].start = setHoursWithDate(date, 8, 0, 0, 0);
                    acc[key].end = setHoursWithDate(date, 16, 0, 0, 0);
                    break;
                case '3':
                    acc[key].start = setHoursWithDate(date, 16, 0, 0, 0);
                    acc[key].end = setHoursWithDate(date, 23, 59, 0, 0);
                    break;
                default:
                    break;
            }
        }

        return acc;
    }, {} as AggregatedData) || {};

    const resultArray: AggregatedIncident[] = Object.values(aggregatedData) || [];

    resultArray.sort((a, b) => {
        if (a?.day !== undefined && b?.day !== undefined) {
            if (a.day !== b.day) {
                return b.day - a.day;
            } else {
                const shiftOrder = ["1", "2", "3"];
                return shiftOrder.indexOf(b?.workShift as string) - shiftOrder.indexOf(a?.workShift as string);
            }
        } else if (a?.day === undefined && b?.day !== undefined) {
            return 1;
        } else if (a?.day !== undefined && b?.day === undefined) {
            return -1;
        } else {
            const shiftOrder = ["1", "2", "3"];
            return shiftOrder.indexOf(b?.workShift as string) - shiftOrder.indexOf(a?.workShift as string);
        }
    });
    
    const rows = createRowsData(resultArray);

    useEffect(() => {
        if (userByIdData?.id) {
            dispatch(fetchIncidentData(userByIdData.id));
        }
    }, [userByIdData]);

    return <>
        <DynamicModuleLoader reducers={reducers}>
            {showStatistics ?
                <VStack gap='16'>
                    <HStack className={cls.header}>
                        <Typography variant='h5' color='primary'>
                            {t('Violations')}
                        </Typography>
                    </HStack>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ width: '10px' }} size="small"></TableCell>
                                    <TableCell align="left">StartDate</TableCell>
                                    <TableCell align="left">EndDate</TableCell>
                                    <TableCell align="right">Violations count</TableCell>
                                    <TableCell align="right">ViolationsPercentage</TableCell>
                                    <TableCell align="right">ViolationsStopWords</TableCell>
                                    <TableCell align="right">ActiveDialogs</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <TableRow
                                        key={row.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell align="left">
                                            <div style={{ maxWidth: '100%', width: '52px' }}>
                                                {row.number}
                                            </div>
                                        </TableCell>
                                        <TableCell style={{ backgroundColor: row.day % 2 === 0 ? '#faf4fb' : 'transparent' }} align="left">{row.name}</TableCell>
                                        <TableCell style={{ backgroundColor: row.day % 2 === 0 ? '#faf4fb' : 'transparent' }} align="left">{row.calories}</TableCell>
                                        <TableCell align="right">{row.fat}</TableCell>
                                        <TableCell align="right">{row.carbs}</TableCell>
                                        <TableCell align="right">{row.protein}</TableCell>
                                        <TableCell align="right">{row.purchased}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    {
                        incidentData?.length === 0 ?
                            <Typography variant='subtitle1' color='primary'>
                                Нет данных
                            </Typography>
                            :
                            null
                    }
                    <VStack gap='16'>
                        <Typography variant='subtitle1' color='primary'>
                            Общее количество нарушений за все время:
                        </Typography>
                        <Typography variant='subtitle2' color='primary'>
                            По времени: 2
                        </Typography>
                        <Typography variant='subtitle2' color='primary'>
                            По словам: 2
                        </Typography>
                    </VStack>
                </VStack>
                :
                null
            }
        </DynamicModuleLoader>
    </>;
});

export default TableProfile;
