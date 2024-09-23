import https from "./config";

const auth ={
    sign_in: (data)=> https.post("/auth/sign-in", data),
    sign_up: (data)=> https.post("/auth/user/sign-up", data)
}

export default auth