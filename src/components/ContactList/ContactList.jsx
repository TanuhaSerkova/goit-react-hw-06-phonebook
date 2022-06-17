import { useSelector, useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/contacts/contacts-actions';
import {
    getContacts,
    getFilter,
} from '../../redux/contacts/contacts-selectors';
import { ContactItem } from 'components/ContactItem/ContactItem';
import { List } from './ContactList.styled';

export const ContactList = () => {
    const dispatch = useDispatch();
    const contacts = useSelector(getContacts);
    const filter = useSelector(getFilter);

    const filteredContacts = (contacts, filter) => {
        return contacts.filter(contact =>
        contact.name.toLowerCase().includes(filter.toLowerCase()),
        );
    };

    const filterContacts = filteredContacts(contacts, filter);

    const onDeleteContact = id => dispatch(deleteContact(id));
    return (
        <List>
        {filterContacts.map(({ id, name, number }) => (
            <ContactItem
            key={id}
            id={id}
            name={name}
            number={number}
            onClick={e => onDeleteContact(id)}
            />
        ))}
        </List>
    );
};