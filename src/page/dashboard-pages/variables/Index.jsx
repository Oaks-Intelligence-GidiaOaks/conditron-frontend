import {
  Header,
  DashboardMenu,
  DashboardVariations,
} from "../../../components/layout";
import { Form, Field } from "react-final-form";
import { showAlert } from "../../../static/alert";
import validate from "validate.js";
import rtkMutation from "../../../utils/rtkMutation";
import {
  useSaveVariablesMutation,
  useGetVariablesQuery,
  useDeleteVariablesMutation,
  useUpdateVariablesMutation,
} from "../../../service/variables.service";
import "./variable.css";
import PropTypes from "prop-types";
import { useTable, usePagination, useGlobalFilter } from "react-table";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { BsChevronDoubleRight, BsChevronDoubleLeft } from "react-icons/bs";
import { Filter } from "../../../blocks/organization-block/Filter";
import { ClipLoader } from "react-spinners";
import React, { useMemo, useState, useEffect } from "react";
import { CiMenuKebab } from "react-icons/ci";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { FcDeleteDatabase, FcEditImage } from "react-icons/fc";

const constraints = {
  variable_name: {
    presence: true,
  },
};

function Index() {
  const [editRowData, setEditRowData] = useState(null);

  const openEditModal = (rowData) => {
    setEditRowData(rowData);
  };

  const [updateVariables] = useUpdateVariablesMutation();

  const handleEditSubmit = async (id, values) => {
    console.log("Edit Form Data:", id, values);

    try {
      await rtkMutation(updateVariables, { id, data: values });
      showAlert("Great!", "Variable has been updated Successfully", "success");
    } catch (error) {
      console.error("Unexpected error during update:", error);
      showAlert("Oops", "An unexpected error occurred", "error");
    }
  };

  const [deleteVariable] = useDeleteVariablesMutation();
  const handleDelete = async (rowId) => {
    try {
      console.log("Deleting row with ID:", rowId);

      await rtkMutation(deleteVariable, { id: rowId });
      showAlert("Great!", "Variable has been deleted Successfully", "success");
    } catch (error) {
      console.error("Error deleting variable:", error);
      showAlert(
        "Error",
        "An error occurred while deleting the variable",
        "error"
      );
    }
  };

  const validateForm = (values) => {
    return validate(values, constraints) || {};
  };

  const [Variable, { error, isSuccess }] = useSaveVariablesMutation({
    provideTag: ["Variable"],
  });

  const onSubmit = async (values) => {
    console.log(values);
    await rtkMutation(Variable, values);
    refetch();
  };

  useEffect(() => {
    if (isSuccess) {
      showAlert("Great", "Variable saved Successfully!", "success");
    } else if (error) {
      showAlert("Oops", error.data.message || "An error occurred", "error");
    }
  }, [isSuccess, error]);

  const COLUMNS = useMemo(
    () => [
      {
        Header: "S/N",
        accessor: (row, index) => index + 1,
      },
      {
        Header: "Variables",
        accessor: "variable_name",
      },
      {
        Header: "Action",
        accessor: "",
        Cell: ({ row }) => (
          <>
            <div className="btn-group dropend">
              <button
                type="button"
                className="btn btn-light dropdown-toggle me-2"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <CiMenuKebab size={25} />
              </button>
              <ul className="dropdown-menu">
                <li>
                  <button
                    type="button"
                    className="btn btn-sm"
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop"
                    onClick={() => openEditModal(row.original)}
                  >
                    <FcEditImage size={"20"} /> Edit
                  </button>
                </li>
                <li>
                  <button
                    className="btn btn-sm"
                    onClick={() => handleDelete(row.original._id)}
                  >
                    <FcDeleteDatabase size={"20"} /> Delete
                  </button>
                </li>
              </ul>
            </div>
          </>
        ),
      },
    ],
    []
  );

  const {
    data: variableData,
    isLoading,
    refetch,
  } = useGetVariablesQuery({ page: 1 });

  const totalCount = variableData?.total || 0;
  const calculatedPageCount = Math.ceil(totalCount / 10);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns: COLUMNS,
      data: useMemo(() => variableData?.variables || [], [variableData]),
      initialState: { pageIndex: 0, pageSize: 10 },
      manualPagination: true,
      pageCount: calculatedPageCount,
    },
    usePagination
  );

  useEffect(() => {
    refetch({ page: pageIndex + 1, pageSize: 10 });
  }, [refetch, pageIndex, pageSize]);

  console.log(variableData);

  console.log("pageIndex:", pageIndex);
  console.log("pageSize:", pageSize);
  console.log("canPreviousPage:", canPreviousPage);
  console.log("canNextPage:", canNextPage);

  return (
    <>
      <Header />
      <DashboardMenu />
      <DashboardVariations />

      <div className="container-fluid">
        <div className="row justify-content-center px-lg-5 pt-4 pb-5 gap-4">
          <div className="col-lg-4">
            <div className="card shadow">
              <div className="card-header">Add New Variable(s)</div>
              <div className="card-body">
                <Form
                  onSubmit={onSubmit}
                  validate={validateForm}
                  render={({ handleSubmit, form, submitting }) => (
                    <form onSubmit={handleSubmit}>
                      <div className="mb-3 mt-2">
                        <label
                          htmlFor="exampleFormControlInput1"
                          className="form-label"
                        >
                          Enter Variable
                        </label>
                        <Field
                          name="variable_name"
                          component="input"
                          type="text"
                          className="form-control variable-input"
                          placeholder="Enter Variable"
                        />
                        <Field name="_id" component="input" type="hidden" />

                        {form.getState().submitFailed &&
                          form.getState().errors.variable_name && (
                            <span className="text-danger">
                              {form.getState().errors.variable_name}
                            </span>
                          )}
                      </div>

                      <div className="text-center">
                        <button
                          type="submit"
                          className="btn submit-btn mt-4 mb-5"
                          // disabled={submitting || pristine}
                        >
                          {submitting ? (
                            <div className="loading-dots">
                              <span className="loading-dots-dot"></span>
                              <span className="loading-dots-dot"></span>
                              <span className="loading-dots-dot"></span>
                            </div>
                          ) : (
                            "Save"
                          )}
                        </button>
                      </div>
                    </form>
                  )}
                />
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="card shadow">
              <div className="card-header">Created Variables</div>
              <div className="card-body">
                {isLoading ? (
                  <ClipLoader color="#212121" loading={true} />
                ) : (
                  <>
                    {page.length === 0 ? (
                      <p className="text-center lead">No records available.</p>
                    ) : (
                      <>
                        {/* <div className="justify-content-start w-100 align-items-center pb-3">
                          <Filter
                            filter={globalFilter}
                            setFilter={setGlobalFilter}
                          />
                        </div> */}

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
                                    <th
                                      key={column.id}
                                      {...column.getHeaderProps()}
                                    >
                                      {column.render("Header")}
                                    </th>
                                  ))}
                                </tr>
                              ))}
                            </thead>

                            <tbody {...getTableBodyProps}>
                              {page.map((row) => {
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
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Modify Variable Name
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <Form
                onSubmit={(values) => handleEditSubmit(editRowData._id, values)}
                validate={validateForm}
                initialValues={editRowData}
                render={({ handleSubmit, form, submitting }) => (
                  <form onSubmit={handleSubmit}>
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label"
                    >
                      Variable Name
                    </label>
                    <Field
                      name="variable_name"
                      component="input"
                      type="text"
                      className="form-control variable-input"
                    />
                    {form.getState().submitFailed &&
                      form.getState().errors.variable_name && (
                        <span className="text-danger">
                          {form.getState().errors.variable_name}
                        </span>
                      )}

                    <div className="text-center">
                      <button
                        type="submit"
                        className="btn submit-btn mt-5 mb-3"
                        disabled={submitting}
                      >
                        {submitting ? (
                          <>
                            <span className="loading-dots">
                              <span className="loading-dots-dot"></span>
                              <span className="loading-dots-dot"></span>
                              <span className="loading-dots-dot"></span>
                            </span>
                          </>
                        ) : (
                          "Save"
                        )}
                      </button>
                    </div>
                  </form>
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

Index.propTypes = {
  row: PropTypes.object,
};

export default Index;
