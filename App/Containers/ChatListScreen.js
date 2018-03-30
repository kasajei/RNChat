import React from 'react'
import { View, Text, FlatList } from 'react-native'
import { connect } from 'react-redux'
import styles from './Styles/ChatListScreenStyle'
import ChatActions from '../Redux/ChatRedux'
import { Button, Input, Icon } from 'react-native-elements'
import { Colors } from '../Themes'

class ChatListScreen extends React.PureComponent {
  static navigationOptions =  ({ navigation }) => {
    return {
      title: "Chat",
      headerRight: 
        <Button 
          title=""
          buttonStyle={{
            backgroundColor:Colors.transparent
          }}
          icon={<Icon name='plus' type="font-awesome" color={Colors.fire}/>}
          onPress={
            ()=>{
              navigation.state.params.chatCreate("Chat")
            }
          }
        />,
    }
  }
  componentWillMount(){
    this.props.chatListLoad()
    this.props.navigation.setParams({
      chatCreate:this.props.chatCreate
    })
  }
  renderRow ({item}) {
    return (
      <View style={styles.row}>
        <Text style={styles.boldLabel}>{item.title}@{item.createdAt.toString()}</Text>
        <Button 
          title="Chat Start"
          buttonStyle={{
            backgroundColor:Colors.transparent
          }}
          icon={<Icon name='comment' type="font-awesome" color={Colors.fire}/>}
          onPress={
            ()=>{
              this.props.navigation.navigate("ChatMessageScreen", {chatId: item.id})
            }
          }
        />
      </View>
    )
  }

  keyExtractor = (item, index) => ""+index

  oneScreensWorth = 20

  render () {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.listContainer}>
          <FlatList
            data={this.props.chatList}
            renderItem={this.renderRow.bind(this)}
            keyExtractor={this.keyExtractor}
            initialNumToRender={this.oneScreensWorth}
          />
          </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    // ...redux state to props here
    chatList: state.chat.chatList,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    chatListLoad:() => dispatch(ChatActions.chatListLoad()),
    chatCreate:(title) => dispatch(ChatActions.chatCreate(title)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatListScreen)
