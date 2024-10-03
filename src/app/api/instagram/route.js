import axios from 'axios';

export async function POST(req, res) {
    try {

        const { url, body, type } = await req.json();
        
        if (type === "POST") {
            try {
                let formData = new FormData();
                for (let key in body) {
                    formData.append(key, body[key]);
                }
                const response = await axios.post(url, formData);
                
                return new Response(JSON.stringify(response.data), {
                    status: 200,
                });
            } catch (error) {
                console.error('Error:', error.response?.data || error.message);
                return new Response(JSON.stringify(error.response?.data || error.message), {
                    status: error.response?.status || 500,
                });
            }
        } else if (type === "GET") {
            try {
                const response = await axios.get(url);
                
                return new Response(JSON.stringify(response.data), {
                    status: 200,
                });
            } catch (error) {
                console.error('Error:', error.response?.data || error.message);
                return new Response(JSON.stringify(error.response?.data || error.message), {
                    status: error.response?.status || 500,
                });
            }
        };
    } catch (error) {
        console.error('Error:', error.response?.data || error.message);
        return new Response(JSON.stringify({ error: 'Failed to send request' }), {
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
