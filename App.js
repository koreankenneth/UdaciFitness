import React from 'react'
import { StyleSheet, View, Platform, StatusBar } from 'react-native'
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


function UdaciStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

class AddEntryScreen extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={styles.container}>
          <UdaciStatusBar backgroundColor={purple} barStyle='light-content' />
          <AddEntry navigation={this.props.navigation} />
        </View>
      </Provider>
    )
  }
}

class HistoryScreen extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={styles.container}>
          <UdaciStatusBar backgroundColor={purple} barStyle='light-content' />
          <History navigation={this.props.navigation} />
        </View>
      </Provider>
    )
  }
}

const TabNavigator = Platform.OS === 'ios'
  ? createBottomTabNavigator({
    History: HistoryScreen,
    AddEntry: AddEntryScreen,
  },
    {
      defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, horizontal, tintColor }) => {
          const { routeName } = navigation.state
          let iconName

          if (routeName === 'History') {
            return <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
          } else if (routeName === 'AddEntry') {
            return <FontAwesome name='plus-square' size={30} color={tintColor} />
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
    History: HistoryScreen,
    AddEntry: AddEntryScreen,
  },
    {
      defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, horizontal, tintColor }) => {
          const { routeName } = navigation.state
          let iconName

          if (routeName === 'History') {
            return <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
          } else if (routeName === 'AddEntry') {
            return <FontAwesome name='plus-square' size={30} color={tintColor} />
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
    Home: TabNavigator,
    EntryDetail: EntryDetail,
  }
)

export default createAppContainer(MainNavigator)

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})