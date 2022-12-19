import { View, StyleSheet, Button } from 'react-native'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { UserModel } from '../../clients/GoForClient';
import { Controller } from 'react-hook-form';
import { TextInput } from 'react-native-paper';
import { AuthService } from '../../services/AuthService';

export default function Login() {

  const { control, handleSubmit } = useForm<UserModel>();

  useEffect(() => {
    const test = new AuthService();
    // test.Test()
    // .then(
    //   data => {
    //     console.log(data);
    //   }
    // )
  }, [])
  

  function Login(data: UserModel) {
    console.log(data);
  }

  return (
    <View>
      <Controller
        control={control}
        render={({field: { onChange, value }}) => (
          <TextInput
            style={styles.input}
            onChangeText={value => onChange(value)}
            value={value}
            placeholder='Email'
          />
        )}
        name='email'
        rules={{required: true}}
      />
      <Controller
        control={control}
        render={({field: { onChange, value }}) => (
          <TextInput
            style={styles.input}
            onChangeText={value => onChange(value)}
            value={value}
            placeholder='Mot de passe'
          />
        )}
        name='password'
        rules={{required: true}}
      />
      <View style={styles.button}>
        <Button
          title='Connexion'
          onPress={handleSubmit(Login)}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10
  },
  button: {
    marginTop: 20,
    marginRight: 40,
    marginLeft: 40
  }
})