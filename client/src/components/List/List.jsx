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
  // -- States
  const [page, setPage] = useState(0);
  const [editId, setEditId] = useState(null);

  // -- Redux
  const dispatch = useDispatch();
  const users = useSelector(selectAllUsers);
  const status = useSelector(getUsersStatus);
  const error = useSelector(getUsersError);

  // -- Custom hooks
  const paginatedUsers = usePagination(users, 10);

  console.log(paginatedUsers);

  // -- Side effects
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUsers());
    }
  }, [dispatch, status]);

  // -- Returned content
  let content;

  if (status === 'loading') {
    content = <p>Loading...</p>;
  } else if (status === 'succeeded') {
    content = !paginatedUsers.length ? (
      <p>No active reservations found.</p>
    ) : (
      paginatedUsers[page]?.map((user) => (
        <ListItem
          key={user._id}
          user={user}
          setPage={setPage}
          setEditId={setEditId}
          isEdit={editId === user._id}
        />
      ))
    );
  } else if (status === 'failed') {
    content = <p>{error}</p>;
  }

  return (
    <ListStyled>
      <h3>Active reservations:</h3>
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
