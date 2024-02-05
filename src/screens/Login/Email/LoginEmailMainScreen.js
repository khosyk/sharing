import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import { ScrollView, View, TouchableWithoutFeedback, } from 'react-native';
import styled from 'styled-components/native';
import { heightPercentage, widthPercentage } from '../../../utils/ResponsiveSize';
import { HighLightText } from '../../../components/HighLightText';
import { Container, Title, Wrapper } from '../../../components/MainLayout';
import { SubmitButton } from '../../../components/SubmitButton';
import { Theme } from '../../../styles/theme';
import { Header } from '../../../components/Header';
import { EmailLoginSubmitTextInput } from '../../../components/Login/EmailLoginTextInput';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAgreement, initializeUserInfo, setIsEmail, setUserInfo, setUserLogin } from '../../../slices/RegisterUserSlice';
import { BottomSheetComponent } from '../../../components/BottomSheetComponent';
import { AgreementItem } from '../../../components/RegisterUser/AgreementItem';
import { login } from '../../../services/Login';
import { replace } from '../../../RootNavigator';
import { ModalComponent } from '../../../components/ModalComponent';
import { EmailLoginVerificationModalItem } from '../../../components/Login/EmailLoginVerificationModalItem';
import { checkSe } from '../../../services';
import { platform } from '../../../App';

const se = checkSe();

const TextWrapper = styled.View`
  display: flex;
  flex-direction: row;
  margin-top: ${se?heightPercentage(20):heightPercentage(12)}px;
`;

const TextDescription = styled.Text`
  font-family: ${Theme.fonts.medium};
  font-size: 14px;
  color: ${Theme.colors.gray5};
  line-height: ${heightPercentage(20)}px;
  text-align: center;
`;

