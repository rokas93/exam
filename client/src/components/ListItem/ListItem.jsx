import { useState } from 'react';
import { ButtonWrapperStyled, ListItemStyled } from './ListItem.styled';
import { useDispatch } from 'react-redux';
import { deleteUser, updateUser } from '../../features/userSlice';
import Button from '../Button';

const ListItem = ({ user }) => {
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const [status, setStatus] = useState('idle');
  const [initialUser, setInitialUser] = useState({
    id: user._id,
    name: user.name,
    email: user.email,
    date: user.date,
    time: user.time,
  });

  const handleDelete = (id) => {
    if (status === 'idle') {
      try {
        setStatus('pending');
        dispatch(deleteUser(id));
        setStatus('idle');
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleDone = (e) => {
    e.preventDefault();

    if (status === 'idle') {
      try {
        setIsEdit(false);

        setStatus('pending');
        dispatch(updateUser(initialUser));
        setStatus('idle');
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleEdit = () => {
    setIsEdit(true);
  };

  return (
    <ListItemStyled onSubmit={handleDone} isEdit={isEdit}>
      <input
        type='text'
        value={initialUser.name}
        onChange={(e) =>
          setInitialUser((prev) => ({ ...prev, name: e.target.value }))
        }
        disabled={!isEdit}
      />
      <input
        type='text'
        value={initialUser.email}
        onChange={(e) =>
          setInitialUser((prev) => ({ ...prev, email: e.target.value }))
        }
        disabled={!isEdit}
      />
      <input
        type='date'
        value={initialUser.date}
        onChange={(e) =>
          setInitialUser((prev) => ({ ...prev, date: e.target.value }))
        }
        disabled={!isEdit}
      />
      <input
        type='time'
        value={initialUser.time}
        onChange={(e) =>
          setInitialUser((prev) => ({ ...prev, time: e.target.value }))
        }
        disabled={!isEdit}
      />
      <ButtonWrapperStyled>
        <Button
          type={'button'}
          text={!isEdit ? 'Edit' : 'Submit'}
          bg={'info'}
          action={!isEdit ? handleEdit : handleDone}
        />
        <Button
          type={'button'}
          text={'Delete'}
          bg={'danger'}
          action={() => handleDelete(user._id)}
        />
      </ButtonWrapperStyled>
    </ListItemStyled>
  );
};

export default ListItem;
