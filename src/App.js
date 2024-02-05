import { FindPasswordEmailMainScreen } from './screens/FindPassword/FindPasswordEmailMainScreen';
import HomeScreen from './screens/Home/HomeScreen';
import LoginMainScreen from './screens/Login/LoginMainScreen';
import { MyPageScreen } from './screens/MyPage/MyPageScreen';
import { OptionalPetInfoAllergyScreen } from './screens/OptionalPetInfo/OptionalPetInfoAllergyScreen';
import { OptionalPetInfoFinishScreen } from './screens/OptionalPetInfo/OptionalPetInfoFinishScreen';
import { OptionalPetInfoHealthScreen } from './screens/OptionalPetInfo/OptionalPetInfoHealthScreen';
import { OptionalPetInfoMainScreen } from './screens/OptionalPetInfo/OptionalPetInfoMainScreen';
import { OptionalPetInfoBodyTypeScreen } from './screens/OptionalPetInfo/OptonalPetInfoBodyTypeScreen';
import { PetMainScreen } from './screens/Pet/PetMainScreen';
import { RegisterPetBirthScreen } from './screens/RegisterPet/RegisterPetBirthScreen';
import { RegisterPetCharacterScreen } from './screens/RegisterPet/RegisterPetCharacterScreen';
import { RegisterPetGenderScreen } from './screens/RegisterPet/RegisterPetGenderScreen';
import { RegisterPetMainScreen } from './screens/RegisterPet/RegisterPetMainScreen';
import { RegisterPetNameScreen } from './screens/RegisterPet/RegisterPetNameScreen';
import { RegisterPetResultScreen } from './screens/RegisterPet/RegisterPetResultScreen';
import { RegisterPetTypeScreen } from './screens/RegisterPet/RegisterPetTypeScreen';
import { RegisterPetWeightScreen } from './screens/RegisterPet/RegisterPetWeightScreen';
import { TabBar } from './components/Notification/TabBar';
import { DeviceNotification } from './components/Notification/DeviceNotification';
import { NoticeNotification } from './components/Notification/NoticeNotification';
import { WarningNotification } from './components/Notification/WarningNotification';
import { heightPercentage } from './utils/ResponsiveSize';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { RegisterDeviceMainScreen } from './screens/RegisterDevice/RegisterDeviceMainScreen';
import { RegisterDevicePowerScreen } from './screens/RegisterDevice/RegisterDevicePowerScreen';
import { RegisterDeviceConnectScreen } from './screens/RegisterDevice/RegisterDeviceConnectScreen';
import { RegisterDeviceListScreen } from './screens/RegisterDevice/RegisterDeviceListScreen';
import { RegisterDeviceFinishScreen } from './screens/RegisterDevice/RegisterDeviceFinishScreen';
import { ConnectWiFiScreen } from './screens/RegisterDevice/ConnectWiFiScreen';
import { SelectWiFiScreen } from './screens/RegisterDevice/SelectWiFiScreen';
import { RegisterDeviceNameScreen } from './screens/RegisterDeviceInfo/RegisterDeviceNameScreen';
import { RegisterDevicePetScreen } from './screens/RegisterDeviceInfo/RegisterDevicePetScreen';
import { RegisterDeviceSandScreen } from './screens/RegisterDeviceInfo/RegisterDeviceSandScreen';
import { RegisterDeviceSandTypeScreen } from './screens/RegisterDeviceInfo/RegisterDeviceSandTypeScreen';
import { RegisterDeviceCleaningScreen } from './screens/RegisterDeviceInfo/RegisterDeviceCleaningScreen';
import { RegisterDeviceSandCycleScreen } from './screens/RegisterDeviceInfo/RegisterDeviceSandCycleScreen';
import { RegisterDeviceResultScreen } from './screens/RegisterDeviceInfo/RegisterDeviceResultScreen';
import { RegisterDeviceInfoFinishScreen } from './screens/RegisterDeviceInfo/RegisterDeviceInfoFinishScreen';
import { DeviceMainScreen } from './screens/DeviceMain/DeviceMainScreen';
import { DeviceSettingScreen } from './screens/DeviceMain/DeviceSettingScreen';
import { SettingConnectPetScreen } from './screens/DeviceMain/SettingConnectPetScreen';
import { SettingConnectFamilyScreen } from './screens/DeviceMain/SettingConnectFamilyScreen';
import { SettingCleaningTimeScreen } from './screens/DeviceMain/SettingCleaningTimeScreen';
import { SettingSleepModeScreen } from './screens/DeviceMain/SettingSleepModeScreen';
import { DeviceHistoryScreen } from './screens/DeviceMain/DeviceHistoryScreen';
import { PetSettingScreen } from './screens/Pet/PetSettingScreen';
import { PetDataScreen } from './screens/Pet/PetDataScreen';
import { PetDataHistoryScreen } from './screens/Pet/PetDataHistoryScreen';
import { PetReportScreen } from './screens/PetReport/PetReportScreen';
import { PetCalculateObesityScreen } from './screens/PetReport/PetCalculateObesityScreen';
import { CalculateObesityResultScreen } from './screens/PetReport/CalculateObesityResultScreen';

