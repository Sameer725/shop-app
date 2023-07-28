import { Platform } from 'react-native';
import { check, PERMISSIONS, PermissionStatus, request } from 'react-native-permissions';

export interface UseNativePermissionsReturnTypes {
  locationPermissionRequest: () => Promise<PermissionStatus>;
  locationPermissionCheck: () => Promise<PermissionStatus>;
}

export const useNativePermissions = (): UseNativePermissionsReturnTypes => {
  const locationPermissionRequest = async () => {
    return await request(
      Platform.OS === 'ios' ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
    );
  };

  const locationPermissionCheck = async () => {
    return await check(
      Platform.OS === 'ios' ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
    );
  };

  return { locationPermissionRequest, locationPermissionCheck };
};
