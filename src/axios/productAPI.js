import axios from 'axios';

async function productAPI(params) {
    try {
        const response = await axios.get(`https://646580b2228bd07b354c005b.mockapi.io/${params}`);
        // const response = await axios.get(`http://192.168.100.7:3000/api/v1/products/category-id=63ddfdac6a601b2d9dd351d4`);
        return response
    } catch (error) {
        console.error(error);
    }
}

export default productAPI