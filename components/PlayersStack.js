import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {PlayersScreen} from './PlayersScreen';
import {PlayerPage} from './PlayerPage';
import {TeamPage} from "./TeamPage";

const PlayerStack = createStackNavigator();
export function PlayerStackScreen () {
    return (
      <PlayerStack.Navigator>
          <PlayerStack.Screen name="Players" component={PlayersScreen} />
          <PlayerStack.Screen name="Player" component={PlayerPage} />
          <PlayerStack.Screen name="Team" component={TeamPage} />
      </PlayerStack.Navigator>
        
    )
  }