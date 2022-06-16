import { useSelector, useDispatch } from 'react-redux';
import { filterContact } from '../../redux/contacts/contacts-actions';
import { getFilter } from '../../redux/contacts/contacts-selectors';
import { Label, Input } from './Filter.styled';

export function Filter() {
    const dispatch = useDispatch();
    const filter = useSelector(getFilter);

    const handleFilter = e => dispatch(filterContact(e.currentTarget.value));
    return (
        <Label>
            Find contacts by name
            <Input
                type="text"
                name="filter"
                value={filter}
                onChange={handleFilter} />
        </Label>
    );
}