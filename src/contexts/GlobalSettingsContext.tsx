import { useApolloClient } from '@apollo/client';
import dayjs from 'dayjs';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { AppState } from 'react-native';

import { GET_FRESH_PRODUCT_RESTOCK_TIME } from '@graphqlDocuments';
import { FreshProductRestockTimeQuery } from '@types';
import { useDeliveryDate } from './OrderContext';

export const GlobalSettingsProvider = () => {
  const [freshProductRestockTime, setFreshProductRestockTime] = useState<dayjs.Dayjs | undefined>();
  const { earliestDeliveryTime } = useDeliveryDate();
  const [isFreshProductStockRelevant, setIsFreshProductStockRelevant] = useState<boolean | undefined>(false);

  const client = useApolloClient();

  const useFetchSettings = useCallback(
    () =>
      useEffect(() => {
        fetchGlobalSettings();
      }, []),
    []
  );

  useEffect(() => {
    if (!earliestDeliveryTime || !freshProductRestockTime) {
      return;
    }

    const today = dayjs();
    const earliestDeliveryDate = dayjs(String(earliestDeliveryTime));

    // Has restock time threshold NOT passed for today if delivery date should be for today
    // The product stock should be used of today
    const isFreshProductStockRelevantToday =
      today.day() === earliestDeliveryDate.day() && today < freshProductRestockTime;

    // Has restock time threshold passed for today if delivery date should be for tomorrow
    // The product stock should be used of tomorrow
    const isFreshProductStockRelevantTomorrow =
      today.add(1, 'day').day() === earliestDeliveryDate.day() && freshProductRestockTime < today;

    const newIsFreshProductStockRelevant =
      freshProductRestockTime && (isFreshProductStockRelevantToday || isFreshProductStockRelevantTomorrow);

    // If the values are the same, do not update
    if (newIsFreshProductStockRelevant === isFreshProductStockRelevant) {
      return;
    }

    setIsFreshProductStockRelevant(newIsFreshProductStockRelevant);
  }, [earliestDeliveryTime, freshProductRestockTime]);

  useEffect(() => {
    const appStateListener = AppState.addEventListener('change', (nextAppState) => {
      if (nextAppState === 'active') {
        fetchGlobalSettings();
      }
    });
    return () => {
      appStateListener?.remove();
    };
  }, []);

  const fetchGlobalSettings = () => {
    void client
      .query<FreshProductRestockTimeQuery>({ query: GET_FRESH_PRODUCT_RESTOCK_TIME, fetchPolicy: 'no-cache' })
      .then(({ data }) => {
        if (!data || !data.freshProductRestockTime) {
          return;
        }
        const timeArray = data.freshProductRestockTime.split(':');

        const dailyTime = dayjs().set('hours', Number(timeArray[0])).set('minutes', Number(timeArray[1]));

        setFreshProductRestockTime(dailyTime);
      });
  };

  return useMemo(
    () => ({ freshProductRestockTime, isFreshProductStockRelevant, useFetchSettings }),
    [freshProductRestockTime, isFreshProductStockRelevant, useFetchSettings]
  );
};

const GlobalSettingsContext = createContext<ReturnType<typeof GlobalSettingsProvider> | null>(null);

export const GlobalSettingsContextProvider: React.FC = ({ children }) => {
  const value = GlobalSettingsProvider();

  return <GlobalSettingsContext.Provider value={value}>{children}</GlobalSettingsContext.Provider>;
};

export const useGlobalSettings = () => {
  const context = useContext(GlobalSettingsContext);

  if (!context) {
    throw new Error('use inside provider');
  }

  return context;
};
