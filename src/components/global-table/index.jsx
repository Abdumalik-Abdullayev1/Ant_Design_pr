import React from 'react';
import { Space, Table, Tag } from 'antd';
const App = ({columns, data}) => <Table columns={columns} dataSource={data} />;
export default App;