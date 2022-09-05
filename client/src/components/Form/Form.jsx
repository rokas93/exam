import { useState } from 'react';
import { FormStyled } from './Form.styled';

const Form = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    date: '',
    time: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  console.log(user);

  return (
    <FormStyled onSubmit={handleSubmit}>
      <label htmlFor='name'>
        Name:
        <input
          onChange={(e) =>
            setUser((prev) => ({ ...prev, name: e.target.value }))
          }
          type='text'
          id='name'
        />
      </label>

      <label htmlFor='email'>
        Email:
        <input
          onChange={(e) =>
            setUser((prev) => ({ ...prev, email: e.target.value }))
          }
          type='text'
          id='email'
        />
      </label>

      <label htmlFor='date'>
        Date:
        <input
          onChange={(e) =>
            setUser((prev) => ({ ...prev, date: e.target.value }))
          }
          type='date'
          id='date'
        />
      </label>

      <label htmlFor='time'>
        Time:
        <input
          onChange={(e) =>
            setUser((prev) => ({ ...prev, time: e.target.value }))
          }
          type='time'
          id='time'
        />
      </label>
    </FormStyled>
  );
};

export default Form;
