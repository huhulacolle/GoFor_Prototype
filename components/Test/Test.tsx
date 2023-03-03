import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Card } from 'react-native-paper';

export default function Test() {

  const [Mock, setMock] = useState<string[]>([])

  useEffect(() => {
    setMock(createMock())
  }, [])


  function createMock(): string[] {
    let text: string[] = [];
    for (let i = 0; i < 10; i++) {
      text.push("test" + i)
    }
    return text;
  }

  return (
    <View>
      <FlatList
        contentContainerStyle={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignContent: "center"
        }}
        style={{margin: 100}}
        numColumns={3}
        data={Mock}
        renderItem={({ item }) => (
          <Card style={{padding: 10}}>
            <Card.Content>
              <Text> {item} </Text>
            </Card.Content>
          </Card>
        )}
      />

    </View>
  )
}
