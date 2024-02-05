import React from 'react';
import {TouchableWithoutFeedback} from 'react-native';
import {
  ButtonText,
  ButtonWrapper,
  ModalSubTitle,
  ModalTitle,
  ModalWrapper,
  SkipButtonText,
  SkipButtonWrapper,
} from '../../styles/ModalLayout';

/**
 * @param {funciton} handleConfirm 이동 확인 버튼
 * @param {funciton} handleCancel 아니요 버튼 이벤트
 * @returns 모달 안에 들어갈 컴포넌트 반환
 */
function PermissionAlertModalItem ({handleConfirm, handleCancel}) {
  return (
    <ModalWrapper>
      <ModalTitle>푸쉬 알림 권한 없음</ModalTitle>
      <ModalSubTitle>
        {'푸쉬 알람을 받으시려면\n설정을 눌러 알림을 허용해주세요'}
      </ModalSubTitle>
      <TouchableWithoutFeedback onPress={handleConfirm}>
        <ButtonWrapper>
          <ButtonText>설정하기</ButtonText>
        </ButtonWrapper>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={handleCancel}>
        <SkipButtonWrapper>
          <SkipButtonText>취소</SkipButtonText>
        </SkipButtonWrapper>
      </TouchableWithoutFeedback>
    </ModalWrapper>
  );
}

export default React.memo(PermissionAlertModalItem);