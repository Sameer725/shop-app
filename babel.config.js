module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
      },
    ],
    [
      'module-resolver',
      {
        root: './',
        alias: {
          '@assets': './src/assets',
          '@components': './src/components',
          '@constants': './src/constants',
          '@contexts': './src/contexts',
          '@graphqlDocuments': './src/graphqlDocuments',
          '@hooks': './src/hooks',
          '@layouts': './src/layouts',
          '@modules': './src/modules',
          '@pages': './src/pages',
          '@routes': './src/routes',
          '@types': './src/types',
          '@utils': './src/utils',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
