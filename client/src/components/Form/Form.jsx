import { useState } from 'react';
import { FormStyled } from './Form.styled';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import userValidation from '../../shared/userValidation';
import { createUser } from '../../features/userSlice';
import Button from '../Button';

const Form = () => {
  const [status, setStatus] = useState('idle');
  const dispatch = useDispatch();

  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues: {
      name: '',
      email: '',
      date: '',
      time: '',
    },
    validationSchema: userValidation,
    onSubmit: (values) => {
      if (status === 'idle') {
        try {
          setStatus('pending');
          dispatch(createUser(values));
          setStatus('idle');
        } catch (error) {
          console.log(error);
        }
      }
    },
  });

  return (
    <FormStyled onSubmit={handleSubmit}>
      <label htmlFor='name'>
        Client name:
        <input
          placeholder={'Name'}
          type='text'
          id='name'
          onChange={handleChange}
          value={values.name}
        />
        {errors.name && <span>{errors.name}</span>}
      </label>

      <label htmlFor='email'>
        Client email:
        <input
          placeholder={'email@email.com'}
          type='text'
          id='email'
          onChange={handleChange}
          value={values.email}
        />
        {errors.email && <span>{errors.email}</span>}
      </label>

      <label htmlFor='date'>
        Reservation date:
        <input
          type='date'
          id='date'
          onChange={handleChange}
          value={values.date}
        />
        {errors.date && <span>{errors.date}</span>}
      </label>

      <label htmlFor='time'>
        Reservation time:
        <input
          type='time'
          id='time'
          min={'08:00'}
          max={'17:00'}
          onChange={handleChange}
          value={values.time}
        />
        {errors.time && <span>{errors.time}</span>}
      </label>

      <Button text={'Submit'} bg={'success'} />
    </FormStyled>
  );
};

export default Form;
