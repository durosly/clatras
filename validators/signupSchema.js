import { z } from "zod";

const UserSchema = z.object({
	name: z.string().trim().min(1, { message: "Enter name" }),
	email: z.string().trim().email({ message: "Invalid email address" }),
	password: z
		.string()
		.min(8, { message: "Password must be atleast 8 characters" }),
	phonenumber: z
		.string()
		.trim()
		.min(5, { message: "Phonenumber is too short" }),
});

export default UserSchema;
