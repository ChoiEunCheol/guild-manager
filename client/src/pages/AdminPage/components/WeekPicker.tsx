import React, { useEffect, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import koLocale from 'dayjs/locale/ko';
import updateLocale from 'dayjs/plugin/updateLocale';
import { styled } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import { Modal } from '@mui/material';

dayjs.extend(weekOfYear);
dayjs.extend(updateLocale);
dayjs.updateLocale('ko', {
    weekStart: 1,
});

interface CustomPickerDayProps extends PickersDayProps<Dayjs> {
    isSelected: boolean;
    isHovered: boolean;
}

const CustomPickersDay = styled(PickersDay, {
    shouldForwardProp: (prop) => prop !== 'isSelected' && prop !== 'isHovered',
})<CustomPickerDayProps>(({ theme, isSelected, isHovered, day }) => ({
    borderRadius: 0,
    ...(isSelected && {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        '&:hover, &:focus': {
            backgroundColor: theme.palette.primary.main,
        },
    }),
    ...(isHovered && {
        backgroundColor: theme.palette.primary[theme.palette.mode],
        '&:hover, &:focus': {
            backgroundColor: theme.palette.primary[theme.palette.mode],
        },
    }),
    ...(day.day() === 1 && {
        borderTopLeftRadius: '50%',
        borderBottomLeftRadius: '50%',
    }),
    ...(day.day() === 0 && {
        borderTopRightRadius: '50%',
        borderBottomRightRadius: '50%',
    }),
})) as React.ComponentType<CustomPickerDayProps>;

const isInSameWeek = (dayA: Dayjs, dayB: Dayjs | null | undefined) => {
    if (dayB == null) {
        return false;
    }

    return dayA.isSame(dayB, 'week');
};

function Day(
    props: PickersDayProps<Dayjs> & {
        selectedDay?: Dayjs | null;
        hoveredDay?: Dayjs | null;
        weekNumber?: number;
    },
) {
    const { day, selectedDay, hoveredDay, weekNumber, ...other } = props;

    return (
        <CustomPickersDay
            {...other}
            day={day}
            sx={{ px: 2.5 }}
            disableMargin
            isSelected={isInSameWeek(day, selectedDay)}
            isHovered={isInSameWeek(day, hoveredDay)}
        >
        </CustomPickersDay>
    );
}

interface WeekPickerProps {
    selectedDate: Dayjs | null;
    onDateChange: (newDate: Dayjs | null) => void;
}

const WeekPicker: React.FC<WeekPickerProps> = ({ selectedDate, onDateChange }) => {
    const [minDate, setMinDate] = useState(dayjs());
    const [maxDate, setMaxDate] = useState(dayjs());
    const [hoveredDay, setHoveredDay] = useState<Dayjs | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false); // 추가

    useEffect(() => {
        const today = dayjs();
        const past28Days = today.subtract(28, 'day');
        const next7Days = today.add(7, 'day');

        setMinDate(past28Days);
        setMaxDate(next7Days);
    }, []);

    return (
        <div>
            <button onClick={() => setIsModalOpen(true)}>Open Week Picker</button>
            <Modal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={koLocale.name || 'ko'}>
                    <DateCalendar
                        value={selectedDate}
                        onChange={(newValue) => {
                            onDateChange(newValue);
                            setIsModalOpen(false); // 날짜 선택 시 팝업 닫기
                        }}
                        showDaysOutsideCurrentMonth
                        displayWeekNumber
                        slots={{ day: Day }}
                        slotProps={{
                            day: (ownerState: { day: Dayjs }) => ({
                                selectedDay: selectedDate,
                                hoveredDay,
                                weekNumber: ownerState.day.week(),
                                onPointerEnter: () => setHoveredDay(ownerState.day),
                                onPointerLeave: () => setHoveredDay(null),
                            }),
                        }}
                        maxDate={maxDate}
                        minDate={minDate}
                        sx={{ maxWidth: '300px', width: '100%' }}
                    />
                </LocalizationProvider>
            </Modal>
        </div>
    );
}

export default WeekPicker;
