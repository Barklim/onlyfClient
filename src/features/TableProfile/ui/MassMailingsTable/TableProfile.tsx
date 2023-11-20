import React, { memo, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Print from '@mui/icons-material/Print';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Typography } from '@/shared/ui/material/Typography';
import cls from './TableTableProfile.module.scss';
import { useSelector } from 'react-redux';
import { getUserByIdData, UserRole } from '@/entities/User';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { incidentReducer, incidentStopReducer } from '@/features/editableProfileCard/model/slice/incidents';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchIncidentData } from '@/features/editableProfileCard/model/services/fetchIncidentData/fetchIncidentData';
import {
    getIncidentData,
    getIncidentStopData,
} from '@/features/editableProfileCard/model/selectors/incidents/getIncidents';
import { mockIncidents } from '@/shared/const/global';
import { fetchIncidentByStopWordsData } from '@/features/editableProfileCard/model/services/fetchIncidentByStopWordsData/fetchIncidentByStopWordsData';
import { Incident } from '@/features/editableProfileCard/model/types/incidentsSchema';

const reducers: ReducersList = {
    incidents: incidentReducer,
    incidentsStopWords: incidentStopReducer,
};

type AggregatedData = {
    [key: string]: {
        id: number;
        workShift: string;
        incidentCount: number;
        incidentStopCount: number;
        day: number;
        start?: Date;
        end?: Date;
    };
};

type AggregatedIncident = {
    id?: number;
    workShift?: string;
    incidentCount?: number;
    incidentStopCount?: number;
    incident_created_at?: string;
    day?: number;
    start?: any;
    end?: any;
};

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

