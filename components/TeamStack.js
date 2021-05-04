import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {TeamsScreen} from './TeamsScreen';
import {TeamPage} from './TeamPage';
import {PlayerPage} from "./PlayerPage";

const TeamStack = createStackNavigator();
export function TeamStackScreen () {
    return (
      <TeamStack.Navigator>
          <TeamStack.Screen name="Teams" component={TeamsScreen} />
          <TeamStack.Screen name="Team" component={TeamPage} />
          <TeamStack.Screen name="Player" component={PlayerPage} />
      </TeamStack.Navigator>
    )
  }