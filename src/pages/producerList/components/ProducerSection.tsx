import { useQuery } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';

import { KS_ICON, KsIcon } from '@assets/icons';
import theme from '@assets/theme/theme';
import { Box, Button, ButtonSize, ButtonType, HorizontalTileSkeleton, Text } from '@components';
import { GET_PRODUCER_PRODUCT_VARIANTS } from '@graphqlDocuments';
import { ProducerTabs } from '@pages/producerDetail/components';
import { CommonScreens } from '@routes/routes';
import {
  KsNavigation,
  Producer,
  ProducersProductVariantsQuery,
  ProducersProductVariantsQueryVariables,
  ProductVariant,
} from '@types';
import { ProducerProductTiles } from './ProducerProductTiles';

interface Props {
  producer: Producer;
}

export const ProducerSection: React.FC<Props> = (props) => {
  const { producer } = props;
  const navigation: KsNavigation = useNavigation();
  const { data, loading: isLoading } = useQuery<ProducersProductVariantsQuery, ProducersProductVariantsQueryVariables>(
    GET_PRODUCER_PRODUCT_VARIANTS,
    {
      variables: {
        id: producer.id,
        options: {
          take: 5,
        },
      },
    }
  );

  const navigateToProducer = () => {
    navigation.navigate(CommonScreens.PRODUCER_DETAILS_SCREEN, {
      producerId: producer.id,
      activeTab: ProducerTabs.DETAIL,
    });
  };

  return (
    <Box flex={1} marginTop="s4" marginBottom="s3">
      <Box
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        marginBottom="s6"
        marginHorizontal="s3"
      >
        <Text variant="heading-md">{producer.name}</Text>
        <Button
          type={ButtonType.PRIMARY}
          size={ButtonSize.SM}
          onPress={navigateToProducer}
          leadingIcon={<KsIcon name={KS_ICON.ARROW_RIGHT_3} color={theme.colors.white} size={16} />}
          width={theme.spacing.s8}
        />
      </Box>
      <Box marginHorizontal="s3">
        <FastImage resizeMode="cover" style={styles.img} source={{ uri: producer.featuredAsset?.source }} />
      </Box>

      {isLoading ? (
        <Box flex={1} flexDirection="row" flexWrap="wrap" marginLeft="s3" marginTop="s5">
          <HorizontalTileSkeleton height={210} />
        </Box>
      ) : (
        <ProducerProductTiles
          productList={data?.producersProductVariants.items as ProductVariant[]}
          producerId={producer.id}
        />
      )}
    </Box>
  );
};

const styles = StyleSheet.create({
  img: {
    height: 194,
    borderRadius: theme.radii.xl,
  },
});