export const LoginEmailMainScreen = () => {
  const { fonts } = Theme;
  const navigate = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const bottomRef = useRef(null);
  const [warningEmail, setWarningEmail] = useState(false);
  // const [warningPassword, setWarningPassword] = useState(false);
  const [enabled, setEnabled] = useState(0);
  const dispatch = useDispatch();
  const [selectedAgreement, setSelectedAgreement] = useState([]);
  const [requirements, setRequirements] = useState(false);
  const { agreementList } = useSelector(state => state.registerUser);
  const { userInfo } = useSelector(state => state.registerUser);

  //계정 정보 모달
  const [isShow, setShow] = useState(false);

  useEffect(() => {
    try {
      dispatch(initializeUserInfo());
      dispatch(fetchAgreement());
    } catch (error) {
      console.log(error);
    }
  }, []);

  const validateEmail = (email) => {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
  };

  const loginSuccessCallBack = async (responseUserInfo,accessToken) => {
    setEnabled(0);
    if (responseUserInfo.profileImage == "undefined") {
      dispatch(setUserLogin(false));
      bottomRef.current.present();
      return;
    }
    dispatch(setUserLogin(true));
    replace('Home');
  };

  const loginFailCallBack = (error,) => {
    setEnabled(0);
    console.log('email login error', error?.response.data.error.message);
    setShow(true);
    // error.response.data.error.message.includes('Bad credential') && setWarningPassword(true);
  };

  const handleSubmit = async () => {
    const userInfo = {
      email,
      loginType: "EMAIL",
      credentials: password
    };
    if (enabled < 1) {
      setEnabled(1);
      await login(userInfo, loginSuccessCallBack, loginFailCallBack);
    }
  };

  useEffect(() => {
    validateEmail(email) || email === '' ? setWarningEmail(false) : setWarningEmail(true);

    return (() => {
      validateEmail;
    });
  }, [email]);

  // textInput functions
  const handleEmail = text => {
    setEmail(text);
    validateEmail(email) || email === '' ? setWarningEmail(false) : setWarningEmail(true);
  };

  const handlePassword = text => {
    setPassword(text);
    // password === '' ? setWarningPassword(true):setWarningPassword(false) ;
  };

  // bottomSheet functions
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
    const agreedTerms = {
      accountTermsAgreed: selectedAgreement.includes("ACCOUNT_TERMS"),
      usePersonalInfoAgreed: selectedAgreement.includes("USE_OF_PERSONAL_INFO"),
      useLocationInfoAgreed: false,
      marketingAgreed: selectedAgreement.includes("MARKETING"),
      // accountActivationAgreed: selectedAgreement.includes("ACTIVATION")
    };
    dispatch(setUserInfo({ ...userInfo, agreedTerms }));
    dispatch(setIsEmail(true));
    replace('RegisterUser');
  };

  const handleContinue = () => {
    setShow(false);
    setEmail('');
    setPassword('');
  };

  return (
    <Container>
      <ModalComponent isShow={isShow} setShow={setShow}>
        <EmailLoginVerificationModalItem
          title={'계정 정보가 일치하지 않아요'}
          subTitle={'계정 정보를 확인해주세요'}
          handleContinue={handleContinue}
        />
      </ModalComponent>
      <Header title={''} handleEvent={() => navigate.navigate('Login', { screen: 'LoginMain' })} />
      <ScrollView showsHorizontalScrollIndicator={false} bounces={false}>
        <Wrapper>
          <TextWrapper>
            <HighLightText
              fontFamily={fonts.semibold}
              fontSize={23}
              message={'이메일 로그인'}
            />
            <Title>을 해주세요</Title>
          </TextWrapper>
          <View style={{ height: se? heightPercentage(284):heightPercentage(234), flexDirection: 'column',  }}>
            <View style={{ height: se? heightPercentage(132): heightPercentage(117), marginTop:se ? 12 : 0 }}>
              <EmailLoginSubmitTextInput
                title={'이메일 주소'}
                value={email}
                handleText={handleEmail}
                placeholder={'이메일 주소 입력'}
                autoFocus={false}
                keyboardType={platform === 'android' ? 'email-address': 'ascii-capable'}
                messages={[
                  warningEmail ? '이메일 형식이 맞지 않아요' : ''
                ]}
                warning={warningEmail}>
              </EmailLoginSubmitTextInput>
            </View>
            <View style={{ height: se? heightPercentage(132): heightPercentage(117) }}>
              <EmailLoginSubmitTextInput
                title={'비밀번호'}
                value={password}
                handleText={handlePassword}
                placeholder={'영문·숫자·특수문자를 포함한 8-20자'}
                // messages={[
                //   warningPassword ? '비밀번호가 일치하지 않아요' : ''
                // ]}
                secure={true}
                maxLength={20}
              // warning={warningPassword}
              >
                {/* <Text>{password}</Text> */}
              </EmailLoginSubmitTextInput>
            </View>
          </View>
          <View style={{ marginTop: se ? heightPercentage(273):heightPercentage(303), marginBottom: heightPercentage(52) }}>
            <SubmitButton
              disabled={email === '' || password === ''}
              isRadius={true}
              handleSubmit={() => handleSubmit()}>
              로그인
            </SubmitButton>
            <View style={{ flexDirection: 'row', marginTop: heightPercentage(20), width: '100%', justifyContent: 'center' }}>
              <TouchableWithoutFeedback onPress={() => {
                bottomRef.current.present();
              }}>
                <TextDescription>회원가입</TextDescription>
              </TouchableWithoutFeedback>
              <View style={{ backgroundColor: 'black', width: widthPercentage(0.5), height: heightPercentage(15), marginVertical: heightPercentage(2.5), marginHorizontal: widthPercentage(10) }} />
              <TouchableWithoutFeedback onPress={() => navigate.push('FindPassword')}>
                <TextDescription>비밀번호 찾기</TextDescription>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </Wrapper>
      </ScrollView>
      <BottomSheetComponent isLogin={true} snapPoints={['54%']} bottomSheetRef={bottomRef}>
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
};
