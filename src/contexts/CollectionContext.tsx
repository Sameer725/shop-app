import { useApolloClient } from '@apollo/client';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { AppState } from 'react-native';

import { GET_COLLECTIONS_FULL_DATA } from '@graphqlDocuments';
import { Collection, CollectionsFullDataQuery, ProductVariant } from '@types';
import { useAuthData } from './AuthContext';
import { useOrderState } from './OrderContext';

const REFETCH_INTERVAL = 5 * 60 * 1000;

export interface CollectionDataContent {
  sections: CollectionDataSection[];
}

export interface CollectionDataSection {
  id: string;
  title: string;
  data: ProductVariant[];
}

export interface CollectionData {
  [id: string]: CollectionDataContent;
}

export const useFetchCollection = () => {
  const [collectionData, setCollectionData] = useState<CollectionData>({});
  const { activeOrder } = useOrderState();
  const { loginStatus } = useAuthData();

  const client = useApolloClient();

  const useOnFetchCollection = useCallback(
    () =>
      useEffect(() => {
        // Ensure that the order has already loaded if user is logged in
        if (!loginStatus.isGuestUser && !activeOrder) {
          return;
        }

        fetchCollectionData();

        const interval = setInterval(fetchCollectionData, REFETCH_INTERVAL);

        return () => clearInterval(interval);
      }, [activeOrder?.code, loginStatus.isGuestUser]),
    [activeOrder?.code, loginStatus.isGuestUser]
  );

  const fetchCollectionData = () => {
    let tempData: CollectionData = {};

    void client
      .query<CollectionsFullDataQuery>({ query: GET_COLLECTIONS_FULL_DATA, fetchPolicy: 'no-cache' })
      .then(({ data }) => {
        for (const rootCollection of data?.rootCollections?.items) {
          const list = rootCollection?.children as Collection[];
          const sections = list.map((c) => ({ id: c.id, title: c.name, data: c.productVariants?.items }));

          tempData = { ...tempData, [rootCollection?.id ?? '']: { sections } };
        }

        setCollectionData(tempData);
      });
  };

  useEffect(() => {
    const appStateListener = AppState.addEventListener('change', (nextAppState) => {
      if (nextAppState === 'active') {
        fetchCollectionData();
      }
    });
    return () => {
      appStateListener?.remove();
    };
  }, []);

  return useMemo(
    () => ({ useOnFetchCollection, collectionData, setCollectionData }),
    [useOnFetchCollection, collectionData]
  );
};

const CollectionContext = createContext<ReturnType<typeof useFetchCollection> | null>(null);

export const CollectionContextProvider: React.FC = ({ children }) => {
  const value = useFetchCollection();

  return <CollectionContext.Provider value={value}>{children}</CollectionContext.Provider>;
};

export const useCollection = () => {
  const context = useContext(CollectionContext);

  if (!context) {
    throw new Error('use inside collection provider');
  }

  return context;
};
