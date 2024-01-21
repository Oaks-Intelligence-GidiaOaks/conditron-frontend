import { RISK_ANALYSIS } from "./constants";
import apiSlice from "./api/apiSlice";
import io from "socket.io-client";

export const riskApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRiskData: builder.query({
      query: () => ({
        url: RISK_ANALYSIS,
        method: "GET",
      }),
      providesTags: ["Risk"],
      subscribe: (query, { subscriptionHooks, dispatch }, orgId) => {
        const { useGetRiskDataQuery } = subscriptionHooks;

        // Connect to socket.io server
        const socket = io(
          "https://conditron-backend-bcb66b436c43.herokuapp.com"
        );

        socket.on("connect", () => {
          console.log("Connected to the server!");
          socket.emit("join", orgId);
        });

        socket.on("riskValueUpdate", (data) => {
          const riskDataQuery = useGetRiskDataQuery();
          console.log("Received riskValueUpdate event:", data);
          console.log("Current riskDataQuery:", riskDataQuery);

          // Update the cache with the new data
          const transformedData =
            riskApiSlice.endpoints.getRiskData.transformResult(data);
          console.log("Transformed data:", transformedData);

          dispatch(transformedData);
          query.invalidateTags(["Risk"]);
        });

        socket.on("disconnect", () => {
          console.log("Disconnected from the server!");
        });

        return () => {
          console.log("Disconnecting from the server...");
          socket.disconnect();
        };
      },
    }),
  }),
});

export const { useGetRiskDataQuery } = riskApiSlice;
