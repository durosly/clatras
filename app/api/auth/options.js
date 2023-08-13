import CredentialsProvider from "next-auth/providers/credentials";
import { AppwriteServerClient } from "@/lib/client-server";

export const authOptions = {
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
					isAdmin: account.prefs?.isAdmin
						? Boolean(account.prefs.isAdmin)
						: false,
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
				token.userId = user.$id;
				token.isAdmin = user.isAdmin;
			}
			return token;
		},
	},
	pages: {
		signIn: "/login",
	},
};
