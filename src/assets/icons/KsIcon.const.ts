// ***************************************************** //
//                  AUTO GENERATED FILE                  //
// This file was generated by this script: yarn run icon //
//          Do not change the content manually!          //
// ***************************************************** //

import glyphMapJson from '../fonts/unicodeMap.json';
import { KS_ICON, KS_ICON_STYLE } from './KsIcon.enum';

export const KS_ICON_GLYPH_STYLE_KEYS: KS_ICON_STYLE[] = Object.keys(glyphMapJson) as KS_ICON_STYLE[];

export const KS_ICON_GLYPH_MAP: { [key in KS_ICON_STYLE]: Partial<{ [iconKey in KS_ICON]: string }> } = glyphMapJson;

export const KS_ICON_STYLES = {
  bold: {
    fontFamily: 'kleinstarkIconBold',
    fontFile: 'kleinstarkIconBold.ttf',
    glyphMap: KS_ICON_GLYPH_MAP.bold,
  },
  outline: {
    fontFamily: 'kleinstarkIconOutline',
    fontFile: 'kleinstarkIconOutline.ttf',
    glyphMap: KS_ICON_GLYPH_MAP.outline,
  },
};
