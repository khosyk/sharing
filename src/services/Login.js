import { GoogleSignin } from '@react-native-google-signin/google-signin';
import {
  login as kakaoLogin,
  logout as kakaoLogout,
  getProfile as _getKakaoProfile,
  unlink,
} from '@react-native-seoul/kakao-login';
import { appleAuth } from '@invertase/react-native-apple-authentication';
import { clearData, getData, storeData } from '../utils/AsyncService';
import { BASE_URI } from '.';
import { navigationRef } from '../RootNavigator';
import axios from 'axios';
import { deleteFCMToken } from './Push';
import messaging from '@react-native-firebase/messaging';
import { CommonActions, } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { initializeUserInfo, setUserLogin } from '../slices/RegisterUserSlice';
import { setSelectedFamily } from '../slices/FamilySlice';


export const googleSignIn = async () => {
  GoogleSignin.configure({
    webClientId:
      '940507323601-v29jdh1vhndt07r2kts46423qfagg23o.apps.googleusercontent.com',
  });
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    // this.setState({ userInfo });
    return userInfo;
  } catch (error) {
    console.log(`Google Login Error${error}`);
    // if (error.code === statusCodes.SIGN_IN_CANCELLED) {
    //   // user cancelled the login flow
    // } else if (error.code === statusCodes.IN_PROGRESS) {
    //   // operation (e.g. sign in) is in progress already
    // } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
    //   // play services not available or outdated
    // } else {
    //   // some other error happened
    // }
    return null;
  }
};

//reserve_id : com.googleusercontent.apps.940507323601-b7mtmkmhcr5lrr7jrr9drqhtmnk804va
export const googleLogout = async () => {
  try {
    await GoogleSignin.revokeAccess();
    await GoogleSignin.signOut();
    // Remember to remove the user from your app's state as well
  } catch (error) {
    console.error(error);
  }
};

export const signInWithKakao = async () => {
  const res = await kakaoLogin();
  return res;
};

export const signOutWithKakao = async () => {
  const message = await kakaoLogout();
  return message;
};

export const getKakaoProfile = async () => {
  const profile = await _getKakaoProfile();
  return profile;
};

export const unlinkKakao = async () => {
  try {
    await unlink();
  } catch (err) {
    console.log('unlink Error');
  }
};

export async function appleSignIn() {
  // performs login request
  const appleAuthRequestResponse = await appleAuth.performRequest({
    requestedOperation: appleAuth.Operation.LOGIN,
    // Note: it appears putting FULL_NAME first is important, see issue #293
    requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
  });

  // get current authentication state for user
  const credentialState = await appleAuth.getCredentialStateForUser(
    appleAuthRequestResponse.user,
  );

  // use credentialState response to ensure the user is authenticated
  if (credentialState === appleAuth.State.AUTHORIZED) {
    // user is authenticated

    return appleAuthRequestResponse;
  }
}

/**
 * @param {object} loginInfo email:이메일, credentials:비밀번호 또는 토큰, loginType:로그인 타입 오브젝트
 * @param {funciton} successCallback  성공후 콜백(response.user)
 * @param {funciton} errorCallback  실패후 콜백(error, loginInfo)
 * @returns
 */
export const login = async (loginInfo, successCallback, errorCallback) => {
  const { email, credentials, loginType } = loginInfo;
  await axios({
    method: 'post',
    url: `${BASE_URI}/api/auth`,
    data: {
      email,
      credentials,
      loginType,
    },
  })
    .then(async res => {
      // 재 로그인 시 확인을 위해 필요
      const {accessToken,refreshToken,user} = res?.data?.response;

      await storeData('@loginType', loginType);
      await storeData('@refreshToken', refreshToken);
      await storeData('@accessToken', accessToken);
      successCallback(user, accessToken);
      return;

    })
    .catch(async error => {
      console.log(error.response.data.error, 'login Error');
      errorCallback(error, loginInfo);
      if (error.response.status == 401) {
        const auth = {
          email,
          credentials,
          loginType,
        };
        await storeData('@auth', auth);
      }
    });
};

//클리어가 제대로 되고 첫 로그인과 다음 로그인의 토큰이 같은지?
//

export const deleteUserData = async (navigateTo = 'OnBoard') => {
  const loginType = await getData('@loginType');
  if (loginType !== 'EMAIL') {
    loginType == 'GOOGLE' && await googleLogout();
  }

  deleteFCMToken();
  messaging().deleteToken();

  const checkPopup = await getData('hidePopupUntil');
  const checkPermission = await getData('checkPermission');

  await clearData().then(async () => {
    checkPermission && await storeData('checkPermission', checkPermission);
    checkPopup && await storeData('hidePopupUntil', checkPopup);
    if (navigateTo === 'LoginEmailMain') {
      navigationRef.dispatch(
        CommonActions.reset({
          index: 0,
          key: null,
          routes: [
            {
              name: 'Login',
              params: { screen: 'LoginEmailMain' }
            },
          ],
        })
      );
      return;
    }

    if (navigateTo === 'Login') {
      navigationRef.dispatch(
        CommonActions.reset({
          index: 0,
          key: null,
          routes: [
            {
              name: 'Login',
            },
          ],
        })
      );
      return;
    }

    if (navigateTo === 'DualLogin') {
      navigationRef.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            {
              name: 'OnBoard',
              params: {
                show: true
              }
            },
          ],
        })
      );
      return;
    }

    navigationRef.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: 'OnBoard',
          },
        ],
      })
    );

  });
};

// const UseDispatchHookToClear = async () => {
//   const dispatch = useDispatch();

//   return true;
// };

export const logout = async (callBack = null, navigateTo = 'OnBoard') => {
  callBack && callBack();
  deleteUserData(navigateTo);
};