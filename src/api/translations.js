import { API_URL } from "../consts";

export const getTranslations = async (language, page = null) => {
  let url = `${API_URL}/api/v1/translation?lang=${language}`;
  if (page) {
    url += `&page=${page}`;
  }

  try {
    const response = await fetch(url);
    return response.json();
  } catch (error) {
    console.log(error);
    return { error: true, data: error.message };
  }
};
