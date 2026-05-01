import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import _routes from '../routes/routes';
import { useLanguage } from '../compoent/Localization/LanguageContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  useLanguage();
  const insets = useSafeAreaInsets();
  const routes = _routes();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          height: 60 + insets.bottom,       // ✅ iPhone home indicator ke liye
          paddingBottom: insets.bottom,      // ✅ Icons upar rahe home bar se
          paddingTop: 8,
          borderTopWidth: 1,
          borderTopColor: '#F0F0F0',
          elevation: 10,                     // Android shadow
          shadowColor: '#000',               // iOS shadow
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.06,
          shadowRadius: 6,
        },
      }}
    >
      {routes.BOTTOMTAB_ROUTE.map(screen => (
        <Tab.Screen
          key={screen.name}
          name={screen.name}
          component={screen.Component}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={styles.tabItem}>

                {/* ✅ Active top indicator */}
                {focused && <View style={styles.activeIndicator} />}

                <Image
                  source={focused ? screen.logo1 : screen.logo}
                  style={styles.icon}
                  tintColor={focused ? '#A0D803' : '#999999'}
                />

                {screen.label && (
                  <Text
                    numberOfLines={1}
                    style={[
                      styles.label,
                      {
                        color: focused
                          ? 'rgba(160, 216, 3, 1)'
                          : 'rgba(153, 153, 153, 1)',
                      },
                    ]}
                  >
                    {screen.label}
                  </Text>
                )}
              </View>
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
  },
  activeIndicator: {
    position: 'absolute',
    top: -8,                        // ✅ paddingTop: 8 ke barabar
    width: 24,
    height: 3,
    backgroundColor: '#A0D803',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  label: {
    fontWeight: '700',
    fontSize: 10,
    marginTop: 4,
    textAlign: 'center',
  },
});