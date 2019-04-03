import axios from "axios"

const instance = axios.create({
    baseURL: "http://127.0.0.1:8000",
    auth: {
        username: "vue",
        password: "vuejs"
    }
    // headers: {
    //     "Authentication": "Bearer 172d42dfa46d92e19a824ce17400dc8b570985f2"
    // }
})

export default instance;