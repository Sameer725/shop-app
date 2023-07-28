import React from 'react';

import { KS_ICON, KsIcon } from '@assets/icons';
import theme from '@assets/theme/theme';
import { Box, Text } from '@components';
import { useLocalizedData } from '@contexts';

interface TitleProps {
  label: string;
}

const Title = (props: TitleProps) => {
  const { label } = props;

  return (
    <Text variant="heading-md" textBreakStrategy="balanced" lineBreakMode="tail">
      {label}
    </Text>
  );
};

interface DistanceProps {
  distance: number;
}

const Distance = (props: DistanceProps) => {
  const { strings } = useLocalizedData();

  const { distance } = props;

  return (
    <Box flexDirection="row" alignItems="center" marginTop="s2">
      <KsIcon name={KS_ICON.LOCATION} size={theme.spacing.s5} color={theme.colors.defaultTextColor} />
      <Text marginLeft="s2" variant="text-md">
        {distance} {strings.producer.distanceAway}
      </Text>
    </Box>
  );
};

interface ProducerInfoHeaderProps extends Partial<DistanceProps>, TitleProps {}

export const ProducerInfoHeader = (props: ProducerInfoHeaderProps) => {
  const { distance, label } = props;

  return (
    <Box>
      <Title label={label} />
      {distance ? <Distance distance={distance} /> : null}
    </Box>
  );
};
