import axios from 'axios';

export async function POST(req, res) {
    try {

        const { url, body } = await req.json();
        console.log("body", body)
        // convert the body to formdata
        let formData = new FormData();
        for (let key in body) {
            formData.append(key, body[key]);
        }
        const response = await axios.post(url, formData);
        
        return new Response(response.data, {
            status: 200,
        });
    } catch (error) {
        console.error('Error:', error.response?.data || error.message);
        return new Response(JSON.stringify(error.response?.data || error.message), {
            status: error.response?.status || 500,
        });
    }
}

export async function GET(req) {
    try {
        const { url } = await req.json();

        const response = await axios.get(url);

        return new Response(JSON.stringify(response.data), {
            status: 200,
        });
    } catch (error) {
        console.error('Error:', error.response?.data || error.message);
        return new Response(JSON.stringify({ error: 'Failed to send request' }), {
            status: error.response?.status || 500,
        });
    }
}
