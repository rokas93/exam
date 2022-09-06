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
    <ListItemStyled onSubmit={handleSubmit} isEdit={isEdit}>
      <InputStyled
        type='text'
        value={values.name}
        onChange={handleChange}
        disabled={!isEdit}
        isError={errors.name}
      />
      <InputStyled
        type='text'
        value={values.email}
        onChange={handleChange}
        disabled={!isEdit}
        isError={errors.email}
      />
      <InputStyled
        type='date'
        value={values.date}
        onChange={handleChange}
        disabled={!isEdit}
        isError={errors.date}
      />
      <InputStyled
        type='time'
        value={values.time}
        onChange={handleChange}
        disabled={!isEdit}
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
