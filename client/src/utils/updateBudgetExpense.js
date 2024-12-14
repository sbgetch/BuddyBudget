import getRefreshToken from "./refreshToken";

const updateBudgetExpense = async (selectedType, itemId, entry) => {
  const { refreshToken } = JSON.parse(localStorage.getItem("token"));
  const { accessToken } = await getRefreshToken(refreshToken);

  try {
    let detail = "";
    if (selectedType === "budget") {
      detail = "source";
    } else {
      detail = "category";
    }
    const reqBody = {
      [detail]: entry.detail,
      amount: entry.amount,
    };

    //update Budget or Expense
    const response = await fetch(
      `https://buddybudget-be.onrender.com/api/v1/${selectedType}s/${itemId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(reqBody),
      }
    );

    return await response.json();
  } catch (error) {
    console.log("Error:", error);
  }
};

export default updateBudgetExpense;
