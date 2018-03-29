import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  chatListLoad: [
    //{id:, title: , createdAt:, owner:,}
  ],
  chatCreate: ['title'],
  chatListMerge: ['addChatList'],
})

export const ChatTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  chatList: [],
  fetching:false,
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

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CHAT_LIST_LOAD]: chatListLoad,
  [Types.CHAT_CREATE]: chatCreate,
  [Types.CHAT_LIST_MERGE]: chatListMerge,
})
