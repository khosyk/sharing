import {configureStore} from '@reduxjs/toolkit';
import registerPetReducer from './slices/RegisterPetSlice';
import registerUserReducer from './slices/RegisterUserSlice';
import familyReducer from './slices/FamilySlice';
import homeReducer from './slices/HomeSlice';
import petDataReducer from './slices/PetDataSlice';
import scoreReducer from './slices/ScoreSlice';
import quizReducer from './slices/QuizSlice';
import deviceReducer from './slices/DeviceSlice';
import noticeReducer from './slices/NoticeSlice';

export default configureStore({
  reducer: {
    registerPet: registerPetReducer,
    registerUser: registerUserReducer,
    family: familyReducer,
    home: homeReducer,
    petData: petDataReducer,
    score: scoreReducer,
    quiz: quizReducer,
    device: deviceReducer,
    notice: noticeReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV !== 'production', //  개발자 도구 on/off
});
