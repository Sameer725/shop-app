import { useMutation, useQuery } from '@apollo/client';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet } from 'react-native';

import { KS_ICON } from '@assets/icons';
import theme from '@assets/theme/theme';
import { Box, Button, ButtonSize, ButtonType, PlaceHolder, Text } from '@components';
import {
  useDisplayTimerAndMinuteCount,
  useLocalizedData,
  useOrderAction,
  useOrderState,
  useUpdateTimerAndReFetchOrder,
} from '@contexts';
import { GET_PUBLIC_HOLIDAYS, UPDATE_ORDER_DELIVERY_DATE } from '@graphqlDocuments';
import { useToastNotification } from '@hooks/useToastNotification';
import { DeliveryDate, Order, PublicHolidaysQuery, UpdateOrderDeliveryDateMutation } from '@types';

interface UpdatedDeliveryDate extends DeliveryDate {
  isDisabled?: boolean;
}

interface NextOrderComponentProps {
  messageForOneMinute: string;
  messageForXminute: string;
}
const NextOrderComponent = (props: NextOrderComponentProps) => {
  const { messageForOneMinute, messageForXminute } = props;

  const { displayTimer, timerCountInMinute } = useDisplayTimerAndMinuteCount();

  return displayTimer ? (
    <Box
      backgroundColor="gray100"
      paddingHorizontal="s2"
      paddingTop="s3"
      paddingBottom="s1"
      borderBottomEndRadius={theme.radii.md}
      borderBottomStartRadius={theme.radii.md}
      style={styles.timerStyles}
    >
      <Text variant="text-xs" color="primary500" marginBottom="s1">
        {timerCountInMinute === 1
          ? messageForOneMinute
          : messageForXminute.replace(':xMinutes', String(timerCountInMinute))}
      </Text>
    </Box>
  ) : null;
};

