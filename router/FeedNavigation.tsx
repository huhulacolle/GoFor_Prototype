import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FeedUser from '../components/Feeds/FeedUser';
import Feed from '../components/Feeds/Feed';
import TutosFromTable from '../components/Feeds/TutosFromTable';
import AddTable from '../components/Feeds/AddTable';
import AddTuto from '../components/Feeds/AddTuto';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function FeedStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name='FeedTab' 
        component={FeedTab} 
        options={{
          headerShown: false
        }} />
        <Stack.Screen
          name='AddTable'
          component={AddTable}
          options={{
            headerStyle: {backgroundColor: "#F06C1A",},
            headerTintColor: '#fff',
            title: "Nouveau Tableau"
          }}
        />
        <Stack.Screen
          name='TutosFromTable'
          component={TutosFromTable}
          options={{
            headerStyle: {backgroundColor: "#F06C1A",},
            headerTintColor: '#fff',
            animation: 'slide_from_right'
          }}
        />
        <Stack.Screen
          name='AddTuto'
          component={AddTuto}
          options={{
            headerStyle: {backgroundColor: "#F06C1A",},
            headerTintColor: '#fff',  
          }}
        />
    </Stack.Navigator>
  )
}

function FeedTab() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name='FeedUser'
        component={FeedUser}
        options={{
          headerStyle: {backgroundColor: "#F06C1A",},
          headerTintColor: '#fff',
        }}
      />
      <Tab.Screen
        name='Feed'
        component={Feed}
        options={{
          headerStyle: {backgroundColor: "#F06C1A",},
          headerTintColor: '#fff',
        }}
      />
    </Tab.Navigator>
  )
}