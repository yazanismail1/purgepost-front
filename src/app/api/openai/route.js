import axios from 'axios';

export async function POST(req, res) {
    try {
        let openAIUrl = "https://api.openai.com/v1/chat/completions";
        let headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
        }
        let data = {
            "model": "omni-moderation-latest",
        }
        const {body} = await req.json();
        const commentsData = commentsData;

        if (!commentsData?.data?.length) {
            return;
        }

        const moderatedElements = [];
        commentsData?.forEach((comment) => {
            data["input"] = comment?.text;
            axios.post(openAIUrl, body, headers).then((res) => {
                console.log("res", res.data);
                let aiResponse = res.data?.results[0];

                aiResponse?.flagged && flaggedComments.push({
                    commentId: comment?.id,
                    commentText: comment?.text,
                    flagged: aiResponse?.flagged,
                    category: aiResponse?.categories,
                    reasons: aiResponse?.category_scores
                });

            }).catch((error) => {
                console.error('Error:', error.response?.data || error.message);
                return new Response(JSON.stringify({ error: 'Failed to send request' }), {
                    status: error.response?.status || 500,
                });
            });
        });
        return (moderatedElements, {status: 200});
        
    } catch (error) {
        console.error('Error:', error.response?.data || error.message);
        return new Response(JSON.stringify({ error: 'Failed to send request' }), {
            status: error.response?.status || 500,
        });
    }
}


