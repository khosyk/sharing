import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components';
import { Theme } from '../../styles/theme';
import { heightPercentage, widthPercentage } from '../../utils/ResponsiveSize';
import SvgIcon from '../SvgIcon';

const SVGWrapper = styled.View`
`;

const TitleWrapper = styled.View`
  justify-content: space-between;
  margin-left: ${widthPercentage(20)}px;
  margin-right: ${widthPercentage(20)}px;
  margin-top: ${heightPercentage(36)}px;
  margin-bottom: ${heightPercentage(30)}px;
`;

const Title = styled.Text`
  font-family: ${Theme.fonts.bold};
  font-size: 30px;
  line-height: ${heightPercentage(42)}px;
  color: ${Theme.colors.gray9};
`;

const SubTitle = styled.Text`
  font-family: ${Theme.fonts.regular};
  font-size: 16px;
  line-height: ${heightPercentage(20)}px;
  color: ${Theme.colors.gray5};
  margin-top: ${heightPercentage(6)}px;
`;

function OnBoardSlideItem({item,width}) {
  return (
    <View
      style={{
        width,
        height:heightPercentage(480),
      }}
    >
      <SVGWrapper>
        <SvgIcon name={item.img} resizeMode='contain' fill={'black'} />
      </SVGWrapper>
      <TitleWrapper>
        <Title>
          {item.title1}
        </Title>
        <Title>
          {item.title2}
        </Title>
        <SubTitle>
          {item.subtitle}
        </SubTitle>
      </TitleWrapper>
    </View>
  );
}

export default React.memo(OnBoardSlideItem);