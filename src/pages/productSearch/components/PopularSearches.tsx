import React, { Dispatch, SetStateAction } from 'react';
import { Keyboard } from 'react-native';

import { Box, Button, ButtonSize, ButtonType, Text } from '@components';
import { useLocalizedData } from '@contexts';

const popularSearch = [
  'Milch',
  'Käse',
  'Pizza',
  'Brot',
  'Tomaten',
  'Eier',
  'Nudeln',
  'Butter',
  'Bier',
  'Salat',
  'Kaffee',
  'Wasser',
];
interface PopularSearchesProps {
  setSearchString: Dispatch<SetStateAction<string>>;
}

export const PopularSearches: React.FC<PopularSearchesProps> = (props) => {
  const { strings } = useLocalizedData();

  const { setSearchString } = props;

  const handlePopularSearchPress = (productName: string) => {
    setSearchString(productName);
    Keyboard.dismiss();
  };
  return (
    <Box marginVertical="s5" marginHorizontal="s3">
      <Text variant="heading-lg">{strings.search.popularSearches}</Text>
      <Box flexDirection="row" flexWrap="wrap" marginVertical="s5">
        {popularSearch.map((item, index) => (
          <Button
            onPress={() => handlePopularSearchPress(item)}
            key={index}
            marginBottom="s3"
            marginRight="s3"
            size={ButtonSize.SM}
            type={ButtonType.OUTLINE}
            width="auto"
          >
            {item}
          </Button>
        ))}
      </Box>
    </Box>
  );
};
