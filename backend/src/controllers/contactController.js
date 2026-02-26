import { z } from "zod";
import { ContactMessage } from "../model/ContactMessage.js";

const contactSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email().max(120),
  subject: z.string().min(2).max(120),
  message: z.string().min(10).max(2000)
});

export async function createContactMessage(req, res) {
  try {
    const payload = contactSchema.parse(req.body);

    const doc = await ContactMessage.create(payload);

    return res.status(201).json({
      ok: true,
      message: "Message sent successfully",
      id: doc._id
    });
  } catch (err) {
    if (err?.name === "ZodError") {
      return res.status(400).json({ ok: false, error: err.errors });
    }
    return res.status(500).json({ ok: false, error: err.message });
  }
}