import React from 'react';
import {TouchableWithoutFeedback} from 'react-native';
import {
  ButtonText,
  ButtonWrapper,
  ModalSubTitle,
  ModalTitle,
  ModalWrapper,
} from '../../styles/ModalLayout';

/**
 * @param {funciton} handleContinue 확인 이벤트
 * @returns 모달 안에 들어갈 컴포넌트 반환
 */
export const EmailLoginVerificationModalItem = ({title, subTitle, handleContinue}) => {
  return (
    <ModalWrapper>
      <ModalTitle>{title}</ModalTitle>
      <ModalSubTitle>
        {subTitle}
      </ModalSubTitle>
      <TouchableWithoutFeedback onPress={handleContinue}>
        <ButtonWrapper>
          <ButtonText>확인</ButtonText>
        </ButtonWrapper>
      </TouchableWithoutFeedback>
    </ModalWrapper>
  );
};
