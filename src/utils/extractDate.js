// dateUtils.js

export const extractDate = (dateTimeString) => {
  try {
    const date = new Date(dateTimeString);
    return date.toISOString().split("T")[0];
  } catch (error) {
    return null;
  }
};
