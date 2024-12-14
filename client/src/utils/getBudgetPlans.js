import getRefreshToken from "./refreshToken";

const deleteItem = async (userId) => {
  const { refreshToken } = JSON.parse(localStorage.getItem("token"));
  const { accessToken } = await getRefreshToken(refreshToken);

  const response = await fetch(
    `https://buddybudget-be.onrender.com/api/v1/budgetPlans?userId=${userId}&isDeleted=false`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: "include",
    }
  );

  return await response.json();
};

export default deleteItem;
