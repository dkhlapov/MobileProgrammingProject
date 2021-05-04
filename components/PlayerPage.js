import React, {useEffect, useState} from 'react';
import { ActivityIndicator, View, FlatList } from 'react-native';
import {token} from '../vars';
import {styles} from './Styles';
import {ListItem} from "react-native-elements";
import ImageLoad from 'react-native-image-placeholder';

export function PlayerPage({route, navigation}) {
  const {playerId} = route.params;
  const [isLoading, setLoading] = useState(true);
  const player = JSON.stringify(playerId);
  const [data, setData] = useState([]);
  const url = "https://api.pandascore.co/dota2/players?filter[id]="+player+"&sort=name&token="+token;
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
              <ListItem>
                <ListItem.Content>
                  <ListItem.Title>
                    Nickname
                  </ListItem.Title>
                  <ListItem.Subtitle>
                    {item.name}
                  </ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
              <ListItem>
                <ListItem.Content>
                  <ListItem.Title>
                    Name
                  </ListItem.Title>
                  <ListItem.Subtitle>
                    {item.first_name ? item.first_name : 'Unknown'} {item.last_name ? item.last_name : 'Unknown'}
                  </ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
              <ListItem>
                <ListItem.Content>
                  <ListItem.Title>
                    Country
                  </ListItem.Title>
                  <ListItem.Subtitle>
                    {item.hometown ? item.hometown : 'Unknown'}
                  </ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
              <ListItem onPress={() => navigation.navigate('Team', {teamId: item.current_team.id})}>
                <ListItem.Content>
                  <ListItem.Title>
                    Team
                  </ListItem.Title>
                  <ListItem.Subtitle>
                    {item.current_team.name ? item.current_team.name : 'Unknown'}
                  </ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
              <ListItem>
                <ListItem.Content>
                  <ListItem.Title>
                    Position
                  </ListItem.Title>
                  <ListItem.Subtitle>
                    {item.role != null ? item.role : 'Unknown'}
                  </ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>


            </View>

            )}
          />
        )}
    </View>
  );
}