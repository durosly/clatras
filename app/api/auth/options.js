import CredentialsProvider from "next-auth/providers/credentials";
import { AppwriteServerClient } from "@/lib/client-server";

export const authOptions = {
	session: {
		// Seconds - How long until an idle session expires and is no longer valid.
		maxAge: 30 * 24 * 60 * 2, // 2 days
	},
	// Configure one or more authentication providers
	providers: [
		CredentialsProvider({
			name: "Credentials",

			async authorize(credentials) {
				const { token } = credentials;
				if (!token) {
					throw new Error("No token entered");
				}

				const app = new AppwriteServerClient();
				app.setToken(token);
				const account = await app.getAccount();

				if (!account) {
					throw new Error("No account found");
				}

				return {
					userId: account.$id,
					name: account.name,
					isAdmin: account.prefs?.isAdmin === true ? true : false,
					email: account.email,
				};
			},
		}),
	],
	callbacks: {
		async session({ session, token }) {
			if (session?.user) {
				session.user.userId = token.userId;
				session.user.isAdmin = token.isAdmin;
			}
			return session;
		},
		async jwt({ token, user }) {
			if (user) {
				token.userId = user.userId;
				token.isAdmin = user.isAdmin;
			}
			return token;
		},
	},
	pages: {
		signIn: "/login",
	},
};
