import React, { useState, useRef } from 'react';
import { Dimensions, Image, Platform, TouchableWithoutFeedback } from 'react-native';
import { Container, Wrapper } from '../../components/MainLayout';
import { Theme } from '../../styles/theme';
import { heightPercentage, widthPercentage } from '../../utils/ResponsiveSize';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components';
import { BottomSheetComponent } from '../../components/BottomSheetComponent';
import { AgreementItem } from '../../components/RegisterUser/AgreementItem';
import { useEffect } from 'react';
import { appleSignIn, getKakaoProfile, googleLogout, googleSignIn, login, signInWithKakao, signOutWithKakao, unlinkKakao, } from '../../services/Login';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAgreement, initializeUserInfo, setIsEmail, setUserInfo, setUserLogin } from '../../slices/RegisterUserSlice';
import jwt_decode from 'jwt-decode';
import { clearAsyncStorageAndKeepDataOnLoad, replace } from '../../RootNavigator';
import { checkSe } from '../../services';
import { setSelectedFamily } from '../../slices/FamilySlice';

const height = Dimensions.get('window').height;

const TopWrapper = styled.View`
  flex-direction: column;
  margin-top: ${heightPercentage(68)}px;
  margin-left: ${widthPercentage(10)}px;
  margin-right: ${widthPercentage(8)}px;
  margin-bottom: ${heightPercentage(48)}px;
  height:${heightPercentage(370)}px;
`;

const LogoImageWrapper = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: flex-start;
  width: ${widthPercentage(248)}px;
  height: ${heightPercentage(83)}px;
  resize: contain;
`;

const CatsImageWrapper = styled.View` 
  width: 100%;
  flex-direction: row;
  justify-content: flex-end;
  margin-top: ${heightPercentage(165)}px;
`;

const BottomWrapper = styled.View`
  flex-direction: column;
  width:100%;
`;

const BottomButtonWrapper = styled.View`
  height:${heightPercentage(188)}px;
  margin-left: ${widthPercentage(20)}px;
  margin-right: ${widthPercentage(20)}px;
  flex-direction:column;
  justify-content: flex-end;
`;

const ButtonWrapper = styled.View`
  width: ${widthPercentage(335)}px;
  height: ${heightPercentage(56)}px;
  background-color: ${props => props.backgroundColor};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: ${widthPercentage(18)}px;
  border:${props => props.border};
`;

const ButtonRowWrapper = styled(ButtonWrapper)`
  flex-direction: row;
  width:100%;
  border:none;
  margin-bottom: 0px;
`;

const ButtonText = styled.Text`
  font-family: ${Theme.fonts.semibold};
  font-size: 17px;
  color: ${props => props.textColor};
  line-height: 19px;
`;

const TextDescription = styled.Text`
  font-family: ${Theme.fonts.semibold};
  font-size: 17px;
  color: ${Theme.colors.gray4};
  line-height: ${checkSe(height) ? heightPercentage(22) : heightPercentage(20)}px;
  margin-top: ${heightPercentage(21)}px;
  text-align: center;
  width: 100%;
  text-decoration-line: underline;
