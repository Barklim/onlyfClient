import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Print from '@mui/icons-material/Print';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { classNames } from '@/shared/lib/classNames/classNames';
import { IconButton } from '@/shared/ui/material/IconButton';
import { Status, StatusType } from '@/shared/ui/deprecated/Status';

function createData(
    name: string,
    calories: string,
    fat: string,
    carbs: number,
    protein: number,
    purchased: number,
    status: boolean,
) {
    return { name, calories, fat, carbs, protein, purchased, status };
}

const rows = [
    createData('Sasha', 'Sep 2, 2023 1:57 pm', '$13.0', 3491, 58, 0, true),
    createData('Masha', 'Sep 6, 2023 1:57 pm', 'free', 3491, 58, 1, false),
    createData('Dasha', 'Sep 1, 2023 1:57 pm', '$13.0', 31, 58, 2, true),
    createData('Kira', 'Sep 5, 2023 1:57 pm', '$13.0', 3491, 158, 3, true),
    createData('Lora', 'Sep 9, 2023 1:57 pm', '$13.0', 3491, 58, 4, false),
];

export const TableMassMailings = memo(() => {
    const { t } = useTranslation('about');

    return <>
        <HStack justify='between'>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker />
            </LocalizationProvider>
            <IconButton>
                <Print color='primary'></Print>
            </IconButton>
        </HStack>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell style={{ width: '10px' }} size="small"></TableCell>
                        <TableCell align="left">Users</TableCell>
                        <TableCell align="left">Date</TableCell>
                        <TableCell align="right">Price&nbsp;</TableCell>
                        <TableCell align="right">Sent&nbsp;</TableCell>
                        <TableCell align="right">Viewed&nbsp;</TableCell>
                        <TableCell align="right">Purchased&nbsp;</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align="left">
                                <div style={{ maxWidth: '100%', width: '32px', height: '32px' }}>
                                    <Status status={ row.status ? StatusType.ONLINE : StatusType.OFFLINE} />
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
    </>;
});

export default TableMassMailings;
