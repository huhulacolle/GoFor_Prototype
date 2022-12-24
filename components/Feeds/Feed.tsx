import { View, StyleSheet, Button } from 'react-native'
import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext';
import TestService from '../../services/TestService';

export default function Feed() {

  const { disconnect } = useContext(AuthContext)
  const testService = new TestService;

  function test() {
    testService.test()
    .then(
      data => {
        alert("ça marche");
        console.log(data);
      }
    )
    .catch(
      err => {
        alert("ça marche pas");
        console.log(err);
      }
    )
  }

  return (
    <View style={styles.container}>
      <Button
        onPress={disconnect}
        title='Deconnexion'
      />
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