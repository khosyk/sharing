/* eslint-disable no-case-declarations */
/* eslint-disable no-fallthrough */
import React, { useEffect, useState, } from 'react';
import {
  CommonActions,
  createNavigationContainerRef,
  StackActions,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Linking, LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { clearData, getData, getVerifiedToken, storeData } from './utils/AsyncService';
import SplashScreen from 'react-native-splash-screen';
import { useDispatch } from 'react-redux';
import { initializeUserInfo, setUserLogin } from './slices/RegisterUserSlice';
import { linking } from './Linking';
import NetInfo from '@react-native-community/netinfo';
import messaging from '@react-native-firebase/messaging';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import { fetchInvitationLinkMappingForLogin } from './services/Register';
import { platform } from './App';
import notifee, { EventType } from '@notifee/react-native';
import { setSelectedDeviceId } from './slices/DeviceSlice';
import { axiosInstance, BASE_URI } from './services';
import axios from 'axios';
import { fetchSelectedFamily, initializeAllFamilyList } from './slices/FamilySlice';
import { fetchSelectAnotherFamily } from './services/Home';

const lottieHideTimer = 1000;

export const navigationRef = createNavigationContainerRef();

export function navigate(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}

export function replace(...args) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.replace(...args));
  }
}

export function reset_navigate(name) {
  navigationRef.dispatch(
    CommonActions.reset({
      index: 0,
      key: null,
      routes: [
        { name },
      ],
    })
  );
}

export function invitationNavigate() {
  navigationRef.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [
        {
          name: 'Home',
          params: { screen: 'MY' }
        },
        {
          name: "MyPageContents",
          params: {
            screen: 'MyPageFamilySetting'
          }
        },
        {
          name: "MyPageContents",
          params: {
            screen: 'MyPageFamilyInvitation'
          }
        }
      ]
    })
  );
}

export async function clearAsyncStorageAndKeepData(callBack = () => { return false; }) {
  const checkPopup = await getData('hidePopupUntil');
  const checkPermission = await getData('checkPermission');
  const accessToken = await getVerifiedToken('@accessToken');
  const refreshToken = await getData('@refreshToken');
  clearData().then(async () => {
    checkPermission && await storeData('checkPermission', checkPermission);
    checkPopup && await storeData('hidePopupUntil', checkPopup);
    await storeData('@accessToken', accessToken);
    await storeData('@refreshToken', refreshToken);
    callBack && callBack();
  });
}

export async function clearAsyncStorageAndKeepDataOnLoad() {
  const checkPopup = await getData('hidePopupUntil');
  const checkPermission = await getData('checkPermission');
  clearData().then(async () => {
    checkPermission && await storeData('checkPermission', checkPermission);
    checkPopup && await storeData('hidePopupUntil', checkPopup);
  });
}

