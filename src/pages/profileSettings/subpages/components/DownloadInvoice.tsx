import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import FileViewer from 'react-native-file-viewer';
import RNFS from 'react-native-fs';

import { Box, Button, ButtonType } from '@components';
import { AsyncStorageKeys } from '@constants';
import { LoginStatusData, useLocalizedData } from '@contexts';
import { API_URL } from '@env';
import { useToastNotification } from '@hooks';

interface DownloadInvoiceProps {
  orderCode: string;
}

export const DownloadInvoice: React.FC<DownloadInvoiceProps> = (props) => {
  const { orderCode } = props;
  const { strings } = useLocalizedData();
  const { showGeneralErrorToast } = useToastNotification();

  const downloadInvoice = async () => {
    const loginStatusDataString: string | null = await AsyncStorage.getItem(AsyncStorageKeys.LOGIN_STATUS_DATA);

    if (!loginStatusDataString) {
      return;
    }

    const authToken: string | null = await AsyncStorage.getItem(AsyncStorageKeys.AUTH_TOKEN);
    if (!authToken) {
      return;
    }

    const loginStatusData: LoginStatusData = JSON.parse(loginStatusDataString) as LoginStatusData;

    const channelToken = loginStatusData.userDetail?.channelToken ?? '';

    const localFile = `${RNFS.DocumentDirectoryPath}/kleinstark_rechnung_${orderCode}.pdf`;

    const options: RNFS.DownloadFileOptions = {
      fromUrl: `${API_URL}/invoice/download/${channelToken ?? ''}/${orderCode}`,
      toFile: localFile,
      headers: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'vendure-token': channelToken,
        authorization: `Bearer ${authToken}`,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'Content-Type': 'application/json',
      },
    };
    RNFS.downloadFile(options)
      .promise.then(async () => FileViewer.open(localFile))
      .catch(() => {
        showGeneralErrorToast();
      });
  };

  return (
    <Box marginTop="s5">
      <Button onPress={downloadInvoice} type={ButtonType.PRIMARY_WHITE}>
        {strings.profileSettings.order.downloadInvoice}
      </Button>
    </Box>
  );
};
