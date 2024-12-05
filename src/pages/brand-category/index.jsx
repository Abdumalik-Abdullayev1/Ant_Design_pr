import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Button, Space, Tooltip } from "antd";
import {
   EditOutlined,
} from "@ant-design/icons";
import { BrandCategory } from "@modals"
import { brandCategory } from "@service";
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
   const getBrandCategory = async () => {
      setLoading(true);
      try {
         const res = await brandCategory.read(id);
         if(res.status === 200){
            setData(res?.data?.data?.brandCategories);
            setTotal(res?.data?.data?.count);
         }
      } catch (err) {
         console.error("Error fetching categories:", err);
      } finally {
         setLoading(false);
      }
   };
   const handleTableChange = (pagination) => {
      const { current, pageSize } = pagination
      setParams((prev) => ({ ...prev, limit: pageSize, page: current }));
      const search_params = new URLSearchParams(search)
      search_params.set('page', `${current}`)
      search_params.set('limit', `${pageSize}`)
      navigate(`?${search_params}`)
   };
   const editItem = (item) => {
      setUpdate(item)
      setOpen(true)
   }
   const deleteItem = async(id)=>{
      const res = await brandCategory.delete(id)
      if(res.status === 200){
         getBrandCategory()
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
      getBrandCategory();
   }, [params]);
   useEffect(()=>{
      const params = new URLSearchParams(search)
      let search_val = params.get("search") || ""
      let page = Number(params.get("page")) || 1
      let limit = Number(params.get("limit")) || 2
      setParams((prev) => ({ ...prev, limit: limit, page: page, serach_val: search_val }));
   },[search])

   const handleClose =()=>{
      setOpen(false)
      setUpdate({})
   }
   const handleSearch =(event)=>{
      const value = event.target.value
      setParams((prev) => ({...prev, search: value}))
      const search_params = new URLSearchParams(search)
      search_params.set("search", value)
      navigate(`?${search_params}`)
   }

   return (
      <>
      <BrandCategory open={open} handleClose={handleClose} update={update} getBrandCategory={getBrandCategory} />
      <input type="text" placeholder="Search..." className="outline-none" onChange={handleSearch} />
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
         handleChange={handleTableChange}
      />
   </>
   );
};

export default Index;