import twilio from "twilio";

async function sendSms(phone) {
  try {
    const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);
    await client.messages.create({
      body: "Este es el TOKEN de verificación de tu cuenta",
      from: process.env.TWILIO_PHONE,
      to: phone,
    });
  } catch (error) {
    throw error;
  }
}

export default sendSms;
