import {
  defineConfig,
  transformWithEsbuild,
} from 'vite';
import fonts from 'vite-plugin-fonts';
import path from 'path';
import react from '@vitejs/plugin-react';
import {
  VitePWA,
  type VitePWAOptions,
} from 'vite-plugin-pwa';
import svgr from 'vite-plugin-svgr';
import { qrcode } from 'vite-plugin-qrcode';

const pwaOptions: Partial<VitePWAOptions> = {
  registerType: 'autoUpdate',

  includeAssets: [
    'favicon.ico',
    'pwa/apple-icon-180.png',
    'logo.svg',
  ],

  manifest: {
    name: 'vite-rnw',
    short_name: 'vite-rnw',
    description: 'react native web PWA',
    orientation: 'portrait',
    lang: 'en',
    display: 'standalone',
    theme_color: '#000000',

    icons: [
      {
        src: '/pwa/manifest-icon-192.maskable.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/pwa/manifest-icon-192.maskable.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/pwa/manifest-icon-512.maskable.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/pwa/manifest-icon-512.maskable.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  },

  base: '/',
};

const extensions = [
  '.web.tsx',
  '.tsx',
  '.web.ts',
  '.ts',
  '.web.jsx',
  '.jsx',
  '.web.js',
  '.js',
  '.css',
  '.json',
  '.mjs',
];

const development =
  process.env.NODE_ENV === 'development';

const nodeModulesJsxPlugin = {
  name: 'node-modules-js-as-jsx',
  enforce: 'pre' as const,

  async transform(code: string, id: string) {
    const normalizedId = id
      .replace(/\\/g, '/')
      .split('?')[0];

    if (
      !normalizedId.includes('/node_modules/') ||
      !normalizedId.endsWith('.js')
    ) {
      return null;
    }

    return transformWithEsbuild(code, normalizedId, {
      loader: 'jsx',
      jsx: 'automatic',
      sourcemap: true,
    });
  },
};

export default defineConfig({
  clearScreen: true,

  plugins: [
    nodeModulesJsxPlugin,

    react(),

    VitePWA(pwaOptions),

    qrcode(),

    svgr({}),

    fonts({
      custom: {
        families: [
          {
            name: 'FontAwesome',
            local: 'FontAwesome',
            src: path.resolve(
              'node_modules/react-native-vector-icons/Fonts/FontAwesome.ttf',
            ),
          },
        ],
      },
    }),
  ],

  assetsInclude: [
    '**/*.png',
    '**/*.jpg',
    '**/*.jpeg',
    '**/*.svg',
  ],

  define: {
    global: 'window',
    __DEV__: JSON.stringify(development),
    DEV: JSON.stringify(development),
    'process.env.NODE_ENV': JSON.stringify(
      process.env.NODE_ENV,
    ),
  },

  resolve: {
    extensions,

    alias: {
      'react-native': 'react-native-web',

      'react-native-vector-icons': path.resolve(
        __dirname,
        'node_modules/react-native-vector-icons',
      ),
    },
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      resolveExtensions: extensions,
      jsx: 'automatic',

      loader: {
        '.js': 'jsx',
      },
    },
  },
});