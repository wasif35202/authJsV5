"use server";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import * as z from "zod";
import { RegisterSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail} from "@/lib/mail";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  // Parse and validate the input values against the schema
  const validatedFields = RegisterSchema.safeParse(values);
  if (!validatedFields.success) {
    return { success: false, error: "Invalid credentials", details: validatedFields.error };
  }

  const { email, password, name } = validatedFields.data;
  
  // Check if the email already exists
  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return { success: false, error: "Email already exists" };
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create a new user in the database
    await db.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });
    
    // Generate a verification token
    const verificationToken = await generateVerificationToken(email);
    
    // Send the verification email
    await sendVerificationEmail(verificationToken.email, verificationToken.token);

    return { success: true, message: "Confirmation Email Sent!" };
  } catch (error) {
    console.error("Registration Error:", error);
    return { success: false, error: "Failed to register user. Please try again." };
  }
};
