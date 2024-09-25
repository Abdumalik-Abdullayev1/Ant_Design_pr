import React, { useEffect, useState } from "react";
import { Button, Space, Tooltip } from "antd";
import {
   EditOutlined,
   DeleteOutlined,
} from "@ant-design/icons";
import { SubCategory } from "@modals"
import { subCategory } from "@service";
import { GlobalTable } from "@components";


const Index = () => {
   const [data, setData] = useState([]);
   const [total, setTotal] = useState()
   const [open, setOpen] = useState(false)
   const [loading, setLoading] = useState(false);
   const [update, setUpdate] = useState({})
   const [params, setParams] = useState({
      search: "401",
      limit: 2,
      page: 1
   })
   const getSubCategory = async () => {
      setLoading(true);
      try {
         const res = await subCategory.read(params);
         setData(res?.data?.data?.subcategories);
         setTotal(res?.data?.data?.count);
      } catch (err) {
         console.error("Error fetching categories:", err);
      } finally {
         setLoading(false);
      }
   };
   const handleTablesChange = (pagination) => {
      const { current, pageSize } = pagination
      setParams((prev) => ({ ...prev, limit: pageSize, page: current }));
   };
   const editItem = (item) => {
      setUpdate(item)
      setOpen(true)
   }
   const deleteItem = async(id)=>{
      const res = await subCategory.delete(id)
      if(res.status === 200){
         getSubCategory()
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
            </Space>
         ),
      },
   ];
   useEffect(() => {
      getSubCategory();
   }, [params]);

   const handleClose =()=>{
      setOpen(false)
      setUpdate({})
   }

   return (
      <>
      <SubCategory open={open} handleClose={handleClose} update={update} getSubCategory={getSubCategory} />
      <Button type="default" onClick={()=> setOpen(true)}>Add category</Button>
      <GlobalTable
         columns={columns}
         data={data}
         loading={loading}
         pagination={{
            current: params.page,
            pageSize: params.limit,
            total: total,
            showSizeChanger: true,
            pageSizeOptions: ['2', '5', '7', '10', '12']
         }}
         handleChange={handleTablesChange}
      />
   </>
   );
};

export default Index;