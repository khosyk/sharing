import {
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';

const FIGMA_WINDOW_WIDTH = 375;
const FIGMA_WINDOW_HEIGHT = 812;

/**
 * @param {number} width 피그마 기준 넓이 값
 * @returns 기종에 따른 넓이 값 반환 (반응형)
 */
export const widthPercentage = width => {
  const percentage = (width / FIGMA_WINDOW_WIDTH) * 100;
  return responsiveScreenWidth(percentage);
};

/**
 * @param {number} height 피그마 기준 높이 값
 * @returns 기종에 따른 높이 값 반환 (반응형)
 */
export const heightPercentage = height => {
  const percentage = (height / FIGMA_WINDOW_HEIGHT) * 100;
  return responsiveScreenHeight(percentage);
};

export const fontPercentage = size => {
  const percentage = size * 0.135;
  return responsiveFontSize(percentage);
};
