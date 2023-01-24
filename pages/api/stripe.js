import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === "POST") {
    console.log("HELLO");

    try {
      const params = {
        submit_type: "pay",
        mode: "payment",
        payment_method_types: ["card"],
        billing_address_collection: "auto",
        shipping_options: [{ shipping_rate: "shr_1MTtRwKAHA9fb4ela7hvtvbD" }],
        line_items: req.body.map((item) => {
          let img = item.image[0].asset._ref;
          img = img
            .replace(
              "image-",
              "https://cdn.sanity.io/images/qk0lk3wx/production/"
            )
            .replace("-webp", ".webp");
          img = img.replace("-jpg", ".jpg");
          img = img.replace("-jpeg", ".jpeg");
          img = img.replace("-png", ".png");
          const newImage = img;
          console.log(
            "🚀 ~ file: stripe.js:28 ~ line_items:req.body.cart.map ~ newImage",
            newImage
          );

          return {
            price_data: {
              currency: "zar",
              product_data: {
                name: item.name,
                images: [newImage],
              },
              unit_amount: item.price * 100,
            },
            adjustable_quantity: {
              enabled: true,
              minimum: 1,
            },
            quantity: item.count,
          };
        }),
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/canceled`,
      };

      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create(params);

      res.status(200).json(session);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
