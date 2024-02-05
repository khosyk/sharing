import {useIsFocused, useNavigation} from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {TouchableWithoutFeedback, View} from 'react-native';
import styled from 'styled-components/native';
import {Theme} from '../../styles/theme';
import {heightPercentage, widthPercentage} from '../../utils/ResponsiveSize';
import {Wrapper} from '../MainLayout';
import SvgIcon from '../SvgIcon';
import {useDispatch, useSelector} from 'react-redux';
import {FlatList} from 'react-native-gesture-handler';
import {setSelectedDevice, setSelectedDeviceId} from '../../slices/DeviceSlice';
import { getVerifiedToken } from '../../utils/AsyncService';
import { fetchDeviceStatus } from '../../services/Device';

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: ${heightPercentage(18)}px;
  width: 100%;
`;
const HeaderTitle = styled.Text`
  font-family: ${Theme.fonts.bold};
  font-size: 18px;
  line-height: ${heightPercentage(21)}px;
  color: ${Theme.colors.gray9};
`;

const ItemWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: ${heightPercentage(16)}px;
  margin-bottom: ${heightPercentage(16)}px;
  justify-content: space-between;
`;
const DeviceIconView = styled.View`
  width: ${widthPercentage(58)}px;
  height: ${heightPercentage(58)}px;
  margin-right: ${widthPercentage(14)}px;
  justify-content: center;
  align-items: center;
  border-radius: ${widthPercentage(35)}px;
`;

const DeviceWrapper = styled.View``;
const DeviceName = styled.Text`
  font-family: ${Theme.fonts.regular};
  font-size: 14px;
  color: ${Theme.colors.gray4};
`;
const DeviceStatus = styled.Text`
  font-family: ${Theme.fonts.semibold};
  font-size: 18px;
  color: ${Theme.colors.gray9};
  margin-top: ${heightPercentage(5)}px;
`;

const NoDeviceView = styled.View`
  width: ${widthPercentage(17)}px;
  height: ${heightPercentage(5)}px;
  background-color: #fff;
  border-radius: ${widthPercentage(10)}px;
`;

const DeviceText = styled.Text`
  font-family: ${Theme.fonts.bold};
  font-size: 18px;
  line-height: ${heightPercentage(23)}px;
  color: ${Theme.colors.gray9};
`;

const ItemComponent = item => {
  const navigate = useNavigation();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const {selectedFamily} = useSelector((state) => state.family);
  const {name, id} = item.item.item;
  const [deviceStatus, setDeviceStatus] = useState('');
  
  const handleNavigate = () => {
    dispatch(setSelectedDeviceId(item.item.item.id));
    navigate.navigate('DeviceContents', {
      screen: 'DeviceMain',
      params: {id: id},
    });
  };

  // GET: 디바이스 상태 조회
  const getDeviceStatus = async () => {
    try {
      const response = await fetchDeviceStatus({
        deviceId: id,
        token: await getVerifiedToken()
      });
      setDeviceStatus(response.response);
    } catch (error) {
      console.log('getDeviceStatus error', error);
    }
  };
  
  useEffect(() => {
    isFocused && getDeviceStatus();
  },[isFocused, selectedFamily]);

  return (
    <TouchableWithoutFeedback onPress={handleNavigate}>
      <ItemWrapper>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View>
            <DeviceIconView>
              <SvgIcon name={'Device'} />
            </DeviceIconView>
            {(deviceStatus === 'error' || deviceStatus === 'offline') && <View style={{position: 'absolute'}}>
              <SvgIcon name={'AlertCircle'} width={widthPercentage(18)} />
            </View>}
          </View>
          <DeviceWrapper>
            <DeviceName>IoT화장실</DeviceName>
            <DeviceStatus>{name}</DeviceStatus>
          </DeviceWrapper>
        </View>
        <View style={{marginRight: widthPercentage(2)}}>
          <View
            style={{
              transform: [{rotate: '-90deg'}],
            }}>
            <SvgIcon
              name={'Up'}
              fill={'transparent'}
              width={widthPercentage(14)}
              height={heightPercentage(14)}
            />
          </View>
        </View>
      </ItemWrapper>
    </TouchableWithoutFeedback>
  );
};
const HIT_SLOP = {top: 8, left: 8, right: 8, bottom: 8};
function HomeBottomSheetComponent({selectedFamilyDeviceList}){
  const navigate = useNavigation();
    
  return (
    <Wrapper>
      <Header>
        <DeviceText>디바이스</DeviceText>
        <TouchableWithoutFeedback hitSlop={HIT_SLOP} onPress={() => navigate.push('DeviceInfo')}>
          <View>
            <SvgIcon name={'Add'} />
          </View>
        </TouchableWithoutFeedback>
      </Header>
      {selectedFamilyDeviceList?.length > 0 ? (
        <FlatList
          data={selectedFamilyDeviceList}
          renderItem={object => <ItemComponent item={object} />}
          keyExtractor={item => String(item.id)}
          scrollEnabled={false}
        />
      ) : ( 
        <TouchableWithoutFeedback onPress={() => navigate.push('DeviceInfo')}>
          <ItemWrapper>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <DeviceIconView style={{backgroundColor: Theme.colors.bgGray10}}>
                <NoDeviceView />
              </DeviceIconView>
              <DeviceWrapper>
                <DeviceName>IoT화장실</DeviceName>
                <DeviceStatus>미등록</DeviceStatus>
              </DeviceWrapper>
            </View>
            <View style={{marginRight: widthPercentage(2)}}>
              <View
                style={{
                  transform: [{rotate: '-90deg'}],
                }}>
                <SvgIcon
                  name={'Up'}
                  fill={'transparent'}
                  width={widthPercentage(14)}
                  height={heightPercentage(14)}
                />
              </View>
            </View>
          </ItemWrapper>
        </TouchableWithoutFeedback>
      )}
    </Wrapper>
  );
}

export default React.memo(HomeBottomSheetComponent);
