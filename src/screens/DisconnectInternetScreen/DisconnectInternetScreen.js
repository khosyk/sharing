import React from 'react';
import { TouchableWithoutFeedback, View, Text, } from 'react-native';
import { useNetInfo } from '@react-native-community/netinfo';
import { Container } from '../../components/MainLayout';
import styled from 'styled-components/native';
import WiFiSvg from '../../assets/images/characters/pet_wifi.svg';
import { Theme } from '../../styles/theme';
import { heightPercentage } from '../../utils/ResponsiveSize';
import { replace } from '../../RootNavigator';
import { getVerifiedToken } from '../../utils/AsyncService';
import { useState } from 'react';
import { useCallback } from 'react';
import NetInfo from '@react-native-community/netinfo';

const Wrapper = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const NetworkTitle = styled.Text`
  font-size: 22px;
  font-family: ${Theme.fonts.semibold};
  color: ${Theme.colors.gray9};
`;

const NetworkInfo = styled.Text`
  font-size: 15px;
  font-family: ${Theme.fonts.regular};
  color: ${Theme.colors.gray5};
  margin-top: ${heightPercentage(12)}px;
  margin-bottom: ${heightPercentage(52)}px;
`;

const RetryFetchButton = styled.Text`
  font-family: ${Theme.fonts.semibold};
  font-size: 17px;
  color: ${Theme.colors.gray4};
  text-align: center;
  margin-bottom: ${heightPercentage(30)}px;
  text-decoration: underline;
  text-decoration-color: ${Theme.colors.gray4};
  text-underline-position: under;
  line-height: 50px;
  height:50px;
`;

const ConnectCheckView = styled.View`
  position: absolute;
  width: '100%';
  height: '100%';
  background-color: transparent;
  justify-content: center;
  align-items: center;
`;

const ConnectCheckViewInner = styled.View`
  width: '100%';
  height: ${heightPercentage(50)}px;
  justify-content:center;
  align-items:center;
`;

export const DisconnectInternetScreen = () => {
  const [show, setShow] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const handleRetry = useCallback(async () => {
    setDisabled(true);
    NetInfo?.refresh().then(async (state) => {
      if (state?.isConnected) {
        const token = await getVerifiedToken();
        if (token !== null && token !== undefined) {
          replace('Home');
        } else {
          replace('OnBoard');
        }
        setDisabled(false);
      } else {
        setShow(() => true);
        const timer = setTimeout(() => {
          setShow(() => false);
          clearTimeout(timer);
          setDisabled(false);
        }, 1000);
      }
    })
  }, [show]);

  return (
    <Container>
      <Wrapper>
        <WiFiSvg />
        <NetworkTitle>네트워크가 원활하지 않아요</NetworkTitle>
        <NetworkInfo>네트워크 연결 상태를 확인해주세요</NetworkInfo>
        <TouchableWithoutFeedback disabled={disabled} onPress={handleRetry}>
          <RetryFetchButton>다시 불러오기</RetryFetchButton>
        </TouchableWithoutFeedback>
        {show && <ConnectCheckView>
          <ConnectCheckViewInner>
            <View style={{
              width: '100%',
              backgroundColor: '#fff',
              opacity: 0.8
            }} />
            <Text style={{
              position: 'absolute',
              top: 15,
            }}>
              인터넷 연결을 확인해주세요.
            </Text>
          </ConnectCheckViewInner>
        </ConnectCheckView>}
      </Wrapper>
    </Container>
  );
};
