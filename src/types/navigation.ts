import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { Route } from '@react-navigation/routers';

export type KsNavigation = NavigationProp<ParamListBase>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type KsRoute<T extends { [param: string]: any }> = Route<string, T>;
