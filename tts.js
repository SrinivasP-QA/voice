export async function handler(event) {
  try {
    const { text } = JSON.parse(event.body);

    const API_KEY = process.env.ELEVEN_API_KEY;
    const VOICE_ID = process.env.VOICE_ID;

    const res = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
      {
        method: "POST",
        headers: {
          "xi-api-key": API_KEY,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          text: text,
          model_id: "eleven_multilingual_v2"
        })
      }
    );

    const audio = await res.arrayBuffer();

    return {
      statusCode: 200,
      headers: { "Content-Type": "audio/mpeg" },
      body: Buffer.from(audio).toString("base64"),
      isBase64Encoded: true
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: err.toString()
    };
  }
}