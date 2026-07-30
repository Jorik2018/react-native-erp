import path from 'node:path';
import { defineConfig ,type Plugin,transformWithEsbuild} from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import {
  VitePWA,
  type VitePWAOptions,
} from 'vite-plugin-pwa';

const jsxDependencies = [
  '/node_modules/react-native-vector-icons/',
  '/node_modules/react-native-ratings/',
  '/node_modules/@expo/vector-icons/',
];

function reactNativeDependenciesJsxPlugin(): Plugin {
  return {
    name: 'react-native-dependencies-js-as-jsx',
    enforce: 'pre',

    async transform(code, id) {
      const normalizedId = id
        .replace(/\\/g, '/')
        .split('?')[0];

      const isJavaScriptFile =
        normalizedId.endsWith('.js');

      const requiresJsxTransformation =
        jsxDependencies.some(dependency =>
          normalizedId.includes(dependency),
        );

      if (
        !isJavaScriptFile ||
        !requiresJsxTransformation
      ) {
        return null;
      }

      return transformWithEsbuild(
        code,
        normalizedId,
        {
          loader: 'jsx',
          jsx: 'automatic',
          sourcemap: true,
        },
      );
    },
  };
}

const pwaOptions: Partial<VitePWAOptions> = {
  registerType: 'autoUpdate',

  /*
   * Incluye únicamente archivos que realmente existan
   * dentro de public/.
   */
  includeAssets: [
    'favicon.ico',
    'logo.svg',
  ],

  manifest: {
    name: 'vite-rnw',
    short_name: 'vite-rnw',
    description: 'React Native Web PWA',
    orientation: 'portrait',
    lang: 'en',
    display: 'standalone',
    theme_color: '#000000',
    background_color: '#ffffff',

    /*
     * Vuelve a agregar los iconos cuando existan en:
     *
     * public/pwa/manifest-icon-192.maskable.png
     * public/pwa/manifest-icon-512.maskable.png
     *
     * Los quito por ahora para evitar los errores 404.
     */
    icons: [],
  },
};

export default defineConfig({
  plugins: [
    reactNativeDependenciesJsxPlugin(),
    react(),
    svgr(),
    VitePWA(pwaOptions),
  ],

  resolve: {
    extensions: [
      '.web.tsx',
      '.web.ts',
      '.web.jsx',
      '.web.js',
      '.tsx',
      '.ts',
      '.jsx',
      '.js',
      '.json',
    ],

      alias: {
        'react-native': 'react-native-web',

        'react-native-vector-icons':
          path.resolve(
            __dirname,
            'node_modules/react-native-vector-icons',
          ),
      },
  },

  define: {
    global: 'window',
    __DEV__: JSON.stringify(false),
    'process.env.NODE_ENV': JSON.stringify('production'),
  },

  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-native-web',
    ],

    esbuildOptions: {
      resolveExtensions: [
        '.web.tsx',
        '.web.ts',
        '.web.jsx',
        '.web.js',
        '.tsx',
        '.ts',
        '.jsx',
        '.js',
      ],

      loader: {
        '.js': 'jsx',
      },
    },
  },

  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
});