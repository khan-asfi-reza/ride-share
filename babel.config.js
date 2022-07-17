module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      "react-native-reanimated/plugin",
      [
        require.resolve("babel-plugin-module-resolver"),
        {
          root: '.',
          alias: {
            '@assets': './assets',
            '@components': './src/components',
            '@lib': './src/lib',
            '@screens': './src/screens',
            '@slices': './src/slices',
          },
        },
      ],
      [
          "module:react-native-dotenv",
        {
          moduleName: "@env",
          path: '.env'
        }
      ],
    ],
  };
};
