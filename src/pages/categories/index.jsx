import React, { useEffect, useState } from "react";
import { GlobalTable, CategoryModal } from "../../components";
import { categories } from "../../service";
import { Button, Input, Space } from "antd";
import {
   EditOutlined,
   DeleteOutlined,
   FolderViewOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router";
const { Search } = Input;
const Index = () => {
   const [open, setOpen] = useState(false);
   const [data, setData] = useState([]);
   const [update, setUpdate] = useState({});
   const navigate = useNavigate();
   const openModal = () => {
      setOpen(true);
   };
   const handleClose = () => {
      setOpen(false);
   };
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
         title: "Action",
         key: "action",
         align: "center",
         render: (item) => (
            <div>
               <Button onClick={() => deleteCategory(item.id)}>
                  <DeleteOutlined />
               </Button>
               <Button
                  style={{ marginLeft: "10px" }}
                  onClick={() => editCategory(item)}
               >
                  <EditOutlined />
               </Button>
               <Button
                  style={{ marginLeft: "10px" }}
                  onClick={() => viewCategory(item.id)}
               >
                  <FolderViewOutlined />
               </Button>
            </div>
         ),
      },
   ];
   const getCategory = async () => {
      const response = await categories.read();
      if (response.status === 200) {
         setData(response?.data?.data?.categories);
      }
   };
   const deleteCategory = async (id) => {
      const response = await categories.delete(id);
      if (response.status === 200) {
         getCategory();
      }
   };
   const editCategory = async (item) => {
      setUpdate(item);
      setOpen(true);
   };
   const viewCategory = async (id) => {
      navigate(`/user-layout/categories/${id}`);
   };
   useEffect(() => {
      getCategory();
   }, []);
   const onSearch = (value, _e, info) => {
      console.log(value, _e, info);
   };
   return (
      <div>
         <CategoryModal
            open={open}
            handleClose={handleClose}
            update={update}
            setUpdate={setUpdate}
            getCategory={getCategory}
         />
         <div className="flex justify-between mb-4">
            <Space direction="vertical">
               <Search
                  placeholder="Search category"
                  onSearch={onSearch}
                  allowClear
               />
            </Space>
            <Button onClick={openModal}>
               <span className="ml-2">Add new category</span>
            </Button>
         </div>
         <GlobalTable
            columns={columns}
            data={data}
            pagination={{ pageSize: 5 }}
         />
      </div>
   );
};

export default Index;