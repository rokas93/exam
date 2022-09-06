import { useState } from 'react';
import { FormStyled } from './Form.styled';
import { useDispatch } from 'react-redux';
import { createUser } from '../../features/userSlice';
import Button from '../Button';

const Form = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    date: '',
    time: '',
  });
  const [status, setStatus] = useState('idle');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (status === 'idle') {
      try {
        setStatus('pending');

        dispatch(createUser(user));

        setStatus('idle');
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <FormStyled onSubmit={handleSubmit}>
      <label htmlFor='name'>
        Client name:
        <input
          onChange={(e) =>
            setUser((prev) => ({ ...prev, name: e.target.value }))
          }
          placeholder={'Name'}
          type='text'
          id='name'
        />
      </label>

      <label htmlFor='email'>
        Client email:
        <input
          onChange={(e) =>
            setUser((prev) => ({ ...prev, email: e.target.value }))
          }
          placeholder={'email@email.com'}
          type='text'
          id='email'
        />
      </label>

      <label htmlFor='date'>
        Reservation date:
        <input
          onChange={(e) =>
            setUser((prev) => ({ ...prev, date: e.target.value }))
          }
          type='date'
          id='date'
        />
      </label>

      <label htmlFor='time'>
        Reservation time:
        <input
          onChange={(e) =>
            setUser((prev) => ({ ...prev, time: e.target.value }))
          }
          type='time'
          id='time'
          min={'08:00'}
          max={'17:00'}
        />
      </label>

      <Button text={'Submit'} bg={'success'} />
    </FormStyled>
  );
};

export default Form;
