import React, { useEffect, useState } from 'react';
import styles from "../styles/SelectWeek.module.css";
import '../../../styles/Footer.module.css';
import dayjs from 'dayjs';
import isBetweenPlugin from 'dayjs/plugin/isBetween';
import { styled } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';

dayjs.extend(isBetweenPlugin);

interface CustomPickerDayProps extends PickersDayProps<dayjs.Dayjs> {
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
  ...(day.day() === 0 && {
    borderTopLeftRadius: '50%',
    borderBottomLeftRadius: '50%',
  }),
  ...(day.day() === 6 && {
    borderTopRightRadius: '50%',
    borderBottomRightRadius: '50%',
  }),
})) as React.ComponentType<CustomPickerDayProps>;

const isInSameWeek = (dayA: dayjs.Dayjs, dayB: dayjs.Dayjs | null | undefined) => {
  if (dayB == null) {
    return false;
  }

  return dayA.isSame(dayB, 'week');
};

function Day(
  props: PickersDayProps<dayjs.Dayjs> & {
    selectedDay?: dayjs.Dayjs | null;
    hoveredDay?: dayjs.Dayjs | null;
  },
) {
  const { day, selectedDay, hoveredDay, ...other } = props;

  return (
    <CustomPickersDay
      {...other}
      day={day}
      sx={{ px: 2.5 }}
      disableMargin
      selected={false}
      isSelected={isInSameWeek(day, selectedDay)}
      isHovered={isInSameWeek(day, hoveredDay)}
    />
  );
}

const WeekPicker = ({ selectedDate, onDateChange }: { selectedDate: string; onDateChange: (newDate: string) => void }) => {
  const [hoveredDay, setHoveredDay] = React.useState<dayjs.Dayjs | null>(null);
  const [value, setValue] = React.useState<dayjs.Dayjs | null>(dayjs(selectedDate));

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
          onDateChange(newValue.format('YYYY-MM-DD'));
        }}
        showDaysOutsideCurrentMonth
        displayWeekNumber
        slots={{ day: Day }}
        slotProps={{
          day: (ownerState) =>
            ({
              selectedDay: value,
              hoveredDay,
              onPointerEnter: () => setHoveredDay(ownerState.day),
              onPointerLeave: () => setHoveredDay(null),
            } as any),
        }}
      />
    </LocalizationProvider>
  );
};

interface SelectWeekProps {
  selectedDate: string;
  onDateChange: (newDate: string) => void;
}

const SelectWeek: React.FC<SelectWeekProps> = ({ selectedDate, onDateChange }) => {
  return (
    <div>
      <WeekPicker selectedDate={selectedDate} onDateChange={onDateChange} />
    </div>
  );
};

export default SelectWeek;
