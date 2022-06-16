import { combineReducers, createReducer } from '@reduxjs/toolkit'; // Импорт функции комбайна и создания редюсеров
import initialContacts from '../../base/initialContacts';
import { addContact, deleteContact, filterContact } from './contacts-actions';

const contactsReducer = createReducer(
  JSON.parse(localStorage.getItem('Сontacts')) ?? initialContacts,
  {
    // Создание редюсера для массива items в контактах (добавление контакта и удаление)
    [addContact]: (state, { payload }) => [...state, payload],
    [deleteContact]: (state, { payload }) =>
      state.filter(contact => {
        return contact.id !== payload;
      }),
  }
);

// Создание редюсера для фильтра в контактах
const filterReducer = createReducer('', {
  [filterContact]: (_, { payload }) => payload,
});

// Экспорт всех редюсеров через комбайн
export default combineReducers({
  items: contactsReducer,
  filter: filterReducer,
});