const createRowsData = (resultArray: AggregatedIncident[], incidentStopWordsData: Incident[]) => {
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
            createData(index, start, end, String(item.incidentCount), '1%', Number(item.incidentStopCount), 0, true, item.day as number)
        )
    })

    return newRows;
}

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
    let minDate = null as any;
    let maxDate = null as any;
    // const [incidentData, setIncidentData] = useState<AggregatedIncident[]>(mockIncidents);
    const [incidentData, setIncidentData] = useState<AggregatedIncident[]>([]);
    const [incidentStopWordsData, setIncidentStopWordsData] = useState<AggregatedIncident[]>([]);

    const aggregatedData: AggregatedData = Array.isArray(incidentData) ? incidentData.reduce((acc, incident) => {
        const incidentCreatedAt = (incident as any)?.incident_created_at;
        const workShift = getTypeByTime(incidentCreatedAt, incident?.id);
        const key = `${new Date(incidentCreatedAt).toISOString().split('T')[0]}_${workShift}`;

        if (!acc[key]) {
            // @ts-ignore
            acc[key] = {
                id: incident?.id,
                workShift: workShift,
                incidentCount: 1,
                incidentStopCount: 0,
                day: getDayOfYear(new Date(incidentCreatedAt)),
                start: undefined,
                end: undefined,
            } as AggregatedData;
        } else {
            acc[key].incidentCount += 1;
        }

        if (acc[key]?.day !== undefined && acc[key]?.workShift !== undefined && acc[key].start === undefined && acc[key].end === undefined) {
            const dateWithoutTimeZoneUtc = new Date(incidentCreatedAt);

            const timezoneOffsetInMinutes = new Date().getTimezoneOffset();
            const date = new Date(dateWithoutTimeZoneUtc.getTime() + timezoneOffsetInMinutes * 60 * 1000);

            if (!minDate || date < minDate) {
                minDate = date;
            }
            if (!maxDate || date > maxDate) {
                maxDate = date;
            }

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
    }, {} as AggregatedData) : {};


    const completeAggregatedData = { ...aggregatedData };

    const startDate = minDate;
    const endDate = maxDate;
    const shifts = ["1", "2", "3"];

    for (let currentDate = new Date(startDate); currentDate <= endDate; currentDate.setDate(currentDate.getDate() + 1)) {
        shifts.forEach((shift) => {
            const key = `${currentDate.toISOString().split('T')[0]}_${shift}`;

            if (!completeAggregatedData[key]) {
                completeAggregatedData[key] = {
                    id: 0,
                    workShift: shift,
                    incidentCount: 0,
                    incidentStopCount: 0,
                    day: getDayOfYear(currentDate),
                    start: undefined,
                    end: undefined,
                };
            }

            const dateWithoutTimeZoneUtc = currentDate;
            const timezoneOffsetInMinutes = new Date().getTimezoneOffset();
            const date = new Date(dateWithoutTimeZoneUtc.getTime() + timezoneOffsetInMinutes * 60 * 1000);

            const setHoursWithDate = (originalDate: Date, hours: number, minutes: number, seconds: number, milliseconds: number) => {
                const newDate = new Date(originalDate);
                newDate.setHours(hours, minutes, seconds, milliseconds);
                return newDate;
            };
            switch (shift) {
                case '1':
                    completeAggregatedData[key].start = setHoursWithDate(date, 0, 0, 0, 0);
                    completeAggregatedData[key].end = setHoursWithDate(date, 8, 0, 0, 0);
                    break;
                case '2':
                    completeAggregatedData[key].start = setHoursWithDate(date, 8, 0, 0, 0);
                    completeAggregatedData[key].end = setHoursWithDate(date, 16, 0, 0, 0);
                    break;
                case '3':
                    completeAggregatedData[key].start = setHoursWithDate(date, 16, 0, 0, 0);
                    completeAggregatedData[key].end = setHoursWithDate(date, 23, 59, 0, 0);
                    break;
                default:
                    break;
            }
        });
    }

    const completeResultArray: AggregatedIncident[] = Object.values(completeAggregatedData) || [];
    // console.log('!!! completeAggregatedData');
    // console.log(completeAggregatedData);

    const resultArray: AggregatedIncident[] = Object.values(completeResultArray) || [];

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

    resultArray.forEach((resultItem) => {
        incidentStopWordsData.forEach((stopWordItem) => {
            const stopWordDateStr = stopWordItem.incident_created_at;

            if (stopWordDateStr) {
                const stopWordDate = new Date(stopWordDateStr);

                stopWordDate.setMinutes(stopWordDate.getMinutes() + new Date().getTimezoneOffset());

                const resultStartDate = resultItem.start ? new Date(resultItem.start.getTime()) : null;
                const resultEndDate = resultItem.end ? new Date(resultItem.end.getTime()) : null;

                if (resultStartDate && resultEndDate) {
                    const stopWordDateTime = stopWordDate.getTime();

                    const isInInterval =
                        stopWordDateTime >= resultStartDate.getTime() &&
                        stopWordDateTime <= resultEndDate.getTime();

                    if (isInInterval) {
                        resultItem.incidentStopCount = (resultItem.incidentStopCount || 0) + 1;
                    }

                }

            }
        });
    });

    const rows = createRowsData(resultArray, incidentStopWordsData as Incident[]);

    useEffect(() => {
        const fetchData = async () => {
            if (userByIdData?.id) {
                try {
                    const [incidents, stopWordsIncidents] = await Promise.all([
                        dispatch(fetchIncidentData({ managerId: userByIdData.id, type: 0 })),
                        dispatch(fetchIncidentByStopWordsData({ managerId: userByIdData.id, type: 1 })),
                    ]);

                    if (incidents && stopWordsIncidents) {
                        // @ts-ignore
                        setIncidentData(incidents.payload)
                        // @ts-ignore
                        setIncidentStopWordsData(stopWordsIncidents.payload);

                    } else {
                        console.error('Не удалось получить данные');
                    }
                } catch (error) {
                    console.error('Произошла ошибка при получении данных:', error);
                }
            }
        };

        fetchData();
    }, [userByIdData]);

    if (!incidentData || !incidentStopWordsData) {
        return <div>Loading...</div>;
    }


    return <>
        <DynamicModuleLoader reducers={reducers}>
            {showStatistics && incidentData && incidentStopWordsData ?
                <VStack gap='16' max>
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
                                        <TableCell style={{ backgroundColor: row.day % 2 === 0 ? '#faf4fb' : 'transparent' }} align="left">
                                            <div style={{ maxWidth: '100%', width: '52px' }}>
                                                {row.number}
                                            </div>
                                        </TableCell>
                                        <TableCell style={{ backgroundColor: row.day % 2 === 0 ? '#faf4fb' : 'transparent' }} align="left">{row.name}</TableCell>
                                        <TableCell style={{ backgroundColor: row.day % 2 === 0 ? '#faf4fb' : 'transparent' }} align="left">{row.calories}</TableCell>
                                        <TableCell style={{ backgroundColor: row.day % 2 === 0 ? '#faf4fb' : 'transparent' }} align="right">{row.fat}</TableCell>
                                        <TableCell style={{ backgroundColor: row.day % 2 === 0 ? '#faf4fb' : 'transparent' }} align="right">{row.carbs}</TableCell>
                                        <TableCell style={{ backgroundColor: row.day % 2 === 0 ? '#faf4fb' : 'transparent' }} align="right">{row.protein}</TableCell>
                                        <TableCell style={{ backgroundColor: row.day % 2 === 0 ? '#faf4fb' : 'transparent' }} align="right">{row.purchased}</TableCell>
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
