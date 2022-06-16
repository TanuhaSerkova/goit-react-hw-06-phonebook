import { nanoid } from 'nanoid';
import { createAction } from '@reduxjs/toolkit';
import { ADD_CONTACT, DELETE_CONTACT, FILTER_CONTACT } from './contacts-types';

// Создание экшена для добавления контакта: type + payload + Prepare Callback
export const addContact = createAction(ADD_CONTACT, (name, number) => ({
  payload: {
    id: nanoid(),
    name,
    number,
  },
}));

// Создание экшена для удаления контакта
export const deleteContact = createAction(DELETE_CONTACT);
// Создание экшена для фильтра
export const filterContact = createAction(FILTER_CONTACT);
