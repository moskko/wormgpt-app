const response = await fetch('https://ifine-idhm-drum.loca.lt/api/generate', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Bypass-Tunnel-Reminder': 'true' // مهم جداً لتجاوز صفحة التحذير الخاصة بـ localtunnel
  },
  body: JSON.stringify({
    model: "llama3",
    prompt: userMessage,
    stream: false
  })
});
