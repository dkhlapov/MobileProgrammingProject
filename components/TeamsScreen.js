import React, {useEffect} from 'react';
import { Alert, View, Button, FlatList } from 'react-native';
import {ListItem, Input} from 'react-native-elements';
import { useState } from 'react';
import {token} from '../vars';
import {styles} from './Styles';

export function TeamsScreen({navigation}) {
    const [name, setName] = useState('');
    const [teams, setTeams] = useState([]);
    const getTeams = () => {
      const url = "https://api.pandascore.co/dota2/teams?search[name]="+name+"&per_page=100&sort=name&token="+token;
      fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        setTeams(responseJson);
      })
      .catch((error) => {
        Alert.alert('Error', error);
      });
    };
    useEffect(() => {
        const refresh = navigation.addListener('focus', () => {
            setName('');
            setTeams([]);
        });
    }, [navigation]);
    return (
      <View style={styles.container}>
        <FlatList
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => <ListItem bottomDivider onPress={() => {
            navigation.navigate('Team', {teamId: item.id});
          }}>
              <ListItem.Content>
                  <ListItem.Title>{item.name}</ListItem.Title>
              </ListItem.Content>
          </ListItem>}
          data={teams} 
        />  
        <Input
          value={name} 
          placeholder="Type the name of the team"
          label='Team Name'
          onChangeText={(name) => setName(name)} 
        />
       <Button style={{padding: 15}} title="Find" onPress={getTeams} />
      </View>
    );
  }