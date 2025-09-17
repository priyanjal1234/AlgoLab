import { z } from "zod";

const registerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(10, "Phone number must be of 10 digits only"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default registerSchema;
