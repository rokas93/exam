import { useCallback, useEffect, useState } from 'react';
import { FormStyled, InputStyled, SelectStyled } from './Form.styled';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import userValidation from '../../shared/userValidation';
import { createUser } from '../../features/userSlice';
import Button from '../Button';
import RESERVATION_TIMES from '../../shared/constants/reservationTimes';
import dateToSeconds from '../../shared/helpers/dateToSeconds';
import { selectAllUsers } from '../../features/userSlice';

const Form = () => {
  const [status, setStatus] = useState('idle');
  const [aviableTimes, setAviableTimes] = useState(null);

  const users = useSelector(selectAllUsers);
  const dispatch = useDispatch();

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    setFieldValue,
    resetForm,
  } = useFormik({
    initialValues: {
      name: '',
      email: '',
      date: '',
      time: '',
    },
    enableReinitialize: true,
    validationSchema: userValidation,
    onSubmit: (values) => {
      if (status === 'idle') {
        try {
          setStatus('pending');
          dispatch(createUser(values));
          setStatus('idle');
          resetForm({ values: '' });
        } catch (error) {
          console.log(error);
        }
      }
    },
  });

  const handleDateChange = useCallback(
    (currentDate, users) => {
      if (currentDate) {
        setFieldValue('time', '');

        const results = RESERVATION_TIMES.filter((time) =>
          users.every(
            (user) =>
              dateToSeconds(currentDate, time) !==
              dateToSeconds(user.date, user.time)
          )
        );

        setAviableTimes(results);
        return;
      }

      return;
    },
    [setFieldValue]
  );

  useEffect(() => {
    handleDateChange(values.date, users);
  }, [values.date, users, handleDateChange]);

  return (
    <FormStyled onSubmit={handleSubmit}>
      <label htmlFor='name'>
        Client name:
        <InputStyled
          placeholder={'Name'}
          type='text'
          id='name'
          onChange={handleChange}
          value={values.name}
          isError={errors.name}
        />
        {errors.name && <span>{errors.name}</span>}
      </label>

      <label htmlFor='email'>
        Client email:
        <InputStyled
          placeholder={'email@email.com'}
          type='text'
          id='email'
          onChange={handleChange}
          value={values.email}
          isError={errors.email}
        />
        {errors.email && <span>{errors.email}</span>}
      </label>

      <label htmlFor='date'>
        Reservation date:
        <InputStyled
          type='date'
          id='date'
          onChange={handleChange}
          value={values.date}
          isError={errors.date}
        />
        {errors.date && <span>{errors.date}</span>}
      </label>

      <label htmlFor='time'>
        Reservation time:
        <SelectStyled
          name='time'
          id='time'
          onChange={handleChange}
          value={values.time}
          disabled={!values.date}
          isError={errors.time}
        >
          <option>Choose time</option>
          {aviableTimes?.map((time, index) => (
            <option key={index} value={time}>
              {time}
            </option>
          ))}
        </SelectStyled>
        {errors.time && <span>{errors.time}</span>}
      </label>

      <Button type={'submit'} text={'Submit'} bg={'success'} />
    </FormStyled>
  );
};

export default Form;
