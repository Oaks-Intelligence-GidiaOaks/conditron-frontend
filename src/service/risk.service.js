import { RISK_ANALYSIS } from "./constants";
import apiSlice from "./api/apiSlice";
import io from "socket.io-client";

export const riskApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRiskData: builder.query({
      providesTags: ["Risk"],
      query: () => ({
        url: RISK_ANALYSIS,
        method: "GET",
      }),
      transformResponse: (response) => {
        return response;
      },
      onCacheEntryAdded: async (
        orgId,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) => {
        // connect to socket
        const ws = io("https://conditron-backend-bcb66b436c43.herokuapp.com");

        // User id join connection
        ws.on("connect", () => {
          ws.emit("join", orgId);
          console.log("connected!");
        });

        try {
          // wait till cache is populated for first request
          await cacheDataLoaded;

          // set up listener callback for "newMessage" socket emit
          const listener = (event) => {
            console.log(event, "evn");
            // update rtk cache
            updateCachedData((data) => {
              console.log(data);
              data[0].risks.unshift(event);
              return data;
            });
          };

          ws.on("riskValueUpdate", listener);
        } catch (error) {
          // res.undo()
        }
        // cleanup, close connection when cache is removed
        await cacheEntryRemoved;
        ws.close();
      },
    }),
  }),
});

export const { useGetRiskDataQuery } = riskApiSlice;
