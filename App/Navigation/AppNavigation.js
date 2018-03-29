import React from 'react'
import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation'
import ChatListScreen from '../Containers/ChatListScreen'
import LaunchScreen from '../Containers/LaunchScreen'
import styles from './Styles/NavigationStyles'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Colors }  from '../Themes'

// Manifest of possible screens
const PrimaryNav = TabNavigator({
  LaunchScreen: { screen: LaunchScreen },
  ChatListScreen: { screen: ChatListScreen }
  
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'LaunchScreen',
  navigationOptions: ({ navigation }) => ({
    headerStyle: styles.header,
    tabBarIcon: ({ focused, tintColor }) => {
      const { routeName } = navigation.state;
      let iconName;
      if (routeName === 'LaunchScreen') {
        iconName = 'home';
      } else if (routeName === 'ChatListScreen') {
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
