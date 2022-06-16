import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'; //Импорт функции создания хранилища и прослойки
import logger from 'redux-logger'; // Импорт функции логгирования
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'; // Импорт функции персистеров и фикса консоли
import storage from 'redux-persist/lib/storage'; // Импорт локального хранилища из библиотеки персиста
import contactsReducer from './contacts/contacts-reducer'; // Импорт редюсера по контактам

// Создание прослоек + логгер. Важен порядок!
const middleware = [
  ...getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
  logger,
];

// Конфиг персиста для контактов с блеклистом
const contactsPersistConfig = {
  key: 'Contacts',
  storage,
  blacklist: ['filter'],
};

// Создание хранилища (корневой редюсер + прослойки + тулзы только для разработки)
export const store = configureStore({
  reducer: {
    contacts: persistReducer(contactsPersistConfig, contactsReducer),
  },
  middleware,
  devTools: process.env.NODE_ENV === 'development',
});

// Экспорт хранилища и обёртки хранилища в персистор
export const persistor = persistStore(store);