export const DeliveryDates: React.FC = () => {
  const { strings } = useLocalizedData();

  const { activeOrder } = useOrderState();
  const { setActiveOrder, setEarliestDeliveryTime } = useOrderAction();
  const { updateTimer } = useUpdateTimerAndReFetchOrder();
  const { showGeneralErrorToast } = useToastNotification();

  const [selectedDeliveryDateId, setSelectedDeliveryDateId] = useState<string | undefined>();
  const [activeTab, setActiveTab] = useState<number>();
  const [completeList, setCompleteList] = useState<UpdatedDeliveryDate[]>([]);
  const [isSameDay, setIsSameDay] = useState<boolean>(true);

  const { data: holidaysList, loading: isHolidaysLoading } = useQuery<PublicHolidaysQuery>(GET_PUBLIC_HOLIDAYS, {
    variables: {
      options: {
        fromDate: dayjs().add(1, 'day').startOf('day'),
        toDate: dayjs().add(6, 'day').endOf('day'),
      },
    },
  });

  const today = dayjs().day() === 0 ? 7 : dayjs().day();

  // Day of the week for first day to display => tomorrow (sunday should be 7 instead of 0)
  const firstDay =
    dayjs()
      .add(isSameDay ? 0 : 1, 'day')
      .day() === 0
      ? 7
      : dayjs()
          .add(isSameDay ? 0 : 1, 'day')
          .day();
  const diff = (activeTab ? activeTab - firstDay : 0) + (isSameDay ? 0 : 1);

  const rawSelectedDate = dayjs().add(diff < 0 ? diff + 7 : diff, 'day');
  const selectedDate = rawSelectedDate.format('DD.MM.YYYY');

  // Array of working weekdays (Mo, Di, Mi, Do, Fr, Sa, So)
  const showingWeekDays = dayjs.weekdaysShort(true).map((day, index) => {
    return {
      day,
      weekDay: index + 1,
    };
  });

  // Array of next 4 days in sorted order
  const sortedShowingWeekDays = [...showingWeekDays, ...showingWeekDays].slice(
    firstDay - 1,
    firstDay + (isSameDay ? 3 : 4)
  );

  const [updateOrderDeliveryDate, { loading: isLoading }] = useMutation<UpdateOrderDeliveryDateMutation>(
    UPDATE_ORDER_DELIVERY_DATE,
    {
      onError: () => showGeneralErrorToast(),
      onCompleted: (data) => {
        const updatedActiveOrder = { ...activeOrder, customFields: data.updateOrderDeliveryDate.customFields };
        setActiveOrder(updatedActiveOrder as Order);
        void setEarliestDeliveryTime(updatedActiveOrder.customFields?.earliestDeliveryTime as Date);

        updateTimer(data.updateOrderDeliveryDate.customFields?.orderByTimeDate as Date);
      },
    }
  );

  useEffect(() => {
    const deliveryDates = activeOrder?.shippingLines?.[0]?.shippingMethod.customFields?.deliveryDates;
    if (deliveryDates?.find((date) => date.deliveryWeekday === today && date.orderByDay === today)) {
      setIsSameDay(true);
    } else {
      setIsSameDay(false);
    }

    const activeDeliveryDate = deliveryDates?.find((item) => item.id === activeOrder?.customFields?.deliveryDate?.id);
    setActiveTab(activeDeliveryDate?.deliveryWeekday ?? firstDay);
    setSelectedDeliveryDateId(activeOrder?.customFields?.deliveryDate?.id);
  }, [activeOrder]);

  const activeList = completeList
    ?.filter((date: DeliveryDate) => date.deliveryWeekday === activeTab)
    .sort((a: DeliveryDate, b: DeliveryDate) => {
      if (a.earliestDeliveryTime > b.earliestDeliveryTime) {
        return 1;
      }
      return -1;
    });

  useEffect(() => {
    const isPartialHoliday = holidaysList?.publicHolidays?.some((holiday) => !holiday.isFullDay);

    if (isPartialHoliday) {
      const updatedList = activeOrder?.shippingLines?.[0]?.shippingMethod.customFields?.deliveryDates?.map(
        (item: DeliveryDate) => {
          const shouldHide = checkIfHolidayBetweenHours(item);

          return { ...item, isDisabled: shouldHide };
        }
      );

      setCompleteList(updatedList ?? []);
    } else {
      setCompleteList(activeOrder?.shippingLines?.[0]?.shippingMethod.customFields?.deliveryDates ?? []);
    }
  }, [holidaysList, activeOrder]);

  const checkIfHolidayBetweenHours = (item: DeliveryDate): boolean => {
    const difference = item.deliveryWeekday - firstDay;
    const itemDate = dayjs().add(difference < 0 ? difference + 7 : difference, 'day');

    const partialHoliday = holidaysList?.publicHolidays.find(
      (holiday) =>
        !holiday.isFullDay &&
        (dayjs(String(holiday.startsAt)).format('DD.MM.YYYY') === itemDate.format('DD.MM.YYYY') ||
          dayjs(String(holiday.endsAt)).format('DD.MM.YYYY') === itemDate.format('DD.MM.YYYY'))
    );

    if (partialHoliday) {
      const startTime = itemDate.startOf('day').add(Number(item.earliestDeliveryTime.split(':')[0]), 'hour');
      const endTime = itemDate.startOf('day').add(Number(item.latestDeliveryTime.split(':')[0]), 'hour');

      const holidayStartTime = dayjs(String(partialHoliday.startsAt));
      const holidayEndTime = dayjs(String(partialHoliday.endsAt));

      return (
        startTime.isBetween(holidayStartTime, holidayEndTime, 'minute', '()') ||
        endTime.isBetween(holidayStartTime, holidayEndTime, 'minute', '()')
      );
    }

    return false;
  };

  const updateTime = (id: string) => {
    setSelectedDeliveryDateId(id);
    void updateOrderDeliveryDate({
      variables: {
        deliveryDateId: id,
      },
    });
  };

  const renderWeekDays = () => {
    return sortedShowingWeekDays.map((day) => (
      <Pressable style={{ flex: 1 }} key={day.day} onPress={() => setActiveTab(day.weekDay)}>
        <Box
          backgroundColor={activeTab === day.weekDay ? 'white' : 'transparent'}
          borderRadius={theme.radii.lg}
          paddingVertical="s2"
          alignItems="center"
        >
          <Text variant="heading-md">{day.weekDay === today ? strings.deliveryDate.today : day.day}</Text>
        </Box>
      </Pressable>
    ));
  };

  const renderHours = ({ item }: { item: UpdatedDeliveryDate }) => {
    const isInPast = Math.ceil(dayjs(item.orderByTimeDate as Date).diff(dayjs(), 'minute', true)) <= 0;
    return (
      <>
        <Button
          isLoading={isLoading && selectedDeliveryDateId === item.id}
          // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
          disabled={isInPast || item.isDisabled || !item.hasCapacity}
          onPress={() => updateTime(item.id)}
          paddingTop="s4"
          size={ButtonSize.MD}
          type={item.id === selectedDeliveryDateId ? ButtonType.PRIMARY : ButtonType.OUTLINE}
        >
          {item.hasCapacity ? (
            `${item.earliestDeliveryTime} - ${item.latestDeliveryTime}`
          ) : (
            <Box paddingTop="s1" alignItems="center">
              <Text variant="text-2xs-r">
                {item.earliestDeliveryTime} - {item.latestDeliveryTime}
              </Text>
              <Text variant="text-md-sb">{strings.deliveryDate.noCapacity}</Text>
            </Box>
          )}
        </Button>

        {!isLoading && item.id === selectedDeliveryDateId ? (
          <NextOrderComponent
            messageForOneMinute={strings.dashboard.orderInNextOneMinute}
            messageForXminute={strings.dashboard.orderInNextMinutes}
          />
        ) : null}
      </>
    );
  };

  const isHolidayCheck = () => {
    // Render Placeholder if no delivery hours available
    if (activeList?.length === 0) {
      return true;
    }

    if (
      holidaysList?.publicHolidays.some(
        (holiday) =>
          holiday.isFullDay &&
          (dayjs(String(holiday.startsAt)).format('DD.MM.YYYY') === selectedDate ||
            dayjs(String(holiday.endsAt)).format('DD.MM.YYYY') === selectedDate)
      )
    ) {
      return true;
    }
    return false;
  };

  const renderHoliday = () => {
    if (isHolidaysLoading) {
      return null;
    }
    return <PlaceHolder name={KS_ICON.CALENDAR} title={strings.deliveryDate.weDoNotDeliverInThisDate}></PlaceHolder>;
  };

  const renderHoursInList = () => {
    if (isHolidaysLoading) {
      return null;
    }

    return (
      <>
        <Box flex={1} paddingRight="s2">
          <FlatList
            data={activeList.length > 6 ? activeList?.slice(0, Math.ceil(activeList?.length / 2)) : activeList}
            renderItem={renderHours}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
          />
        </Box>
        {activeList.length > 6 ? (
          <Box flex={1} paddingLeft="s2">
            <FlatList
              data={activeList?.slice(Math.ceil(activeList?.length / 2))}
              renderItem={renderHours}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
            />
          </Box>
        ) : null}
      </>
    );
  };

  return (
    <>
      <Box
        height={theme.spacing.s12}
        borderRadius={theme.radii.xl}
        flexDirection="row"
        backgroundColor="gray100"
        padding="s1"
        marginTop="s5"
        marginHorizontal="s3"
      >
        {renderWeekDays()}
      </Box>

      <Box paddingHorizontal="s3" paddingTop="s1" flexDirection="row" flex={1}>
        {isHolidayCheck() ? renderHoliday() : renderHoursInList()}
      </Box>
    </>
  );
};

const styles = StyleSheet.create({
  timerStyles: {
    marginTop: -6,
    zIndex: -1,
  },
});
