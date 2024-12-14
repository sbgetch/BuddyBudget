const refreshToken = async (token) => {
  const response = await fetch(
    `https://buddybudget-be.onrender.com/api/v1/auth/refresh-token`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ token }),
    }
  );

  return await response.json();
};

export default refreshToken;
