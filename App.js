import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';

import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import { Colors } from './constants/styles';

import AuthContextProvider from './store/authContext';
import IconButton from './components/ui/IconButton';
import { useAuthenthication } from './hooks/useAuthentication';
import { useEffect, useState } from 'react';

const Stack = createNativeStackNavigator();
SplashScreen.preventAutoHideAsync();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  const { signOut } = useAuthenthication();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{
          headerRight: () => (
            <IconButton icon="exit" size={30} color={Colors.primary100} onPress={signOut} />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function Navigation() {
  const { isAuthenticated, checkIsAuthenticated } = useAuthenthication();
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    checkIsAuthenticated().then(() => {
      setIsAppReady(true);
    });
    checkIsAuthenticated();
  }, []);

  if (isAppReady) {
    SplashScreen.hideAsync();
  }
  return (
    <NavigationContainer>
      {isAuthenticated ? <AuthenticatedStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <AuthContextProvider>
        <Navigation />
      </AuthContextProvider>
    </>
  );
}
