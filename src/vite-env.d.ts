/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

declare module '*.jpg' {
  import type { ImageSourcePropType } from 'react-native';

  const source: ImageSourcePropType;
  export default source;
}

declare module '*.jpeg' {
  import type { ImageSourcePropType } from 'react-native';

  const source: ImageSourcePropType;
  export default source;
}

declare module '*.svg?react' {
  import type { FC } from 'react';
  import type { SvgProps } from 'react-native-svg';

  const SvgComponent: FC<SvgProps>;
  export default SvgComponent;
}