import { View, StyleSheet, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { TableModel, TutoModel } from '../../clients/GoForClient';
import { TextInput } from 'react-native-paper';
import getVideoId from 'get-video-id';
import UserService from '../../services/UserService';
import { IDropdown } from '../../interfaces/IDropdown';
import DropDownPicker from 'react-native-dropdown-picker';

export default function AddTutosShare({ route, navigation }: any) {

  const { control, handleSubmit } = useForm<TutoModel>();
  const [open, setOpen] = useState(false);
  const [IdTable, setIdTable] = useState<string>("");
  const [TableList, setTableList] = useState<IDropdown[]>([]);

  const userService = new UserService;

  function getTables(): void {
    setTableList([]);
    userService.getTables()
    .then(
      data => {
        data.forEach(d => {
          let dropdown: IDropdown = {
            label: "",
            value: ""
          };
          dropdown.label = d.name;          
          dropdown.value = d.id.toString();
          setTableList(TableList => [...TableList, dropdown]);
        });
      }
    )
    .catch(
      err => {
        alert(err)
      }
    )
  }

  useEffect(() => {
    getTables();
  }, [])
  
  function setTutoSubmit(data: TutoModel) {

    data.idTable = parseInt(IdTable);

    data.url = getVideoId(route.params).id as string;
    
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
            value={route.params}
            label={'Url YouTube'}
            disabled
          />
        )}
        name='url'
      />
      <DropDownPicker
        open={open}
        value={IdTable}
        items={TableList}
        setOpen={setOpen}
        setValue={setIdTable}
        containerStyle={styles.input}
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