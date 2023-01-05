import { Platform } from 'react-native';
import { createBottomTabNavigator, BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useTheme } from 'native-base';

import { Home } from '@screens/Home';
import { Exercise } from '@screens/Exercise';
import { Profile } from '@screens/Profile';
import { History } from '@screens/History';

import HomeSvg from '@assets/home.svg';
import HistorySvg from '@assets/history.svg';
import ProfileSvg from '@assets/profile.svg';

type AppRoutes = {
  home: undefined;
  profile: undefined;
  exercise: undefined;
  history: undefined;
}

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>;

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();

export function AppRoutes() {
  const { sizes, colors } = useTheme();

  const iconSizes = sizes[6];

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.green[500],
        tabBarInactiveTintColor: colors.gray[200],
        tabBarStyle: {
          backgroundColor: colors.gray[600],
          borderTopWidth: 0,
          height: Platform.OS === "android" ? 'auto' : 96,
          paddingBottom: sizes[10],
          paddingTop: sizes[6],
        },
      }}
    >
      <Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <HomeSvg
              height={iconSizes}
              width={iconSizes}
              fill={color}
            />
          )
        }}
      />

      <Screen
        name="history"
        component={History}
        options={{
          tabBarIcon: ({ color }) => (
            <HistorySvg
              height={iconSizes}
              width={iconSizes}
              fill={color}
            />
          )
        }}
      />

      <Screen
        name="profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <ProfileSvg
              height={iconSizes}
              width={iconSizes}
              fill={color}
            />
          )
        }}
      />

      <Screen
        name="exercise"
        component={Exercise}
        options={{ tabBarButton: () => null }}
      />
    </Navigator>
  );
}
