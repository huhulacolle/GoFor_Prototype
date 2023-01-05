import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native'
import React from 'react'
import { Controller, useForm } from 'react-hook-form';
import { TableModel } from '../../clients/GoForClient';
import { TextInput } from 'react-native-paper';
import UserService from '../../services/UserService';
import Tags from "react-native-tags";

export default function AddTable({ navigation }: any) {

  const { control, handleSubmit } = useForm<TableModel>();

  const userService = new UserService;

  function setTableSubmit(data: TableModel) {
    userService.setTable(data)
      .then(
        () => {
          navigation.goBack();
        }
      )
      .catch(
        err => {
          alert(err)
          console.log(err.status);
        }
      )
  }

  return (
    <View>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            onChangeText={value => onChange(value)}
            value={value}
            label={'Nom'}
          />
        )}
        name='name'
        rules={{ required: true }}
      />
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            onChangeText={value => onChange(value)}
            value={value}
            label={'Description'}
          />
        )}
        name='description'
        rules={{ required: true }}
      />
      <Controller
        control={control}
        render={({field: { onChange, value }}) => (
          <TextInput
            style={styles.input}
            onChangeText={value => onChange(value)}
            value={"WIP"}
            label={'Tags'}
            disabled
          />
        )}
        name='tags'
      />            
      <View style={styles.button}>
        <Button
          title='Nouveau tableau'
          onPress={handleSubmit(setTableSubmit)}
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