import { ScoreScreen } from './screens/Score/ScoreScreen';
import { OnBoardMainScreen } from './screens/Login/OnBoardMainScreen';
import { FamilyScoreScreen } from './screens/Score/FamilyScoreScreen';
import { BenefitGradeScreen } from './screens/Score/BenefitGradeScreen';
import { QuizScreen } from './screens/Score/QuizScreen';
import { FamilyScoreTipScreen } from './screens/Score/FamilyScoreTipScreen';
import { FamilyScoreTipDetailScreen } from './screens/Score/FamilyScoreTipDetailScreen';
import { ReplaceSandGuideOneScreen } from './screens/ReplaceSandGuide/ReplaceSandGuideOneScreen';
import { ReplaceSandGuideTwoScreen } from './screens/ReplaceSandGuide/ReplaceSandGuideTwoScreen';
import { ReplaceSandGuideThreeScreen } from './screens/ReplaceSandGuide/ReplaceSandGuideThreeScreen';
import { ReplaceSandGuideFourScreen } from './screens/ReplaceSandGuide/ReplaceSandGuideFourScreen';
import { ReplaceSandGuideFiveScreen } from './screens/ReplaceSandGuide/ReplaceSandGuideFiveScreen';
import { LoginEmailMainScreen } from './screens/Login/Email/LoginEmailMainScreen';
import { RegisterUserEmailMainScreen } from './screens/ReigsterUser/RegisterUserEmailMainScreen';
import { RegisterUserEmailConfirmScreen } from './screens/ReigsterUser/RegisterUserEmailConfirmScreen';
import { RegisterUserPasswordScreen } from './screens/ReigsterUser/RegisterUserPasswordScreen';
import { FindPasswordEmailConfirmScreen } from './screens/FindPassword/FindPasswordEmailConfirmScreen';
import { FindPasswordResetPasswordScreen } from './screens/FindPassword/FindPasswordResetScreen';
import { RegisterUserNicknameScreen } from './screens/ReigsterUser/RegisterUserNicknameScreen';
import { RegisterUserBirthScreen } from './screens/ReigsterUser/RegisterUserBirthScreen';
import { RegisterUserGenderScreen } from './screens/ReigsterUser/RegisterUserGenderScreen';
import { RegisterUserProfileInfoScreen } from './screens/ReigsterUser/RegisterUserProfileInfoScreen';
import { RegisterUserCharacterScreen } from './screens/ReigsterUser/RegisterUserCharacterScreen';
import { MyPageProfileSettingScreen } from './screens/MyPage/MyPageProfileSettingScreen';
import { MyPageFamilySettingScreen } from './screens/MyPage/MyPageFamilySettingScreen';
import MyPageFamilyMemberInfoScreen  from './screens/MyPage/MyPageFamilyMemberInfoScreen';
import { MyPageFamilyInvitationScreen } from './screens/MyPage/MyPageFamilyInvitationScreen';
import { MyPageFamilyCreateScreen } from './screens/MyPage/MyPageFamilyCreateScreen';
import { MyPageAlarmScreen } from './screens/MyPage/MyPageAlarmScreen';
import { MyPageNoticeScreen } from './screens/MyPage/MyPageNoticeScreen';
import { MyPageNoticeDetailScreen } from './screens/MyPage/MyPageNoticeDetailScreen';
import { MyPageAgreementScreen } from './screens/MyPage/MyPageAgreementScreen';
import { MyPageAgreementDetailScreen } from './screens/MyPage/MyPageAgreementDetailScreen';
import { MyPageAgreementFAQScreen } from './screens/MyPage/MyPageFAQScreen';
import { MyPageResignScreen } from './components/MyPage/MyPageResignScreen';
import { RegisterUserAgreementScreen } from './screens/ReigsterUser/RegisterUserAgreementScreen';

