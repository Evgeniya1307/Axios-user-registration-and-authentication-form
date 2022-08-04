import axios from 'axios';

export default axios.create({ //позволяет ус-ть базовый url адрес для полного приложения 
    baseURL: 'http://localhost:3500' //базовый url юэкенд из node.js будет на порту 3500
});