import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import { Platform } from "react-native";
import { axiosInstance } from "../services";
import { logout } from "../services/Login";

let getAccessPromise = null;
let refreshPromise = null;
let refreshedToken = null; // refreshedToken을 함수 범위에서 선언

// isTokenExpired 함수
async function isTokenExpired(token) {
  try {
    var { exp } = await jwt_decode(token);
    const tokenDate = new Date(exp * 1000);
    const currentDate = new Date();
    return currentDate >= tokenDate;
  } catch (err) {
    console.log("TOKEN DECODING ERROR::", err);
    return true;
  }
}

// getAccessUsingRefresh 함수

export async function getAccessUsingRefresh(refreshToken, accessToken) {
  if (getAccessPromise === null) {
    getAccessPromise = (async () => {
      try {
        const { data } = await axiosInstance({
          url: '/api/auth/refresh',
          headers: {
            "Refresh-Token": `${refreshToken}`,
            "Authorization": `Bearer ${accessToken}`
          },
        });
        
        const refreshedAccessToken = data?.response?.accessToken;
        if (refreshedAccessToken) {
          await storeData('@accessToken', refreshedAccessToken);
          return refreshedAccessToken;
        } else {
          console.error("Token refreshing failed");
          return accessToken;
        }
      } catch (error) {
        console.error("token refreshing error::@@", error);
        return accessToken;
      } finally {
        getAccessPromise = null;
      }
    })();
  }

  return getAccessPromise;
}

// getRefreshToken 함수
async function getRefreshToken(currentToken,refreshToken) {
  try {
    const refreshTokenExpired = await isTokenExpired(refreshToken);
    // 리프레시 토큰이 만료되지 않았을 경우
    if (!refreshTokenExpired) {
      const response = await getAccessUsingRefresh(refreshToken, currentToken);
      return response;
    }
    // 리프레시 토큰 만료시 로그아웃
    logout(() =>{
    }, 'OnBoard');
    return currentToken;
  } catch (err) {
    console.error("getRefreshToken error:", err);
    return currentToken;
  }
}

// getVerifiedToken 함수

export async function getVerifiedToken() {
  try {
    if (refreshPromise === null) {
      // 리프레시 프로미스가 없는 경우에만 요청을 보냄
      const contain = await containData("@accessToken");
      if (contain) {
        const currentToken = await getData("@accessToken");
        const refreshToken = await getData("@refreshToken");
        const checkExpired = await isTokenExpired(currentToken);
        if (checkExpired) {
          // 리프레시 토큰을 가져오는 비동기 함수
          refreshPromise = getRefreshToken(currentToken,refreshToken);
          refreshedToken = await refreshPromise;
          refreshPromise = null; // 리프레시 프로미스를 초기화
        }

        // 리프레시 프로미스가 null이 아닌 경우 완료될 때까지 대기
        refreshPromise !== null && await refreshPromise;

        if (refreshedToken !== null) {
          return refreshedToken;
        } else {
          return currentToken;
        }
      }
      //토큰이 없는 경우
      return null;
    } else {
      // 리프레시 프로미스가 이미 존재할 경우 대기
      await refreshPromise;
      return refreshedToken;
    }
  } catch (err) {
    console.error("getVerifiedToken error:", err);
    const contain = await containData("@accessToken");

    if (contain) {
      const currentToken = await getData("@accessToken");
      return currentToken; // 또는 다른 오류 처리 방식을 사용
    }
    // 토큰이 없는 경우
    return null;
    // 여기에서 예외를 처리하고 오류를 반환할 수 있음
  }
}


//다른 데이터 기록
export const storeData = async (key, value) => {
  try {
    const stringValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, stringValue);
  } catch (e) {
    console.error(e.message);
  }
};

export const initTokenPromise = () => {
  refreshPromise = null;
  refreshedToken = null;
  getAccessPromise = null;
};

//데이터 초기화 *삭제*
export const clearData = async () => {
  const asyncStorageKeys = await AsyncStorage.getAllKeys();
  if (asyncStorageKeys.length > 0) {
    initTokenPromise();
    if (Platform.OS === 'android') {
      await AsyncStorage.clear();
    }
    if (Platform.OS === 'ios') {
      await AsyncStorage.multiRemove(asyncStorageKeys);
    }
  }

  return true;
  // try {
  //   await AsyncStorage.clear();
  // } catch (e) {
  //   console.error('CLEAR DATA ERROR:::', e.message);
  // }
};

//기록된 데이터 획득
export const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      const data = JSON.parse(value);
      return data;
    }
  } catch (e) {
    console.log(e.message);
  }
};

//기록된 토큰 제거
export const removeData = async (data) => {
  try {
    await AsyncStorage.removeItem(data, (err) => {
      console.log(err, 'removeITEM');
    });
  } catch (e) {
    console.error(e, 'remove data error');
  }
};

//기록된 코튼 확인
export const containData = async (token) => {
  try {
    const tokens = await AsyncStorage.getAllKeys();
    return tokens.includes(token);
  } catch (e) {
    console.error(e.message);
  }
};