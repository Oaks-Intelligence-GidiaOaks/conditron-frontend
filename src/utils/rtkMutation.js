import { formatErrorResponse } from "./formatErrorResponse";
const rtkMutation = async (request, credentials) => {
  let data = null;
  let errorData = null;
  try {
    const result = await request(credentials).unwrap();
    data = result.data;
  } catch (error) {
    errorData = formatErrorResponse(error);
  }

  return { data, errorData };
};

export default rtkMutation;
