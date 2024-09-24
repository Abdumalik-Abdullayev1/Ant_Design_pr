import https from "./config";

const categories={
    create: (data)=> https.post('/category/create', data),
    read: (data)=> https.get('/category/search?limit=10', data),
    update: (id, data)=> https.patch(`/category/update/${id}`, data),
    delete: (id)=> https.delete(`/category/delete/${id}`)
}

export default categories