import React from 'react';
import { NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons} from '@expo/vector-icons';
import {TeamStackScreen} from './components/TeamStack';
import {PlayerStackScreen} from './components/PlayersStack';
import {AppearanceProvider, useColorScheme} from 'react-native-appearance'
import {DefaultTheme, DarkTheme} from "@react-navigation/native";

export default function App() {
  
  const screenOptions = ({ route }) => ({
    tabBarIcon: ({ focused, color, size }) => {
      let iconName;
  
      if (route.name === 'Teams') {
        iconName = 'account-group';
      } else if (route.name === 'Players') {
        iconName = 'human-male';
      }
  
      return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
    }

  });

  const Tab = createBottomTabNavigator();
  const scheme = useColorScheme();
  return (
      <AppearanceProvider>
        <NavigationContainer theme={scheme === "dark" ? DarkTheme : DefaultTheme}>
          <Tab.Navigator screenOptions={screenOptions}>
            <Tab.Screen name="Teams" component={TeamStackScreen} />
            <Tab.Screen name="Players" component={PlayerStackScreen} />
            {/*<Tab.Screen name="Settings" component={SettingsScreen} />*/}
          </Tab.Navigator>
        </NavigationContainer>
      </AppearanceProvider>

  );
}