import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import { GiftedChat } from 'react-native-gifted-chat'
import styles from './Styles/ChatMessageScreenStyle'
import ChatActions from '../Redux/ChatRedux'

class ChatMessageScreen extends Component {
  static navigationOptions =  ({ navigation }) => {
    return {
      title: "Message",
      tabBarVisible:false,
    }
  }
  state = {
    messages: [],
  }

  componentWillMount() {
    this.props.messageListLoad(this.props.navigation.state.params.chatId)
  }

  onSend(messages = []) {
    messages.forEach(message => this.props.messageCreate(this.props.navigation.state.params.chatId, message.text))
  }

  render () {
    return (
      <GiftedChat
        messages={this.props.messageList}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: this.props.user.uid,
          name: this.props.user.displayName,
          avatar: this.props.user.photoURL,
        }}
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    messageList: state.chat.messageList,
    user:state.user.user,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    messageListLoad:(chatId) => dispatch(ChatActions.messageListLoad(chatId)),
    messageCreate:(chatId, text) => dispatch(ChatActions.messageCreate(chatId, text)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatMessageScreen)
