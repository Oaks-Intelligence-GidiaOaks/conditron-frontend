import { formatErrorResponse } from "./formatErrorResponse";
const rtkMutation = async (request, credentials) => {
  let data = null;
  let errorData = null;
  try {
    const result = await request(credentials).unwrap();
    data = result.data;
    console.log("API Response:", result);
  } catch (error) {
    errorData = formatErrorResponse(error);
    console.error("API Error:", errorData);
  }

  return { data, errorData };
};

export default rtkMutation;
