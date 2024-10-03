import React, { useEffect, useState } from "react";
import { Button, Space, Tooltip } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { Ads } from "@modals"
import { ads } from "@service";
import { GlobalTable, ConfirmDelete } from "@components";


const Index = () => {
   const [data, setData] = useState([]);
   const [total, setTotal] = useState()
   const [open, setOpen] = useState(false)
   const { search } = useLocation()
   const navigate = useNavigate();
   const [params, setParams] = useState({
      search: "",
      limit: 2,
      page: 1
   })
   const getAds = async () => {
      try {
         const res = await ads.get(params)
         setData(res?.data?.data)
         setTotal(res?.data?.data?.count)
      } catch (err) {
         console.log("Error");
      }
   }
   useEffect(() => {
      getAds();
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
      const res = await ads.delete(id)
      if(res.status === 200){
         getAds()
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
         title: "Image",
         dataIndex: "image",
         key: "image",
         align: "center",
      },
      {
         title: "Position",
         dataIndex: "position",
         key: "position",
         align: "center",
      },
      {
         title: 'Action',
         key: 'action',
         render: (_, record) => (
            <Space size="middle">
               <Tooltip title="delete">
                  <ConfirmDelete id={record.id} deleteItem={handleDelete} />
               </Tooltip>
            </Space>
         ),
      },
   ];

   return (
      <>
      <Ads open={open} handleClose={handleClose} getAds={getAds} />
      <input type="text" className="outline-none" placeholder="Search..." onChange={handleSearch} />
      <Button type="default" onClick={()=> setOpen(true)}>Add Ads</Button>
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