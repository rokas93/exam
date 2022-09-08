import { useState, useRef, useEffect } from 'react';
import {
  ButtonWrapperStyled,
  InputStyled,
  LabelStyled,
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
import { selectAllUsers } from '../../features/userSlice';
import {
  ClockIcon,
  DateIcon,
  EmailIcon,
  UserIcon,
  EditIcon,
  CheckIcon,
  XMarkIcon,
} from '../../assets/svgs';

const ListItem = ({ user, setPage, setEditId, isEdit }) => {
  const { _id, name, email, date, time } = user;

  // -- States
  const [status, setStatus] = useState('idle');
  const [aviableTimes, setAviableTimes] = useState(null);

  // Ref
  const nameInput = useRef(null);
  const dateInput = useRef(user.date);

  // -- Redux
  const users = useSelector(selectAllUsers);
  const dispatch = useDispatch();

  // -- Form validation
  const { values, errors, handleChange, handleSubmit, setFieldValue } =
    useFormik({
      initialValues: {
        _id,
        name,
        email,
        date,
        time,
      },
      validationSchema: userValidation,
      onSubmit: (values) => {
        setEditId(null);
        setStatus('pending');
        dispatch(updateUser(values));
        setStatus('idle');
      },
    });

  // -- Handlers
  const handleDelete = (id) => {
    if (status === 'idle') {
      try {
        setStatus('pending');
        dispatch(deleteUser(id));
        setStatus('idle');

        setPage(0);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleEdit = () => {
    const results = RESERVATION_TIMES.filter((time) =>
      users.every(
        (user) =>
          dateToSeconds(dateInput.current.value, time) !==
          dateToSeconds(user.date, user.time)
      )
    );

    setAviableTimes(results);
    setEditId(user._id);
  };

  const handleDateChange = () => {
    if (values.date) {
      setFieldValue('date', dateInput.current.value);
      handleEdit();
      setFieldValue('time', '');
    }

    return;
  };

  // Side effects
  useEffect(() => {
    if (isEdit) {
      nameInput.current.focus();
    }
  }, [isEdit]);

  return (
    <ListItemStyled onSubmit={handleSubmit}>
      <LabelStyled htmlFor='name' isEdit={isEdit} isError={errors.name}>
        <UserIcon width={'10px'} height={'10px'} />
        <InputStyled
          type='text'
          id={'name'}
          disabled={!isEdit}
          onChange={handleChange}
          value={values.name}
          isError={errors.name}
          ref={nameInput}
        />
      </LabelStyled>

      <LabelStyled htmlFor='email' isEdit={isEdit} isError={errors.email}>
        <EmailIcon width={'10px'} height={'10px'} />
        <InputStyled
          type='text'
          id={'email'}
          disabled={!isEdit}
          onChange={handleChange}
          value={values.email}
          isError={errors.email}
        />
      </LabelStyled>

      <LabelStyled htmlFor='date' isEdit={isEdit} isError={errors.date}>
        <DateIcon width={'10px'} height={'10px'} />
        <InputStyled
          type='date'
          id={'date'}
          disabled={!isEdit}
          onChange={handleDateChange}
          value={values.date}
          isError={errors.date}
          min={new Date().toISOString().split('T')[0]}
          ref={dateInput}
        />
      </LabelStyled>

      <LabelStyled htmlFor='time' isEdit={isEdit} isError={errors.time}>
        <ClockIcon width={'10px'} height={'10px'} />
        <SelectStyled
          type='time'
          id={'time'}
          disabled={!isEdit}
          onChange={handleChange}
          value={values.time}
          isError={errors.time}
        >
          {values.time && <option value={values.time}>{values.time}</option>}
          {!values.time && <option value={''}>{'Choose time'}</option>}

          {aviableTimes?.map((time, index) => (
            <option key={index} value={time}>
              {time}
            </option>
          ))}
        </SelectStyled>
      </LabelStyled>

      <ButtonWrapperStyled isEdit={isEdit}>
        <Button
          type={'button'}
          text={
            !isEdit ? (
              <EditIcon height={'10px'} width={'10px'} />
            ) : (
              <CheckIcon height={'10px'} width={'10px'} />
            )
          }
          bg={'info'}
          action={!isEdit ? handleEdit : handleSubmit}
          isRadio
        />
        <Button
          type={'button'}
          text={<XMarkIcon height={'10px'} width={'10px'} />}
          bg={'danger'}
          action={() => handleDelete(_id)}
          isRadio
        />
      </ButtonWrapperStyled>
    </ListItemStyled>
  );
};

export default ListItem;
