import axios from 'axios';

async function productAPI(params) {
    try {
        const response = await axios.get('https://6336bb585327df4c43c83309.mockapi.io/api/v1/banam');
        return response.data[0]
    } catch (error) {
        console.error(error);
    }
}

export default productAPI