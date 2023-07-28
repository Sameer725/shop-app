import React from 'react';
// @ts-expect-error Module '"react-native-vector-icons"' has no exported member 'createMultiStyleIconSet'.
// This is caused by a missing type definition in the @types packages, see discussion here: https://github.com/DefinitelyTyped/DefinitelyTyped/discussions/59583
import { createMultiStyleIconSet } from 'react-native-vector-icons';
import { IconProps } from 'react-native-vector-icons/Icon';

import { KS_ICON_GLYPH_MAP, KS_ICON_GLYPH_STYLE_KEYS, KS_ICON_STYLES } from './KsIcon.const';
import { KS_ICON, KS_ICON_STYLE } from './KsIcon.enum';

interface IconFontOptions<NAME, STYLE> {
  defaultStyle: STYLE;
  glyphValidator: (name: NAME, style: STYLE) => boolean;
  fallbackFamily: (name: NAME) => STYLE;
}

const options: IconFontOptions<KS_ICON, KS_ICON_STYLE> = {
  defaultStyle: KS_ICON_STYLE.OUTLINE,
  glyphValidator: (name, style) => {
    return !!KS_ICON_GLYPH_MAP[style][name];
  },
  fallbackFamily: (name) => {
    for (const style of KS_ICON_GLYPH_STYLE_KEYS) {
      if (KS_ICON_GLYPH_MAP[style][name]) {
        // eslint-disable-next-line no-console
        console.log(
          `WARNING: Icon '${name}' could not be found for the given style. Style '${style}' is used as a fallback.`
        );
        return style;
      }
    }

    /* Always return some family */
    return KS_ICON_STYLE.OUTLINE;
  },
};

type ExtendedIconProps = IconProps & { name: string | KS_ICON } & { [key in KS_ICON_STYLE]?: boolean };

// We need to disable an eslint rule here because there is a missing type definition in the @types packages,
// see discussion here: https://github.com/DefinitelyTyped/DefinitelyTyped/discussions/59583
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
export const KsIcon: React.FC<ExtendedIconProps> = createMultiStyleIconSet(
  KS_ICON_STYLES,
  options
) as React.FC<ExtendedIconProps>;
