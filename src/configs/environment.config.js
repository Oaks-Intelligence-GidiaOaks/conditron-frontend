// enviroments
const environment = {
  production: {
    API_BASE_URL: "",
  },
  development: {
    API_BASE_URL: "http://localhost:5000/api/v1/",
  },
};

const currentEnvironment = import.meta.env.VITE_REACT_APP_ENV || "development";

export default environment[currentEnvironment];
