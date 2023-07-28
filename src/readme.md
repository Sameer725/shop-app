# Sample typescript project with styles

- SafeAreaView needed to be add avoid notch and toolbar in ios

```

import React from 'react';
import {StyleSheet, Text} from 'react-native';

interface Props {}

const index: React.FC<Props> = props => {
  return (
    <Box style={styles.container}>
      <Text>Hello World</Text>
    </Box>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default index;

```
