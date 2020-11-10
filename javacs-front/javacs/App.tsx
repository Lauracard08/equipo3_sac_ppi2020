import React, { useState } from 'react';
import { Icon, Text } from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//Screens
import HomeScreen from './pages/HomeScreen';
import LoginScreen from './pages/LoginScreen';
import LoginFormScreen from './pages/LoginFormScreen';
import DashScreen from './pages/DashScreen';
import NivelScreen from './pages/NivelScreen';
import RegisterScreen from './pages/RegisterScreen';
import { AuthService } from './services/auth.service';

import { navigationRef, navigate } from './tools/navigation';
import { GoogleSignInService } from './services/googleSignIn.service';
import { AuthDogService } from './tools/auth.dog';
import { MenuService } from './services/menu.service';
import ProfileScreen from './pages/profileScreen';
import AddQuestionScreen from './pages/addQuestionScreen';
import ProgressScreen from './pages/progressScreen';
import InfoScreen from './pages/infroScreen';
import QuestionScreen from './pages/questionsScreen';
import resultScreen from './pages/resultScreen';

// App mockups https://marvelapp.com/prototype/b5dajc1/screen/72149571

const Stack = createStackNavigator();
const menu = MenuService.getInstance()

function menu_button_pressed() {
  menu.changeMenuStatus();
}

export default function App(props: any) {
  const auth = AuthService.getInstance();
  const authDog = AuthDogService.getInstance();
  const googleAuth = GoogleSignInService.getInstance();
  googleAuth.initAsync();

  auth.attach.subscribe((state: { type: string, message: string }) => {
    if (state.message == "login") {
      if (auth.userType) {
        navigate("Profile", {});
      }
      else {
        navigate("Dash", {});
      }
    }
    else if (state.message == "logout") {
      navigate("Home", {});
    }
    else {
      console.error("Unreconized state");
    }
  });

  return (
    <NavigationContainer onStateChange={(state) => {
      var { previous, current } = authDog.getCurrentRouteName(state?.routes);
      if (current == 'Register')
        auth.isInRegisterPage = true;
      else
        auth.isInRegisterPage = false;
        
    }} ref={navigationRef}>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false
          }} />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerShown: false
          }} />
        <Stack.Screen
          name="LoginForm"
          component={LoginFormScreen}
          options={{
            headerShown: false
          }} />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{
            headerShown: false
          }} />
        <Stack.Screen
          name="Dash"
          component={DashScreen}
          options={{
            title: "Buscar",
            animationTypeForReplace: auth.isLogin ? 'pop' : 'push',
            headerStyle: {
              backgroundColor: 'rgb(194, 204, 217)'
            },
            headerLeftContainerStyle: {
              marginLeft: 10
            },
            headerLeft: () => (
              <Icon name="menu"
                size={40}
                onPress={() => { menu_button_pressed() }} />
            )
          }} />
        <Stack.Screen
          name="Nivel"
          component={NivelScreen}
          options={{
            title: "Buscar",
            headerStyle: {
              backgroundColor: 'rgb(194, 204, 217)'
            },
            headerLeftContainerStyle: {
              marginLeft: 10
            },
            headerLeft: () => (
              <Icon name="menu"
                size={40}
                onPress={() => { menu_button_pressed() }} />
            )
          }} />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            title: "Buscar",
            headerStyle: {
              backgroundColor: 'rgb(194, 204, 217)'
            },
            headerLeftContainerStyle: {
              marginLeft: 10
            },
            headerLeft: () => (
              <Icon name="menu"
                size={40}
                onPress={() => { menu_button_pressed() }} />
            )
          }} />
        <Stack.Screen
          name="AddQuestion"
          component={AddQuestionScreen}
          options={{
            title: "Buscar",
            headerStyle: {
              backgroundColor: 'rgb(194, 204, 217)'
            },
            headerLeftContainerStyle: {
              marginLeft: 10
            },
            headerLeft: () => (
              <Icon name="menu"
                size={40}
                onPress={() => { menu_button_pressed() }} />
            )
          }} />
          <Stack.Screen
          name="Progress"
          component={ProgressScreen}
          options={{
            title: "Buscar",
            headerStyle: {
              backgroundColor: 'rgb(194, 204, 217)'
            },
            headerLeftContainerStyle: {
              marginLeft: 10
            },
            headerLeft: () => (
              <Icon name="menu"
                size={40}
                onPress={() => { menu_button_pressed() }} />
            )
          }} />
          <Stack.Screen
          name="Info"
          component={InfoScreen}
          options={{
            title: "Buscar",
            headerStyle: {
              backgroundColor: 'rgb(194, 204, 217)'
            },
            headerLeftContainerStyle: {
              marginLeft: 10
            },
            headerLeft: () => (
              <Icon name="menu"
                size={40}
                onPress={() => { menu_button_pressed() }} />
            )
          }} />
          <Stack.Screen
          name="Question"
          component={QuestionScreen}
          options={{
            title: "Buscar",
            headerStyle: {
              backgroundColor: 'rgb(194, 204, 217)'
            },
            headerLeftContainerStyle: {
              marginLeft: 10
            },
            headerLeft: () => (
              <Icon name="menu"
                size={40}
                onPress={() => { menu_button_pressed() }} />
            )
          }} />
          <Stack.Screen
          name="Result"
          component={resultScreen}
          options={{
            title: "Buscar",
            headerStyle: {
              backgroundColor: 'rgb(194, 204, 217)'
            },
            headerLeftContainerStyle: {
              marginLeft: 10
            },
            headerLeft: () => (
              <Icon name="menu"
                size={40}
                onPress={() => { menu_button_pressed() }} />
            )
          }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
