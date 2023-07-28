import { useMutation, useQuery } from '@apollo/client';
import { CommonActions, useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from 'react-native';

import theme from '@assets/theme/theme';
import { Button, ButtonType, OrderHistorySkeleton, OverlappingInfoState } from '@components';
import { useLocalizedData } from '@contexts';
import { GET_SINGLE_ORDER, REQUEST_ORDER_COMPLAINT } from '@graphqlDocuments';
import { useToastNotification } from '@hooks';
import { DashboardScreens, Tabs } from '@routes/routes';
import {
  GetSingleOrder,
  KsNavigation,
  KsRoute,
  Order,
  RequestOrderComplaintMutation,
  RequestOrderComplaintMutationVariables,
} from '@types';
import { ComplaintRefund } from './components/ComplaintRefund';
import { OrderedProducts } from './components/OrderedProducts';

export interface RequestOrderComplaintInput {
  orderId: string;
  items: RequestOrderComplaintItem[];
  refundPreference: string;
  comment: string;
}
export interface RequestOrderComplaintItem {
  orderLineId: string;
  quantity: number;
  reason: string;
  error: boolean;
}

export const ComplaintScreen: React.FC = () => {
  const route = useRoute<KsRoute<{ orderId: string }>>();

  const navigation: KsNavigation = useNavigation();

  const orderId: string = route?.params?.orderId ?? '';

  const { showErrorToast, showSuccessToast } = useToastNotification();
  const { strings } = useLocalizedData();

  const { data, loading: isLoadingOrder } = useQuery<GetSingleOrder.Query, GetSingleOrder.Variables>(GET_SINGLE_ORDER, {
    variables: { id: orderId },
    notifyOnNetworkStatusChange: true,
  });

  const [requestOrderComplaint, { loading: isRequestLoading }] = useMutation<
    RequestOrderComplaintMutation,
    RequestOrderComplaintMutationVariables
  >(REQUEST_ORDER_COMPLAINT, {
    onCompleted: () => {
      showSuccessToast(
        strings.profileSettings.complain.complaintReceivedTitle,
        strings.profileSettings.complain.complaintReceivedInfo
      );

      const navigateAction = CommonActions.reset({
        index: 1,
        routes: [{ name: Tabs.PROFILE_SETTINGS }],
      });

      navigation.dispatch(navigateAction);

      navigation.navigate(DashboardScreens.DASHBOARD_LANDING_SCREEN);
    },
  });

  const submitComplaint = () => {
    if (complaintData.items.every((e) => e.quantity === 0)) {
      return showErrorToast(strings.profileSettings.complain.errorInfo);
    }
    const indexOfItemNoReason = complaintData.items.findIndex((item) => item.quantity > 0 && item.reason === '');

    if (indexOfItemNoReason > -1) {
      if (complaintData.items[indexOfItemNoReason].error) {
        containerRef.current?.scrollTo({ animated: true, x: 0, y: errorPosition });
      }

      setComplaintData((prevState) => {
        const prevArray = [...prevState.items];
        prevArray[indexOfItemNoReason].error = true;
        return { ...prevState, items: prevArray };
      });
    } else {
      void requestOrderComplaint({
        variables: {
          input: {
            ...complaintData,
            items: complaintData.items
              .filter((e) => e.quantity > 0)
              .map((e) => {
                return { orderLineId: e.orderLineId, quantity: e.quantity, reason: e.reason };
              }),
          },
        },
      });
    }
  };

  const [errorPosition, setErrorPosition] = useState(0);

  const [complaintData, setComplaintData] = useState<RequestOrderComplaintInput>({
    orderId,
    items: [],
    refundPreference: strings.profileSettings.complain.chooseWallet,
    comment: '',
  });

  useEffect(() => {
    if (data?.order) {
      setComplaintData({
        orderId,
        items: data?.order?.lines.map((orderline) => {
          return { orderLineId: orderline.id, quantity: 0, reason: '', error: false };
        }) as RequestOrderComplaintItem[],
        refundPreference: strings.profileSettings.complain.chooseWallet,
        comment: '',
      });
    }
  }, [data]);

  const isLoadingAndDataSet = isLoadingOrder || complaintData.items.length === 0;

  const containerRef = useRef<ScrollView>(null);

  useEffect(() => {
    containerRef.current?.scrollTo({ animated: true, x: 0, y: errorPosition });
  }, [errorPosition]);

  const scrollToEnd = () => containerRef.current?.scrollToEnd({ animated: true });

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false} ref={containerRef}>
        {isLoadingAndDataSet ? (
          <OrderHistorySkeleton />
        ) : (
          <>
            <OverlappingInfoState
              text={strings.profileSettings.complain.complainInfoTitle}
              backgroundColor="gray100"
              color="defaultTextColor"
            />
            <OrderedProducts
              order={data?.order as Order}
              complaintData={complaintData}
              setComplaintData={setComplaintData}
              setErrorPosition={setErrorPosition}
            />
            <ComplaintRefund
              complaintData={complaintData}
              setComplaintData={setComplaintData}
              scrollToEnd={scrollToEnd}
            />
            <Button onPress={submitComplaint} type={ButtonType.PRIMARY} isLoading={isRequestLoading}>
              {strings.profileSettings.complain.send}
            </Button>
          </>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: theme.spacing.s3,
    paddingBottom: theme.spacing.s6,
  },

  text: {
    flex: 1,
    flexWrap: 'wrap',
  },
});
