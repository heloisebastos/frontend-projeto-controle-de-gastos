import axios from "axios";

const http = axios.create({
    baseURL: "https://projeto-final-pretalab.onrender.com",
    headers: {
        "Content-Type": "application/json",
    },
});

export default http;