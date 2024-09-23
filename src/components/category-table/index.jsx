import React, { useState } from 'react';
import { Table, Button, notification } from 'antd';
import { EditOutlined, DeleteOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { categories } from '../../service';
import { CategoryModal } from '../../components';
import { NavLink } from 'react-router-dom';

const CustomizedTables = ({ categoryData }) => {
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState({});

  const handleDelete = async (id) => {
    try {
      await categories.delete(id);
      window.location.reload();
      notification.success({ message: 'Category deleted successfully!' });
    } catch (error) {
      notification.error({ message: 'Failed to delete category.' });
      console.error('Failed to delete category:', error);
    }
  };

  const handleEdit = async(item) => {
    try{
      await category.update(item?.id)
    }catch(err){
      console.log("Error");
    }
    setUpdate(item);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const columns = [
    {
      title: 'T/R',
      dataIndex: 'index',
      key: 'index',
      render: (text, record, index) => index + 1,
      align: 'center',
    },
    {
      title: 'Category Name',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, item) => (
        <div style={{ textAlign: 'center' }}>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(item)}
          />
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(item.id)}
          />
          <Button>
            <NavLink to={`${item.id}`}>
              <InfoCircleOutlined />
            </NavLink>
          </Button>
        </div>
      ),
      align: 'center',
    },
  ];

  return (
    <>
      <CategoryModal open={open} handleClose={handleClose} update={update} />
      <Table
        columns={columns}
        dataSource={categoryData}
        rowKey="id"
        pagination={false}
      />
    </>
  );
};

export default CustomizedTables;
