import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchUsers } from '../../features/userSlice';
import ListItem from '../ListItem';
import { ButtonStyled, ButtonsWrapperStyled, ListStyled } from './List.styled';
import usePagination from '../../hooks/usePagination';
import {
  selectAllUsers,
  getUsersStatus,
  getUsersError,
} from '../../features/userSlice';

const List = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);

  const users = useSelector(selectAllUsers);
  const status = useSelector(getUsersStatus);
  const error = useSelector(getUsersError);

  const paginatedUsers = usePagination(users, 10);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUsers());
    }
  }, [dispatch, status]);

  let content;

  if (status === 'loading') {
    content = <p>Loading...</p>;
  } else if (status === 'succeeded') {
    content = paginatedUsers[page].map((user) => (
      <ListItem key={user._id} user={user} setPage={setPage} />
    ));
  } else if (status === 'failed') {
    content = <p>{error}</p>;
  }

  return (
    <ListStyled>
      {content}
      <ButtonsWrapperStyled>
        {paginatedUsers.map((_, index) => (
          <ButtonStyled
            key={index}
            onClick={() => setPage(index)}
            isActive={page === index}
          >
            {index + 1}
          </ButtonStyled>
        ))}
      </ButtonsWrapperStyled>
    </ListStyled>
  );
};

export default List;
