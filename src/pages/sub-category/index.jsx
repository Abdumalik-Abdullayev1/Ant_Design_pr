import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Button, Space, Tooltip } from "antd";
import {
   EditOutlined,
} from "@ant-design/icons";
import { SubCategory } from "@modals"
import { subCategory } from "@service";
import { GlobalTable, ConfirmDelete } from "@components";


const Index = () => {
   const [data, setData] = useState([]);
   const [total, setTotal] = useState()
   const [open, setOpen] = useState(false)
   const [loading, setLoading] = useState(false);
   const [update, setUpdate] = useState({})
   const [params, setParams] = useState({
      search: "",
      limit: 2,
      page: 1
   })
   const { id } = useParams()
   const { search } = useLocation()
   const navigate = useNavigate();
   const getSubCategory = async () => {
      setLoading(true);
      try {
         const res = await subCategory.read(id);
         if(res.status === 200){
            setData(res?.data?.data?.subcategories);
            setTotal(res?.data?.data?.count);
         }
      } catch (err) {
         console.error("Error fetching categories:", err);
      } finally {
         setLoading(false);
      }
   };
   const handleTablesChange = (pagination) => {
      const { current, pageSize } = pagination
      setParams((prev) => ({ ...prev, limit: pageSize, page: current }));
      const current_params = new URLSearchParams(search)
      current_params.set('page', `${current}`)
      current_params.set('limit', `${pageSize}`)
      navigate(`?${current_params}`)
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
         title: "Sub Category name",
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
                  <ConfirmDelete id={record.id} deleteItem={deleteItem} />
               </Tooltip>
            </Space>
         ),
      },
   ];
   useEffect(() => {
      getSubCategory();
   }, [params]);
   useEffect(()=>{
      const params = new URLSearchParams(search)
      let serach_val = params.get("search") || ""
      let page = Number(params.get("page")) || 1
      let limit = Number(params.get("limit")) || 2
      setParams((prev) => ({ ...prev, limit: limit, page: page, serach_val: serach_val }));
   },[search])

   const handleClose =()=>{
      setOpen(false)
      setUpdate({})
   }
   const handleSearch =(event)=>{
      const value = event.target.value
      console.log(value);
      setParams((prev) => ({...prev, search: value}))
      const current_params = new URLSearchParams(search)
      current_params.set("search", value)
      navigate(`?${current_params}`)
   }

   return (
      <>
      <SubCategory open={open} handleClose={handleClose} update={update} getSubCategory={getSubCategory} />
      <input placeholder="Search..." onChange={handleSearch} />
      <Button type="default" onClick={()=> setOpen(true)}>Add sub category</Button>
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