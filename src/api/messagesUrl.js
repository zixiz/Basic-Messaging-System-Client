import axios from 'axios';
import {PRODUCTION_SERVER,DEVELOPMENT_SERVER} from './Config';

export default axios.create({
    baseURL:PRODUCTION_SERVER.MESSAGES_URL
})