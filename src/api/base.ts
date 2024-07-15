import axios from "axios"

const BASE_URL = "https://axie-treasury-topaz.vercel.app/api"

export const api = axios.create({ baseURL: BASE_URL })