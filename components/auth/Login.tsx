import { View, StyleSheet, Button } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { UserModel } from '../../clients/GoForClient';
import { Controller } from 'react-hook-form';
import { TextInput } from 'react-native-paper';
import { AuthService } from '../../services/AuthService';
import { AuthContext } from '../../context/AuthContext';

export default function Login() {

  const authService = new AuthService();

  const { login } = useContext(AuthContext)

  const { control, handleSubmit } = useForm<UserModel>();

  function loginSubmit(data: UserModel) {
    authService.login(data)
    .then(
      data => {
        login(data);
      }
    )
    .catch(
      err => {
        alert(err)
      }
    )
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
            secureTextEntry
            placeholder='Mot de passe'
          />
        )}
        name='password'
        rules={{required: true}}
      />
      <View style={styles.button}>
        <Button
          title='Connexion'
          onPress={handleSubmit(loginSubmit)}
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