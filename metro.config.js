const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const defaultConfig = getDefaultConfig(__dirname);

const config = {
  transformer: {
    ...defaultConfig.transformer,
    minifierConfig: {
      keep_classnames: false,
      keep_fnames: false,
      mangle: {
        safari10: true,
      },
      output: {
        ascii_only: true,
        comments: false,
        beautify: false,
      },
      compress: {
        dead_code: true,
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
};

module.exports = mergeConfig(defaultConfig, config);
