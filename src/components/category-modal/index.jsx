import React, { useState } from 'react';
import { Button, Modal, Input } from 'antd';
import { categories } from '../../service';

const App = ({ open, handleClose, update: initialUpdate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [update, setUpdate] = useState(initialUpdate);

  const showModal = () => {
    setIsModalOpen(true);
    if (update) {
      setInputValue(update.name);
    } else {
      setInputValue('');
    }
  };

  const handleOk = async () => {
    try {
      if (update?.id) {
        await categories.put(update.id, { name: inputValue });
      } else {
        await categories.create({ name: inputValue });
      }
      window.location.reload(); // Consider using state management for better UX
    } catch (error) {
      console.error("Error occurred:", error);
    } finally {
      setIsModalOpen(false);
      setInputValue('');
      setUpdate(null); // Reset update after submission
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setInputValue('');
    setUpdate(null); // Reset update when modal is closed
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal 
        title="Category Modal" 
        open={isModalOpen} 
        onOk={handleOk} 
        onCancel={handleCancel}
      >
        <Input 
          placeholder="Enter category name" 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </Modal>
    </>
  );
};

export default App;
