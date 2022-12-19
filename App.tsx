import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useMemo, useReducer } from 'react';
import { IAction } from './interfaces/IAction';
import AuthStack from './router/AuthNavigation';
import FeedStack from './router/FeedNavigation';
import * as SecureStore from 'expo-secure-store';
import { TokenModel } from './clients/GoForClient';
import { AuthContext } from './context/AuthContext';

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

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {
          state.token ? (
            <FeedStack />
          ) : (
            <AuthStack />
          )
        }
        <StatusBar style="auto" />
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
