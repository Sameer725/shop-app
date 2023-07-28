import { TextStyle } from 'react-native';

const defaultHeadingStyles: TextStyle = {
  fontWeight: '700',
  fontFamily: 'Inter-Bold',
};

const defaultTextStyles: TextStyle = {
  fontWeight: '400',
  fontFamily: 'Inter-Regular',
};

export const textVariants = {
  defaults: {
    color: 'defaultTextColor',
  },
  'heading-4xl': {
    fontSize: 60,
    lineHeight: 60,
    ...defaultHeadingStyles,
  },
  'heading-3xl': {
    fontSize: 48,
    lineHeight: 48,
    ...defaultHeadingStyles,
  },
  'heading-2xl': {
    fontSize: 36,
    lineHeight: 36 * 1.2,
    ...defaultHeadingStyles,
  },
  'heading-xl': {
    fontSize: 30,
    lineHeight: 30 * 1.33,
    ...defaultHeadingStyles,
  },
  'heading-lg': {
    fontSize: 24,
    lineHeight: 24 * 1.33,
    ...defaultHeadingStyles,
  },
  'heading-md': {
    fontSize: 20,
    lineHeight: 20 * 1.2,
    ...defaultHeadingStyles,
  },
  'heading-sm': {
    fontSize: 16,
    lineHeight: 16 * 1.2,
    ...defaultHeadingStyles,
  },
  'heading-xs': {
    fontSize: 14,
    lineHeight: 14 * 1.2,
    ...defaultHeadingStyles,
  },
  'heading-2xs': {
    fontSize: 12,
    lineHeight: 12 * 1.2,
    ...defaultHeadingStyles,
  },

  'text-6xl': {
    fontSize: 60,
    lineHeight: 60 * 1.5,
    ...defaultTextStyles,
  },
  'text-5xl': {
    fontSize: 48,
    lineHeight: 48 * 1.5,
    ...defaultTextStyles,
  },
  'text-4xl': {
    fontSize: 36,
    lineHeight: 36 * 1.5,
    ...defaultTextStyles,
  },
  'text-3xl': {
    fontSize: 30,
    lineHeight: 30 * 1.5,
    ...defaultTextStyles,
  },
  'text-2xl': {
    fontSize: 24,
    lineHeight: 24 * 1.5,
    ...defaultTextStyles,
  },
  'text-xl': {
    fontSize: 20,
    lineHeight: 20 * 1.5,
    ...defaultTextStyles,
  },
  'text-lg': {
    fontSize: 18,
    lineHeight: 18 * 1.5,
    ...defaultTextStyles,
  },
  'text-md': {
    fontSize: 16,
    lineHeight: 16 * 1.5,
    ...defaultTextStyles,
  },
  'text-md-sb': {
    fontSize: 16,
    lineHeight: 16 * 1.5,
    ...defaultTextStyles,
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },
  'text-sm': {
    fontSize: 14,
    lineHeight: 14 * 1.5,
    ...defaultTextStyles,
  },
  'text-xs': {
    fontSize: 12,
    lineHeight: 12 * 1.5,
    ...defaultTextStyles,
  },
  'text-xs-sb': {
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 10 * 1.5,
    fontFamily: 'Inter-SemiBold',
  },
  'text-2xs-sb': {
    fontSize: 10,
    fontWeight: '600',
    lineHeight: 10 * 1.5,
    fontFamily: 'Inter-SemiBold',
  },
  'text-2xs-r': {
    fontSize: 10,
    lineHeight: 10 * 1.5,
    ...defaultTextStyles,
  },
  'text-3xs': {
    fontSize: 7,
    lineHeight: 7 * 1.3,
    fontWeight: '500',
    fontFamily: 'Inter-Medium',
  },
  'text-3xs-sb': {
    fontSize: 7,
    lineHeight: 7 * 1.3,
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },
};
