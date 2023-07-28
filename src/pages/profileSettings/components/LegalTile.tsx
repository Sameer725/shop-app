import React from 'react';

import { AGB_URL, DATA_PRIVACY_URL, LEGAL_NOTICE_URL } from '@constants';
import { useLocalizedData } from '@contexts';
import { openUrlInAppBrowser } from '@utils';
import { ExternalLinkIcon, Line } from './ProfileSettings.common';
import { ProfileSettingsTile } from './ProfileSettingsTile.common';
import { RowItem } from './RowItem.common';

export const LegalTile: React.FC = () => {
  const { strings } = useLocalizedData();

  const openPrivacyPolicy = async () => openUrlInAppBrowser(DATA_PRIVACY_URL);
  const openTermsAndCondition = async () => openUrlInAppBrowser(AGB_URL);
  const openLegalNotice = async () => openUrlInAppBrowser(LEGAL_NOTICE_URL);

  return (
    <ProfileSettingsTile title={strings.profileSettings.overview.legal}>
      <RowItem
        label={strings.profileSettings.overview.privacyPolicy}
        icon={ExternalLinkIcon}
        onPress={openPrivacyPolicy}
      />
      {Line}
      <RowItem
        label={strings.profileSettings.overview.termsAndConditions}
        icon={ExternalLinkIcon}
        onPress={openTermsAndCondition}
      />
      {Line}
      <RowItem label={strings.profileSettings.overview.legalNotice} icon={ExternalLinkIcon} onPress={openLegalNotice} />
    </ProfileSettingsTile>
  );
};
