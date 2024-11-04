import type { APIRoute } from "astro";
import { sendEmail } from "../../utlis/email";

export const prerender = false;

export const POST: APIRoute = async ({ request, redirect }) => {
  // Get the form data submitted by the user on the home page
  const formData = await request.formData();
  const from = formData.get("recipient") as string | null;
  const subject = formData.get("subject") as string | null;
  const message = formData.get("message") as string | null;

  // Throw an error if we're missing any of the needed fields.
  if (!from || !subject || !message) {
    throw new Error("Missing required fields");
  }

  // Try from send the email using a `sendEmail` function we'll create next. Throw
  // an error if it fails.
  try {
    const html = `<div>${message}</div>`;
    await sendEmail({ from, subject, html });
  } catch (error) {
    throw new Error("Failed to send email");
  }

  // Redirect the user to a success page after the email is sent.
  return redirect("/success");
};