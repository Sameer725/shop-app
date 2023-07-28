import React, { useCallback, useMemo, useState } from 'react';
import { Pressable } from 'react-native';

import theme from '@assets/theme/theme';
import { Box, Text } from '@components';
import { useLocalizedData } from '@contexts';

export enum ProducerTabs {
  DETAIL = 'detail',
  PRODUCT = 'product',
}

export interface TabItem {
  label: string;
  key: ProducerTabs;
}
interface ProducerTabProps {
  initialTab: ProducerTabs;
  children?: React.ReactElement[];
}

export const ProducerTab = (props: ProducerTabProps) => {
  const { initialTab, children } = props;

  const [activeTab, setActiveTab] = useState<ProducerTabs>(initialTab ?? ProducerTabs.PRODUCT);
  const { strings } = useLocalizedData();

  const producerData = useMemo(() => {
    const { detail, product } = strings.producer;
    return [
      { label: detail, key: ProducerTabs.DETAIL },
      { label: product, key: ProducerTabs.PRODUCT },
    ];
  }, [strings.producer]);

  const screenMap = useCallback(
    (tab: TabItem) => {
      return (
        <Pressable style={{ flex: 1 }} key={tab.key} onPress={() => setActiveTab(tab.key)}>
          <Box
            backgroundColor={activeTab === tab.key ? 'white' : 'transparent'}
            borderRadius={theme.radii.lg}
            paddingVertical="s2"
            alignItems="center"
          >
            <Text variant="heading-md">{tab.label}</Text>
          </Box>
        </Pressable>
      );
    },
    [activeTab]
  );

  const memoizedChild = useMemo(() => {
    return children
      ? React.Children.map(children, (child) => {
          return React.cloneElement(child, { activeTab });
        })
      : null;
  }, [activeTab]);

  return (
    <>
      <Box
        borderRadius={theme.radii.xl}
        flexDirection="row"
        justifyContent="center"
        backgroundColor="gray200"
        padding="s1"
        marginHorizontal="s3"
      >
        {producerData.map(screenMap)}
      </Box>
      {memoizedChild}
    </>
  );
};

interface ProducerTabItemProps {
  name: ProducerTabs;
  children: React.ReactElement;
}

interface InjectedProps extends ProducerTabItemProps {
  activeTab?: ProducerTabs;
}

export const ProducerTabItem = (props: InjectedProps) => {
  const { name, children, activeTab } = props;

  const isActive = name === activeTab;

  return (
    <Box zIndex={isActive ? 10 : -10} opacity={isActive ? 1 : 0} position={isActive ? 'relative' : 'absolute'}>
      {children}
    </Box>
  );
};
