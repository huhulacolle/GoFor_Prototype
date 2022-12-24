import { View, StyleSheet, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import UserService from '../../services/UserService'
import { TableModel } from '../../clients/GoForClient';
import { Card, FAB, Provider } from 'react-native-paper';

export default function FeedUser({ navigation }: any) {

  const userService = new UserService;

  const [Tables, setTables] = useState<TableModel[]>([])

  useEffect(() => {
    getTables();
  }, [])

  function getTables(): void {
    userService.getTables()
    .then(
      data => {
        setTables(data)
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
        style={{marginTop: 10}}
        data={Tables}
        renderItem={({ item }) => (
          <Card style={styles.card} onPress={() => navigation.navigate("TutosFromTable", item.id)}>
            <Card.Title title={item.name} />
          </Card>
        )}
      />
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.navigate("AddTable")}
      />
    </Provider>
  )
}

const styles = StyleSheet.create({
  card: {
    marginTop: 10,
    marginBottom: 3,
    marginRight: 15,
    marginLeft: 15
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
})