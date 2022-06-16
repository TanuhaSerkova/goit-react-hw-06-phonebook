import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addContact } from '../../redux/contacts/contacts-actions';
import { getContacts } from '../../redux/contacts/contacts-selectors';
import { toast } from 'react-toastify';
import { Form, Label, Input, Button } from './ContactForm.styled';

export function ContactForm() {
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const dispatch = useDispatch();
    const contacts = useSelector(getContacts);

    // Следит за инпутом и пишет в локальный стейт его значение
    const handleChange = e => {
        const { name, value } = e.currentTarget;

        switch (name) {
            case 'name':
                setName(value);
                break;
            
            case 'number':
                setNumber(value);
                break;
            
            default:
                break;
        }
    };

     // Проверка на дубликат по имени
    const checkRepeatName = name => {
        return contacts.find(
        contact => contact.name.toLowerCase() === name.toLowerCase(),
        );
    };

    // Проверка на дубликат по номеру
    const checkRepeatNumber = number => {
        return contacts.find(contact => contact.number === number);
    };

    // Отправка данных после проверки в экшн
    const checkEmptyQuery = (name, number) => {
        return name.trim() === '' || number.trim() === '';
    };

    const checkValidNumber = number => {
        return !/\d{3}[-]\d{2}[-]\d{2}/g.test(number);
    };

    const handleSubmit = e => {
        e.preventDefault();
        if (checkRepeatName(name)) {
        toast(`🤔 ${name} is already in the phonebook.`);
        } else if (checkRepeatNumber(number)) {
        toast(`🤔 ${number} is already in the phonebook.`);
        } else if (checkEmptyQuery(name, number)) {
        toast.info("😱 Enter the contact's name and number phone!");
        } else if (checkValidNumber(number)) {
        toast.error('💩 Enter the correct number phone!');
        } else {
        dispatch(addContact(name, number));
        }
        reset();
    };

    // Сброс полей формы (после отправки)
    const reset = () => {
        setName('');
        setNumber('');
    };

    return (
        <Form onSubmit={handleSubmit}>
        <Label>
            Name
            <Input
                type="text"
                name="name"
                value={name}
                onChange={handleChange}
                pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                required
                />
        </Label>

        <Label>
            Number
            <Input
                type="tel"
                name="number"
                value={number}
                onChange={handleChange}
                pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                required
            />
        </Label>

        <Button type="submit">Add contact</Button>
        </Form>
    );
}