import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated,
  AppState,
  ImageBackground,
  Linking,
  Platform,
  TouchableWithoutFeedback,
  useWindowDimensions,
  View,
} from 'react-native';
import styled from 'styled-components/native';
import { Container, Wrapper } from '../../components/MainLayout';
import { Theme } from '../../styles/theme';
import { heightPercentage, widthPercentage } from '../../utils/ResponsiveSize';
import { SelectFamily } from '../../components/Home/SelectFamily';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetModal,
} from '@gorhom/bottom-sheet';
import HomeBottomSheetComponent from '../../components/Home/HomeBottomSheetComponent';
// import { ModalComponent } from '../../components/ModalComponent';
// import ChangeSandModalItem from '../../components/Home/ChangeSandModalItem';
import { useNavigation } from '@react-navigation/native';
import { PermissionsCheckItem } from '../../components/Home/PermissionsCheckItem';
import SvgIcon from '../../components/SvgIcon';
import { FlatList } from 'react-native-gesture-handler';
import { fetchPersonalDisplay } from '../../services/Home';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFamilyList, fetchSelectedFamily } from '../../slices/FamilySlice';
import { getData, getVerifiedToken, storeData } from '../../utils/AsyncService';
import { useIsFocused } from '@react-navigation/native';
import {
  PERMISSIONS,
  request,
  requestMultiple,
  requestNotifications,
} from 'react-native-permissions';
import {
  fetchPushRead,
} from '../../slices/HomeSlice';
import { checkPermissionDenied, createFCMToken } from '../../services/Push';
import { fetchUser } from '../../slices/RegisterUserSlice';
import NoticeItem from '../../components/Home/NoticeItem';
import { fetchSelectedFamilyDeviceList } from '../../slices/DeviceSlice';
import { axiosInstance } from '../../services';
import CustomSlideItem from '../../components/Home/CustomSlideItem';
import { ModalComponent } from '../../components/ModalComponent';
import PermissionAlertModalItem from '../../components/Home/PermissionAlertModalItem';

const PageCountText = styled.Text`
  font-family: ${Theme.fonts.regular};
  font-size: 14px;
  color: ${Theme.colors.gray4};
`;

const MainHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  height: ${heightPercentage(44)}px;
  align-items: center;
  margin-left: ${widthPercentage(20)}px;
  margin-right: ${widthPercentage(12)}px;
  margin-top: ${heightPercentage(8)}px;
`;
const NotificationWrapper = styled.View`
  padding-right: ${widthPercentage(9)}px;
