import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchUsers } from '../../features/userSlice';
import ListItem from '../ListItem';
import { ListStyled } from './List.styled';

const List = () => {
  const dispatch = useDispatch();
  const { users, status, error } = useSelector((state) => state.users);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUsers());
    }
  }, [dispatch, status]);

  let content;

  if (status === 'loading') {
    content = <p>Loading...</p>;
  } else if (status === 'succeeded') {
    content = users.map((user) => <ListItem key={user._id} user={user} />);
  } else if (status === 'failed') {
    content = <p>{error}</p>;
  }

  return <ListStyled>{content}</ListStyled>;
};

export default List;
