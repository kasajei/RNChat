import { takeLatest, all, call } from 'redux-saga/effects'
import API from '../Services/Api'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'
import firebase from 'react-native-firebase'

/* ------------- Types ------------- */
import { UserTypes } from '../Redux/UserRedux'
import { ChatTypes } from '../Redux/ChatRedux'

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { getUserAvatar } from './GithubSagas'
import { signIn, logout } from './UserSagas'
import { updateProfile, uploadProfilePhoto } from './UserSagas'
import { chatListLoad, chatCreate } from './ChatSagas'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    call(firebase.auth), // Why dose this need?
    takeLatest(UserTypes.SIGN_IN, signIn),
    takeLatest(UserTypes.LOGOUT, logout),
    takeLatest(UserTypes.UPDATE_PROFILE, updateProfile),
    takeLatest(UserTypes.UPLOAD_PROFILE_PHOTO, uploadProfilePhoto),

    takeLatest(ChatTypes.CHAT_LIST_LOAD, chatListLoad),
    takeLatest(ChatTypes.CHAT_CREATE, chatCreate),
  ])
}
