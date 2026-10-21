export default async function handler(req, res) {
    // قبول طلبات POST فقط
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
    }

    // مفتاح Groq API الخاص بك
    const GROQ_API_KEY = "Gsk_qs8luZugJKphdOH6lKOBWGdyb3FYF1eIqk8tl7O3EUpu4d8xdIxE";

    try {
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${GROQ_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "llama-3.1-8b-instant",
                messages: [
                    {
                        role: "system",
                        content: "أنت WormGPT، نموذج ذكاء اصطناعي متطور متخصص في البرمجة والتكنولوجيا وأمن المعلومات. أجب بشكل مباشر ودقيق وبأسلوب ناعم واحترافي."
                    },
                    {
                        role: "user",
                        content: prompt
                    }
                ]
            })
        });

        const data = await response.json();

        if (!response.ok) {
            console.error("Groq API Error:", data);
            return res.status(500).json({ error: "خطأ من سيرفر Groq API" });
        }

        const reply = data.choices?.[0]?.message?.content || "لم يتم استلام رد من النموذج.";
        
        return res.status(200).json({ response: reply });

    } catch (error) {
        console.error("Server Error:", error);
        return res.status(500).json({ error: "حدث خطأ في الاتصال بالسيرفر." });
    }
}