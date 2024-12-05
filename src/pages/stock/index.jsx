import React, { useEffect, useState } from "react";
import { Button, Space, Tooltip } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { EditOutlined } from "@ant-design/icons";
import { Stock } from "@modals"
import { stock } from "@service";
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
   const getStock = async () => {
      try {
         const res = await stock.get(params)
         setData(res?.data?.data?.stocks)
         setTotal(res?.data?.data?.count)
      } catch (err) {
         console.log("Error");
      }
   }
   useEffect(() => {
      getStock();
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
   const handleTableChange = (pagination) => {
      const { current, pageSize } = pagination
      setParams((prev) => ({ ...prev, limit: pageSize, page: current }));
      const search_params = new URLSearchParams(search)
      search_params.set('page', `${current}`)
      search_params.set('limit', `${pageSize}`)
      navigate(`?${search_params}`)

   };
   const handleDelete = async(id)=>{
      const res = await stock.delete(id)
      if(res.status === 200){
         getStock()
      }
   }
   const editItem = (item) => {
      setUpdate(item)
      setOpen(true) 
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
         title: "Stock name",
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
            </Space>
         ),
      },
   ];

   return (
      <>
      <Stock open={open} handleClose={handleClose} update={update} getStock={getStock} />
      <input type="text" className="outline-none" placeholder="Search..." onChange={handleSearch} />
      <Button type="default" onClick={()=> setOpen(true)}>Add Stock</Button>
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