import { RootNavigator } from './RootNavigator';
import { fetchEventClickCount } from './slices/HomeSlice';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import {  Platform, StatusBar, Text } from 'react-native';
import { Provider, useDispatch } from 'react-redux';
import store from './store';
import { Theme } from './styles/theme';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { getVerifiedToken } from './utils/AsyncService';

import SvgIcon from './components/SvgIcon';
import { DisconnectInternetScreen } from './screens/DisconnectInternet/DisconnectInternetScreen';
import { PetNoDataScreen } from './screens/Pet/PetNoDataScreen';
import { ReplaceSandGuideSixScreen } from './screens/ReplaceSandGuide/ReplaceSandGuideSixScreen';
import { ReplaceSandGuideSevenScreen } from './screens/ReplaceSandGuide/ReplaceSandGuideSevenScreen';
import { MyPageAgreementListScreen } from './screens/MyPage/MyPageAgreementListScreen';
import { RegisterDevicePermissionScreen } from './screens/RegisterDevice/RegisterDevicePermissionScreen';

export const platform = Platform.OS;

const App = () => {
  Text.defaultProps = Text.defaultProps || {};
  Text.defaultProps.allowFontScaling = false;
  //앱이 켜져있을 때 푸시 이벤트는 여기서 처리한다.

  Platform.OS === 'android' && StatusBar.setBackgroundColor('transparent');
  Platform.OS === 'android' && StatusBar.setTranslucent(true);
  Platform.OS === 'android' && StatusBar.setBarStyle('dark-content');
  const Stack = createNativeStackNavigator();

  // deeplink url event Listener

  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <RootNavigator>
          <Stack.Screen
            name="DisconnectInternet" // 네트워크 끊김
            component={DisconnectInternetScreen}
          />
          <Stack.Screen
            name="OnBoard" // 온보드 화면
            component={OnBoardMainScreen}
          />
          <Stack.Screen
            name="RegisterPet" // 펫 등록 메인
            component={RegisterPet}
          />
          <Stack.Screen
            name="OptionalPetInfo" // 펫 추가 정보 등록 메인
            component={OptionalPetInfo}
          />
          <Stack.Screen
            name="Login" // 로그인
            component={Login}
          />
          <Stack.Screen
            name="FindPassword" // 비밀번호 찾기
            component={FindPassword}
          />

          <Stack.Screen
            name="RegisterUser" // 회원가입
            component={RegisterUser}
          />

          <Stack.Screen
            name="Home" // 메인 탭 구성 화면
            component={Home}
          />

          <Stack.Screen
            name="Notification" // 알림 내역 안 탭 구성
            component={Tabs}
          />

          <Stack.Screen
            name="Device" // 디바이스 등록 Stack Group
            component={Device}
          />
          <Stack.Screen
            name="DeviceInfo" // 디바이스 추가 정보 Stack Group
            component={DeviceInfo}
          />
          <Stack.Screen
            name="DeviceContents" // 디바이스 상세  Stack Group
            component={DeviceContents}
          />

          <Stack.Screen name="PetSetting" component={PetSettingScreen} />
          <Stack.Screen name="PetData" component={PetData} />
          <Stack.Screen name="PetNoData" component={PetNoDataScreen} />
          <Stack.Screen name="PetReport" component={PetReport} />
          <Stack.Screen name="FamilyScore" component={FamilyScoreScreen} />
          <Stack.Screen name="BenefitGrade" component={BenefitGradeScreen} />
          <Stack.Screen name="Quiz" component={QuizScreen} />
          <Stack.Screen name="FamilyScoreTip" component={FamilyScoreTip} />

          <Stack.Screen
            name="MyPageContents" // 개인설정 페이지
            component={MyPageContents}
          />
          <Stack.Screen
            name="RegisterUserAgreement" // 약관 페이지
            component={RegisterUserAgreementScreen}
          />
        </RootNavigator>
      </GestureHandlerRootView>
    </Provider>
  );
};

