import { z } from "zod";

const UserSchema = z.object({
	firstname: z.string().min(1, { message: "Enter firstname" }),
	lastname: z.string().min(1, { message: "Enter lastname" }),
	email: z.string().email({ message: "Invalid email address" }),
	password: z
		.string()
		.min(8, { message: "Password must be atleast 8 characters" }),
	phonenumber: z.string().min(5, { message: "Phonenumber is too short" }),
});

export default UserSchema;
