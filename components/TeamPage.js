import React from 'react';
import { ActivityIndicator, View, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import {token} from '../vars';
import {styles} from './Styles';
import {ListItem} from "react-native-elements";
import ImageLoad from 'react-native-image-placeholder';

export function TeamPage({route, navigation}) {
  const {teamId} = route.params;
  const [isLoading, setLoading] = useState(true);
  const team = JSON.stringify(teamId);
  const [data, setData] = useState([]);
  const url = "https://api.pandascore.co/dota2/teams?filter[id]="+team+"&sort=name&token="+token;
  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
    }, [navigation]);
  return (
    <View style={styles.container}>
      {isLoading ? <ActivityIndicator/> : (
          <FlatList
            data={data}
            keyExtractor={({ id }, index) => id.toString()}
            renderItem={({ item }) => (
            <View>
              <ImageLoad style={{
                width: 200,
                height: 200,
                alignSelf: 'center'
              }}
              source={{
                uri: item.image_url
              }}
              isShowActivity={false}
              />
              <ListItem bottomDivider>
                <ListItem.Content>
                  <ListItem.Title>
                    Players
                  </ListItem.Title>
                </ListItem.Content>
              </ListItem>
              {item.players.map((person) =>
              <ListItem onPress={() => navigation.push('Player', {playerId: person.id})} key={person.id}>
                <ListItem.Content>
                  <ListItem.Title>{person.name}</ListItem.Title>
                  <ListItem.Subtitle>{person.role != null ? person.role : 'Unknown'}</ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>)}
              {/*<FlatList
                  data={item.players}
                  keyExtractor={id => id.toString()}
                  renderItem={({player}) => (
                      <ListItem onPress={() => navigation.navigate('Player', {playerId: player.id})}>
                        <ListItem.Content>
                          <ListItem.Title>{player.name}</ListItem.Title>
                          <ListItem.Subtitle>{player.role}</ListItem.Subtitle>
                        </ListItem.Content>
                      </ListItem>
                  )} />*/}
            </View>
              
            )}
          />
        )}
    </View>
  );
  }