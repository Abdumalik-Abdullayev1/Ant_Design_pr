import React, { useEffect, useState } from "react";
import { Button, Input, Space, Tooltip } from "antd";
import {
   EditOutlined,
   DeleteOutlined,
   FolderViewOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router";
import { Category } from "@modals"
import { categories } from "@service";
import { GlobalTable } from "@components";


const Index = () => {
   const [data, setData] = useState([]);
   const [total, setTotal] = useState()
   const [open, setOpen] = useState(false)
   const [update, setUpdate] = useState({})
   const navigate = useNavigate();
   const [params, setParams] = useState({
      search: "",
      limit: 2,
      page: 1
   })
   const getCategory = async () => {
      try {
         const res = await categories.read(params)
         setData(res?.data?.data?.categories)
         setTotal(res?.data?.data?.count)
      } catch (err) {
         console.log("Error");
      }
   }
   const handleTableChange = (pagination) => {
      const { current, pageSize } = pagination
      setParams((prev) => ({ ...prev, limit: pageSize, page: current }));
   };
   const editItem = (item) => {
      setUpdate(item)
      setOpen(true)
   }
   const deleteItem = async(id)=>{
      const res = await categories.delete(id)
      if(res.status === 200){
         getCategory()
      }
   }

   const columns = [
      {
         title: "№",
         dataIndex: "id",
         key: "id",
         align: "center",
      },

      {
         title: "Category name",
         dataIndex: "name",
         key: "name",
         align: "center",
      },
      {
         title: 'Action',
         key: 'action',
         render: (_, record) => (
            <Space size="middle">
               <Tooltip title="edit">
                  <Button type="default" onClick={() => editItem(record)} icon={<EditOutlined />} />
               </Tooltip>
               <Tooltip title="delete">
                  <Button type="default" onClick={() => deleteItem(record.id)} icon={<DeleteOutlined />} />
               </Tooltip>
               <Tooltip title="delete">
                  <Button type="default" onClick={() => viewCategory(record.id)} icon={<FolderViewOutlined />} />
               </Tooltip>
            </Space>
         ),
      },
   ];
   useEffect(() => {
      getCategory();
   }, [params]);

   const handleClose =()=>{
      setOpen(false)
      setUpdate({})
   }
   const viewCategory = async (id) => {
      navigate(`/user-layout/categories/${id}`);
   };

   return (
      <>
      <Category open={open} handleClose={handleClose} update={update} getCategory={getCategory} />
      <Button type="default" onClick={()=> setOpen(true)}>Add category</Button>
      <GlobalTable
         columns={columns}
         data={data}
         pagination={{
            current: params.page,
            pageSize: params.limit,
            total: total,
            showSizeChanger: true,
            pageSizeOptions: ['2', '5', '7', '10', '12']
         }}
         handleChange={handleTableChange}
      />
   </>
   );
};

export default Index;