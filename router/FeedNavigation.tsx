import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FeedUser from '../components/Feeds/FeedUser';
import Feed from '../components/Feeds/Feed';

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