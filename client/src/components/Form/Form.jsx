import { useState, useRef, useEffect } from 'react';
import {
  ButtonsWrapperStyled,
  FormStyled,
  InputStyled,
  SelectStyled,
} from './Form.styled';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import userValidation from '../../shared/userValidation';
import { createUser } from '../../features/userSlice';
import Button from '../Button';
import RESERVATION_TIMES from '../../shared/constants/reservationTimes';
import dateToSeconds from '../../shared/helpers/dateToSeconds';
import { selectAllUsers } from '../../features/userSlice';

const Form = ({ onClose }) => {
  // -- States
  const [status, setStatus] = useState('idle');
  const [aviableTimes, setAviableTimes] = useState(null);

  // -- Redux
  const users = useSelector(selectAllUsers);
  const dispatch = useDispatch();

  // Ref
  const nameInput = useRef(null);
  const dateInput = useRef(null);

  // -- Form validation
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
          onClose();
        } catch (error) {
          console.log(error);
        }
      }
    },
  });

  // -- Handlers
  const handleDateChange = () => {
    setFieldValue('date', dateInput.current.value);

    const results = RESERVATION_TIMES.filter((time) =>
      users.every(
        (user) =>
          dateToSeconds(dateInput.current.value, time) !==
          dateToSeconds(user.date, user.time)
      )
    );

    setAviableTimes(results);
    setFieldValue('time', '');
  };

  useEffect(() => {
    nameInput.current.focus();
  }, []);

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
          ref={nameInput}
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
          onChange={handleDateChange}
          value={values.date}
          isError={errors.date}
          ref={dateInput}
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

      <ButtonsWrapperStyled>
        <Button type={'submit'} text={'Submit'} bg={'success'} />
        <Button type={'button'} text={'Cancel'} action={onClose} />
      </ButtonsWrapperStyled>
    </FormStyled>
  );
};

export default Form;
