import { useState, useEffect } from 'react';
import {
  ButtonWrapperStyled,
  InputStyled,
  ListItemStyled,
  SelectStyled,
} from './ListItem.styled';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, updateUser } from '../../features/userSlice';
import Button from '../Button';
import { useFormik } from 'formik';
import userValidation from '../../shared/userValidation';
import RESERVATION_TIMES from '../../shared/constants/reservationTimes';
import dateToSeconds from '../../shared/helpers/dateToSeconds';

const ListItem = ({ user }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [status, setStatus] = useState('idle');
  const [aviableTimes, setAviableTimes] = useState(null);

  const { users } = useSelector((state) => state.users);
  const dispatch = useDispatch();

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

  const handleDateChange = (currentDate, users) => {
    if (currentDate) {
      const results = RESERVATION_TIMES.filter((time) =>
        users.every(
          (user) =>
            dateToSeconds(currentDate, time) !==
            dateToSeconds(user.date, user.time)
        )
      );

      setAviableTimes(results);
    }

    return;
  };

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
    values.time = '';
  };

  useEffect(() => {
    handleDateChange(values.date, users);
  }, [values.date, users]);

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

      <SelectStyled
        type='time'
        id={'time'}
        disabled={!isEdit}
        isEdit={isEdit}
        onChange={handleChange}
        value={values.time}
        isError={errors.time}
      >
        <option value={isEdit ? '' : values.time}>
          {isEdit ? 'Choose time' : values.time}
        </option>

        {aviableTimes?.map((time, index) => (
          <option key={index} value={time}>
            {time}
          </option>
        ))}
      </SelectStyled>

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
