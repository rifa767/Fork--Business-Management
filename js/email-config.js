/* =========================================================
   EmailJS settings — lets the site send a welcome email to
   WHOEVER types their address in the form (any recipient).

   ONE-TIME SETUP (free, works with Live Server):
   1. Sign up at https://www.emailjs.com
   2. Email Services  → Add Gmail            → copy the SERVICE_ID
   3. Email Templates → Create New Template:
        • "To Email" field  =  {{email}}      ← this makes it go to the typed address
        • Subject           =  Welcome to Fork
        • Content           =  use {{to_name}} and your message
      → copy the TEMPLATE_ID
   4. Account → General → copy the PUBLIC_KEY
   5. Paste all three below.
   (These keys are safe in client-side code.)
   ========================================================= */
window.EMAILJS_CONFIG = {
  PUBLIC_KEY:  "53pjFqBpbdXKgZBVH",
  SERVICE_ID:  "service_fuppfhw",
  TEMPLATE_ID: "template_sxr34uh"
};