const Home = () => {
  const dispatch = useDispatch();
  const BottomTab = createBottomTabNavigator();

  const postEventClickCount = async event => {
    dispatch(
      fetchEventClickCount({
        token: await getVerifiedToken(),
        event: event,
      }),
    );
  };
  return (
    <BottomSheetModalProvider>
      <BottomTab.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          gestureEnabled:false,
          contentStyle: { backgroundColor: '#fff' },
          tabBarActiveTintColor: Theme.colors.main,
          tabBarInactiveTintColor: Theme.colors.gray3,
          tabBarLabelStyle: {
            fontFamily: Theme.fonts.medium,
            fontSize: 12,
          },
          tabBarStyle: {
            paddingTop: heightPercentage(15),
            paddingBottom: heightPercentage(22),
            height: heightPercentage(80),
            shadowOffset: {
              width: 0,
              height: 12,
            },
            shadowOpacity: 0.1,
            elevation: 24,
            backgroundColor: '#fff',
            position: 'absolute',
            bottom: 0,
            width: '100%',
            zIndex: 0,
          },
        }}>
        <BottomTab.Screen
          name="HOME" // 메인
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color }) => <SvgIcon name={'Home'} fill={color} />,
          }}
          listeners={() => ({
            tabPress: () => postEventClickCount('NAV_HOME'),
          })}
        />
        <BottomTab.Screen
          name="PET" // 펫
          component={PetMainScreen}
          options={{
            tabBarIcon: ({ color }) => <SvgIcon name={'Pet'} fill={color} />,
          }}
          listeners={() => ({
            tabPress: () => postEventClickCount('NAV_PET'),
          })}
        />
        <BottomTab.Screen
          name="SCORE" // 스코어
          component={ScoreScreen}
          options={{
            tabBarIcon: ({ color }) => <SvgIcon name={'Score'} fill={color} />,
          }}
          listeners={() => ({
            tabPress: () => postEventClickCount('NAV_SCORE'),
          })}
        />
        <BottomTab.Screen
          name="MY" // 마이페이지
          component={MyPageScreen}
          options={{
            tabBarIcon: ({ color }) => <SvgIcon name={'My'} fill={color} />,
          }}
          listeners={() => ({
            tabPress: () => postEventClickCount('NAV_MY'),
          })}
        />
      </BottomTab.Navigator>
    </BottomSheetModalProvider>
  );
};

const PetData = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="PetData"
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#fff' },
      }}>
      <Stack.Screen name="PetData" component={PetDataScreen} />
      <Stack.Screen name="PetDataHistory" component={PetDataHistoryScreen} />
    </Stack.Navigator>
  );
};

const PetReport = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="PetReport"
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#fff' },
      }}>
      <Stack.Screen name="PetReport" component={PetReportScreen} />
      <Stack.Screen
        name="PetCalculateObesity"
        component={PetCalculateObesityScreen}
      />
      <Stack.Screen
        name="CalculateObesityResult"
        component={CalculateObesityResultScreen}
      />
    </Stack.Navigator>
  );
};

const FamilyScoreTip = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="FamilyScoreTip"
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#fff' },
      }}>
      <Stack.Screen name="FamilyScoreTip" component={FamilyScoreTipScreen} />
      <Stack.Screen
        name="FamilyScoreTipDetail"
        component={FamilyScoreTipDetailScreen}
      />
    </Stack.Navigator>
  );
};