function useNotification() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      if (remoteMessage) {
        // console.log("PUSH FETCHED::",remoteMessage);
      }
    });

    messaging().setBackgroundMessageHandler(async remoteMessage => {
      // console.log('CHECK BACK MESSEGE:::::', remoteMessage);
    });

    if (platform === 'ios') {
      const frontMessageEvent = notifee.onForegroundEvent(async ({ type, detail }) => {
        try {
          switch (type) {
            case EventType.PRESS: //ios push setting here
              console.log('notification caused ope APP IOS', detail.notification);

              const link = detail?.notification?.data?.link;

              if (link) {

                let deviceId;
                let familyId = '';

                const formatLinkArray = link.split("fake://");
                const formatLink = formatLinkArray[1];  // ex) deviceHistory/127/386 * 기본 주소 제외한 나머지 주소
                const paramArray = formatLink?.split('/'); // ex) [deviceHistory, 127, 386] 

                if (paramArray?.length === 3) {  // 푸시 score 일 경우 familyId 없음. -> familyId 같이 오는 경우만 param 반영.
                  familyId = paramArray[2];
                }

                /////

                if (link.includes('deviceMain') || link.includes('deviceHistory')) {
                // const deviceStringList = link.split('/');
                // deviceId = deviceStringList[deviceStringList.length - 1];
                // dispatch(setSelectedDeviceId(deviceId));

                  deviceId = formatLink.split('/')[1];
                  dispatch(setSelectedDeviceId(deviceId));
                }


                const auth = await getVerifiedToken();
                const checkBlackList = await axios({
                  url: `${BASE_URI}/api/user/me`,
                  headers: {
                    Authorization: `Bearer ${auth}`
                  }
                }).catch(async (err) => {
                  console.log("자동 로그인 인증 실패::", err?.response?.data.error, '//', auth);
                  // clearData();
                  return false;
                });

                if (auth !== null && auth !== undefined && checkBlackList) {
                  const timer = setTimeout(async () => {
                    clearTimeout(timer);
                    const supported = await Linking.canOpenURL(detail?.notification.data.link);
                    clearAsyncStorageAndKeepData();
                    if (supported) {
                      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
                      // by some browser in the mobile
                      if (familyId !== '') {
                        await fetchSelectAnotherFamily(auth, familyId).then(() => {
                          dispatch(fetchSelectedFamily(auth)).then(async () => {
                            Linking.openURL(link);
                          });
                        });
                      } else Linking.openURL(link);
                    } else {
                      console.log(`Don't know how to open this URL: ${detail?.notification?.data.link}`);
                    }
                  }, 1500);
                }

              }
              break;
            case EventType.DISMISSED:
              console.log('User dismissed notification', detail.notification);
              break;
          }

        } catch (error) {
          console.log("FRONT MESSAGE EVENT ERROR::", error);
        }

      });

      notifee.onBackgroundEvent(async ({ type, detail }) => {
        const { pressAction } = detail;
        // Check if the user pressed the "Mark as read" action
        if (type === EventType.ACTION_PRESS && pressAction.id === 'mark-as-read') {
          // Update external animation-play-state: 
        }
      });

      return (() => {
        unsubscribe();
        frontMessageEvent();
      });
    }
    return (() => {
      unsubscribe();
    });
  }, []);

  useEffect(() => {
    //안드로이드 
    if (platform === 'android') {
      // Assume a message-notification contains a "type" property in the data payload of the screen to open
      //foreground, background 상태 이동 담당
      messaging().onNotificationOpenedApp(async remoteMessage => {
        try {
          if (remoteMessage) {
            console.log(
              'Notification caused app to open from active state:',
              remoteMessage,
            );
            const { link } = remoteMessage?.data;
            var deviceId;
            let familyId = '';
            const formatLinkArray = link.split("fake://");
            const formatLink = formatLinkArray[1];  // ex) deviceHistory/127/386 * 기본 주소 제외한 나머지 주소
            const paramArray = formatLink?.split('/'); // ex) [deviceHistory, 127, 386] 

            if (paramArray?.length === 3) {  // 푸시 score 일 경우 familyId 없음. -> familyId 같이 오는 경우만 param 반영.
              familyId = paramArray[2];
            }

            if (link.includes('deviceMain') || link.includes('deviceHistory')) {
              // const deviceStringList = link.split('/');
              // deviceId = deviceStringList[deviceStringList.length - 1];
              // dispatch(setSelectedDeviceId(deviceId));

              deviceId = formatLink.split('/')[1];
              dispatch(setSelectedDeviceId(deviceId));
            }

            const auth = await getVerifiedToken();
            const checkBlackList = await axios({
              url: `${BASE_URI}/api/user/me`,
              headers: {
                Authorization: `Bearer ${auth}`
              }
            }).catch(async (err) => {
              console.log("자동 로그인 인증 실패::", err?.response?.data.error, '//', auth);
              // clearData();
              return false;
            });

            if (auth !== null && auth !== undefined && checkBlackList) {
              const supported = await Linking.canOpenURL(link);
              clearAsyncStorageAndKeepData();
              if (supported) {
                console.log(familyId);
                if (familyId !== '') {
                  await fetchSelectAnotherFamily(auth, familyId).then(() => {
                    dispatch(fetchSelectedFamily(auth)).then(async () => {
                      Linking.openURL(link);
                    });
                  });
                } else Linking.openURL(link);
              } else {
                console.log(`Don't know how to open this URL: ${link}`);
              }
            }
          }
        } catch (error) {
          console.log("Notification from back ERROR:::", error);
        }
      });
      // Check whether an initial notification is available :: 종료된 앱에서 푸시 링크로 진입하기 위한 로직
      //종료 상태 이동 담당
      messaging().getInitialNotification().then(async remoteMessage => {
        if (remoteMessage) {
          const { link } = remoteMessage?.data;

          var deviceId;
          let familyId = '';

          const formatLinkArray = link.split("fake://");
          const formatLink = formatLinkArray[1];  // ex) deviceHistory/127/386 * 기본 주소 제외한 나머지 주소
          const paramArray = formatLink?.split('/'); // ex) [deviceHistory, 127, 386] 

          if (paramArray?.length === 3) {  // 푸시 score 일 경우 familyId 없음. -> familyId 같이 오는 경우만 param 반영.
            familyId = paramArray[2];
          }

          if (link.includes('deviceMain') || link.includes('deviceHistory')) {
            // const deviceStringList = link.split('/');
            // deviceId = deviceStringList[deviceStringList.length - 1];
            // dispatch(setSelectedDeviceId(deviceId));

            deviceId = formatLink.split('/')[1];
            dispatch(setSelectedDeviceId(deviceId));
          }

          const auth = await getVerifiedToken();
          const checkBlackList = await axios({
            url: `${BASE_URI}/api/user/me`,
            headers: {
              Authorization: `Bearer ${auth}`
            }
          }).catch(async (err) => {
            console.log("자동 로그인 인증 실패::", err?.response?.data.error, '//', auth);
            // clearData();
            return false;
          });

          if (auth !== null && auth !== undefined && checkBlackList) {

            if (familyId !== '') {
              await fetchSelectAnotherFamily(auth, familyId).then(() => {
                dispatch(fetchSelectedFamily(auth));
              });
            }

            const timer = setTimeout(async () => {
              clearTimeout(timer);
              clearAsyncStorageAndKeepData();
              const supported = await Linking.canOpenURL(link);
              if (supported) {
                // Opening the link with some app, if the URL scheme is "http" the web link should be opened
                // by some browser in the mobile
                Linking.openURL(link);
              } else {
                console.log(`Don't know how to open this URL: ${link}`);
              }
            }, 1500); //투두::대기시간 줄이기
            return;
          }

        }
      }).catch(error => console.log("QUIT STATE PUSH ERROR", error));

    }


    // }
  }, []);
}

