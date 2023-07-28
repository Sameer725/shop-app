import React from 'react';

import { KS_ICON, KsIcon } from '@assets/icons';
import theme from '@assets/theme/theme';
import { Box } from './Box';
import { Text } from './Text';

type Color = keyof typeof theme.colors;

interface PlaceHolderProps {
  title?: string;
  children?: React.ReactNode;
  name: KS_ICON;
  iconColor?: string;
  textColor?: Color;
  content?: string[];
}

type textType = 'heading-sm' | 'text-md';

export const PlaceHolder = (props: PlaceHolderProps) => {
  const { title, children, name, iconColor, textColor, content } = props;

  const renderText = (text: string | undefined, variant: textType, key?: number) => {
    if (!text) {
      return null;
    }
    return (
      <Text
        key={key}
        variant={variant}
        marginTop="s5"
        textAlign="center"
        paddingHorizontal="s4"
        color={textColor ?? 'defaultTextColor'}
      >
        {text}
      </Text>
    );
  };

  const renderContent = () => {
    return content?.map((item, index) => {
      return renderText(item, 'text-md', index);
    });
  };

  return (
    <Box flex={1}>
      <Box flex={1} justifyContent="center" alignItems="center">
        <Box borderColor="gray050" borderWidth={1} borderRadius={999} padding="s1">
          <Box borderColor="gray100" borderWidth={1} borderRadius={999} padding="s1">
            <Box borderColor="gray100" borderWidth={1} borderRadius={999} padding="s10" backgroundColor="gray100">
              <KsIcon name={name} size={50} color={iconColor ?? theme.colors.primary500} />
            </Box>
          </Box>
        </Box>

        {renderText(title, 'heading-sm')}
        {renderContent()}
      </Box>
      <Box marginHorizontal="s3" marginBottom="s8">
        {children}
      </Box>
    </Box>
  );
};
