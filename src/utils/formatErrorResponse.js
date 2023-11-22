export const formatErrorResponse = (error) => {
  if (!error) {
    return null;
  }
  const message = error?.data?.message ?? error?.error;
  return message;
};
