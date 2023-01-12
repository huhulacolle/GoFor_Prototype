import { FlatList, StyleSheet, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import UserService from '../../services/UserService';
import { Card, FAB, Provider } from 'react-native-paper';
import { TutoModel } from '../../clients/GoForClient';
import YoutubePlayer from "react-native-youtube-iframe";
import { useIsFocused } from '@react-navigation/native';
import WebView from 'react-native-webview';

export default function TutosFromTable({ navigation, route }: any) {

  const userService = new UserService;

  const [Tutos, setTutos] = useState<TutoModel[]>([])

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      getTuto();
    }
  }, [isFocused])

  function getTuto(): void {
    userService.getTuto(route.params)
      .then(
        data => {
          setTutos(data)
        }
      )
      .catch(
        err => {
          alert(err)
        }
      )
  }


  return (
    <Provider>
      <FlatList
        data={Tutos}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Title title={item.title} />
            <Card.Content>
              <Text style={{marginBottom:10}}>{item.description}</Text>
              <WebView
                style={{ opacity: 0.99, height: 575, width: 800 }}
                source={{
                  html: `<iframe width="393" height="699" 
                      src="https://www.youtube.com/embed/${item.url}?controls=0" 
                      title="YouTube video player" frameborder="0"; encrypted-media; web-share"></iframe>`
                }}
                scrollEnabled={false}
              />
            </Card.Content>
          </Card>
        )}
      />
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.navigate("AddTuto", route.params)}
      />
    </Provider>
  )
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  card: {
    marginTop: 10,
    marginBottom: 3,
    marginRight: 15,
    marginLeft: 15
  },
})