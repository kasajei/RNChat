/* ***********************************************************
* A short word on how to use this automagically generated file.
* We're often asked in the ignite gitter channel how to connect
* to a to a third party api, so we thought we'd demonstrate - but
* you should know you can use sagas for other flow control too.
*
* Other points:
*  - You'll need to add this saga to sagas/index.js
*  - This template uses the api declared in sagas/index.js, so
*    you'll need to define a constant in that file.
*************************************************************/

import { eventChannel } from 'redux-saga'
import { all, take, call, put, select, takeEvery, fork, cancelled, cancel } from 'redux-saga/effects'
import ChatActions, {ChatTypes, ChatSelectors} from '../Redux/ChatRedux'
import { UserSelectors } from '../Redux/UserRedux'
import firebase from 'react-native-firebase'

const chatCollection = "chat"
const messageCollection = 'message'

export function * chatListLoad (action){
  const collection = firebase.firestore().collection(chatCollection).orderBy("createdAt", "desc")
  const querySnap = yield call([collection, collection.get])
  const chatList = querySnap.docs.map(doc=>{
    return Object.assign(doc.data(),{id:doc.id})
  })
  yield put(ChatActions.chatListMerge(chatList))
}

export function * chatCreate (action) {
  const { title } = action
  const user = yield select(UserSelectors.getUser)
  const collection = firebase.firestore().collection(chatCollection)
  const docRef = yield call([collection, collection.add], 
    {
      title: title,
      owner: user, 
      createdAt:firebase.firestore.FieldValue.serverTimestamp()
    }
  )
  const doc = yield call([docRef, docRef.get])
  const newChat = Object.assign(doc.data(),{id:doc.id})
  yield put(ChatActions.chatListMerge([newChat]))
}

export function * messageListLoad (action){
  const { chatId } =  action
  const collection = firebase.firestore().collection(chatCollection).doc(chatId)
    .collection(messageCollection).orderBy("createdAt", "desc")
  const querySnap = yield call([collection, collection.get])
  const messageList = querySnap.docs.map(doc=>{
    return Object.assign(doc.data(),{id:doc.id})
  })
  yield put(ChatActions.messageListMerge(messageList))
}

export function * messageCreate (action) {
  const { chatId, text } = action
  const user = yield select(UserSelectors.getUser)
  const collection = firebase.firestore().collection(chatCollection).doc(chatId).collection(messageCollection)
  const docRef = yield call([collection, collection.add], 
    {
      text: text,
      owner: user, 
      createdAt:firebase.firestore.FieldValue.serverTimestamp()
    }
  )
  const doc = yield call([docRef, docRef.get])
  const newMessage = Object.assign(doc.data(),{id:doc.id})
  yield put(ChatActions.messageListMerge([newMessage]))
}