require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const express = require("express");
const router = express.Router();

const YOUR_DOMAIN = "http://localhost:5173";

router.post("/create-checkout-session", async (req, res) => {
  const user = req.body;

  const line_items = req.body.cartItems?.map((book) => {
    return {
      price_data: {
        currency: "aed",
        product_data: {
          name: book?.arTitle,
          images: [book?.img],
          description: book?.arDescription,
          metadata: {
            id: book?._id,
          },
        },
        unit_amount: +book.price * 100,
      },
      quantity: book.quantity,
    };
  });

  const session = await stripe.checkout.sessions.create({
    shipping_address_collection: {
      allowed_countries: ["AE", "EG", "BH", "OM", "SA"],
    },
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 10 * 100,
            currency: "aed",
          },
          display_name: "Shipping",
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 1,
            },
            maximum: {
              unit: "business_day",
              value: 3,
            },
          },
        },
      },
    ],
    phone_number_collection: {
      enabled: true,
    },
    line_items,
    mode: "payment",
    success_url: `${YOUR_DOMAIN}/checkout-success`,
    cancel_url: `${YOUR_DOMAIN}/shopping-cart`,
  });

  res.send({ url: session.url });
});

module.exports = router;
