import { z } from "zod";

const CryptoSchema = z.object({
	name: z.string().trim().min(1, { message: "Enter name" }),
	address: z.string().trim().min(1, { message: "Address cannot be empty" }),
	network: z.any(),
	rate: z.coerce.number().positive(),
	abbr: z.string().trim().min(1, { message: "Abbreviation cannot be empty" }),
	bulk_rate: z.coerce.number().positive(),
	bulk_rate_qty: z.coerce.number().positive(),
});

export default CryptoSchema;
