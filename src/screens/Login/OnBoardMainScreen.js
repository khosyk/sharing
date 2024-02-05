import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useWindowDimensions, Animated, FlatList } from 'react-native';
import styled from 'styled-components/native';
import { SubmitButton } from '../../components/SubmitButton';
import { Theme } from '../../styles/theme';
import { heightPercentage, widthPercentage } from '../../utils/ResponsiveSize';
import { useDispatch } from 'react-redux';
import { initializeUserInfo } from '../../slices/RegisterUserSlice';
import { navigationRef, reset_navigate } from '../../RootNavigator';
import { initializeAllFamilyList } from '../../slices/FamilySlice';
import OnBoardSlideItem from '../../components/Login/OnBoardSlideItem';
import Dots from 'react-native-dots-pagination';
import { platform } from '../../App';
import { ModalComponent } from '../../components/ModalComponent';
import { ExpiredModalComponent } from '../../components/ExpiredModalComponent';
import { initTokenPromise } from '../../utils/AsyncService';

const Wrapper = styled.View`
flex:1;
flex-direction: column;
`;

const PageWrapper = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-left: ${widthPercentage(10)}px;
`;

const ButtonWrapper = styled.View`
  margin-top: ${heightPercentage(46)}px;
  margin-bottom: ${heightPercentage(37)}px;
  margin-left: ${widthPercentage(20)}px;
  margin-right: ${widthPercentage(20)}px;
`;

let onBoardList = [
  { title1: "페이크앱과 시작하는", title2: "스마트한 생활", subtitle: "삶을 바꾸는 똑똑한 화장실을 만나보세요", img: 'OnBoarding1p' },
  { title1: "온 가족이 함께하는", title2: "페이크앱", subtitle: "스코어를 쌓으면 혜택이 쏟아져요", img: 'OnBoarding2p' },
  { title1: "라이프 스타일에 따른", title2: "맞춤형", subtitle: "슬립모드와 모래 교체 주기를 설정할 수 있어요", img: 'OnBoarding3p' },
  { title1: "재미있게 확인하는", title2: "데이터", subtitle: "캐릭터로 실시간 정보를 쉽게 파악해요", img: 'OnBoarding4p' }
];

export const OnBoardMainScreen = (params) => {
  const flatListRef = useRef(null);
  const dispatch = useDispatch();
  const { width } = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const [auto, setAuto] = useState(false);
  const [loading,setLoading] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const show = params?.route?.params?.show;

  const length = onBoardList.length;

  useEffect(()=>{
    if(show){
      setModalShow(show);
    }
  },[show]);

  useEffect(() => {
    initTokenPromise();
    dispatch(initializeUserInfo());
    dispatch(initializeAllFamilyList());    
    if(navigationRef.canGoBack()){
      navigationRef.setParams({
        show:false
      });
    }
  }, []);

  // auto slide functions
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

      if (delay !== null) {
        const id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

  const snapToOffsets = useMemo(() => Array.from(Array(onBoardList?.length)).map((_, index) => index * width), [onBoardList],);

  useEffect(() => {
    function scrollToNextSlide() {
      if (index !== snapToOffsets.length && auto) {
        flatListRef.current?.scrollToOffset({
          animated: true,
          offset: snapToOffsets[index],
        });
      }
    }
    scrollToNextSlide();
  }, [index, snapToOffsets]);

  // loading에 따른 로띠 스크린 오토로 변경
  useEffect(() => {
    if(!loading){
      setAuto(true);
    }
  }, [loading]);
  

  useInterval(() => {
    setIndex(prev => {
      setAuto(true);
      return prev === snapToOffsets.length - 1 ? 0 : prev + 1;
    });
  }, 3000);

  const renderItem = useCallback(
    ({ item }) => {
      return (<OnBoardSlideItem item={item} width={width} />);
    },
    [],
  );

  const keyExtractor = useCallback(
    (_, index) => {
      return `onBoard${index}`;
    }, []
  );

  function handleSubmit() {
    reset_navigate('Login');
  }

  const getItemLayout = useCallback((_, index) => {
    return { length: width, offset: width * onBoardList?.length, index };
  }, []);

  function onScrollBegin() {
    setAuto(() => false);
  }

  function onScroll(e) {
    Animated.event(
      [{ nativeEvent: { contentOffset: { x: scrollX } } }],
      {
        useNativeDriver: false,
        listener: () => {
        },
      },
    );
    if (!auto) {
      setIndex(Math.round(e.nativeEvent.contentOffset.x / width));
    }
  }

  function onScrollEnd(e) {
    if (!auto) {
      setIndex(Math.round(e.nativeEvent.contentOffset.x / width));
    }
  }

  const handleModalClose = () => {
    setModalShow(false);
  };

  return (
    <Wrapper>
      <ModalComponent isShow={modalShow} handleClose={handleModalClose}>
        <ExpiredModalComponent
          handleClose={handleModalClose}
        />
      </ModalComponent>
      <FlatList
        style={{marginTop:platform ==='android' ? -8 : 0}}
        ref={flatListRef}
        horizontal={true}
        data={onBoardList}
        snapToOffsets={snapToOffsets}
        initialNumToRender={length}
        maxToRenderPerBatch={length}
        getItemLayout={getItemLayout}
        removeClippedSubviews={true}
        renderItem={renderItem}
        scrollEventThrottle={5}
        showsHorizontalScrollIndicator={false}
        pagingEnabled={true}
        onScrollBeginDrag={onScrollBegin}
        onScroll={onScroll}
        onScrollAnimationEnd={onScrollEnd}
        keyExtractor={keyExtractor}
        snapToInterval={width}
        decelerationRate={'fast'}
        bounces={false}
        contentContainerStyle={{
          paddingTop: heightPercentage(0),
          paddingHorizontal: widthPercentage(0),
        }}
      />
      <PageWrapper>
        <Dots
          style={{ alignItems: 'center', }}
          length={onBoardList?.length}
          width={widthPercentage(100)}
          active={index}
          activeDotWidth={widthPercentage(14)}
          activeDotHeight={heightPercentage(7)}
          passiveDotWidth={widthPercentage(7)}
          passiveDotHeight={heightPercentage(7)}
          passiveColor={Theme.colors.bgGray10}
          activeColor={'#FFC303'}
          marginHorizontal={widthPercentage(5)}
          alignDotsOnXAxis={heightPercentage(7)}
        />
      </PageWrapper>
      <ButtonWrapper>
        <SubmitButton
          disabled={false}
          isRadius={true}
          handleSubmit={handleSubmit}>
          시작하기
        </SubmitButton>
      </ButtonWrapper>
    </Wrapper>
  );
};


