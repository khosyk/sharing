import React from 'react';
import { Text, View } from 'react-native';
import styled from 'styled-components/native';
import { checkSe } from '../../services';
import { Theme } from '../../styles/theme';
import { heightPercentage, widthPercentage } from '../../utils/ResponsiveSize';

const se = checkSe();

const SubmitMainTextInput = styled.TextInput`
  border-bottom-color: ${props => props.color};
  border-bottom-width: 1px;
  color: ${Theme.colors.gray6};
  font-family: ${props => props.isPlaceholder ? Theme.fonts.medium : Theme.fonts.semibold};
  font-size: ${se? 16: 17}px;
  padding-left: 0;
  padding-right: ${props => (props.unit !== '' ? widthPercentage(90) : 0)}px;
  padding-top: ${se? heightPercentage(12): heightPercentage(5)}px;
  padding-bottom: ${se? heightPercentage(12): heightPercentage(5)}px;
`;

const SubmitTextInputTitle = styled.Text`
  color: ${props => props.color};
  font-family: ${Theme.fonts.regular};
  font-size: 17px;
  margin-top: ${heightPercentage(20)}px;
  margin-bottom: ${heightPercentage(2)}px;
`;

const SubmitTextInputWarningText = styled.Text`
  color: ${props => props.color};
  font-family: ${Theme.fonts.regular};
  font-size: 14px;
  margin-top: ${heightPercentage(14)}px;
  width: 100%;
`;

/**
 * @param {string} title 제목
 * @param {string} value 입력값
 * @param {boolean} warning 유효성 검사 success or error?
 * @param {array} messages 메시지
 * @param {function} handleText onChangeText 이벤트
 * @param {string} unit 단위
 * @param {string} keyboardType 키보드 타입
 * @returns 입력창 반환
 */
export const EmailLoginSubmitTextInput = ({
  title,
  value,
  warning,
  messages,
  handleText,
  unit = '',
  keyboardType,
  placeholder = '',
  children,
  autoFocus = false,
  secure = false,
  maxLength,
  secureColor = '#26282B'
}) => {
  const { colors, fonts } = Theme;
  return (
    <>
      {title && (
        <SubmitTextInputTitle
          color={
            value !== ''
              ? warning
                ? colors.error
                : secureColor
              : '#26282B'
          }>
          {title}
        </SubmitTextInputTitle>
      )}
      <View style={{ justifyContent: 'center',height: se? heightPercentage(60): heightPercentage(38) }}>
        <SubmitMainTextInput
          value={value}
          placeholder={placeholder}
          placeholderTextColor={Theme.colors.gray4}
          autoFocus={autoFocus}
          keyboardType={keyboardType}
          unit={unit}
          isPlaceholder={value === ''}
          maxLength={maxLength}
          autoCapitalize={'none'}
          color={
            value !== ''
              ? warning
                ? colors.error
                : secureColor
              : colors.gray5
          }
          secureTextEntry = {secure}
          onChangeText={text => handleText(text)}>
          {children}
        </SubmitMainTextInput>
        {unit !== '' && (
          <Text
            style={{
              position: 'absolute',
              right: 0,
              fontSize: se? '16px': '17px',
              fontFamily: fonts.medium,
            }}>
            {unit}
          </Text>
        )}
      </View>
      {messages?.map(message => {
        if (message !== '' && value !== '') {
          return (
            <SubmitTextInputWarningText
              key={message}
              color={
                value !== ''
                  ? warning
                    ? colors.error
                    : secureColor
                  : colors.gray5
              }>
              {message}
            </SubmitTextInputWarningText>
          );
        }
      })}
    </>
  );
};
