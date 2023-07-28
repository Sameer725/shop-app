import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, ReactNode, useContext, useEffect, useReducer } from 'react';
import LocalizedStrings from 'react-native-localization';

import { AsyncStorageKeys } from '@constants';
import { german } from '../lang';

enum LanguageOption {
  GERMAN = 'de',
}

interface ReducerProps {
  language: LanguageOption;
  isLoading: boolean;
}

interface LocalizationContextProps {
  strings: typeof german;
  dispatchUpdateLocale: (locale: LanguageOption) => void;
  language: LanguageOption;
}

enum ActionType {
  UPDATE_LOCALE = 'updateLocale',
}

enum ActionName {
  IS_LOADING = 'isLoading',
  LANGUAGE = 'language',
}

interface Action {
  type: ActionType;
  isLoading?: boolean;
  locale?: LanguageOption;
  name: ActionName;
}

const Reducer: (state: ReducerProps, action: Action) => ReducerProps = (state: ReducerProps, action: Action) => {
  switch (action.type) {
    case ActionType.UPDATE_LOCALE:
      return {
        ...state,
        [ActionName.IS_LOADING]: action.isLoading ?? state[ActionName.IS_LOADING] ?? false,
        [ActionName.LANGUAGE]: action.locale ?? state[ActionName.LANGUAGE] ?? LanguageOption.GERMAN,
      };
    default:
      return state;
  }
};

const defaultLanguage: LanguageOption = LanguageOption.GERMAN;

const strings = new LocalizedStrings({
  de: german,
});

strings.setLanguage(defaultLanguage);

const initialState: ReducerProps = {
  language: defaultLanguage,
  isLoading: true,
};

export const LocalizationContext: React.Context<LocalizationContextProps> = createContext<LocalizationContextProps>(
  {} as LocalizationContextProps
);

interface LocalizationProps {
  children: ReactNode;
}

export const LocalizationProvider: (props: LocalizationProps) => JSX.Element = (
  props: LocalizationProps
): JSX.Element => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  const getStrings: () => typeof german = () => {
    return strings as typeof german;
  };

  const updateLocale: (locale: LanguageOption) => void = (locale: LanguageOption) => {
    if (locale) {
      if (!Object.values(LanguageOption).includes(locale)) {
        locale = LanguageOption.GERMAN;
        // eslint-disable-next-line no-console
        console.error('Given locale language was not valid and switched to default');
      }

      strings.setLanguage(locale);
      dispatch({ type: ActionType.UPDATE_LOCALE, name: ActionName.LANGUAGE, locale });
    }
    dispatch({ type: ActionType.UPDATE_LOCALE, name: ActionName.IS_LOADING, isLoading: false });
  };
  useEffect(() => {
    void AsyncStorage.getItem(AsyncStorageKeys.LANGUAGE).then((locale) => {
      updateLocale((locale as LanguageOption) ?? LanguageOption.GERMAN);
    });
  }, []);

  const localizedStrings: typeof german = getStrings();

  const dispatchUpdateLocale: (locale: LanguageOption) => void = (locale: LanguageOption) => {
    void AsyncStorage.setItem('locale', locale ?? LanguageOption.GERMAN);
    updateLocale(locale);
  };

  return (
    <LocalizationContext.Provider
      value={{
        strings: localizedStrings,
        dispatchUpdateLocale,
        language: state.language,
      }}
    >
      {props.children}
    </LocalizationContext.Provider>
  );
};

export const useLocalizedData: () => LocalizationContextProps = () => useContext(LocalizationContext);
