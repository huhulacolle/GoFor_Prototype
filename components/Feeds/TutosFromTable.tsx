import { FlatList, StyleSheet, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import UserService from '../../services/UserService';
import { FAB, Provider } from 'react-native-paper';
import { TutoModel } from '../../clients/GoForClient';
import YoutubeIframe from 'react-native-youtube-iframe';

export default function TutosFromTable({ navigation, route }: any) {

  const userService = new UserService;

const [Tutos, setTutos] = useState<TutoModel[]>([])

  useEffect(() => {
    getTuto();
  }, [])

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
        renderItem={({item}) => (
          <YoutubeIframe
            webViewStyle={{opacity: 0.99}}
            height={250}
            videoId={item.url}
          />
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
})