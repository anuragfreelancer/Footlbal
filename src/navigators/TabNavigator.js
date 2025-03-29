import { View, Text, Image, Keyboard, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import _routes from '../routes/routes';



const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      Platform.OS === 'android' ? 'keyboardDidShow' : 'keyboardWillShow',
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      Platform.OS === 'android' ? 'keyboardDidHide' : 'keyboardWillHide',
      () => {
        setKeyboardVisible(false);
      }
    );

    // Clean up listeners
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          display: isKeyboardVisible ? 'none' : 'flex',
          paddingTop: 12,
          height: 70,

        },
      }}
    >
      {_routes.BOTTOMTAB_ROUTE.map(screen => (
        <Tab.Screen
          key={screen.name}
          name={screen.name}
          component={screen.Component}
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <>
                <Image
                  source={focused ? screen.logo1 : screen.logo} // Use logo1 for focused state
                  style={{
                    width: 25,
                    height: 25,
                    resizeMode:"contain"
                   }}
                />
                {screen.label && (
                  <Text
                    style={{
                      fontWeight: '700',
                      color: focused ? 'rgba(160, 216, 3, 1)' : 'rgba(153, 153, 153, 1)',
                      fontSize: 10,
                      marginTop: 4, // Adds space between icon and label
                      width: 45,
                      textAlign: "center"
                    }}
                  >
                    {screen.label}
                  </Text>
                )}
              </>
            ),
          }}
        />
      ))}
    </Tab.Navigator>

  )
}