function useDeepLink() {
  useEffect(() => {
    const deepLinkListener = ({ url }) => {
      if (url && url.includes('https://fakeapp.com/family')) {
        deepLink(url, 'addEventListener');
      }
    };

    const deepLink = async (url) => {
      // 카카오톡 링크 처리
      if (url) {
        await storeData('invitationURL', url);
      }
    };
    //IOS && ANDROID : 앱이 딥링크로 처음 실행될때, 앱이 열려있지 않을 때
    Linking.getInitialURL().then((url) => deepLink(url));
    //IOS : 앱이 딥링크로 처음 실행될때, 앱이 열려있지 않을 때 && 앱이 실행 중일 때
    //ANDROID : 앱이 실행 중일 때
    Linking.addEventListener('url', deepLinkListener);
    return () => {
      Linking.removeEventListener('url', deepLinkListener);
    };
  }, []);
}

function useDynamicLinks() {
  useEffect(() => {
    //  다이나믹 링크를 통해 앱이 실행되는 경우
    dynamicLinks()
      .getInitialLink()
      .then(async (link) => {
        const auth = await getData('@accessToken');
        if (link?.url && auth && link?.url.includes('family/invite')) {
          if (link?.url?.includes('family/invite')) {
            await storeData('invitationURL', link?.url);
            return;
          }
        }
      });
  }, []);
}

function useCheckAuth() {
  const dispatch = useDispatch();

  const hideSplashScreen = (callBack = () => { return false; }) => {
    const timeout = setTimeout(() => {
      callBack && callBack();
      SplashScreen.hide();
      clearTimeout(timeout);
    }, lottieHideTimer);
  };

  //dynamicLink or deepLink or push가 있는 경우 해당 위치로 이동,
  const checkAllLinks = async (auth) => {
    const dynamicLinkData = await getData('invitationURL');
    const pushLink = await getData('pushLink');
    if (dynamicLinkData != 'DELETED' && dynamicLinkData != undefined) {
      const splitLink = dynamicLinkData?.split('/');
      const invitationCode = splitLink[splitLink.length - 1];
      fetchInvitationLinkMappingForLogin(invitationCode, auth).then(
        () => {
          clearAsyncStorageAndKeepData();
          invitationNavigate();
        }
      ).catch((err) => {
        console.log('invitation mapping error from ACTIVE DYNAMICLINK', err);
        // deleteUserData('OnBoard');
      });
      hideSplashScreen();
      return true;
    }

    if (pushLink !== undefined) {
      Linking.openURL(pushLink);
      hideSplashScreen();
      return true;
    }

    return false;
  };


  const loginSuccessCallback = (auth) => {
    NetInfo.fetch().then(async state => {
      // console.log("Connection type", state.type);
      // console.log("Is connected?", state.isConnected);
      dispatch(setUserLogin(true));
      // 다이나믹 링크 확인 후 네비게이트 
      const navResult = await checkAllLinks(auth);
      // const pushResult = await checkPushLinks();

      if (!navResult) {
        clearAsyncStorageAndKeepData(() => replace('Home'));
        hideSplashScreen();
      }

      if (!state.isConnected) {
        reset_navigate('DisconnectInternet');
        hideSplashScreen();
        return;
      }
    });
  };

  const loginErrorCallback = () => {
    clearAsyncStorageAndKeepDataOnLoad();
    hideSplashScreen();
  };

  //유저 정보 확인
  const checkAuth = async () => {
    const auth = await getVerifiedToken('@accessToken');

    const checkBlackList = await axiosInstance({
      url: `${BASE_URI}/api/user/me`,
      headers: {
        Authorization: `Bearer ${auth}`
      }
    }).catch(async (err) => {
      console.log("222자동 로그인 인증 실패::", err?.response?.data.error, '//', auth);
      // clearData();
      return false;
    });
    if (auth !== null && auth !== undefined && checkBlackList) {
      loginSuccessCallback(auth);
      return;
    }
    // 로그인 정보가 없으면 켜짐
    loginErrorCallback();

  };

  useEffect(() => {
    const authTimer = setTimeout(() => {
      checkAuth();
      // 알림 메시지 확인
      clearTimeout(authTimer);
    }, 500);
  }, []);
}

