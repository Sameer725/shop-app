import React, { useState } from 'react';

import { CONTACT_URL, FAQ_URL } from '@constants';
import { useLocalizedData } from '@contexts';
import { openUrlInAppBrowser } from '@utils';
import { ContactModal } from './ContactModal';
import { OrderComplaintModal } from './OrderComplaintModal';
import { ExternalLinkIcon, Line } from './ProfileSettings.common';
import { ProfileSettingsTile } from './ProfileSettingsTile.common';
import { RowItem } from './RowItem.common';

export const HelpTile: React.FC = () => {
  const { strings } = useLocalizedData();

  const [isContactModalVisible, setIsContactModalVisible] = useState<boolean>(false);
  const [isOrderComplaintModalVisible, setIsOrderComplaintModalVisible] = useState<boolean>(false);

  const openFaq = async () => openUrlInAppBrowser(FAQ_URL);

  const openContact = async () => openUrlInAppBrowser(CONTACT_URL);

  return (
    <>
      <ProfileSettingsTile title={strings.profileSettings.overview.help}>
        <RowItem label={strings.profileSettings.overview.contact} onPress={() => setIsContactModalVisible(true)} />
        {Line}
        <RowItem
          label={strings.profileSettings.complain.complain}
          onPress={() => setIsOrderComplaintModalVisible(true)}
        />
        {Line}
        <RowItem label={strings.profileSettings.overview.faq} icon={ExternalLinkIcon} onPress={openFaq} />
        {Line}
        <RowItem label={strings.profileSettings.overview.feedback} icon={ExternalLinkIcon} onPress={openContact} />
      </ProfileSettingsTile>

      <ContactModal
        isVisible={isContactModalVisible}
        onClose={() => setIsContactModalVisible(false)}
        openComplaintModal={() => setIsOrderComplaintModalVisible(true)}
      />

      <OrderComplaintModal
        isVisible={isOrderComplaintModalVisible}
        onClose={() => setIsOrderComplaintModalVisible(false)}
      />
    </>
  );
};
