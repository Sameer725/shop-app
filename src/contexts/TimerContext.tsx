import dayjs from 'dayjs';
import React, { useCallback, useContext, useMemo, useRef, useState } from 'react';

interface DisplayTimerAndTimerCountInMinuteContextType {
  timerCountInMinute: number;
  displayTimer: boolean;
}

interface RefetchOrderAndUpdateTimerContextType {
  isRefetching: boolean;
  updateTimer: (date: Date) => void;
}

export const SHOW_TIMER = 60;

const DisplayTimerAndTimerCountInMinuteContext =
  React.createContext<DisplayTimerAndTimerCountInMinuteContextType | null>(null);

const RefetchOrderAndUpdateTimerContext = React.createContext<RefetchOrderAndUpdateTimerContextType | null>(null);

export const TimerContextProvider: React.FC = ({ children }) => {
  const [timerCountInMinute, setTimerCountInminute] = useState(0);

  const timerRef = useRef<NodeJS.Timer | null>(null);

  const timeOutRef = useRef<NodeJS.Timeout | null>(null);

  const updateTimer = useCallback((dateTime: Date) => {
    // 5 seconds delay from real time

    const diff = dayjs(dateTime).diff(dayjs(), 'second') + 5;
    const diffMinutes = Math.floor(diff / 60) + 1;
    const remainingSeconds = diff % 60;

    if (diffMinutes) {
      setTimerCountInminute(diffMinutes);
    }

    if (timeOutRef.current) {
      clearTimeout(timeOutRef.current);
    }

    timeOutRef.current = setTimeout(() => {
      if (remainingSeconds > 0) {
        setTimerCountInminute(diffMinutes - 1);
      }

      if (timerRef.current) {
        clearInterval(timerRef.current);
      }

      timerRef.current = setInterval(() => {
        setTimerCountInminute((lastTimerCount) => {
          return lastTimerCount > 0 ? lastTimerCount - 1 : lastTimerCount;
        });
      }, 60000);

      if (timeOutRef.current) {
        clearTimeout(timeOutRef.current);
      }
    }, 1000 * remainingSeconds);
  }, []);

  const isRefetching = timerCountInMinute <= 0;

  const refetchAndUpdate = useMemo(() => {
    return { isRefetching, updateTimer };
  }, [updateTimer, isRefetching]);

  const displayTimerAndMinuteCount = useMemo(() => {
    const displayTimer = timerCountInMinute < SHOW_TIMER && timerCountInMinute > 0;

    return { timerCountInMinute, displayTimer };
  }, [timerCountInMinute]);

  return (
    <RefetchOrderAndUpdateTimerContext.Provider value={refetchAndUpdate}>
      <DisplayTimerAndTimerCountInMinuteContext.Provider value={displayTimerAndMinuteCount}>
        {children}
      </DisplayTimerAndTimerCountInMinuteContext.Provider>
    </RefetchOrderAndUpdateTimerContext.Provider>
  );
};

export const useDisplayTimerAndMinuteCount = () => {
  const context = useContext(DisplayTimerAndTimerCountInMinuteContext);

  if (!context) {
    throw new Error('use useTimer hook insider TimerContextProvider');
  }

  return context;
};

export const useUpdateTimerAndReFetchOrder = () => {
  const context = useContext(RefetchOrderAndUpdateTimerContext);

  if (!context) {
    throw new Error('use  inside TimerContextProvider');
  }

  return context;
};