const RegisterPet = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="RegisterPetName"
      screenOptions={{
        animationTypeForReplace: 'push',
        animation: 'none',
        headerShown: false,
        contentStyle: { backgroundColor: '#fff' },
        gestureEnabled: false,
      }}>
      <Stack.Screen
        name="RegisterPetName" // 펫 이름 등록
        component={RegisterPetNameScreen}
      />
      <Stack.Screen
        name="RegisterPetType" // 펫 종류 등록
        component={RegisterPetTypeScreen}
      />
      <Stack.Screen
        name="RegisterPetGender" // 펫 성별 등록
        component={RegisterPetGenderScreen}
      />
      <Stack.Screen
        name="RegisterPetBirth" // 펫 생일 등록
        component={RegisterPetBirthScreen}
      />
      <Stack.Screen
        name="RegisterPetWeight" // 펫 체중 등록
        component={RegisterPetWeightScreen}
      />
      <Stack.Screen
        name="RegisterPetResult" // 펫 필수 정보 확인
        component={RegisterPetResultScreen}
      />
      <Stack.Screen
        name="RegisterPetCharacter" // 펫 캐릭터 등록
        component={RegisterPetCharacterScreen}
      />
      <Stack.Screen
        name="OptionalPetInfoMain" // 펫 추가 정보 등록 메인
        component={OptionalPetInfoMainScreen}
      />
    </Stack.Navigator>
  );
};

const OptionalPetInfo = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="OptionalPetInfoBodyType"
      screenOptions={{
        headerShown: false,
        animationTypeForReplace: 'push',
        animation: 'none',
        contentStyle: { backgroundColor: '#fff' },
        gestureEnabled: false,
      }}>
      <Stack.Screen
        name="OptionalPetInfoBodyType" // 펫 추가 정보 체형 등록
        component={OptionalPetInfoBodyTypeScreen}
      />
      <Stack.Screen
        name="OptionalPetInfoHealth" // 펫 추가 정보 건강 상태 등록
        component={OptionalPetInfoHealthScreen}
      />
      <Stack.Screen
        name="OptionalPetInfoAllergy" // 펫 추가 정보 알러지 등록
        component={OptionalPetInfoAllergyScreen}
      />
      <Stack.Screen
        name="RegisterPetResult" // 펫 필수 정보 확인
        component={RegisterPetResultScreen}
      />
      <Stack.Screen
        name="OptionalPetInfoFinish" // 펫 추가 등록 완료
        component={OptionalPetInfoFinishScreen}
      />
    </Stack.Navigator>
  );
};

const Login = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="LoginMain"
      screenOptions={{
        headerShown: false,
        animationTypeForReplace: 'push',
        animation: 'none',
        contentStyle: { backgroundColor: '#fff' },
      }}>
      <Stack.Screen
        name="LoginMain" // 로그인 메인 sns 또는 이메일 선택 페이지
        component={LoginMainScreen}
      />
      <Stack.Screen
        name="LoginEmailMain" // 이메일 로그인 메인 페이지
        component={LoginEmailMainScreen}
      />
    </Stack.Navigator>
  );
};

const FindPassword = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="FindPasswordEmailMain"
      screenOptions={{
        headerShown: false,
        animationTypeForReplace: 'push',
        animation: 'none',
        contentStyle: { backgroundColor: '#fff' },
      }}>
      <Stack.Screen
        name="FindPasswordEmailMain" // 비밀번호 찾기 이메일 입력 페이지
        component={FindPasswordEmailMainScreen}
      />
      <Stack.Screen
        name="FindPasswordEmailConfirm" // '' 이메일 인증 페이지
        component={FindPasswordEmailConfirmScreen}
      />
      <Stack.Screen
        name="FindPasswordReset" // '' 비밀번호 재설정 페이지
        component={FindPasswordResetPasswordScreen}
      />
    </Stack.Navigator>
  );
};

const RegisterUser = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="RegisterUserEmailMain"
      screenOptions={{
        animationTypeForReplace: 'push',
        animation: 'none',
        headerShown: false,
        contentStyle: { backgroundColor: '#fff' },
      }}>
      <Stack.Screen
        name="RegisterUserEmailMain" //유저 이메일 등록 페이지
        component={RegisterUserEmailMainScreen}
      />
      <Stack.Screen
        name="RegisterUserEmailConfirm" //유저 이메일 인증 페이지
        component={RegisterUserEmailConfirmScreen}
      />
      <Stack.Screen
        name="RegisterUserPassword" // 유저 비밀번호 등록 페이지
        component={RegisterUserPasswordScreen}
      />
      <Stack.Screen
        name="RegisterUserNickname" // 유저 닉네임 등록 페이지
        component={RegisterUserNicknameScreen}
      />
      <Stack.Screen
        name="RegisterUserBirth" // 유저 생일 등록 페이지
        component={RegisterUserBirthScreen}
      />
      <Stack.Screen
        name="RegisterUserGender" // 유저 성별 등록 페이지
        component={RegisterUserGenderScreen}
      />
      <Stack.Screen
        name="RegisterUserProfile" // 유저 프로필 등록 페이지
        component={RegisterUserProfileInfoScreen}
      />
      <Stack.Screen
        name="RegisterUserCharacter" // 유저 캐릭터 등록 페이지
        component={RegisterUserCharacterScreen}
      />
      <Stack.Screen
        name="RegisterPetMain" // 회원가입 완료 페이지
        component={RegisterPetMainScreen}
      />
    </Stack.Navigator>
  );
};