`;

export default function LoginMainScreen() {
  const navigate = useNavigation();
  const bottomRef = useRef(null);
  const [selectedAgreement, setSelectedAgreement] = useState([]);
  const [requirements, setRequirements] = useState(false);
  const dispatch = useDispatch();
  const { userInfo } = useSelector(state => state.registerUser);
  const { agreementList } = useSelector(state => state.registerUser);
  let logoImg = require('../../assets/images/snslogin/logo.png');
  let catsImg = require('../../assets/images/snslogin/cats.png');

  useEffect(() => {
    try {
      clearAsyncStorageAndKeepDataOnLoad();
      dispatch(setUserLogin(false));
      dispatch(setSelectedFamily([]));
      dispatch(initializeUserInfo());
      unlinkKakao();
      dispatch(fetchAgreement());
    } catch (error) {
      console.log(error, 'error on loginMain');
    }
  }, []);

  const snsLoginSuccessCallback = async (responseUserInfo,accessToken) => {
    if (responseUserInfo.profileImage == 'undefined') {
      bottomRef.current.present();
    } else {
      dispatch(setUserLogin(true));
      replace('Home');
    }
  };

  const snsLoginErrorCallback = (error, loginInfo) => {
    if (error.response.status == 401) {
      dispatch(setUserInfo(loginInfo));
      bottomRef.current.present();
    }

    if (loginInfo.loginType === "KAKAO") {
      unlinkKakao();
      signOutWithKakao();
    }

    if(loginInfo.loginType === "GOOGLE"){
      googleLogout();
    }
  };

  const handleKakao = async () => {
    signInWithKakao().then(async (res) => {
      if (res !== undefined) {
        const { email, id } = await getKakaoProfile();
        const userInfo = { email, credentials: id, loginType: "KAKAO" };
        login(userInfo, snsLoginSuccessCallback, snsLoginErrorCallback);
      }
    });
  };


  const handleApple = async () => {
    await appleSignIn()
      .then(
        res => {
          const decoded = jwt_decode(res?.identityToken);
          const { email } = decoded;
          const userInfo = { email, credentials: res?.user, loginType: "APPLE" };
          login(userInfo, snsLoginSuccessCallback, snsLoginErrorCallback);
        })
      .catch(
        error => console.log("appleLogin error", error)
      );
    return;
  };

  const handleGoogle = () => {
    googleSignIn().then(res => {
      const { user: { email, id } } = res;
      const userInfo = { email, credentials: id, loginType: 'GOOGLE' };
      login(userInfo, snsLoginSuccessCallback, snsLoginErrorCallback);
    }).catch(error => console.log("googleLogin error", error));
  };

  // 동의사항 
  const handleSelectAll = () => {
    selectedAgreement.length > 2 ? setSelectedAgreement([]) : setSelectedAgreement(["ACCOUNT_TERMS", "USE_OF_PERSONAL_INFO", "MARKETING"]);
  };

  const handleSelect = (name) => {
    selectedAgreement.includes(name) ? setSelectedAgreement(selectedAgreement.filter((select) => select != name)) : setSelectedAgreement([...selectedAgreement, name]);
  };

  const handleSelectAgreement = (name) => {
    navigate.navigate('RegisterUserAgreement', { agreementList, name });
  };

  const checkRequirements = () => {
    if (selectedAgreement.includes("ACCOUNT_TERMS") && selectedAgreement.includes("USE_OF_PERSONAL_INFO")) {
      setRequirements(true);
      return;
    }
    setRequirements(false);
    return;
  };

  useEffect(() => {
    checkRequirements();
  }, [selectedAgreement]);


  const handleSelectSubmit = () => {
    dispatch(setUserInfo({
      ...userInfo, agreedTerms: {
        accountTermsAgreed: selectedAgreement.includes("ACCOUNT_TERMS"),
        usePersonalInfoAgreed: selectedAgreement.includes("USE_OF_PERSONAL_INFO"),
        useLocationInfoAgreed: false,
        marketingAgreed: selectedAgreement.includes("MARKETING"),
        // accountActivationAgreed: selectedAgreement.includes("ACTIVATION")
      },
    }));
    dispatch(setIsEmail(false));
    replace('RegisterUser', {
      screen: 'RegisterUserNickname'
    });
  };

  return (
    <Container>
      <Wrapper >
        <TopWrapper>
          <LogoImageWrapper>
            <Image
              style={{ width: '100%', height: heightPercentage(83), resizeMode: 'contain' }}
              source={logoImg}
            />
          </LogoImageWrapper>
          <CatsImageWrapper>
            <Image
              style={{ height: heightPercentage(119), resizeMode: 'contain' }}
              source={catsImg}
            />
          </CatsImageWrapper>
        </TopWrapper>
        <BottomWrapper>
          <BottomButtonWrapper>
            <LoginButton props={{
              title: '카카오로 계속하기',
              img: require('../../assets/images/snslogin/sns_Icon_kakao.png'), backgroundColor: "#FEE500",
              color: "#191919",
              onPress: handleKakao,
              iconWidth: widthPercentage(23),
              iconHeight: heightPercentage(21),
              marginRight: widthPercentage(10),
              border: 'none'
            }} />
            {Platform.OS === 'ios' && <LoginButton props={{
              title: 'Apple로 계속하기',
              img: require('../../assets/images/snslogin/sns_Icon_apple.png'), backgroundColor: "#000000",
              color: "#ffffff",
              onPress: handleApple,
              iconWidth: widthPercentage(18),
              iconHeight: heightPercentage(21),
              marginRight: widthPercentage(12),
              border: 'none'
            }} />}
            {Platform.OS === 'android' && <LoginButton props={{
              title: 'Google로 계속하기',
              img: require('../../assets/images/snslogin/sns_Icon_google.png'), backgroundColor: "#ffffff",
              color: "#191919",
              onPress: handleGoogle,
              iconWidth: widthPercentage(20.5),
              iconHeight: heightPercentage(21),
              marginRight: widthPercentage(8),
              border: '1px solid black'
            }} />}
          </BottomButtonWrapper>
          <TouchableWithoutFeedback onPress={() => navigate.push('LoginEmailMain')} hitSlop={{top:15,bottom:15,right:10,left:10}} > 
            <TextDescription>
              이메일로 계속하기
            </TextDescription>
          </TouchableWithoutFeedback>
        </BottomWrapper>
      </Wrapper>

      <BottomSheetComponent isLogin={true} snapPoints={['49%']} bottomSheetRef={bottomRef}>
        <AgreementItem
          handleClose={() => {
            setSelectedAgreement([]);
            bottomRef.current.dismiss();
          }}
          selectedAgreement={selectedAgreement}
          handleSelect={handleSelect}
          handleSelectAll={handleSelectAll}
          handleSubmit={handleSelectSubmit}
          handleSelectAgreement={handleSelectAgreement}
          requirements={requirements}
        />
      </BottomSheetComponent>

    </Container>
  );
}

const LoginButton = ({ props }) => {
  const { title, backgroundColor, color, onPress, img, border, iconWidth, iconHeight, marginRight } = props;

  const marginBottom = title === "Google로 계속하기" ? 0 : heightPercentage(10);

  return (
    <ButtonRowWrapper style={{ marginBottom }}>
      <TouchableWithoutFeedback onPress={() => onPress()}>
        <ButtonWrapper backgroundColor={backgroundColor} border={border}>
          <Image style={{ width: iconWidth, height: iconHeight, resizeMode: 'contain', marginRight: marginRight, }} source={img} />
          <ButtonText textColor={color}>
            {title}
          </ButtonText>
        </ButtonWrapper>
      </TouchableWithoutFeedback>
    </ButtonRowWrapper>
  );
};