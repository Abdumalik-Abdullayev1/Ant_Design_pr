import React from 'react';
import { Button, Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons'
const App = ({deleteItem, id}) => {
    const handleDelete =()=>{
        deleteItem(id)
    }
    return (
        <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
            okText="Yes"
            cancelText="No"
            onConfirm={handleDelete}
        >
            <Button danger icon={<DeleteOutlined/>}></Button>
        </Popconfirm>
    )
};
export default App;