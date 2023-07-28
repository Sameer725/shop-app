import React from 'react';
import { useWindowDimensions } from 'react-native';
import RenderHTML, { Element, Node } from 'react-native-render-html';

import theme from '@assets/theme/theme';

export enum HTMLBaseStyleSize {
  SMALL = 'small',
  REGULAR = 'regular',
}

interface Props {
  htmlString: string;
  color?: string;
  baseStyleSize?: HTMLBaseStyleSize;
}

export const HtmlReader: React.FC<Props> = (props) => {
  const { htmlString, color, baseStyleSize = HTMLBaseStyleSize.REGULAR } = props;

  const source = {
    html: htmlString,
  };

  const { width } = useWindowDimensions();
  // Ensure that the list elements are aligned since they have a margin per default since the listItems are paragraphs or headers
  // E.g. <ol><li><p>first</p></li><li>second</li></ol>
  const onElement = (element: Element) => {
    const { children, name } = element;
    if ((name === 'ul' || name === 'ol') && children && children.length) {
      element.attribs = { class: 'list' };

      children.forEach((listItem: Node) =>
        (listItem as Element).children.forEach((child) => ((child as Element).attribs = { class: 'listItem' }))
      );
    }
    if (name === 'h1') {
      element.attribs = { class: 'h1' };
    }
    if (name === 'h2') {
      element.attribs = { class: 'h2' };
    }
    if (name === 'h3') {
      element.attribs = { class: 'h3' };
    }
    if (name === 'h4') {
      element.attribs = { class: 'h4' };
    }
    if (name === 'h5') {
      element.attribs = { class: 'h5' };
    }
    if (name === 'h6') {
      element.attribs = { class: 'h6' };
    }
  };
  return (
    <RenderHTML
      contentWidth={width}
      source={source}
      domVisitors={{ onElement }}
      classesStyles={classesStyles}
      baseStyle={{
        ...classesStyles.baseStyle,
        ...classesStyles[baseStyleSize],
        color: color ?? classesStyles.baseStyle.color,
      }}
    />
  );
};

const classesStyles = {
  h1: {
    lineHeight: 30,
    marginBottom: 0,
  },
  h2: {
    marginBottom: 0,
  },
  h3: {
    marginBottom: 0,
  },
  h4: {
    marginTop: 10,
    marginBottom: 0,
  },
  h5: {
    marginTop: 10,
    marginBottom: 0,
  },
  h6: {
    marginTop: 10,
    marginBottom: 0,
  },
  list: {
    margin: 0,
  },
  listItem: {
    margin: 0,
  },
  baseStyle: {
    color: theme.colors.defaultTextColor,
    fontFamily: theme.textVariants['text-md'].fontFamily,
  },
  regular: {
    lineHeight: 24,
    fontSize: 16,
  },
  small: {
    lineHeight: 20,
    fontSize: 14,
  },
};
