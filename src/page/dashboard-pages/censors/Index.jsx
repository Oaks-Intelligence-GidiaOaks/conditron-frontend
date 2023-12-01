import {
  Header,
  DashboardMenu,
  DashboardVariations,
} from "../../../components/layout";
import { Form, Field } from "react-final-form";
import { showAlert } from "../../../static/alert";
import validate from "validate.js";
import rtkMutation from "../../../utils/rtkMutation";
import { useGetVariablesQuery } from "../../../service/variables.service";
import {
  useDeleteCensorsMutation,
  useSaveCensorsMutation,
  useUpdateCensorsMutation,
  useGetCensorsQuery,
} from "../../../service/censor.service";
import "../variables/variable.css";
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
import Select from "react-select";

const constraints = {
  sensor_name: {
    presence: true,
  },
  IPAddress: {
    presence: true,
  },
  no_of_variables: {
    presence: true,
  },
  variables: {
    presence: true,
  },
};

function Index() {
  const { data: variableData } = useGetVariablesQuery();
  const variables = variableData?.variables;
  console.log(variables);

  const { data: censorData, isLoading, refetch } = useGetCensorsQuery();

  console.log(censorData);

  const [editRowData, setEditRowData] = useState(null);

  const openEditModal = (rowData) => {
    setEditRowData(rowData);
  };

  const [updateCensor] = useUpdateCensorsMutation();

  const handleEditSubmit = async (id, values) => {
    console.log("Edit Form Data:", id, values);

    // Map variables to an array of strings
    const selectedVariables = values.variables.map(
      (variable) => variable.value
    );

    // Create a copy of values with updated variables
    const updatedValues = { ...values, variables: selectedVariables };

    try {
      await rtkMutation(updateCensor, { id, data: updatedValues });
      showAlert("Great!", "Censor has been updated Successfully", "success");
    } catch (error) {
      console.error("Unexpected error during update:", error);
      showAlert("Oops", "An unexpected error occurred", "error");
    }
  };

  const [deleteCensor] = useDeleteCensorsMutation();
  const handleDelete = async (rowId) => {
    try {
      console.log("Deleting row with ID:", rowId);

      await rtkMutation(deleteCensor, { id: rowId });
      showAlert("Great!", "Censor has been deleted Successfully", "success");
    } catch (error) {
      console.error("Error deleting censor:", error);
      showAlert(
        "Error",
        "An error occurred while deleting the censor",
        "error"
      );
    }
  };

  const validateForm = (values) => {
    return validate(values, constraints) || {};
  };

  const [Censor, { error, isSuccess }] = useSaveCensorsMutation({
    provideTag: ["Censor"],
  });

  const onSubmit = async (values) => {
    const selectedVariables = values.variables.map(
      (variable) => variable.value
    );
    const updatedValues = { ...values, variables: selectedVariables };
    await rtkMutation(Censor, updatedValues);
    refetch();
  };

  useEffect(() => {
    if (isSuccess) {
      showAlert("Great", "Censor created Successfully!", "success");
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
        Header: "Censor Name",
        accessor: "sensor_name",
      },
      {
        Header: "IP Address",
        accessor: "IPAddress",
      },
      {
        Header: "No. of Variables",
        accessor: "no_of_variables",
      },
      {
        Header: "Variables",
        accessor: (row) =>
          row.variables.map((variable) => variable.variable_name).join(", "),
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
                    data-bs-target="#updateCensor"
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
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    setGlobalFilter,
  } = useTable(
    {
      columns: COLUMNS,
      data: useMemo(() => censorData?.sensors || [], [censorData]),
    },
    useGlobalFilter,
    usePagination
  );

  const { pageIndex, globalFilter } = state;
  //   console.log("Table State:", state);
  //   console.log("Page Count:", pageCount);

  return (
    <>
      <Header />
      <DashboardMenu />
      <DashboardVariations />

      <div className="container-fluid">
        <div className="row px-lg-5 justify-content-end me-lg-1">
          <button
            className="btn btn-light w-auto border"
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#addCensor"
          >
            Create Censor
          </button>
        </div>
        <div className="row px-lg-5 justify-content-center align-items-center py-5">
          <div className="col-lg-12">
            <div className="card shadow">
              <div className="card-header">Created Censors</div>
              <div className="card-body">
                {isLoading ? (
                  <ClipLoader color="#212121" loading={true} />
                ) : (
                  <>
                    {rows.length === 0 ? (
                      <p className="text-center lead">No records available.</p>
                    ) : (
                      <>
                        <div className="justify-content-start w-100 align-items-center pb-3">
                          <Filter
                            filter={globalFilter}
                            setFilter={setGlobalFilter}
                          />
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
        id="updateCensor"
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
                Create Censor
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
                initialValues={{
                  sensor_name: editRowData.sensor_name,
                  IPAddress: editRowData.IPAddress,
                  no_of_variables: editRowData.no_of_variables,
                  variables: editRowData.variables.map((variable) => ({
                    value: variable._id,
                    label: variable.variable_name,
                  })),
                }}
                render={({ handleSubmit, form, submitting }) => (
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label
                        htmlFor="exampleFormControlInput1"
                        className="form-label"
                      >
                        Enter censor name
                      </label>
                      <Field
                        name="sensor_name"
                        component="input"
                        type="text"
                        className="form-control variable-input"
                      />
                      {form.getState().submitFailed &&
                        form.getState().errors.sensor_name && (
                          <span className="text-danger">
                            {form.getState().errors.sensor_name}
                          </span>
                        )}
                    </div>

                    <div className="mb-3">
                      <label
                        htmlFor="exampleFormControlInput1"
                        className="form-label"
                      >
                        Enter IP-Address
                      </label>
                      <Field
                        name="IPAddress"
                        component="input"
                        type="text"
                        className="form-control variable-input"
                      />
                      {form.getState().submitFailed &&
                        form.getState().errors.IPAddress && (
                          <span className="text-danger">
                            {form.getState().errors.IPAddress}
                          </span>
                        )}
                    </div>

                    <div className="mb-3">
                      <label
                        htmlFor="exampleFormControlInput1"
                        className="form-label"
                      >
                        Number of Variables
                      </label>
                      <Field
                        name="no_of_variables"
                        component="input"
                        type="number"
                        className="form-control variable-input"
                      />
                      {form.getState().submitFailed &&
                        form.getState().errors.no_of_variables && (
                          <span className="text-danger">
                            {form.getState().errors.no_of_variables}
                          </span>
                        )}
                    </div>
                    <div className="mb-5">
                      <label
                        htmlFor="exampleFormControlInput1"
                        className="form-label"
                      >
                        Select Variable
                      </label>
                      <Field
                        name="variables"
                        component={({ input }) => (
                          <Select
                            {...input}
                            isMulti
                            options={variables?.map((row) => ({
                              value: row._id,
                              label: row.variable_name,
                            }))}
                            placeholder="-- Select variable(s) --"
                          />
                        )}
                      />
                      {form.getState().submitFailed &&
                        form.getState().errors.variables && (
                          <span className="text-danger">
                            {form.getState().errors.variables}
                          </span>
                        )}
                    </div>

                    <div className="text-center">
                      <button
                        type="submit"
                        className="btn submit-btn mb-5 w-100"
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
                          "Update"
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

      <div
        className="modal fade"
        id="addCensor"
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
                Create Censor
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
                onSubmit={onSubmit}
                validate={validateForm}
                render={({ handleSubmit, form, submitting }) => (
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label
                        htmlFor="exampleFormControlInput1"
                        className="form-label"
                      >
                        Enter censor name
                      </label>
                      <Field
                        name="sensor_name"
                        component="input"
                        type="text"
                        className="form-control variable-input"
                      />
                      {form.getState().submitFailed &&
                        form.getState().errors.sensor_name && (
                          <span className="text-danger">
                            {form.getState().errors.sensor_name}
                          </span>
                        )}
                    </div>

                    <div className="mb-3">
                      <label
                        htmlFor="exampleFormControlInput1"
                        className="form-label"
                      >
                        Enter IP-Address
                      </label>
                      <Field
                        name="IPAddress"
                        component="input"
                        type="text"
                        className="form-control variable-input"
                      />
                      {form.getState().submitFailed &&
                        form.getState().errors.IPAddress && (
                          <span className="text-danger">
                            {form.getState().errors.IPAddress}
                          </span>
                        )}
                    </div>

                    <div className="mb-3">
                      <label
                        htmlFor="exampleFormControlInput1"
                        className="form-label"
                      >
                        Number of Variables
                      </label>
                      <Field
                        name="no_of_variables"
                        component="input"
                        type="number"
                        className="form-control variable-input"
                      />
                      {form.getState().submitFailed &&
                        form.getState().errors.no_of_variables && (
                          <span className="text-danger">
                            {form.getState().errors.no_of_variables}
                          </span>
                        )}
                    </div>
                    <div className="mb-5">
                      <label
                        htmlFor="exampleFormControlInput1"
                        className="form-label"
                      >
                        Select Variable
                      </label>
                      <Field
                        name="variables"
                        component={({ input }) => (
                          <Select
                            {...input}
                            isMulti
                            options={variables?.map((row) => ({
                              value: row._id,
                              label: row.variable_name,
                            }))}
                            placeholder="-- Select variable(s) --"
                          />
                        )}
                      />
                      {form.getState().submitFailed &&
                        form.getState().errors.variables && (
                          <span className="text-danger">
                            {form.getState().errors.variables}
                          </span>
                        )}
                    </div>

                    <div className="text-center">
                      <button
                        type="submit"
                        className="btn submit-btn mb-5 w-100"
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