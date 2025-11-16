import { API_URL } from "../consts";

export const fetchAllProducts = async () => {
  try {
    const res = await fetch(`${API_URL}/api/v1/pricelist`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    return await res.json();
  } catch (error) {
    console.log(error);
    return { error: true, data: error?.message };
  }
};

export const updateProduct = async (id, body) => {
  try {
    const res = await fetch(`${API_URL}/api/v1/pricelist/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(body),
    });

    return await res.json();
  } catch (error) {
    console.log(error);
    return { error: true, data: error?.message };
  }
};
