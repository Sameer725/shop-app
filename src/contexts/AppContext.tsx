import React, { createContext, ReactNode, useContext, useReducer } from 'react';

export interface AppData {
  productSuggestions: string;
}

interface ReducerProps {
  appData: AppData;
  dispatchUpdateApp: (data: AppData) => void;
}

enum ActionType {
  UPDATE_APP = 'update_app',
}

interface Action {
  type: ActionType;
  payload: AppData;
}

const Reducer: (prevState: ReducerProps, action: Action) => ReducerProps = (
  prevState: ReducerProps,
  action: Action
): ReducerProps => {
  switch (action.type) {
    case ActionType.UPDATE_APP:
      return {
        ...prevState,
        appData: action.payload,
      };
    default:
      return prevState;
  }
};

const initialState: ReducerProps = {
  // Store the data of app
  appData: {
    // Stores the value of the searchSuggestion
    productSuggestions: '',
  },
  dispatchUpdateApp: () => {
    return;
  },
};

/**
 * The app context stores all needed data that are used during the app like text input fields that should be saved
 */
export const AppContext: React.Context<ReducerProps> = createContext<ReducerProps>(initialState);

interface AuthProps {
  children: ReactNode;
}

export const AppContextProvider: React.FC<AuthProps> = (props: AuthProps) => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  const updateAppData = (data: AppData) => {
    dispatch({ type: ActionType.UPDATE_APP, payload: data });
  };

  const dispatchUpdateApp = (appData: AppData) => {
    updateAppData(appData);
  };

  return (
    <AppContext.Provider
      value={{
        appData: state.appData,
        dispatchUpdateApp,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export const useAppContext: () => ReducerProps = () => useContext(AppContext);
