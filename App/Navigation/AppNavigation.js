import React from 'react'
import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation'
import ChatListScreen from '../Containers/ChatListScreen'
import LaunchScreen from '../Containers/LaunchScreen'
import styles from './Styles/NavigationStyles'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Colors }  from '../Themes'

// Manifest of possible screens

const ChatNav = StackNavigator({
  ChatListScreen: { screen: ChatListScreen }
},{
  initialRouteName: 'ChatListScreen',
  navigationOptions: ({ navigation }) => ({
    headerStyle: styles.header,
    headerTintColor: Colors.snow,
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  }),
})

const PrimaryNav = TabNavigator({
  LaunchScreen: { screen: LaunchScreen },
  ChatNav: { screen: ChatNav }
}, {
  // Default config for all screens
  initialRouteName: 'LaunchScreen',
  navigationOptions: ({ navigation }) => ({
    headerStyle: styles.header,
    tabBarIcon: ({ focused, tintColor }) => {
      const { routeName } = navigation.state;
      let iconName;
      if (routeName === 'LaunchScreen') {
        iconName = 'home';
      } else if (routeName === 'ChatNav') {
        iconName = 'comment';
      }
      return <FontAwesome name={iconName} size={25} color={tintColor} />;
    }
  }),
  tabBarOptions: {
    activeTintColor: Colors.fire,
    inactiveTintColor: Colors.charcoal,
  },
  tabBarComponent: TabBarBottom,
  animationEnabled: false,
  swipeEnabled: false,
})

export default PrimaryNav
