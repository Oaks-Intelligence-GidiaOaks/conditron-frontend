import { Header, DashboardMenu } from "../../../components/layout";
import React, { useMemo, useState, useEffect } from "react";
import { useGetRiskDataQuery } from "../../../service/risk.service";
import { useTable, usePagination, useGlobalFilter } from "react-table";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { BsChevronDoubleRight, BsChevronDoubleLeft } from "react-icons/bs";
import { ClipLoader } from "react-spinners";
import PropTypes from "prop-types";
import RadarChartExample from "../../../utils/RadarChartExample";
import BarChartExample from "../../../utils/BarChartExample";
import QuarterlyChart from "../../../utils/QuarterlyChart";
import HeatmapChart from "../../../utils/HeatmapChart";
import LineChartExample from "../../../utils/LineChartExample";
import io from "socket.io-client";

export default function Index() {
  const [organizationId, setOrganizationId] = useState("");
  const {
    data: riskData,
    isLoading,
    refetch,
  } = useGetRiskDataQuery(organizationId);
  console.log(riskData);

  const totalCount = riskData?.total || 0;
  const calculatedPageCount = Math.ceil(totalCount / 10);

  const COLUMNS = useMemo(
    () => [
      {
        Header: "Asset Name",
        accessor: "asset.asset_name",
      },
      {
        Header: "Asset Type",
        accessor: "asset.asset_type",
      },
      {
        Header: "Data Source",
        accessor: "asset.data_source",
      },
      {
        Header: "Latitude",
        accessor: "asset.latitude",
      },
      {
        Header: "Longitude",
        accessor: "asset.longitude",
      },
      {
        Header: "Risk Level",
        accessor: (row) => {
          const riskValues = row.riskValues.map((values) => values.risk);

          if (riskValues.length === 0) {
            return null; // or any default value for no risk values
          }

          const lastRisk = riskValues[riskValues.length - 1];
          const percentage = lastRisk; // assuming the raw risk values are in the range [0, 100]

          // Define your risk ranges and corresponding background colors here
          const riskRanges = [
            { range: [0, 20], color: "#00ff00" }, // Green
            { range: [21, 50], color: "#ffff00" }, // Yellow
            { range: [51, 80], color: "#ffa500" }, // Orange
            { range: [81, 100], color: "#ff0000" }, // Red
          ];

          // Find the matching range and return the corresponding color
          const matchingRange = riskRanges.find((range) => {
            return percentage >= range.range[0] && percentage <= range.range[1];
          });

          const backgroundColor = matchingRange
            ? matchingRange.color
            : "#000000"; // Default to black for unknown range

          return (
            <div className="border bg-light d-flex align-items-center">
              <div
                style={{
                  width: `${percentage}%`,
                  height: "20px",
                  backgroundColor: backgroundColor,
                }}
              ></div>
              <div style={{ marginLeft: "8px", flex: "1" }}>
                {percentage.toFixed(2)}%
              </div>
            </div>
          );
        },
      },
    ],
    []
  );

  Index.propTypes = {
    row: PropTypes.object,
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    state: { pageIndex, pageSize, globalFilter },
    setGlobalFilter,
  } = useTable(
    {
      columns: COLUMNS,
      data: useMemo(() => riskData?.risks || [], [riskData]),
      initialState: { pageIndex: 0, pageSize: 10 },
      manualPagination: true,
      pageCount: calculatedPageCount,
    },
    useGlobalFilter,
    usePagination
  );

  const [selectedAsset, setSelectedAsset] = useState(null);
  const [selectedRisk, setSelectedRisk] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!riskData?.risks) {
        await refetch();
      }

      if (riskData?.risks.length > 0) {
        const initialAsset = riskData.risks[1].asset;
        const organization_id = initialAsset.organization_id;
        const riskVal = riskData.risks[1].riskValues.slice(-20);

        // Use a callback to update state
        setSelectedAsset(initialAsset);
        setSelectedRisk(riskVal);
        setOrganizationId(organization_id);
        refetch({ organizationId });
      }
    };

    fetchData();
  }, [riskData, refetch]);

  useEffect(() => {
    if (selectedAsset) {
      const socket = io("https://conditron-backend-bcb66b436c43.herokuapp.com");

      socket.on("connect", () => {
        console.log("Connected to the server!");
        socket.emit("join", selectedAsset.organization_id.toString());
      });

      socket.on("riskValueUpdate", (data) => {
        setSelectedRisk(data.riskValues);
        refetch({ organizationId });
      });

      return () => {
        console.log("Disconnecting from the server...");
        socket.disconnect();
      };
    }
  }, [selectedAsset, organizationId, refetch]);

  return (
    <>
      <Header />
      <DashboardMenu />
      <div className="container-fluid">
        <div className="row justify-content-start pt-4 pb-3 px-lg-5">
          <div className="col-lg-6">
            <div className="card">
              <div className="p-3">
                <div className="">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                  >
                    Filter Asset
                  </label>
                  <select
                    name="asset_name"
                    className="form-control variable-input"
                    onChange={(e) => {
                      const selectedAssetId = e.target.value;
                      const asset = riskData.risks.find(
                        (data) => data._id === selectedAssetId
                      )?.asset;
                      const riskVal = riskData.risks.find(
                        (data) => data._id === selectedAssetId
                      )?.riskValues;
                      setSelectedAsset(asset);
                      setSelectedRisk(riskVal.slice(-20));
                      console.log(riskVal);
                    }}
                  >
                    <option value="" disabled>
                      Select an asset
                    </option>
                    {riskData && riskData.risks && riskData.risks.length > 0 ? (
                      riskData.risks.map((data, index) => (
                        <option key={index} value={data._id}>
                          {data.asset.asset_name}
                        </option>
                      ))
                    ) : (
                      <option value="" disabled>
                        No assets available
                      </option>
                    )}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row pt-4 pb-5 px-lg-5">
          <div className="col-lg-12">
            {selectedAsset && selectedRisk && selectedRisk.length > 0 && (
              <>
                <div className="row justify-content-center">
                  <div className="col-lg-12">
                    <div className="card shadow">
                      <div className="card-body">
                        <LineChartExample selectedRisk={selectedRisk} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row row-cols-1 row-cols-md-2 g-4 pt-4">
                  <div className="col">
                    <div className="card h-100 shadow">
                      <div className="card-body">
                        <RadarChartExample />
                      </div>
                    </div>
                  </div>

                  <div className="col">
                    <div className="card h-100 shadow">
                      <div className="card-body">
                        <BarChartExample />
                      </div>
                    </div>
                  </div>

                  <div className="col">
                    <div className="card h-100 shadow">
                      <div className="card-body">
                        <QuarterlyChart />
                      </div>
                    </div>
                  </div>

                  <div className="col">
                    <div className="card h-100 shadow">
                      <div className="card-body">
                        <HeatmapChart />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="row justify-content-center pt-5 pb-3 px-lg-5">
          {isLoading ? (
            <ClipLoader color="#212121" loading={true} />
          ) : (
            <>
              {page.length === 0 ? (
                <p className="text-center lead">No records available.</p>
              ) : (
                <>
                  <div className="table-responsive">
                    <table
                      className="table table-hover table-borderless table-striped"
                      {...getTableProps}
                    >
                      <thead>
                        {headerGroups.map((headerGroup, index) => (
                          <tr
                            key={headerGroup.id || index}
                            {...headerGroup.getHeaderGroupProps()}
                          >
                            <th>S/N</th>
                            {headerGroup.headers.map((column) => (
                              <th key={column.id} {...column.getHeaderProps()}>
                                {column.render("Header")}
                              </th>
                            ))}
                          </tr>
                        ))}
                      </thead>

                      <tbody {...getTableBodyProps}>
                        {page.map((row, localIndex) => {
                          const globalIndex =
                            pageIndex * pageSize + localIndex + 1;
                          prepareRow(row);
                          return (
                            <React.Fragment key={row.id}>
                              <tr {...row.getRowProps()}>
                                <td>{globalIndex}</td>
                                {row.cells.map((cell) => {
                                  return (
                                    <td
                                      key={cell.column.id}
                                      {...cell.getCellProps()}
                                    >
                                      {cell.render("Cell")}
                                    </td>
                                  );
                                })}
                              </tr>
                            </React.Fragment>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  <div className="d-flex justify-content-end align-items-center pt-3">
                    <p className="pt-3 me-3 text-xs">
                      Page{" "}
                      <span className="ms-1">
                        {pageIndex + 1} of {calculatedPageCount}
                      </span>
                    </p>
                    <button
                      className="btn btn-light border me-3 ms-3"
                      onClick={() => gotoPage(0)}
                      disabled={!canPreviousPage}
                    >
                      <BsChevronDoubleLeft />
                    </button>
                    <button
                      className="btn btn-dark border me-3"
                      onClick={() => previousPage()}
                      disabled={!canPreviousPage}
                    >
                      <IoIosArrowBack />
                    </button>
                    <button
                      className="btn btn-dark border me-3"
                      onClick={() => nextPage()}
                      disabled={!canNextPage}
                    >
                      <IoIosArrowForward />
                    </button>
                    <button
                      className="btn btn-light border"
                      onClick={() => gotoPage(pageCount - 1)}
                      disabled={!canNextPage}
                    >
                      <BsChevronDoubleRight />
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
