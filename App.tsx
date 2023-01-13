import 'expo-dev-client';

import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useMemo, useReducer, useState } from 'react';
import { IAction } from './interfaces/IAction';
import AuthStack from './router/AuthNavigation';
import FeedStack from './router/FeedNavigation';
import * as SecureStore from 'expo-secure-store';
import { TokenModel } from './clients/GoForClient';
import { AuthContext } from './context/AuthContext';
import { Provider as PaperProvider } from 'react-native-paper';
import { View } from 'react-native';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
LogBox.ignoreAllLogs();

export default function App() {

  const [state, dispatch] = useReducer(
    (prevState: any, action: IAction) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            token: action.token,
            isLoading: false,
          };
        case 'LOGIN':
          return {
            ...prevState,
            isSignout: false,
            token: action.token,
          };
        case 'DISCONNECT':
          return {
            ...prevState,
            isSignout: true,
            token: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      token: null,
    }
  );
  

  useEffect(() => {
    async function bootstrapAsync() {
      let token: string | null;
      try {
        token = await SecureStore.getItemAsync("token");
        // console.log(token);
      } catch (error) {
        alert(error)
        token = null;
      }
      dispatch({type: 'RESTORE_TOKEN', token: token})
    }
    bootstrapAsync();
  }, [])
  
  

  const authContext = useMemo(() => ({
    async login(data: TokenModel) {
        await SecureStore.setItemAsync("token", data.token)
        await SecureStore.setItemAsync("refreshToken", data.refreshToken)
        dispatch({ type: 'LOGIN', token: data.token });
      },
      disconnect() {
        SecureStore.deleteItemAsync("token");
        SecureStore.deleteItemAsync("refreshToken");
        dispatch({ type: 'DISCONNECT', token: null })
      }
    }),
  [])

  if (state.isLoading) {
    return <View style={{flex: 1, justifyContent: 'center', alignContent: 'center', backgroundColor: "#F06C1A"}}></View>
  }

  return (
    <PaperProvider>
      <AuthContext.Provider value={authContext}>
        <NavigationContainer>
          {
            state.token ? (
              <FeedStack />
            ) : (
              <AuthStack />
            )
          }
          <StatusBar style="light" />
        </NavigationContainer>
      </AuthContext.Provider>
    </PaperProvider>
  );
}
