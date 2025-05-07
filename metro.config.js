const path = require('path');
const fs = require('fs');
const exclusionList = require('metro-config/src/defaults/exclusionList');
const {getDefaultConfig} = require('@react-native/metro-config');
const {wrapWithReanimatedMetroConfig} = require('react-native-reanimated/metro-config');

const rnwPath = fs.realpathSync(path.resolve(require.resolve('react-native-windows/package.json'), '..'));

// Step 1: Start with base config and wrap it BEFORE customizing
const baseConfig = getDefaultConfig(__dirname);
const reanimatedConfig = wrapWithReanimatedMetroConfig(baseConfig);

// Step 2: Merge your customizations into the already wrapped config
reanimatedConfig.resolver = {
    ...reanimatedConfig.resolver,
    blockList: exclusionList([
        new RegExp(`${path.resolve(__dirname, 'windows').replace(/[/\\]/g, '/')}.*`),
        new RegExp(`${rnwPath}/build/.*`),
        new RegExp(`${rnwPath}/target/.*`),
        /.*\.ProjectImports\.zip/,
    ]),
    extraNodeModules: {
        ...(reanimatedConfig.resolver.extraNodeModules || {}),
        '@': path.resolve(__dirname, 'src'),
    },
};

reanimatedConfig.watchFolders = [...(reanimatedConfig.watchFolders || []), path.resolve(__dirname, 'src')];

reanimatedConfig.transformer = {
    ...reanimatedConfig.transformer,
    getTransformOptions: async () => ({
        transform: {
            experimentalImportSupport: false,
            inlineRequires: true,
        },
    }),
};

module.exports = reanimatedConfig;
