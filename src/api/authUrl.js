import axios from 'axios';
import {PRODUCTION_SERVER,DEVELOPMENT_SERVER} from './Config';

export default axios.create({
    baseURL:DEVELOPMENT_SERVER.AUTH_URL
})