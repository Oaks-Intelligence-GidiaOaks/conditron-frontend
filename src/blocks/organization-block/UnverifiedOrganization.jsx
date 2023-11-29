import React, { useMemo, useCallback, useState } from "react";
import PropTypes from "prop-types";
import {
  useGetUnverifiedOrganizationQuery,
  useApproveOrganizationMutation,
} from "../../service/organization.service";
import {
  useTable,
  usePagination,
  useGlobalFilter,
  useRowSelect,
  useExpanded,
} from "react-table";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { BsChevronDoubleRight, BsChevronDoubleLeft } from "react-icons/bs";
import { Filter } from "./Filter";
import { ClipLoader } from "react-spinners";
import { PiCaretUpBold, PiCaretDownBold } from "react-icons/pi";
import "./page.css";
import { showAlert } from "../../static/alert";
import { FaRegEye } from "react-icons/fa";
import { file } from "../../assets";

function getFileNameFromURL(url) {
  const pathname = new URL(url).pathname;
  const pathSegments = pathname.split("/");
  return pathSegments[pathSegments.length - 1];
}

function UnverifiedOrganization() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    data: organizationData,
    isLoading,
    // isError,
    refetch,
  } = useGetUnverifiedOrganizationQuery();

  const [approveOrganization] = useApproveOrganizationMutation();

  const handleApprove = (id) => {
    setIsSubmitting(true);
    approveOrganization({ id });
    refetch();
    showAlert(
      "Great!",
      "Organization has been approved Successfully",
      "success"
    );
    setIsSubmitting(false);
  };

  const COLUMNS = useMemo(
    () => [
      {
        Header: "S/N",
        accessor: (row, index) => index + 1,
      },
      {
        Header: "Organization Name",
        accessor: "organization_name",
      },
      {
        Header: "Admin Name",
        accessor: "admin_name",
      },
      {
        Header: "Admin Phone",
        accessor: "admin_phone",
      },
      {
        Header: "Admin Email",
        accessor: "admin_email",
      },
      {
        Header: "Country",
        accessor: "country",
      },
      {
        Header: "Action",
        accessor: "",
        Cell: ({ row }) => (
          <span
            {...row.getToggleRowExpandedProps()}
            onClick={() => handleToggleRow(row.id)}
          >
            {row.isExpanded ? (
              <button className="btn btn-light border border-dark">
                <PiCaretUpBold size={25} />
              </button>
            ) : (
              <button className="btn btn-light border border-dark">
                <PiCaretDownBold size={25} />
              </button>
            )}
          </span>
        ),
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    // page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    // setPageSize,
    setGlobalFilter,
    toggleAllRowsSelected,
    toggleRowExpanded,
  } = useTable(
    {
      columns: COLUMNS,
      data: useMemo(
        () => organizationData?.organizations || [],
        [organizationData]
      ),
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    useGlobalFilter,
    useExpanded,
    usePagination,
    useRowSelect
  );

  const { pageIndex, pageSize, globalFilter } = state;

  const handleToggleRow = useCallback(
    (id) => {
      toggleAllRowsSelected(false);
      toggleRowExpanded(id);
    },
    [toggleAllRowsSelected, toggleRowExpanded]
  );

  return (
    <div className="container-fluid">
      <div className="row justify-content-center pt-3 pb-3 px-lg-5">
        {isLoading ? (
          <ClipLoader color="#212121" loading={true} />
        ) : (
          <>
            {rows.length === 0 ? (
              <p className="text-center lead">No records available.</p>
            ) : (
              <>
                <div className="justify-content-start w-100 align-items-center pb-3">
                  <Filter filter={globalFilter} setFilter={setGlobalFilter} />
                </div>

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
                          {headerGroup.headers.map((column) => (
                            <th key={column.id} {...column.getHeaderProps()}>
                              {column.render("Header")}
                            </th>
                          ))}
                        </tr>
                      ))}
                    </thead>

                    <tbody {...getTableBodyProps}>
                      {rows.map((row) => {
                        prepareRow(row);
                        return (
                          <React.Fragment key={row.id}>
                            <tr {...row.getRowProps()}>
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
                            {row.isExpanded && (
                              <>
                                <tr>
                                  <td>
                                    <label className="text-xs">State</label>
                                    <br />

                                    {row.original.state}
                                  </td>
                                  <td>
                                    <label className="text-xs">Address</label>
                                    <br />
                                    {row.original.address}
                                  </td>
                                  <td>
                                    <label className="text-xs">
                                      Postal Code
                                    </label>
                                    <br />
                                    {row.original.postal_code}
                                  </td>
                                  <td colSpan={COLUMNS.length}>
                                    <label className="text-xs">
                                      Date of Incorporation
                                    </label>
                                    <br />
                                    {row.original.date_of_incorporation}
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <label className="text-xs">
                                      Letter of Authorization
                                    </label>
                                    <br />
                                    <div className="d-flex">
                                      <img
                                        src={file}
                                        alt="File Icon"
                                        className="file-icon"
                                      />

                                      <div className="file-name ms-3 pt-1">
                                        {getFileNameFromURL(
                                          row.original
                                            .letter_of_authorization_url
                                        )}
                                        <br />
                                        <a
                                          className="btn btn-light border btn-sm text-xs"
                                          href={
                                            row.original
                                              .letter_of_authorization_url
                                          }
                                          target="_blank"
                                          rel="noreferrer"
                                        >
                                          <FaRegEye size={15} /> View
                                        </a>
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <label className="text-xs">
                                      Identity Document
                                    </label>
                                    <br />
                                    <div className="d-flex">
                                      <img
                                        src={file}
                                        alt="File Icon"
                                        className="file-icon"
                                      />

                                      <div className="file-name ms-3 pt-1">
                                        {getFileNameFromURL(
                                          row.original
                                            .letter_of_authorization_url
                                        )}
                                        <br />
                                        <a
                                          className="btn btn-light border btn-sm text-xs"
                                          href={
                                            row.original
                                              .admin_identity_document_url
                                          }
                                          target="_blank"
                                          rel="noreferrer"
                                        >
                                          <FaRegEye size={15} /> View
                                        </a>
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <label className="text-xs">
                                      Certificate of Incorporation
                                    </label>
                                    <br />
                                    <div className="d-flex">
                                      <img
                                        src={file}
                                        alt="File Icon"
                                        className="file-icon"
                                      />

                                      <div className="file-name ms-3 pt-1">
                                        {getFileNameFromURL(
                                          row.original
                                            .letter_of_authorization_url
                                        )}
                                        <br />
                                        <a
                                          className="btn btn-light border btn-sm text-xs"
                                          href={
                                            row.original
                                              .certificate_of_incorporation_url
                                          }
                                          target="_blank"
                                          rel="noreferrer"
                                        >
                                          <FaRegEye size={15} /> View
                                        </a>
                                      </div>
                                    </div>
                                  </td>
                                  <td colSpan={COLUMNS.length} className="pt-3">
                                    <button
                                      className="btn approved me-3"
                                      onClick={() =>
                                        handleApprove(row.original._id)
                                      }
                                    >
                                      {isSubmitting
                                        ? "Approving..."
                                        : "Approve"}
                                    </button>
                                    {/* <button className="btn decline">
                                      Decline
                                    </button> */}
                                  </td>
                                </tr>
                              </>
                            )}
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
                      {pageIndex + 1} of {pageOptions.length}
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
  );
}

UnverifiedOrganization.propTypes = {
  row: PropTypes.object,
};

export default UnverifiedOrganization;
