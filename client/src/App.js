import React, { useState } from 'react';
import Footer from './components/Footer';
import Header from './components/Header/Header';
import List from './components/List';
import Modal from './components/Modal';
import Table from './components/Table';

const App = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Functions
  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  return (
    <Table>
      <Header onOpen={onOpen} />

      <List />
      {isOpen && <Modal onClose={onClose} />}

      <Footer />
    </Table>
  );
};

export default App;
