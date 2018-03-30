import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  chatListLoad: [],
  chatCreate: ['title'],
  chatListMerge: ['addChatList'],

  messageListLoad: ['chatId'],
  messageCreate: ['chatId','text'],
  messageListMerge: ['addMessageList'],
})

export const ChatTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  chatList: [
     //{id:, title: , createdAt:, owner:,}
  ],
  fetching:false,
  messageList: [
    //{id:, text: , createdAt:, owner:,}
  ]
})


/* ------------- Reducers ------------- */
export const chatListLoad = (state) => {
  return state.merge({ fetching: true, chatList:[]})
}

export const chatCreate = (state) =>{
  return state.merge({fetching: true})
}

export const chatListMerge = (state, action) =>{
  const { chatList } = state
  const { addChatList } = action
  return state.merge({fetching: false, chatList:addChatList.concat(chatList)})
}

export const messageListLoad = (state) =>{
  return state.merge( { fetching: true, messageList:[] })
}

export const messageCreate = (state) =>{
  return state.merge({fetching: true})
}

export const messageListMerge = (state, action) =>{
  const { messageList } = state
  var { addMessageList } = action
  addMessageList = addMessageList.map((message)=>{
    return Object.assign(message, 
      {_id:message.id, 
        user:{_id:message.owner.uid, name:message.owner.displayName, avatar:message.owner.photoURL}
      })
  })
  return state.merge({fetching: false, messageList:addMessageList.concat(messageList)})
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CHAT_LIST_LOAD]: chatListLoad,
  [Types.CHAT_CREATE]: chatCreate,
  [Types.CHAT_LIST_MERGE]: chatListMerge,

  [Types.MESSAGE_LIST_LOAD]: messageListLoad,
  [Types.MESSAGE_CREATE]: messageCreate,
  [Types.MESSAGE_LIST_MERGE]: messageListMerge,
})