const Tabs = () => {
  const Tab = createMaterialTopTabNavigator();
  return (
    <Tab.Navigator tabBar={props => <TabBar {...props} />}>
      <Tab.Screen
        name="디바이스"
        component={DeviceNotification}
        options={{ swipeEnabled: false }}
      />
      <Tab.Screen name="이상증상"
        component={WarningNotification}
        options={{ swipeEnabled: false }} />
      <Tab.Screen name="공지"
        component={NoticeNotification}
        options={{ swipeEnabled: false }} />
    </Tab.Navigator>
  );
};

const DeviceContents = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="DeviceMain"
      screenOptions={{
        headerShown: false,
        animationTypeForReplace: 'push',
        animation: 'none',
        contentStyle: { backgroundColor: '#fff' },
      }}>
      <Stack.Screen // 디바이스 메인
        name="DeviceMain"
        component={DeviceMainScreen}
      />
      <Stack.Screen // 디바이스 사용 기록
        name="DeviceHistory"
        component={DeviceHistoryScreen}
      />
      <Stack.Screen
        name="DeviceSetting" // 디바이스 설정
        component={DeviceSettingScreen}
      />
      <Stack.Screen // 디바이스 연결된 펫
        name="SettingConnectPet"
        component={SettingConnectPetScreen}
      />
      <Stack.Screen // 디바이스 연결된 패밀리
        name="SettingConnectFamily"
        component={SettingConnectFamilyScreen}
      />
      <Stack.Screen // 청소 대기 시간 설정
        name="SettingCleaningTime"
        component={SettingCleaningTimeScreen}
      />
      <Stack.Screen // 슬립 모드 설정
        name="SettingSleepMode"
        component={SettingSleepModeScreen}
      />
      <Stack.Screen // 모래 교체 가이드
        name="ReplaceSandGuide"
        component={ReplaceSandGuide}
      />
    </Stack.Navigator>
  );
};

const ReplaceSandGuide = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="ReplaceSandGuideOne"
      screenOptions={{
        headerShown: false,
        animationTypeForReplace: 'push',
        animation: 'none',
        contentStyle: { backgroundColor: '#fff' },
      }}>
      <Stack.Screen
        name="ReplaceSandGuideOne"
        component={ReplaceSandGuideOneScreen}
      />
      <Stack.Screen
        name="ReplaceSandGuideTwo"
        component={ReplaceSandGuideTwoScreen}
      />
      <Stack.Screen
        name="ReplaceSandGuideThree"
        component={ReplaceSandGuideThreeScreen}
      />
      <Stack.Screen
        name="ReplaceSandGuideFour"
        component={ReplaceSandGuideFourScreen}
      />
      <Stack.Screen
        name="ReplaceSandGuideFive"
        component={ReplaceSandGuideFiveScreen}
      />
      <Stack.Screen
        name="ReplaceSandGuideSix"
        component={ReplaceSandGuideSixScreen}
      />
      <Stack.Screen
        name="ReplaceSandGuideSeven"
        component={ReplaceSandGuideSevenScreen}
      />
    </Stack.Navigator>
  );
};

