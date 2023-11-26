// enviroments
const environment = {
  production: {
    API_BASE_URL:
      "https://conditron-backend-bcb66b436c43.herokuapp.com/api/v1/",
  },
  development: {
    API_BASE_URL: "http://localhost:5000/api/v1/",
  },
};

const currentEnvironment = import.meta.env.VITE_REACT_APP_ENV || "development";

export default environment[currentEnvironment];
