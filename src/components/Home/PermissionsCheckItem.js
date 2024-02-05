import React from 'react';
import {View, TouchableWithoutFeedback, SafeAreaView, Dimensions} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components/native';
import { checkSe } from '../../services';
import {Theme} from '../../styles/theme';
import {heightPercentage, widthPercentage} from '../../utils/ResponsiveSize';
import { IconWrapper, SearchHeader} from '../SearchLayout';
import {SubmitButton} from '../SubmitButton';
import SvgIcon from '../SvgIcon';

const height = Dimensions.get('window').height;

const HeaderTitle = styled.Text`
  font-family: ${Theme.fonts.semibold};
  font-size: 20px;
  line-height: ${checkSe(height)? heightPercentage(30):heightPercentage(26)}px;
  color: ${Theme.colors.gray9};
`;

const TitleDescription = styled.Text`
  color: ${Theme.colors.gray4};
  font-family: ${Theme.fonts.regular};
  font-size: 16px;
  margin-top: ${heightPercentage(14)}px;
  line-height: ${heightPercentage(22)}px;
  height: ${heightPercentage(42)}px;
`;

const CheckCategoryTitle = styled.Text`
  color: ${Theme.colors.gray6};
  font-family: ${Theme.fonts.semibold};
  font-size: 14px;
  height: ${heightPercentage(28)}px;
`;
const CheckTitle = styled.Text`
  color: ${Theme.colors.gray9};
  font-family: ${Theme.fonts.semibold};
  font-size: 16px;
  height: ${heightPercentage(28)}px;
`;
const CheckDescription = styled.Text`
  color: ${Theme.colors.gray5};
  font-family: ${Theme.fonts.regular};
  font-size: 14px;
  padding-bottom: ${heightPercentage(20)}px;
`;

const CheckWrapper = styled.View`
  border-radius: ${widthPercentage(14)}px;
  background-color: ${Theme.colors.bgGray5};
  padding-left: ${widthPercentage(14)}px;
  padding-top: ${widthPercentage(12)}px;
`;

const Description = styled.Text`
  color: ${Theme.colors.gray4};
  font-family: ${Theme.fonts.regular};
  font-size: 12px;
  text-align: center;
  margin-top: ${heightPercentage(6)}px;
  line-height: ${heightPercentage(20)}px;
`;

const ButtonWrapper = styled.View`
  height: ${heightPercentage(80)}px;
  justify-content: flex-end;
  margin-bottom: ${heightPercentage(45)}px;
  padding-left: ${widthPercentage(20)}px;
  padding-right: ${widthPercentage(20)}px;
`;

const HIT_SLOP = {top: 8, left: 8, right: 8, bottom: 8};
export const PermissionsCheckItem = ({handleClose}) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <SearchHeader
        style={{
          marginTop: heightPercentage(5),
          paddingHorizontal: widthPercentage(20),
        }}>
        <HeaderTitle>페이크앱을 시작합니다🎉</HeaderTitle>
        <IconWrapper>
          <TouchableWithoutFeedback onPress={handleClose} hitSlop={HIT_SLOP}>
            <View>
              <SvgIcon
                name={'Close'}
                width={widthPercentage(14)}
                height={heightPercentage(14)}
              />
            </View>
          </TouchableWithoutFeedback>
        </IconWrapper>
      </SearchHeader>
      <TitleDescription style={{paddingHorizontal: widthPercentage(20)}}>
        앱 시작 전 다음과 같은 접근권한이 필요해요
      </TitleDescription>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: heightPercentage(30),
        }}
        style={{paddingHorizontal: widthPercentage(20), flexGrow: 1}}>
        <CheckCategoryTitle>필수 항목</CheckCategoryTitle>
        <View>
          <CheckWrapper>
            <View>
              <CheckTitle>위치</CheckTitle>
              <CheckDescription>
                IoT 디바이스 등록 시 Wi-fi 연결을 위한 위치 정보 확인
              </CheckDescription>
            </View>
            <View>
              <CheckTitle>블루투스</CheckTitle>
              <CheckDescription>
                Bluetooth를 사용하여 IoT 디바이스 검색 및 연결
              </CheckDescription>
            </View>
            <View>
              <CheckTitle>서비스 정보수신</CheckTitle>
              <CheckDescription>
                디바이스 상황을 확인할 수 있도록 푸시 알림을 허용
              </CheckDescription>
            </View>
            <View>
              <CheckTitle>기기 정보</CheckTitle>
              <CheckDescription>
                앱의 오류를 파악하고 성능을 개선하기 위한 수집
              </CheckDescription>
            </View>
          </CheckWrapper>
        </View>
        <CheckCategoryTitle style={{marginTop: heightPercentage(21)}}>
          선택 항목
        </CheckCategoryTitle>
        <CheckWrapper>
          <View>
            <CheckTitle>저장 공간</CheckTitle>
            <CheckDescription>
              펫 캐릭터를 사진으로 저장하고 공유
            </CheckDescription>
          </View>
          <View>
            <CheckTitle>광고성 정보 수신</CheckTitle>
            <CheckDescription>
              이벤트 및 혜택에 관한 안내를 받기 위해 푸시 알림을 허용
            </CheckDescription>
          </View>
        </CheckWrapper>
        <Description style={{marginTop: heightPercentage(18)}}>
          {
            '접근 권한은 해당 기능을 이용할 때 동의를 받고 있으며,\n동의하지 않아도 해당 기능을 제외한 서비스 이용이 가능해요'
          }
        </Description>
        <Description>
          휴대폰의 설정 앱에서 언제든 항목별 권한 설정을 할 수 있어요
        </Description>
      </ScrollView>
      <LinearGradient colors={['#ffffff00', '#fff', '#fff']}>
        <ButtonWrapper>
          <SubmitButton handleSubmit={handleClose} isRadius={true}>
            확인
          </SubmitButton>
        </ButtonWrapper>
      </LinearGradient>
    </SafeAreaView>
  );
};
