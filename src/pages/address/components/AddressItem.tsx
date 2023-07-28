import React from 'react';

import { KS_ICON, KsIcon } from '@assets/icons';
import theme from '@assets/theme/theme';
import { Box, Text } from '@components';
import { Maybe } from '@types';

interface Props {
  street: Maybe<string> | undefined;
  streetNumber: Maybe<string> | undefined;
  city: Maybe<string> | undefined;
  country: Maybe<string> | undefined;
  isInArea: boolean;
  isAddressSelected?: boolean;
}

export const AddressItem: React.FC<Props> = (props) => {
  const { city, isInArea, country, streetNumber, street, isAddressSelected } = props;
  const textColor = isAddressSelected || isInArea ? 'defaultTextColor' : 'textColorPlaceholder';

  return (
    <Box alignItems="center" flexDirection="row">
      <Box marginRight="s4">
        {isAddressSelected ? (
          <Box backgroundColor={isInArea ? 'primary500' : 'error500'} borderRadius={999}>
            <KsIcon name={isInArea ? KS_ICON.TICK : KS_ICON.CLOSE} color="white" size={20} />
          </Box>
        ) : (
          <KsIcon
            name={isInArea ? KS_ICON.LOCATION_TICK : KS_ICON.LOCATION_CROSS}
            size={20}
            color={theme.colors.textColorPlaceholder}
          />
        )}
      </Box>
      <Box>
        <Text variant="heading-xs" color={textColor}>
          {street} {streetNumber}
        </Text>
        <Text variant="text-xs" color={textColor}>
          {city}, {country}
        </Text>
      </Box>
    </Box>
  );
};
