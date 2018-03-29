import React, { Component } from 'react'
import { ScrollView, Text, Image, View } from 'react-native'
import { Images, Colors } from '../Themes'
import { connect } from 'react-redux'
import UserActions from '../Redux/UserRedux'
import {Input, Avatar} from 'react-native-elements'
import styles from './Styles/LaunchScreenStyles'
import ImagePicker from 'react-native-image-picker'


class LaunchScreen extends Component {
  static navigationOptions =  ({ navigation }) => {
    return {
      title: "Home",
    }
  }

  componentWillMount(){
    this.props.signIn()
  }
  render () {
    return (
      <View style={styles.mainContainer}>
        <ScrollView style={styles.container}>
          <View style={styles.centered}>
            <Avatar
              rounded
              xlarge
              source={this.props.user.photoURL?{uri:this.props.user.photoURL}:Images.launch}
              onPress={() => {
                var options = {
                  mediaType:"photo",
                  maxWidth:640,
                  maxHeight:640,
                  allowsEditing: true,
                  storageOptions: {
                    skipBackup: false,
                  }
                }
                ImagePicker.showImagePicker(options, (value) => {
                  if(value.uri){
                    this.props.uploadProfilePhoto({photoURL:value.uri})
                  }
                })
              }}
              activeOpacity={0.7}
            />
            <Input
                  returnKeyType="send"
                  inputStyle={{color:Colors.snow}}
                  placeholder={'Your Name Here'}
                  placeholderTextColor={Colors.charcoal} 
                  defaultValue={this.props.user.displayName?this.props.user.displayName:""} 
                  onSubmitEditing={(event) => {
                    if (this.props.user.displayName != event.nativeEvent.text){
                      this.props.updateProfile({displayName:event.nativeEvent.text})
                    }
                  }}
                />   
          </View>

          <View style={styles.section} >
            <Text style={styles.sectionText}>
              {this.props.user.uid || "Not Signin."}
            </Text>
          </View>

        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signIn:()=>dispatch(UserActions.signIn()),
    updateProfile: (user) => dispatch(UserActions.updateProfile(user)),
    uploadProfilePhoto: (user) => dispatch(UserActions.uploadProfilePhoto(user)),
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LaunchScreen)