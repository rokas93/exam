import { useState, useEffect } from 'react';
import axios from 'axios';
import useFetch from '../../hooks/useFetch';

const List = () => {
  const { data, isLoading, error } = useFetch(
    'http://localhost:5000/api/users'
  );

  return (
    <>
      {isLoading ? (
        <p>Loading ...</p>
      ) : (
        <ul>
          {data.map((user) => (
            <li key={user._id}>{user.name}</li>
          ))}
        </ul>
      )}
    </>
  );
};

export default List;
