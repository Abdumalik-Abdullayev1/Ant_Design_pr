import https from "./config";
const ads = {
   create: (data) => https.post("/ads/create", data),
   get: () => https.get("/ads"),
   update: (id, data) => https.patch(`/ads/update/${id}`, data),
   delete: (id) => https.delete(`/ads/delete/${id}`),
};

export default ads;