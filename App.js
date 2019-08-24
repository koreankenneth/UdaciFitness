import React, { Component } from 'react'
import { StyleSheet, View, Platform, StatusBar, Text } from 'react-native'
import AddEntry from './components/AddEntry'
import History from './components/History'
import EntryDetail from './components/EntryDetail'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { createBottomTabNavigator, createAppContainer, createMaterialTopTabNavigator, createStackNavigator } from 'react-navigation'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { purple, white } from './utils/colors'
import { Constants } from 'expo'
import Live from './components/Live'
import { setLocalNotification } from './utils/helpers'



function UdaciStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

class AddEntryScreen extends React.Component {
  render() {
    return (
      <AddEntry navigation={this.props.navigation} />
    )
  }
}

class HistoryScreen extends React.Component {
  render() {
    return (
      <History navigation={this.props.navigation} />
    )
  }
}

const TabNavigator = Platform.OS === 'ios'
  ? createBottomTabNavigator({
    'History': HistoryScreen,
    'Add Entry': AddEntryScreen,
    'Live': Live
  },
    {
      defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ tintColor }) => {
          const { routeName } = navigation.state

          if (routeName === 'History') {
            return <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
          } else if (routeName === 'Add Entry') {
            return <FontAwesome name='plus-square' size={30} color={tintColor} />
          } else if (routeName === 'Live') {
            return <Ionicons name='ios-speedometer' size={30} color={tintColor} />
          }

          // You can return any component that you like here!
        },
      }),
      tabBarOptions: {
        activeTintColor: Platform.OS === 'ios' ? purple : white,
        style: {
          height: 56,
          backgroundColor: Platform.OS === 'ios' ? white : purple,
          shadowColor: 'rgba(0, 0, 0, 0.24)',
          shadowOffset: {
            width: 0,
            height: 3
          },
          shadowRadius: 6,
          shadowOpacity: 1
        }
      },
    }
  )
  : createMaterialTopTabNavigator({
    'History': HistoryScreen,
    'Add Entry': AddEntryScreen,
    'Live': Live
  },
    {
      defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, horizontal, tintColor }) => {
          const { routeName } = navigation.state
          let iconName

          if (routeName === 'History') {
            return <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
          } else if (routeName === 'Add Entry') {
            return <FontAwesome name='plus-square' size={30} color={tintColor} />
          } else if (routeName === 'Live') {
            return <Ionicons name='ios-speedometer' size={30} color={tintColor} />
          }

          // You can return any component that you like here!
        },
      }),
      tabBarOptions: {
        activeTintColor: Platform.OS === 'ios' ? purple : white,
        style: {
          height: 56,
          backgroundColor: Platform.OS === 'ios' ? white : purple,
          shadowColor: 'rgba(0, 0, 0, 0.24)',
          shadowOffset: {
            width: 0,
            height: 3
          },
          shadowRadius: 6,
          shadowOpacity: 1
        }
      },
    }
  )

const MainNavigator = createStackNavigator({
  Home: {
    screen: TabNavigator,
    navigationOptions: () => ({
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      }
    }),
  },
  EntryDetail: {
    screen: EntryDetail,
    navigationOptions: () => ({
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      }
    }),
  },

},
)

const AppContainer = createAppContainer(MainNavigator);

class App extends Component {
  componentDidMount() {
    setLocalNotification()
  }
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={styles.container}>
          <UdaciStatusBar backgroundColor={purple} barStyle='light-content' />
          <AppContainer />
        </View>
      </Provider>
    );
  }
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})