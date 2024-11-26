import React, { useState } from "react";
import {
  Input,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  Button,
  Text,
  Flex,
  IconButton,
  Box,
} from "@chakra-ui/react";

import { BsCalendarDate } from "react-icons/bs";
import { MdArrowLeft, MdArrowRight } from "react-icons/md";
export const ChakraDatePicker = ({
  placeholder = "Select date",
  onChange,
  value,
  minDate,
  maxDate,
}) => {
  const [selectedDate, setSelectedDate] = useState(value || null);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Generate calendar days
  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    const daysInMonth = lastDayOfMonth.getDate();
    const startingDayOfWeek = firstDayOfMonth.getDay();

    const days = [];

    // Add padding days
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add actual days
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  // Check if date is selectable
  const isDateSelectable = (date) => {
    if (minDate && date < minDate) return false;
    if (maxDate && date > maxDate) return false;
    return true;
  };

  // Handle date selection
  const handleDateSelect = (date) => {
    setSelectedDate(date);
    onChange?.(date);
  };

  // Navigate months
  const navigateMonth = (direction) => {
    setCurrentMonth((prev) => {
      const newMonth = new Date(prev);
      newMonth.setMonth(newMonth.getMonth() + direction);
      return newMonth;
    });
  };

  const calendarDays = generateCalendarDays();
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <Popover>
      <PopoverTrigger>
        <Input
          placeholder={placeholder}
          value={selectedDate ? selectedDate.toLocaleDateString() : ""}
          readOnly
          rightElement={<BsCalendarDate />}
        />
      </PopoverTrigger>
      <PopoverContent width="320px">
        <PopoverArrow />
        <PopoverBody p={4}>
          {/* Month Navigation */}
          <Flex justify="space-between" align="center" mb={4}>
            <IconButton
              icon={<MdArrowLeft />}
              variant="ghost"
              onClick={() => navigateMonth(-1)}
            />
            <Text fontWeight="bold">
              {currentMonth.toLocaleString("default", {
                month: "long",
                year: "numeric",
              })}
            </Text>
            <IconButton
              icon={<MdArrowRight />}
              variant="ghost"
              onClick={() => navigateMonth(1)}
            />
          </Flex>

          {/* Weekday Headers */}
          <Flex
            mb={2}
            textAlign="center"
            fontWeight="semibold"
            color="gray.500"
          >
            {weekdays.map((day) => (
              <Box key={day} flex={1}>
                {day}
              </Box>
            ))}
          </Flex>

          {/* Calendar Grid */}
          <Flex flexWrap="wrap">
            {calendarDays.map((day, index) => (
              <Box key={index} width="14.285%" textAlign="center" p={1}>
                {day && (
                  <Button
                    size="sm"
                    width="full"
                    variant={
                      selectedDate &&
                      day.toDateString() === selectedDate.toDateString()
                        ? "solid"
                        : "ghost"
                    }
                    colorScheme={
                      selectedDate &&
                      day.toDateString() === selectedDate.toDateString()
                        ? "blue"
                        : "gray"
                    }
                    onClick={() =>
                      isDateSelectable(day) && handleDateSelect(day)
                    }
                    isDisabled={!isDateSelectable(day)}
                  >
                    {day.getDate()}
                  </Button>
                )}
              </Box>
            ))}
          </Flex>

          {/* Quick Actions */}
          <Flex justify="space-between" mt={4}>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => {
                const today = new Date();
                handleDateSelect(today);
              }}
            >
              Today
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => {
                setSelectedDate(null);
                onChange?.(null);
              }}
            >
              Clear
            </Button>
          </Flex>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
