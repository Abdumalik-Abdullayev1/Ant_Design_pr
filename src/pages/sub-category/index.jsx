import React, { useEffect, useState } from "react";
import { GlobalTable, SubCategoryModal } from "../../components";
import { subCategory } from "../../service";
import { Button, Input, Space, message } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const { Search } = Input;

const Index = () => {
   const { id } = useParams();
   const navigate = useNavigate();
   const [open, setOpen] = useState(false);
   const [data, setData] = useState([]);
   const [update, setUpdate] = useState({});
   const [loading, setLoading] = useState(false);
   const [searchTerm, setSearchTerm] = useState("");

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
            </div>
         ),
      },
   ];

   const getCategory = async () => {
      setLoading(true);
      try {
         const response = await subCategory.read(id);
         if (response.status === 200) {
            setData(response?.data?.data?.subcategories);
         }
      } catch (error) {
         message.error("Failed to load categories");
      } finally {
         setLoading(false);
      }
   };

   const deleteCategory = async (id) => {
      try {
         const response = await subCategory.delete(id);
         if (response.status === 200) {
            getCategory();
         }
      } catch (error) {
         message.error("Failed to delete category");
      }
   };

   const editCategory = (item) => {
      setUpdate(item);
      setOpen(true);
   };

   const onSearch = (value) => {
      setSearchTerm(value);
   };

   const filteredData = data.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
   );

   useEffect(() => {
      getCategory();
   }, []);

   return (
      <div>
         <SubCategoryModal
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
            data={filteredData}
            pagination={{ pageSize: 5 }}
            loading={loading}
         />
      </div>
   );
};

export default Index;
