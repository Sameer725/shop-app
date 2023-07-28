import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import React from 'react';
import { FlatList, ImageSourcePropType, ListRenderItem, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Card } from 'react-native-paper';

import BananaSrc from '@assets/img/banana.jpg';
import CarrotSrc from '@assets/img/carrot.jpg';
import GrapesSrc from '@assets/img/grapes.jpg';
import OrangeSrc from '@assets/img/orange.jpg';
import PineappleSrc from '@assets/img/pineapple.jpg';
import SaladSrc from '@assets/img/salad.jpg';
import theme from '@assets/theme/theme';
import { Box, Button, ButtonType, ScreenWrapper, Text } from '@components';
import { useLocalizedData } from '@contexts';
import { AuthScreens } from '@routes/routes';
import { LoginAsGuestButton } from './components/LoginAsGuestButton';

interface ListItem {
  title: string;
  src: ImageSourcePropType;
}

const DATA: ListItem[] = [
  {
    title: 'Banane',
    src: BananaSrc as ImageSourcePropType,
  },
  {
    title: 'Wildkräutersalat',
    src: SaladSrc as ImageSourcePropType,
  },
  {
    title: 'Ananas',
    src: PineappleSrc as ImageSourcePropType,
  },
  {
    title: 'Kiste Saftorangen',
    src: OrangeSrc as ImageSourcePropType,
  },
  {
    title: 'Bund Karotten',
    src: CarrotSrc as ImageSourcePropType,
  },
  {
    title: 'Trauben rot',
    src: GrapesSrc as ImageSourcePropType,
  },
];

export const WaitingListSuccessScreen: React.FC = () => {
  const { strings } = useLocalizedData();
  const navigation: NavigationProp<ParamListBase> = useNavigation();

  const renderItem: ListRenderItem<ListItem> = ({ item }) => {
    return (
      <Box paddingHorizontal="s2">
        <Card style={styles.cardContainer}>
          <Text variant="heading-xs" paddingTop="s4" paddingBottom="s2" textAlign="center">
            {item.title}
          </Text>
          <FastImage source={{ uri: String(item.src) }} style={styles.backgroundImage} />
        </Card>
      </Box>
    );
  };

  const navigateToLogin = () => {
    navigation.navigate(AuthScreens.LOGIN_SCREEN);
  };

  return (
    <ScreenWrapper>
      <Box justifyContent="space-between" flex={1}>
        <Box marginTop="s8">
          <Box paddingHorizontal="s3">
            <Text variant="heading-3xl">{strings.auth.waitingListSuccessTitle}</Text>

            <Text marginTop="s5" variant="heading-xs">
              {strings.auth.waitingListSuccessDescription}
            </Text>
          </Box>
        </Box>

        <Box>
          <FlatList
            contentContainerStyle={{ paddingHorizontal: theme.spacing.s3, paddingVertical: theme.spacing.s5 }}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={DATA}
            renderItem={renderItem}
            keyExtractor={(item) => item.title}
          />
        </Box>

        <Box paddingHorizontal="s3" marginBottom="s8">
          <LoginAsGuestButton />
          <Button marginTop="s4" onPress={navigateToLogin} type={ButtonType.OUTLINE}>
            {strings.auth.backToStart}
          </Button>
        </Box>
      </Box>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    width: 120,
    height: 120,
  },
  cardContainer: { alignItems: 'center', width: 157, height: 169, borderRadius: theme.radii['2xl'] },
});