//인터넷이 끊김
function useNetInfoState() {
  const [connection, setConnection] = useState(true);

  const handleChange = async state => {
    setConnection(state?.isConnected);
  };

  // NetInfo 라이브러리에 handleChange 를 addeventListener 이용해서 등록,(인터넷 상태가 변하면 DisconnectInternet 으로 이동시킨다)
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(handleChange);
    return unsubscribe;
  }, []);

  useEffect(() => {
    const checkConnection = async () => {
      if (connection === false) {
        ///1초 텀
        const timer = setTimeout(async () => {

          NetInfo.refresh().then(state => {
            if (state?.isConnected === false) {
              clearTimeout(timer);
              replace('DisconnectInternet');
              return;
            }
          });

          clearTimeout(timer);
        }, 1000);

        //즉시
        // replace('DisconnectInternet');
      }
    };

    if (connection === false) {
      checkConnection();
    }
  }, [connection]);

}

export const RootNavigator = ({ children }) => {
  const Stack = createNativeStackNavigator();
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(true);
  // const [token, setToken] = useState(null);
  // const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    LogBox.ignoreAllLogs();
  }, []);

  //시간을 걸어서
  useEffect(() => {
    const initialize = async () => {
      dispatch(initializeUserInfo());
      dispatch(initializeAllFamilyList());
    };
    if (loaded) {
      initialize();
    }
  }, [loaded]);

  useNetInfoState();
  useNotification();
  useDeepLink();
  useDynamicLinks();
  useCheckAuth();

  return (
    <>
      <NavigationContainer
        linking={linking}
        fallback={
          <View>
          </View>
        }
        ref={navigationRef}>
        <Stack.Navigator
          initialRouteName="OnBoard"
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: '#fff' },
            animationTypeForReplace: 'push',
            animation: 'none',
            headerBackTitleVisible: false,
            headerTitle: false,
            // gestureEnabled: false,
          }}>
          {children}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};


// sns별로 로그인 펑션을 별도로 구현하고 로그인에 필요한 유저 확인 요소(비밀번호 또는 각 sns별 요청된 로그인 토큰)을 백엔드에 전달하여 jwt를 리턴받아서 asyncStorage에 저장하여 로그인

// 요청된 토큰으로 api 요청시 axios request interceptor 를 사용해서 중복로그인을 검사했습니다.

// 토큰이 정상적이지 않은 경우 백엔드와 같이 정한 401 에러 코드와 message를 검사하여 해당 유저를 로그아웃시키고 온보딩 페이지로 이동시킵니다. 이후 navigation 파람을 통해 전달한 boolean 값을 통해 온보딩 페이지에서 유저에게 중복로그인의 이유로 로그아웃 되었다고 메시지를 띄웁니다.

// 파이어베이스 설정에 대해 설명
// 파이어베이스 콘솔에 앱을 등록하면서 안드로이드는 google.json ios 는 info.plist 를 각 프로젝트 폴더에 추가한 후 사용
// fcm 토큰을 홈에서 요청하여 해당 유저가 로그인이 정상적으로 된 케이스만 fcm 토큰을 백엔드에 전달되게끔 하였습니다.

