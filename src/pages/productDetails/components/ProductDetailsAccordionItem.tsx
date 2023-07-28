import React from 'react';
import { StyleSheet } from 'react-native';
import { List } from 'react-native-paper';

import { KS_ICON, KsIcon } from '@assets/icons';
import theme from '@assets/theme/theme';

interface Props {
  children: React.ReactNode;
  id: number;
  title: string;
}

export const ProductDetailsAccordionItem: React.FC<Props> = (props) => {
  const { children, id, title } = props;
  return (
    <List.Accordion
      style={styles.listStyle}
      id={id}
      titleStyle={styles.titleStyle}
      title={title}
      right={({ isExpanded }) => (
        <KsIcon
          name={isExpanded ? KS_ICON.ARROW_UP_2 : KS_ICON.ARROW_DOWN_1}
          color={theme.colors.gray700}
          size={theme.spacing.s4}
        />
      )}
    >
      {children}
    </List.Accordion>
  );
};

const styles = StyleSheet.create({
  listStyle: {
    backgroundColor: theme.colors.white,
    paddingHorizontal: 0,
  },

  titleStyle: { ...theme.textVariants['heading-2xs'], color: theme.colors.defaultTextColor },
});
