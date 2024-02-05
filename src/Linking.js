import dynamicLinks from "@react-native-firebase/dynamic-links";
import {  Linking } from "react-native";
import { invitationNavigate} from "./RootNavigator";
import { fetchInvitationLinkMappingForLogin } from "./services/Register";
import {  getData} from "./utils/AsyncService";

const config = {
  screens: {
    OnBoard: 'onBoard',
    Login: {
      screens: {
        LoginMain: 'login',
        LoginEmailMain: 'loginEmailMain',
      },
    },
    Notification: {
      screens: {
        공지: 'notification/notice',
        디바이스: 'notification/device',
        이상증상: 'notification/warning',
      },
    },
    Home: {
      screens: {
        SCORE: 'score',
        PET: 'pet',
      },
    },
    MyPageContents: {
      path:'family',
      screens: {
        MyPageFamilyInvitation: {
          path: 'family/invite/:id',
          parse: {
            id: id => `${id}`,
          },
        },
        MyPageNotice: 'myPageNotice',
        MyPageNoticeDetail: {
          path: 'myPageNoticeDetail/:id',
          parse: {
            id: id => `${id}`,
          },
        },
      },
    },
    PetData: {
      screens: {
        PetData: {
          path: 'petData/:id/:familyId',
          parse: {
            id: id => `${id}`,
          },
        },
      },
    },
    PetReport: {
      screens: {
        PetReport: {
          path: 'petReport/:id/:familyId',
          parse: {
            id: id => `${id}`,
          },
        },
      },
    },
    DeviceContents: {
      screens: {
        // initialRouteName:'DeviceMain',
        DeviceMain: {
          path: 'deviceMain/:id/:familyId',
          parse: {
            id: id => `${id}`,
          },
        },
        DeviceHistory: {
          path: 'deviceHistory/:id/:familyId',
          parse: {
            id: id => `${id}`,
          },
        },
        ReplaceSandGuide: {
          screens: {
            ReplaceSandGuideOne: {
              path: 'sandGuide/:id',
              parse: {
                id: id => `${id}`,
              },
            }
          }
        }
      },
    },
    Quiz: {
      screens: {
        Quiz: 'quiz',
      },
    },
    FamilyScoreTip: {
      screens: {
        FamilyScoreTip: 'familyScoreTip',
      },
    },
  },
};



export const linking = {
  //디폴트 프로토콜 설정 필요
  prefixes: ['https://', 'fake://', 'https://fakeapp.page.link', ],
  // Custom function to subscribe to incoming links
  async getInitialURL() {
    const url = await Linking.getInitialURL();

    if (url != null) {
      return url;
    }

    return null;
  },
  subscribe(listener) {
    // Listen to incoming links from Firebase Dynamic Links
    
    // Listen to incoming links from deep linking
    const linkingSubscription = Linking.addEventListener('url', ({ url }) => {
      listener(url);
    });

    //종료 안된, 백그라운드 앱에서 다이나믹 링크 클릭 시,
    const unsubscribeFirebase = dynamicLinks().onLink(async({ url }) => {
      const token = await getData('@accessToken');
      if(url && url.includes('https://fakeapp.com/family') && token){
        const splitLink = url?.split('/');
        const invitationCode = splitLink[splitLink.length - 1];
        fetchInvitationLinkMappingForLogin(invitationCode).then(
          async () => {
            // 매핑 종료 후 인비테이션 코드를 삭제 된 것으로 취급. 재입장을 방지한다.
            invitationNavigate();
          }
        ).catch(async (err) => {
          // await deleteUserData();
          console.log('error on fetching INACTIVE invitationLInk', err);
        });
      }
      listener(url);
    });
  

    return () => {
      // Clean up the event listeners
      unsubscribeFirebase;
      linkingSubscription.remove();

      // linkingSubscription.remove();
    };
  },
  config,
};
