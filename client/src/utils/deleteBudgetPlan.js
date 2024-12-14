import getRefreshToken from "./refreshToken";

const deleteItem = async (itemId) => {
  const { refreshToken } = JSON.parse(localStorage.getItem("token"));
  const { accessToken } = await getRefreshToken(refreshToken);

  const response = await fetch(
    `https://buddybudget-be.onrender.com/api/v1/budgetPlans/${itemId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return await response.json();
};

export default deleteItem;
