import React, { Dispatch, SetStateAction, useRef } from 'react';
import { Pressable, View } from 'react-native';
import { TextInput } from 'react-native-paper';

import theme from '@assets/theme/theme';
import { Box, RadioButtonBox, Text } from '@components';
import { useLocalizedData } from '@contexts';
import { CheckoutCard } from '@pages/checkout/components/CheckoutCard';
import { RequestOrderComplaintInput } from '../ComplaintScreen';

interface ComplaintRefundProps {
  setComplaintData: Dispatch<SetStateAction<RequestOrderComplaintInput>>;
  complaintData: RequestOrderComplaintInput;
  scrollToEnd: () => void;
}

export const ComplaintRefund: React.FC<ComplaintRefundProps> = (props) => {
  const { complaintData, setComplaintData, scrollToEnd } = props;

  const updateRefundOption = (newRefundOption: string) => {
    setComplaintData((prevState) => {
      return { ...prevState, refundPreference: newRefundOption };
    });
  };

  const updateComments = (comment: string) => {
    setComplaintData((prevState) => {
      return { ...prevState, comment };
    });
  };
  const { strings } = useLocalizedData();

  const codeRef = useRef<View>(null);
  const scrollOnFocus = () => scrollToEnd();

  return (
    <Box marginTop="s5">
      <CheckoutCard title={strings.profileSettings.complain.chooseRefundTitle}>
        <Text>{strings.profileSettings.complain.chooseRefundInfo}</Text>

        <Box marginTop="s5" height={theme.spacing.px} borderRadius={theme.radii.lg} backgroundColor="gray300" />

        <RadioOptionItem
          subtitle={strings.profileSettings.complain.chooseWalletInfo}
          title={strings.profileSettings.complain.chooseWallet}
          isItemSelected={complaintData.refundPreference === strings.profileSettings.complain.chooseWallet}
          onItemPress={() => updateRefundOption(strings.profileSettings.complain.chooseWallet)}
        />

        <RadioOptionItem
          subtitle={strings.profileSettings.complain.chooseRedeliveryInfo}
          title={strings.profileSettings.complain.chooseRedelivery}
          isItemSelected={complaintData.refundPreference === strings.profileSettings.complain.chooseRedelivery}
          onItemPress={() => updateRefundOption(strings.profileSettings.complain.chooseRedelivery)}
        />

        <Box marginTop="s5" ref={codeRef}>
          <TextInput
            onFocus={scrollOnFocus}
            placeholder={strings.profileSettings.complain.additionalInfoOnClaim}
            mode="outlined"
            value={complaintData.comment}
            onChangeText={updateComments}
            multiline={true}
            numberOfLines={6}
            outlineColor="transparent"
          />
        </Box>
      </CheckoutCard>
    </Box>
  );
};

interface RadioOptionItemProps {
  title: string;
  subtitle: string;
  isItemSelected: boolean;
  onItemPress: () => void;
}

const RadioOptionItem: React.FC<RadioOptionItemProps> = (props) => {
  const { title, subtitle, isItemSelected, onItemPress } = props;
  return (
    <Pressable onPress={onItemPress}>
      <Box flexDirection="row" paddingTop="s5">
        <Box backgroundColor="white" borderRadius={theme.radii.xl} flexDirection="row" alignItems="center" flex={1}>
          <RadioButtonBox isOptionSelected={isItemSelected} />

          <Box flex={1} flexDirection="row" justifyContent="space-between" alignItems="center">
            <Box marginHorizontal="s4" flex={1}>
              <Text variant="heading-2xs">{title}</Text>
              <Text variant="text-2xs-r">{subtitle}</Text>
            </Box>
          </Box>
        </Box>
      </Box>
    </Pressable>
  );
};
