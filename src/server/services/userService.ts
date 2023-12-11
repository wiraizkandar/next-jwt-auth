export const userService = {
	authenticate,
};

async function authenticate(username: string, password: string) {
	try {
		// Create a new URLSearchParams object
		const formData = new URLSearchParams();

		// Add form fields and values to the URLSearchParams object
		formData.append("username", "ultron");
		formData.append("password", "password");

		process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

		const authenticateRequest = await fetch(
			"https://hostedapi.test/api/v1/auth/authenticate",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
				body: formData.toString(),
			}
		);

		const user = await authenticateRequest.json();

		return user;
	} catch (error) {
		console.log(error);
	}
}
