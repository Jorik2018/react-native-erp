import {
  defineConfig,
  transformWithEsbuild,
  type Plugin,
} from 'vite';

import path from 'path';
import react from '@vitejs/plugin-react';
import fonts from 'vite-plugin-fonts';
import {
  VitePWA,
  type VitePWAOptions,
} from 'vite-plugin-pwa';
import svgr from 'vite-plugin-svgr';
import { qrcode } from 'vite-plugin-qrcode';

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

/*
 * Solo estos paquetes publican JSX dentro de archivos .js
 * en tu proyecto.
 *
 * No transformar todo node_modules porque rompe módulos
 * CommonJS como domhandler/domelementtype.
 */
const jsxDependencies = [
  '/node_modules/react-native-vector-icons/',
  '/node_modules/react-native-ratings/',
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

export default defineConfig(({ mode }) => {
  const development = mode === 'development';

  return {
    clearScreen: true,

    /*
     * La aplicación se publica en la raíz:
     * https://reactnative.dbasure.com/
     */
    base: '/',

    plugins: [
      /*
       * Debe ejecutarse antes que React y antes que
       * la transformación CommonJS de producción.
       */
      reactNativeDependenciesJsxPlugin(),

      react(),

      svgr(),

      fonts({
        custom: {
          families: [
            {
              name: 'FontAwesome',
              local: 'FontAwesome',
              src: path.resolve(
                __dirname,
                'node_modules/react-native-vector-icons/Fonts/FontAwesome.ttf',
              ),
            },
          ],
        },
      }),

      VitePWA(pwaOptions),

      qrcode(),
    ],

    assetsInclude: [
      '**/*.png',
      '**/*.jpg',
      '**/*.jpeg',
      '**/*.svg',
      '**/*.ttf',
    ],

    define: {
      global: 'window',
      __DEV__: JSON.stringify(development),
      DEV: JSON.stringify(development),
      'process.env.NODE_ENV': JSON.stringify(
        mode,
      ),
    },

    resolve: {
      extensions,

      alias: {
        'react-native': 'react-native-web',

        'react-native-vector-icons':
          path.resolve(
            __dirname,
            'node_modules/react-native-vector-icons',
          ),
      },
    },

    build: {
      /*
       * Déjalo true mientras diagnosticamos.
       * Después puedes cambiarlo a false.
       */
      sourcemap: true,

      commonjsOptions: {
        transformMixedEsModules: true,
      },
    },

    /*
     * Esto se aplica al servidor de desarrollo.
     * Por eso npm run dev ya funcionaba.
     */
    optimizeDeps: {
      esbuildOptions: {
        resolveExtensions: extensions,
        jsx: 'automatic',

        loader: {
          '.js': 'jsx',
        },
      },
    },
  };
});