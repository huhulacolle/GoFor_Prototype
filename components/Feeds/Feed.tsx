import { View, StyleSheet, Button } from 'react-native'
import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext';

export default function Feed() {

  const { disconnect } = useContext(AuthContext)

  return (
    <View style={styles.container}>
      <Button
        onPress={disconnect}
        title='Deconnexion'
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