import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Print from '@mui/icons-material/Print';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { classNames } from '@/shared/lib/classNames/classNames';
import { IconButton } from '@/shared/ui/material/IconButton';
import { Status, StatusType } from '@/shared/ui/deprecated/Status';
import { Typography } from '@/shared/ui/material/Typography';
import cls from './TableTableProfile.module.scss';
import { useSelector } from 'react-redux';
import { getUserByIdData, isUserAdmin, isUserManager, UserRole } from '@/entities/User';

function createData(
    number: number,
    name: string,
    calories: string,
    fat: string,
    carbs: string,
    protein: number,
    purchased: number,
    status: boolean,
) {
    return { name, number, calories, fat, carbs, protein, purchased, status };
}

const rows = [
    createData(1,'Sep 2, 2023 1:57 pm', 'Sep 2, 2023 1:57 pm', '2', '1%', 58, 0, true),
    createData(2,'Sep 6, 2023 1:57 pm', 'Sep 6, 2023 1:57 pm', '1', '3%', 58, 1, false),
    createData(3, 'Sep 1, 2023 1:57 pm', 'Sep 1, 2023 1:57 pm', '0', '0%', 58, 2, true),
    createData(4, 'Sep 5, 2023 1:57 pm', 'Sep 5, 2023 1:57 pm', '3', '1%', 58, 3, true),
    createData(5, 'Sep 9, 2023 1:57', 'Sep 9, 2023 1:57 pm', '0', '5%', 58, 4, false),
];

export const TableProfile = memo(() => {
    const { t } = useTranslation('profile');
    const userByIdData = useSelector(getUserByIdData)
    const isManager = userByIdData?.roles?.includes(UserRole.MANAGER) || false;;
    const showStatistics = isManager;

    return <>
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
                                    <TableCell align="left">{row.name}</TableCell>
                                    <TableCell align="left">{row.calories}</TableCell>
                                    <TableCell align="right">{row.fat}</TableCell>
                                    <TableCell align="right">{row.carbs}</TableCell>
                                    <TableCell align="right">{row.protein}</TableCell>
                                    <TableCell align="right">{row.purchased}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
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
    </>;
});

export default TableProfile;
