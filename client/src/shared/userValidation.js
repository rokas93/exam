import * as yup from 'yup';

const userValidation = yup.object({
  name: yup.string().required('Required'),
  email: yup.string().email('Invalid email address').required('Required'),
  date: yup.string().required('Required'),
  time: yup.string().required('Required'),
});

export default userValidation;
