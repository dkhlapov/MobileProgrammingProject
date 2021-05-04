import React, {useEffect} from 'react';
import { Alert, View, Button, FlatList } from 'react-native';
import {ListItem, Input} from "react-native-elements";
import { useState } from 'react';
import {token} from '../vars';
import {styles} from './Styles';

export function PlayersScreen({navigation}) {
    const [name, setName] = useState('');
    const [players, setPlayers] = useState([]);
    const getPlayers = () => {
      const url = "https://api.pandascore.co/dota2/players?search[name]="+name+"&per_page=100&sort=name&token="+token;
      fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        setPlayers(responseJson);
      })
      .catch((error) => {
        Alert.alert('Error', error);
      });
    };

    useEffect(() => {
        const refresh = navigation.addListener('focus', () => {
            setName('');
            setPlayers([]);
        });
    }, [navigation]);
    
    return (
      <View style={styles.container}>
        <FlatList
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => <ListItem bottomDivider onPress={() => {
            navigation.navigate('Player', {playerId: item.id});
          }} >
              <ListItem.Content>
                  <ListItem.Title>{item.name}</ListItem.Title>
              </ListItem.Content>
          </ListItem>}
          data={players} 
        />  
        <Input
          value={name} 
          placeholder="Type the nickname of the player"
          label='Nickname'
          onChangeText={(name) => setName(name)} 
        />
       <Button title="Find" onPress={getPlayers} />
      </View>
    );
  }