`;



// const useAppState = (callBack) => {
//   const appState = useRef(AppState.currentState);

//   // 앱 상태 확인 (background || foreground)
//   const handleAppStateChange = nextAppState => {
//     if (
//       appState.current.match(/inactive|background/) &&
//       nextAppState === 'active'
//     ) {
//       callBack();
//     } else {
//       console.log('background 전환 from Home');
//     }

//     appState.current = nextAppState;
//   };

//   // Listener 등록
//   useEffect(() => {
//     // handleCheckPermissions();
//     const appStateListener = AppState.addEventListener(
//       'change',
//       handleAppStateChange,
//     );

//     return () => {
//       appStateListener.remove();
//     };
//   }, []);

// };

function HomeScreen() {
  const navigate = useNavigation();
  const isFocused = useIsFocused();
  const [isShow, setShow] = useState(false);
  const flatListRef = useRef(null);
  const bottomSheetRef = useRef(null);
  const permissionBottomSheetRef = useRef(null);
  const noticeBottomSheetRef = useRef(null);

  const [alarm, setAlarm] = useState(false);
  const [index, setIndex] = useState(0);
  const [auto, setAuto] = useState(true);
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const [personalDisplayList, setPersonalDisplayList] = useState([]);
  const [closeOfBottomSheet, setCloseOfBottomSheet] = useState(false);
  const [noticePopup, setNoticePopup] = useState(null);
  const [focused, setFocused] = useState(false);
  const {selectedFamilyDeviceList} = useSelector(state => state.device);
  // const [deviceAlertList, setDeviceAlertList] = useState([]);
  const dispatch = useDispatch();
  const { selectedFamily } = useSelector(state => state.family);
  // const { loading} = useSelector(state => state.registerUser);
  const { pushRead } = useSelector(state => state.home);

  const { width } = useWindowDimensions();
  const SLIDE_WIDTH = width - widthPercentage(40);

  // if(personalDisplayList?.length > 0 && personalDisplayList[0]?.backgroundImg){}

  const snapToOffsets = useMemo(
    () =>{
      return Array.from(Array(personalDisplayList?.length)).map(
        (_, index) => index * SLIDE_WIDTH,
      );},
    [personalDisplayList]
  );

  function useInterval(callback, delay) {
    const savedCallback = useRef(() => { });

    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }

      if (focused) {
        if (delay !== null) {
          const id = setInterval(tick, delay);
          return () => {
            clearInterval(id);
          };
        }
      }
    }, [delay, focused, index]);
  }

  useEffect(() => {
    if (index !== snapToOffsets.length && auto) {
      flatListRef.current?.scrollToOffset({
        animated: true,
        offset: snapToOffsets[index],
      });
    }
  }, [index, snapToOffsets]);

  useInterval(() => {
    setAuto(true);
    setIndex(prev => (prev === snapToOffsets.length - 1 ? 0 : prev + 1));
  }, 7000);

  const snapPoints = useMemo(
    () => ['30%', Platform.OS == 'android' ? '92%' : '87%'],
    [],
  );

  const handleSheetChanges = useCallback(index => {
    console.log('handleSheetChanges', index);
  }, []);

  const handleAlarmPermissionDenied = () => {
    // setShow(true);
    navigate.navigate('Notification');
    setAlarm(false);
  };

  const requestMultiplePermissions = async () => {
    requestNotifications(['alert', 'sound']).then(() => {
      if (Platform.OS == 'ios') {
        if (parseInt(Platform.Version, 10) > 12) {
          request(PERMISSIONS.IOS.BLUETOOTH_PERIPHERAL).then(() => {
            createFCMToken();
          });
        }
      } else {
        requestMultiple([
          PERMISSIONS.ANDROID.BLUETOOTH_SCAN,
          PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
          PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
          PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
          PERMISSIONS.ANDROID.POST_NOTIFICATIONS,
        ]).then(() => {
          createFCMToken();
        });
      }
    });
    await storeData('checkPermission', true);
  };

  const fetchNoticePopup = async () => {
    await axiosInstance({
      url: '/api/notice/popup',
      headers: { Authorization: `Bearer ${await getVerifiedToken()}` }
    }).then((res) => {
      if (res?.data.success) {
        setNoticePopup(res?.data?.response[0]?.imageUrl);
        checkIfPopupShouldShow();
      } else {
        setNoticePopup(null);
      }
    }).catch((err) => {
      console.log('fetchNoticePopupError', err?.data?.response?.error?.message);
    });
  };


  const handleNoticeDayClose = async () => {
    try {
      const curr = new Date();
      // 2. UTC 시간 계산
      const utc = 
            curr.getTime() + 
            (curr.getTimezoneOffset() * 60 * 1000);
      // 3. UTC to KST (UTC + 9시간)
      const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
      const koreanTime = 
            new Date(utc + (KR_TIME_DIFF));
      koreanTime.setDate(koreanTime.getDate() + 1);
      koreanTime.setHours(9,0,0,0);
      //한국시간은 utc기준 9시간 차이, 9시간을 세팅하면 00시가 된다.

      // koreanTime.setHours(10,35,0,0);
      const koreanTimeInMs = koreanTime.getTime();
      await storeData('hidePopupUntil',koreanTimeInMs);
      noticeBottomSheetRef?.current?.dismiss();
    } catch (error) {
      console.error('notice popup error', error);
      noticeBottomSheetRef?.current?.dismiss();
    }
  };

  const handleNoticeClose = () => {
    noticeBottomSheetRef?.current?.dismiss();
  };

  const checkIfPopupShouldShow = async () => {
    const isHidden = await getData('hidePopupUntil');
    const curr = new Date();
    const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
    const koreanTime = new Date(curr.getTime() + (KR_TIME_DIFF));
    const koreanTimeInMs = koreanTime.getTime();
    if (isHidden !== undefined && isHidden !== null && isHidden !== "null") {
      if (isHidden <= koreanTimeInMs) {
        noticeBottomSheetRef?.current?.present();
        return;
      }
      return;
    }
    noticeBottomSheetRef?.current?.present();
    return;
  };

  const checkPermissions = async () => {
    const checkPermission = (await getData('checkPermission')) || false;
    !checkPermission && permissionBottomSheetRef?.current?.present();
  };

  const checkPermission = async () => {
    const isPermission = await getData('checkPermission');
    if (closeOfBottomSheet) {
      fetchNoticePopup();
      return;
    }

    if (!closeOfBottomSheet && isPermission) {
      fetchNoticePopup();
      return;
    }
  };
  // GET: 개인화 화면
  const getPersonalDisplay = async (token, callback) => {
    try {
      const response = await fetchPersonalDisplay(token);
      setPersonalDisplayList(response.response);
      callback();
    } catch (error) {
      console.log('getPersonalDisplay ERROR : ', error.response.data);
      setPersonalDisplayList([]);
    }
  };
  //액세스 토큰 발급 > 만료 확인 > 리프레쉬 토큰 발급, 액세스 리프레쉬 토큰 갱신
  const getDefaultList = async (token) => {
    dispatch(fetchUser(token));
    dispatch(fetchSelectedFamily(token));
    dispatch(fetchFamilyList(token));
    dispatch(fetchSelectedFamilyDeviceList(token));
    dispatch(fetchPushRead(token));
  };

  // 모래교체 알림 확인

  // 사용자 최초 로그인 알람 상태 false, 히스토리 페치, 알람 클릭 시 알람 true, 히스토리 패치

  const getInitialList = async (callback = () => {}) => {
    const token = await getVerifiedToken();
    getPersonalDisplay(token, callback);
    dispatch(fetchSelectedFamilyDeviceList(token));
  };

  const handleClose = async () => {
    permissionBottomSheetRef?.current?.dismiss();
    setCloseOfBottomSheet(true);
  };

  const renderBackdrop = useCallback(
    props_ => (
      <BottomSheetBackdrop
        {...props_}
        pressBehavior="close"
        opacity={0.5}
        disappearsOnIndex={-1}
      />
    ),
    [],
  );

  const renderCustomSlideItem = useCallback((item) => {
    return (
      <CustomSlideItem item={item} width={SLIDE_WIDTH} />
    );
  }, [personalDisplayList]);

  const getItemLayout = useCallback((_, index) => {
    return { length: SLIDE_WIDTH, offset: SLIDE_WIDTH * personalDisplayList?.length, index };
  }, [personalDisplayList]);

  const keyExtractor = useCallback((item) => {
    return item?.firstMainText + item?.secondMainText;
  }, []);


  const handleScroll = e => {
    Animated.event(
      [{ nativeEvent: { contentOffset: { x: scrollX } } }],
      {
        useNativeDriver: false,
        listener: () => {
        },
      },
    );
    if (!auto) {
      // console.log(Math.ceil(e.nativeEvent.contentOffset.x / width));
      setIndex(Math.ceil(e.nativeEvent.contentOffset.x / width));
    }
  };
  //알람 퍼미션 업데이트

  //푸쉬 히스토리 업데이트, 푸쉬 읽음 확인
  // const updatePushHistoryState = async (token) => {
  //   dispatch(fetchPushRead(token));
  // };

  //푸쉬 알람 설정
  const handleNotificationSubmit = () => {
    const handleAlarmPermissionGranted = () => {
      // checkFCMToken();
      setAlarm(true);
      navigate.navigate('Notification');
    };
    if (alarm) {
      navigate.navigate('Notification');
      return;
    }
    checkPermissionDenied(handleAlarmPermissionDenied, handleAlarmPermissionGranted);
  };

  // 앱 상태 확인해서 푸쉬 업데이트 (background || foreground)
  // useAppState(updatePushHistoryState);

  useEffect(() => {
    checkPermission();

  }, []);

  useEffect(() => {
    checkPermissions();
    if (isFocused) {
      const getDefaultInformation = async() => {
        const token = await getVerifiedToken();
        getDefaultList(token);
      };
      getDefaultInformation();
    }
    setFocused(isFocused);

    // return () => setPersonalDisplayList([]);
  }, [isFocused]);

  useEffect(() => {
    getInitialList(() => {
      // API Success Callback
      setIndex(0);
      flatListRef.current?.scrollToOffset({
        animated: false,
        offset: snapToOffsets[0],
      });
    });

    // return () => setPersonalDisplayList([]);
  }, [selectedFamily]);

  useEffect(() => {
    const timer = setTimeout(() => {
      closeOfBottomSheet && requestMultiplePermissions();
      !closeOfBottomSheet && createFCMToken();
      clearTimeout(timer);
    }, 500);
    checkPermission();
  }, [closeOfBottomSheet]);

  const handleConfirm = () => {
    Linking.openSettings();
    // setShow(false);
  };

  const handleCancel = () => {
    // setShow(false);
  };

  function onScrollEnd(e) {
    if (!auto) {
      setIndex(Math.round(e.nativeEvent.contentOffset.x / width));
    }
  }

  return (
    <ImageBackground
      style={{ width: '100%', height: '100%' }}
      source={{
        uri:
          personalDisplayList?.length > 0
            ? 'https://' + personalDisplayList[index]?.backgroundImg
            : '',
      }}>
      <Container>
        <ModalComponent isShow={isShow} setShow={setShow}>
          <PermissionAlertModalItem
            handleConfirm={handleConfirm}
            handleCancel={handleCancel}
          />
        </ModalComponent>
        <MainHeader>
          <SelectFamily />
          <TouchableWithoutFeedback
            onPress={handleNotificationSubmit}>
            <NotificationWrapper>
              {pushRead ? <SvgIcon name={'BellNoti'} fill="#000" /> : <SvgIcon name={'Bell'} fill="#000" />}
            </NotificationWrapper>
          </TouchableWithoutFeedback>
        </MainHeader>
        <Wrapper>
          <View
            style={{
              flexDirection: 'row',
              position: 'absolute',
              right: widthPercentage(20),
              top: heightPercentage(25),
            }}>
            <PageCountText style={{ color: Theme.colors.gray9 }}>
              {index + 1}
            </PageCountText>
            <PageCountText>/{personalDisplayList?.length}</PageCountText>
          </View>
          {personalDisplayList && <FlatList
            ref={flatListRef}
            horizontal={true}
            initialNumToRender={personalDisplayList?.length}
            maxToRenderPerBatch={personalDisplayList?.length}
            removeClippedSubviews={true}
            data={personalDisplayList}
            snapToOffsets={snapToOffsets}
            renderItem={renderCustomSlideItem}
            scrollEventThrottle={5}
            showsHorizontalScrollIndicator={false}
            pagingEnabled={true}
            keyExtractor={keyExtractor}
            snapToInterval={SLIDE_WIDTH}
            decelerationRate={'fast'}
            bounces={false}
            onScroll={handleScroll}
            onScrollBeginDrag={() => setAuto(() => false)}
            onScrollAnimationEnd={onScrollEnd}
            getItemLayout={getItemLayout}
          />}
        </Wrapper>

        <BottomSheet
          ref={bottomSheetRef}
          index={0}
          containerStyle={{ borderTopLeftRadius: widthPercentage(30) }}
          snapPoints={snapPoints}
          handleIndicatorStyle={{
            backgroundColor: Theme.colors.gray3,
          }}
          style={{
            borderRadius: widthPercentage(30),
            overflow: 'hidden',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 10,
            },
            shadowOpacity: 0.04,
            shadowRadius: 30,
            elevation: 20,
          }}
          onChange={handleSheetChanges}>
          <HomeBottomSheetComponent selectedFamilyDeviceList={selectedFamilyDeviceList}/>
        </BottomSheet>

        <BottomSheetModal
          containerStyle={{ borderTopLeftRadius: widthPercentage(20) }}
          style={{
            borderRadius: widthPercentage(20),
            overflow: 'hidden',
          }}
          handleIndicatorStyle={{ display: 'none' }}
          ref={permissionBottomSheetRef}
          snapPoints={[Platform.OS == 'android' ? '64%' : '62%']}
          backdropComponent={backdropProps => (
            <BottomSheetBackdrop
              {...backdropProps}
              pressBehavior="close"
              opacity={0.5}
              disappearsOnIndex={-1}
              onPress={handleClose}
            />
          )}>
          <PermissionsCheckItem handleClose={handleClose} />
        </BottomSheetModal>

        {noticePopup && noticePopup !== '' && <BottomSheetModal
          containerStyle={{ borderTopLeftRadius: widthPercentage(20) }}
          style={{
            overflow: 'hidden',
          }}
          backgroundStyle={{ backgroundColor: 'transparent' }}
          handleStyle={{ display: 'none' }}
          ref={noticeBottomSheetRef}
          snapPoints={[Platform.OS == 'android' ? '75%' : '73%']}
          backdropComponent={renderBackdrop}>
          <NoticeItem
            noticePopup={noticePopup}
            handleNoticeDayClose={handleNoticeDayClose}
            handleClose={handleNoticeClose}
          />
        </BottomSheetModal>}
      </Container>
    </ImageBackground>
  );
}

export default HomeScreen;