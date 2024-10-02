import React, { useEffect, useState } from "react";
import { Button, Space, Tooltip } from "antd";
import {
   EditOutlined,
   FolderViewOutlined,
} from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { Products } from "@modals"
import { products } from "@service";
import { GlobalTable, ConfirmDelete } from "@components";


const Index = () => {
   const [data, setData] = useState([]);
   const [total, setTotal] = useState()
   const [open, setOpen] = useState(false)
   const [update, setUpdate] = useState({})
   const { search } = useLocation()
   const navigate = useNavigate();
   const [params, setParams] = useState({
      search: "",
      limit: 2,
      page: 1
   })
   const getRequest = async () => {
      try {
         const res = await products.read(params)
         setData(res?.data?.data?.products)
         setTotal(res?.data?.data?.count)
      } catch (err) {
         console.log("Error");
      }
   }
   useEffect(() => {
      getRequest();
   }, [params]);
   useEffect(()=>{
      const params = new URLSearchParams(search)
      let page = Number(params.get("page")) || 1
      let limit = Number(params.get("limit")) || 2
      let serach_val = params.get("search_val")
      setParams((prev) => ({ ...prev, limit: limit, page: page, serach_val: serach_val }));
   },[search])

   const handleClose =()=>{
      setOpen(false)
      setUpdate({})
   }
   const viewCategory = async (id) => {
      navigate(`/user-layout/products/${id}`);
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
   const handleDelete = async(id)=>{
      const res = await products.delete(id)
      if(res.status === 200){
         getRequest()
      }
   }
   const handleSearch =(event)=>{
      const value = event.target.value
      setParams((prev) => ({...prev, search: value}))
      const search_params = new URLSearchParams(search)
      search_params.set("search", value)
      navigate(`?${search_params}`)
   }

   const columns = [
      {
         title: "№",
         dataIndex: "id",
         key: "id",
         align: "center",
      },
      {
         title: "Product name",
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
                  <ConfirmDelete id={record.id} deleteItem={handleDelete} />
               </Tooltip>
               <Tooltip title="view more">
                  <Button type="default" onClick={() => viewCategory(record.id)} icon={<FolderViewOutlined />} />
               </Tooltip>
            </Space>
         ),
      },
   ];

   return (
      <>
      <div className="flex justify-between">
        <input type="text" className="outline-none" placeholder="Search..." onChange={handleSearch} />
         <Products open={open} handleClose={handleClose} update={update} getRequest={getRequest} />
         <Button type="default" onClick={()=> setOpen(true)}>Add product</Button>
      </div>
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