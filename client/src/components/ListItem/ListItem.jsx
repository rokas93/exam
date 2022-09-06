import { useState } from 'react';
import {
  ButtonWrapperStyled,
  InputStyled,
  ListItemStyled,
} from './ListItem.styled';
import { useDispatch } from 'react-redux';
import { deleteUser, updateUser } from '../../features/userSlice';
import Button from '../Button';
import { useFormik } from 'formik';
import userValidation from '../../shared/userValidation';

const ListItem = ({ user }) => {
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const [status, setStatus] = useState('idle');

  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues: {
      id: user._id,
      name: user.name,
      email: user.email,
      date: user.date,
      time: user.time,
    },
    validationSchema: userValidation,
    onSubmit: (values) => {
      if (status === 'idle') {
        try {
          setIsEdit(false);

          setStatus('pending');
          dispatch(updateUser(values));
          setStatus('idle');
        } catch (error) {
          console.log(error);
        }
      }
    },
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

  const handleEdit = () => {
    setIsEdit(true);
  };

  return (
    <ListItemStyled onSubmit={handleSubmit}>
      <InputStyled
        type='text'
        id={'name'}
        disabled={!isEdit}
        isEdit={isEdit}
        onChange={handleChange}
        value={values.name}
        isError={errors.name}
      />

      <InputStyled
        type='text'
        id={'email'}
        disabled={!isEdit}
        isEdit={isEdit}
        onChange={handleChange}
        value={values.email}
        isError={errors.email}
      />
      <InputStyled
        type='date'
        id={'date'}
        disabled={!isEdit}
        isEdit={isEdit}
        onChange={handleChange}
        value={values.date}
        isError={errors.date}
      />
      <InputStyled
        type='time'
        id={'time'}
        disabled={!isEdit}
        isEdit={isEdit}
        onChange={handleChange}
        value={values.time}
        isError={errors.time}
      />
      <ButtonWrapperStyled>
        <Button
          type={'button'}
          text={!isEdit ? 'Edit' : 'Submit'}
          bg={'info'}
          action={!isEdit ? handleEdit : handleSubmit}
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
