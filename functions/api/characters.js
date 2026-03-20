export async function onRequestGet(context) {
  // KV'den verileri çek
  const value = await context.env.CHARACTERS_KV.get("fate_characters");
  if (!value) {
    // Eğer KV boşsa, boş bir obje dön
    return new Response(JSON.stringify({}), {
      headers: { "Content-Type": "application/json" },
    });
  }
  return new Response(value, {
    headers: { "Content-Type": "application/json" },
  });
}

export async function onRequestPost(context) {
  try {
    const data = await context.request.json();
    // KV'ye kaydet
    await context.env.CHARACTERS_KV.put("fate_characters", JSON.stringify(data));
    
    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
