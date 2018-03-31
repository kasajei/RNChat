import React, { Component } from 'react'
import { View, ScrollView, Text, KeyboardAvoidingView, SafeAreaView } from 'react-native'
import { connect } from 'react-redux'
import { GiftedChat, Bubble, Actions, Send, Time } from 'react-native-gifted-chat'
import styles from './Styles/ChatMessageScreenStyle'
import ChatActions from '../Redux/ChatRedux'
import { Colors } from '../Themes';
import { Button, Input, Icon } from 'react-native-elements'

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

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        textStyle={{
          left: {
            color: Colors.snow,
          },
          right: {
            color: Colors.snow,
          }
        }}
        wrapperStyle={{
          left: {
            backgroundColor: Colors.fire,
          },
          right: {
            backgroundColor: Colors.fire,
          },
        }}
      />
    );
  }

  renderCustomActions(props) {
    return (
      <Actions
        {...props}
        onPressActionButton={()=>{console.log("photo")}}
        icon={()=><Icon name='photo' type="font-awesome" color={Colors.charcoal}/>}
      />
    );
  }

  renderSend(props){
    return(
      <Send
      {...props}
      alwaysShowSend={true} // bug?
      label="Done"
      >
      </Send>
    )
  }

  renderTime(props){
    return(
      <Time
      {...props}
      textStyle={{ // bug?
        left: {
          color: Colors.snow,
        },
        right: {
          color: Colors.snow,
        }
      }}
      />
    )
  }

  render () {
    return (
      <View style={styles.mainContainer}>
        <GiftedChat
          messages={this.props.messageList}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: this.props.user.uid,
            name: this.props.user.displayName,
            avatar: this.props.user.photoURL,
          }}
          loadEarlier={true}
          // isLoadingEarlier={true}
          showUserAvatar={true}          
          bottomOffset={120}
          renderBubble={this.renderBubble}
          renderActions={this.renderCustomActions}
          renderSend={this.renderSend}
          renderTime={this.renderTime}
          // renderDay={()=>null}
        />
        <View style={{height:120}}>
          <Text style={styles.subtitle}>Input below</Text>
        </View>
      </View>
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
