export const prerender = false; //This will not work without this line

import type { APIRoute } from "astro";
import { Resend } from "resend";

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {
  const {subject, email, message} = await request.json();

  console.log(
		`
		subject : ${subject}
		email : ${email}
		message : ${message}
		`
	);

  if (!subject || !email || !message) {

    return new Response(
      JSON.stringify({
        message: `Fill out all fields.`,
      }),
      {
        status: 404,
        statusText: "Did not provide the right data",
      },
    );
  } // Sending information to Resend


  const sendResend = await resend.emails.send({
    from: import.meta.env.SEND_EMAIL_FROM,
    to: import.meta.env.SEND_EMAIL_FROM, 
    subject: ` new email "${subject.valueOf()}" from "${email.valueOf()}"`,
    html: message.valueOf(),
  }); // If the message was sent successfully, return a 200 response

  if (sendResend.data) {
    return new Response(
      JSON.stringify({
        message: `Message successfully sent!`,
      }),
      {
        status: 200,
        statusText: "OK",
      },
    ); // If there was an error sending the message, return a 500 response
  } else {
    return new Response(
      JSON.stringify({
        message: `Message failed to send: ${sendResend.error?.message}`,
      }),
      {
        status: 500,
        statusText: `Internal Server Error: ${sendResend.error}`,
      },
    );
  }
};