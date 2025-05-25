import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "./NavigationType";

/**
 * Kiểu cho navigation props, dựa trên RootStackParamList
 */
type NavigationType = NativeStackNavigationProp<RootStackParamList>;

/**
 * Utility type cho params của từng screen:
 * - Nếu route không yêu cầu params thì optional
 * - Nếu yêu cầu params thì bắt buộc
 */
type NavigationParams<T extends keyof RootStackParamList> =
  undefined extends RootStackParamList[T]
    ? [params?: RootStackParamList[T]]
    : [params: RootStackParamList[T]];

/**
 * Factory tạo hàm điều hướng type-safe
 * @param navigation - instance navigation lấy từ useNavigation
 * @param method - tên method navigation ('navigate' | 'push' | 'replace')
 * @returns Hàm điều hướng đã được type-check
 */
const createNavigationHandler =
  <T extends keyof RootStackParamList>(
    navigation: NavigationType,
    method: keyof NavigationType
  ) =>
  (screen: T, ...args: NavigationParams<T>) => {
    // Gọi phương thức navigation với params truyền vào
    // @ts-ignore vì method là dynamic, nhưng vẫn type-safe nhờ generic
    navigation[method](screen, args[0]);
  };

/**
 * Custom hook bọc navigation logic có type-safe
 */
export const useAppNavigator = () => {
  const navigation = useNavigation<NavigationType>();

  return {
    navigate: createNavigationHandler(navigation, "navigate"),
    push: createNavigationHandler(navigation, "push"),
    replace: createNavigationHandler(navigation, "replace"),
    goBack: navigation.goBack,
    reset: navigation.reset,
    currentRoute: navigation.getState().routes[navigation.getState().index],
  };
};
