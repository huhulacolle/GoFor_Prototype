import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name='AuthTab' 
        component={AuthTab} 
        options={{
          headerShown: false
        }} />
    </Stack.Navigator>
  )
}

function AuthTab() {
  return(
    <Tab.Navigator>
      <Tab.Screen 
        name='Login' 
        component={Login} 
        options={{
          headerStyle: {backgroundColor: "#F06C1A",},
          headerTintColor: '#fff',  
        }}
      />
      <Tab.Screen 
        name='Register' 
        component={Register}
        options={{
          headerStyle: {backgroundColor: "#F06C1A",},
          headerTintColor: '#fff',  
        }}
      />
    </Tab.Navigator>
  )
}

function Test() {
  return (
    <Text>salut</Text>
  )
}