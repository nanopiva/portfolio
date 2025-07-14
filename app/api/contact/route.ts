import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface EmailData {
  name: string;
  email: string;
  message: string;
}

export async function POST(req: Request) {
  const { name, email, message } = (await req.json()) as EmailData;
  if (!name || !email || !message) {
    return new Response(
      JSON.stringify({ error: "Todos los campos son requeridos" }),
      { status: 400 }
    );
  }

  try {
    await resend.emails.send({
      from: "Tu Portfolio <tu@tu-dominio.com>",
      to: ["mpiva24@gmail.com"],
      subject: `Nuevo mensaje de ${name}`,
      replyTo: email,
      html: `
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${message}</p>
      `,
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error al enviar email:", error);
    return new Response(
      JSON.stringify({
        error: "Error al enviar el mensaje",
        details: error instanceof Error ? error.message : "Error desconocido",
      }),
      { status: 500 }
    );
  }
}
