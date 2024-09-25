import React from 'react';
import { Space, Table, Tag } from 'antd';
const Index = ({columns, data, pagination, handleChange}) => (
    <Table
    columns={columns}
    dataSource={data}
    pagination={pagination}
    onChange={(pagination) => handleChange(pagination)}
    />
)
export default Index;