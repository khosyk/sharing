import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import axios from 'axios';
import { axiosInstance, BASE_URI } from '../services';
import { getVerifiedToken } from '../utils/AsyncService';

export const homeAdapter = createEntityAdapter();
const initialState = homeAdapter.getInitialState({
  pushHistory: [],
  loadingOfFetchPushHistory: 'idle',
  errorOfFetchPushHistory: null,

  loadingOfFetchEventClickCount: 'idle',
  errorOfFetchEventClickCount: null,

  notificationLink: '',
  pushRead: false,
  devicePush: [],
  noticePush: [],
  warningPush: [],
});

// GET: 받은 푸시 알림 히스토리
export const fetchPushHistoryList = createAsyncThunk(
  'home/fetchPushHistoryList',
  async params => {
    const response = await axiosInstance({
      method: 'get',
      url: `/api/push`,
      headers: { Authorization: `Bearer ${params}` },
    }).then(res => res.data.response
    ).catch(err => {
      console.log('fetchPushHistoryList ERROR : ', err.response.data);
    });
    return response;
  }
);

export const fetchPushRead = createAsyncThunk(
  'home/fetchPushRead',
  async (token) => {
    const response = await axiosInstance({
      method: 'get',
      url: `${BASE_URI}/api/push/unread`,
      headers: { Authorization: `Bearer ${token}` },
    }).then(res => res?.data.response
    ).catch(err => {
      console.log('fetchPushRead ERROR : ', err.response.data, token);
    });
    return response;
  },
);

// PATCH: 특정 영역 카운트
export const fetchEventClickCount = createAsyncThunk(
  'home/fetchEventClickCount',
  async params => {
    const detailPath = params?.detail ? `?detail=${params?.detail}` : '';
    const response = await axiosInstance({
      method: 'patch',
      url: `/api/stats/${params?.event}${params?.detail !== '' && detailPath}`,
      headers: {
        Authorization: `Bearer ${params?.token}`,
      },
    }).then(res => res?.data?.response).catch((e) => {
      console.log('fetchEventClickCount ERROR :',e?.response?.data);
    }
    );
    return response;
  },
);

export const homeSlice = createSlice({
  name: 'home',
  initialState: initialState,
  reducers: {
    setNotificationLink(state, action) {
      state.notificationLink = action.payload;
    },
    setDevicePush(state, action) {
      state.devicePush = action.payload;
    },
    setWarningPush(state, action) {
      state.warningPush = action.payload;
    },
    setNoticePush(state, action) {
      state.noticePush = action.payload;
    },
  },

  extraReducers: {
    [fetchPushHistoryList.pending]: state => {
      if (state.loadingOfFetchPushHistory === 'idle') {
        state.loadingOfFetchPushHistory = 'pending';
        state.errorOfFetchPushHistory = null;
        state.pushHistory = [];
      }
    },
    [fetchPushHistoryList.fulfilled]: (state, action) => {
      state.pushHistory = action.payload;
    },
    [fetchPushHistoryList.rejected]: (state, action) => {
      state.loadingOfFetchPushHistory = 'idle';
      state.errorOfFetchPushHistory = action.error;
    },

    [fetchEventClickCount.pending]: state => {
      if (state.loadingOfFetchEventClickCount === 'idle') {
        state.loadingOfFetchEventClickCount = 'pending';
        state.errorOfFetchEventClickCount = null;
      }
    },
    [fetchEventClickCount.rejected]: (state, action) => {
      state.loadingOfFetchEventClickCount = 'idle';
      state.errorOfFetchEventClickCount = action.error;
    },

    [fetchPushRead.pending]: state => {
      if (state.loadingOfFetchPushRead === 'idle') {
        state.loadingOfFetchPushRead = 'pending';
        state.errorOfFetchPushRead = null;
        state.pushRead = false;
      }
    },
    [fetchPushRead.fulfilled]: (state, action) => {
      state.pushRead = action.payload;
    },
    [fetchPushRead.rejected]: (state, action) => {
      state.loadingOfFetchPushRead = 'idle';
      state.errorOfFetchPushRead = action.error;
    },
  },
});

const { reducer, actions } = homeSlice;
export const { setNotificationLink, setDevicePush, setNoticePush, setWarningPush } = actions;
export default reducer;
