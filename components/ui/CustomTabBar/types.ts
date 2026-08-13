import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";

export interface TabBarItemProps {
  routeName: string;
  label: string;
  isFocused: boolean;
  disabled?: boolean;
  onPress: () => void;
  onLongPress: () => void;
}

export type CustomTabBarProps = BottomTabBarProps;
