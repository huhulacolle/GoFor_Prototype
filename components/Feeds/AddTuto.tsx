import { View, StyleSheet, Button } from 'react-native'
import React from 'react'
import { TutoModel } from '../../clients/GoForClient';
import { Controller, useForm } from 'react-hook-form';
import { TextInput } from 'react-native-paper';
import getVideoId from 'get-video-id';
import UserService from '../../services/UserService';


export default function AddTuto( { navigation, route }: any ) {

  const { control, handleSubmit } = useForm<TutoModel>();

  const userService = new UserService;

  function setTutoSubmit(data: TutoModel) {

    data.idTable = route.params;

    data.url = getVideoId(data.url).id as string;
    
    userService.setTuto(data)
    .then(
      () => {
        navigation.goBack();
      }
    )
    .catch(
      err => {
        alert(err.Message)
        console.log(err);
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
            label={'Nom'}
          />
        )}
        name='title'
      />
      <Controller
        control={control}
        render={({field: { onChange, value }}) => (
          <TextInput
            style={styles.input}
            onChangeText={value => onChange(value)}
            value={value}
            label={'Description'}
          />
        )}
        name='description'
        rules={{required: true}}
      />        
      <Controller
        control={control}
        render={({field: { onChange, value }}) => (
          <TextInput
            style={styles.input}
            onChangeText={value => onChange(value)}
            value={value}
            label={'Url YouTube'}
          />
        )}
        name='url'
        rules={{required: true}}
      />

      <View style={styles.button}>
        <Button
          title='Nouveau tuto'
          onPress={handleSubmit(setTutoSubmit)}
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