import { View, Text, StyleSheet, Button } from 'react-native'
import React, { useState } from 'react'
import TestService from '../../services/TestService';

export default function Register() {

  const testService = new TestService;

  const [Loading, setLoading] = useState(false)

  function test() {
    setLoading(true);
    testService.test()
    .then(
      data => {
        alert(data);
        console.log(data);
        setLoading(false)
      }
    )
    .catch(
      err => {
        alert("ça marche pas");
        console.log(err.response);
      }
    )
  }
  
  return (
    <View style={styles.container}>
      <Text>WIP</Text>
      {Loading ? (
        <Text>Chargement</Text>
      ) : (
        <Text></Text>
      )}
      <Button
        onPress={test}
        title='Test'
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});