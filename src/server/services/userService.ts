export const userService = {
	authenticate,
	getAuthenticatedUser,
};

async function getAuthenticatedUser(token: string) {
	const accessToken = token;

	const userData = await fetch("https://hostedapi.test/api/v1/auth/me", {
		method: "GET",
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	});

	const userInfo = await userData.json();

	userInfo.access_token = accessToken;

	return userInfo;
}

async function authenticate(username: string, password: string) {
	// Create a new URLSearchParams object
	const formData = new URLSearchParams();

	// Add form fields and values to the URLSearchParams object
	formData.append("username", "ultron");
	formData.append("password", "password");

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

	const token = await authenticateRequest.json();

	const user = await getAuthenticatedUser(token.access_token);

	// get user by on token
	return user;
}