const Device = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="RegisterDevicePermission"
      screenOptions={{
        headerShown: false,
        animationTypeForReplace: 'push',
        animation: 'none',
        contentStyle: { backgroundColor: '#fff' },
        gestureEnabled: false,
      }}>
      <Stack.Screen
        name="RegisterDevicePermission"
        component={RegisterDevicePermissionScreen}
      />
      <Stack.Screen
        name="RegisterDevicePower"
        component={RegisterDevicePowerScreen}
      />
      <Stack.Screen
        name="RegisterDeviceConnect"
        component={RegisterDeviceConnectScreen}
      />
      <Stack.Screen
        name="RegisterDeviceList"
        component={RegisterDeviceListScreen}
      />
      <Stack.Screen
        name="RegisterDeviceFinish"
        component={RegisterDeviceFinishScreen}
      />
      <Stack.Screen name="ConnectWiFi" component={ConnectWiFiScreen} />
      <Stack.Screen name="SelectWiFi" component={SelectWiFiScreen} />

      <Stack.Screen // 디바이스 등록 확인
        name="RegisterDeviceInfoFinish"
        component={RegisterDeviceInfoFinishScreen}
      />
    </Stack.Navigator>
  );
};

const DeviceInfo = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="RegisterDeviceMain"
      screenOptions={{
        headerShown: false,
        animationTypeForReplace: 'push',
        animation: 'none',
        contentStyle: { backgroundColor: '#fff' },
        gestureEnabled: false,
      }}>
      <Stack.Screen
        name="RegisterDeviceMain"
        component={RegisterDeviceMainScreen}
      />
      <Stack.Screen // 화장실 이름
        name="RegisterDeviceName"
        component={RegisterDeviceNameScreen}
      />
      <Stack.Screen // 화장실 누가 사용하는지
        name="RegisterDevicePet"
        component={RegisterDevicePetScreen}
      />
      <Stack.Screen // 모래 선택
        name="RegisterDeviceSand"
        component={RegisterDeviceSandScreen}
      />
      <Stack.Screen // 모래 종류 선택
        name="RegisterDeviceSandType"
        component={RegisterDeviceSandTypeScreen}
      />
      <Stack.Screen // 청소 대기 시간
        name="RegisterDeviceCleaning"
        component={RegisterDeviceCleaningScreen}
      />
      <Stack.Screen // 모래 교체 주기
        name="RegisterDeviceSandCycle"
        component={RegisterDeviceSandCycleScreen}
      />
      <Stack.Screen // 디바이스 등록 결과
        name="RegisterDeviceResult"
        component={RegisterDeviceResultScreen}
      />
    </Stack.Navigator>
  );
};

const MyPageContents = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animationTypeForReplace: 'push',
        animation: 'none',
        contentStyle: { backgroundColor: '#fff' }
      }}>
      <Stack.Screen
        name="MyPageProfileSetting" // 프로필 설정
        component={MyPageProfileSettingScreen}
      />
      <Stack.Screen
        name="MyPageFamilySetting" // 패밀리 관리
        component={MyPageFamilySettingScreen}
      />
      <Stack.Screen
        name="MyPageFamilyMemberInfo" // 패밀리 멤버 정보
        component={MyPageFamilyMemberInfoScreen}
      />
      <Stack.Screen
        name="MyPageFamilyInvitation" // 패밀리 초대
        component={MyPageFamilyInvitationScreen}
      />
      <Stack.Screen
        name="MyPageFamilyCreate" // 패밀리 생성
        component={MyPageFamilyCreateScreen}
      />
      <Stack.Screen
        name="MyPageAlarm" // 알람 설정 페이지
        component={MyPageAlarmScreen}
      />
      <Stack.Screen
        name="MyPageNotice" // 공지사항 페이지
        component={MyPageNoticeScreen}
      />
      <Stack.Screen
        name="MyPageNoticeDetail" // 패밀리 생성
        component={MyPageNoticeDetailScreen}
      />
      <Stack.Screen
        name="MyPageAgreementList" // 이용약관 페이지
        component={MyPageAgreementListScreen}
      />
      <Stack.Screen
        name="MyPageAgreement" // 이용약관 페이지
        component={MyPageAgreementScreen}
      />
      <Stack.Screen
        name="MyPageAgreementDetail" // 이용약관 상세 페이지
        component={MyPageAgreementDetailScreen}
      />
      <Stack.Screen
        name="MyPageAgreementFAQ" // 자주 묻는 질문 페이지
        component={MyPageAgreementFAQScreen}
      />
      <Stack.Screen
        name="MyPageResign" // 탈퇴 페이지
        component={MyPageResignScreen}
      />
    </Stack.Navigator>
  );
};

export default App;
