import React from 'react';
import {Modal} from 'react-native';
import styled from 'styled-components/native';
import {widthPercentage} from '../utils/ResponsiveSize';

const Wrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const BackgroundContainer = styled.Pressable`
  background-color: #000;
  flex: 1;
  opacity: 0.5;
  width: 100%;
  height: 100%;
  position: absolute;
`;

const ItemWrapper = styled.View`
  background-color: #fff;
  align-items: center;
  justify-content: center;
  border-radius: ${widthPercentage(18)}px;
`;

/**
 * @param {boolean} isShow 모달 visible 여부
 * @param {function} setShow 모달 visible 여부 설정 함수
 * @param {boolean} alignOfCenter 가운데 정렬 여부
 * @param {*} children 모달 아이템
 * @returns 모달 컴포넌트 반환
 */
export const ModalComponent = ({
  isShow,
  setShow,
  children,
  alignOfCenter = true,
  handleClose = () => setShow(false),
  handleDim = null,
}) => {
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={isShow}
      onRequestClose={handleDim ?handleDim: handleClose}>
      {alignOfCenter ? (
        <Wrapper>
          <BackgroundContainer onPress={handleDim ?handleDim: handleClose} />
          <ItemWrapper>{children}</ItemWrapper>
        </Wrapper>
      ) : (
        <>
          <BackgroundContainer onPress={handleDim ?handleDim: handleClose} />
          <ItemWrapper>{children}</ItemWrapper>
        </>
      )}
    </Modal>
  );
};
