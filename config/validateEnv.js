import dotenv from "dotenv";
import z from "zod";

dotenv.config() // Load .env file into process.env object

const envSchema = z.object({
   PORT: z.string().transform(Number).default("3000"),
   MONGODB_URI: z.string().url(),
   SALT_ROUNDS: z.string().transform(Number).default("10")
});

const parsed = envSchema.safeParse(process.env);

if(!parsed.success) {
   console.error("Invalid environment variables", parsed.error.format());
   process.exit(1);
}

export const env = parsed.data;