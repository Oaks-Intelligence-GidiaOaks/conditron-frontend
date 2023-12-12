import "katex/dist/katex.min.css";
import {
  Header,
  DashboardMenu,
  // DashboardVariations,
} from "../../../components/layout";
import PropTypes from "prop-types";
import { useTable, usePagination, useGlobalFilter } from "react-table";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { BsChevronDoubleRight, BsChevronDoubleLeft } from "react-icons/bs";
import { Filter } from "../../../blocks/organization-block/Filter";
import { ClipLoader } from "react-spinners";
import React, { useMemo, useState, useEffect } from "react";
import { CiMenuKebab } from "react-icons/ci";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import {
  useGetModelQuery,
  useDeleteModelMutation,
  useSaveModelMutation,
  useUpdateModelMutation,
  useDisableModelsMutation,
} from "../../../service/models.service";
import { useGetAllVariablesQuery } from "../../../service/variables.service";
import { Form, Field } from "react-final-form";
import { showAlert } from "../../../static/alert";
import validate from "validate.js";
import rtkMutation from "../../../utils/rtkMutation";
import Select from "react-select";
import { FiToggleLeft, FiToggleRight } from "react-icons/fi";
import { LuClipboardEdit } from "react-icons/lu";
import { AiOutlineDeleteRow } from "react-icons/ai";
import { MathsQuill } from "../../../components/widget";

const constraints = {
  model_name: {
    presence: true,
  },
  // model: {
  //   presence: true,
  // },
  nature_of_output: {
    presence: true,
  },
  range: {
    presence: true,
  },
  no_of_operation_zone: {
    presence: true,
  },
  // variables: {
  //   presence: true,
  // },
};

function Index() {
  const { data: variableData } = useGetAllVariablesQuery();
  const variables = variableData?.variables;
  console.log(variableData);

  const [pageNumber, setPageNumber] = useState(1);
  const {
    data: modelsData,
    isLoading,
    refetch,
  } = useGetModelQuery({ page: pageNumber });

  const totalCount = modelsData?.total || 0;
  const calculatedPageCount = Math.ceil(totalCount / 10);

  console.log(modelsData);

  const [editRowData, setEditRowData] = useState(null);

  const openEditModal = (rowData) => {
    setEditRowData(rowData);
  };

  const closeEditModal = () => {
    setEditRowData(null);
  };

  const [deleteCensor] = useDeleteModelMutation();
  const handleDelete = async (rowId) => {
    try {
      console.log("Deleting row with ID:", rowId);

      await rtkMutation(deleteCensor, { id: rowId });
      showAlert("Great!", "Model has been deleted Successfully", "success");
    } catch (error) {
      console.error("Error deleting model:", error);
      showAlert("Error", "An error occurred while deleting the model", "error");
    }
  };

  const [Model, { error, isSuccess }] = useSaveModelMutation({
    provideTag: ["Model"],
  });

  const validateForm = (values) => {
    const errors = validate(values, constraints);
    return errors || {};
  };

  const onSubmit = async (values, form) => {
    console.log(values);
    // const selectedVariables = values.variables.map(
    //   (variable) => variable.value
    // );
    // const updatedValues = { ...values, variables: selectedVariables };
    // await rtkMutation(Model, updatedValues);
    // refetch();
    // form.reset();
  };

  useEffect(() => {
    if (isSuccess) {
      showAlert("Great", "Censor created Successfully!", "success");
    } else if (error) {
      showAlert("Oops", error.data.message || "An error occurred", "error");
    }
  }, [isSuccess, error]);

  const [updateModel] = useUpdateModelMutation();
  const handleEditSubmit = async (id, values) => {
    console.log("Edit Form Data:", id, values);

    // Map variables to an array of strings
    const selectedVariables = values.variables.map(
      (variable) => variable.value
    );

    // Create a copy of values with updated variables
    const updatedValues = { ...values, variables: selectedVariables };

    try {
      await rtkMutation(updateModel, { id, data: updatedValues });
      showAlert("Great!", "Model has been updated Successfully", "success");
      closeEditModal();
    } catch (error) {
      console.error("Unexpected error during update:", error);
      showAlert("Oops", "An unexpected error occurred", "error");
    }
  };

  const [toggleVariable] = useDisableModelsMutation();
  const handleToggle = async (rowId, values) => {
    try {
      await rtkMutation(toggleVariable, { id: rowId, data: values });
      showAlert("Great!", "Model has been toggled Successfully", "success");
    } catch (error) {
      console.error("Error toggling model:", error);
      showAlert("Error", "An error occurred while deleting the model", "error");
    }
  };

  const COLUMNS = useMemo(
    () => [
      {
        Header: "Model name",
        accessor: "model_name",
      },
      {
        Header: "Model",
        accessor: "model",
      },
      {
        Header: "Nature of output",
        accessor: "nature_of_output",
      },
      {
        Header: "Range of output",
        accessor: "range",
      },
      {
        Header: "No of operating zones",
        accessor: "no_of_operation_zone",
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
                    className="btn btn-sm dropdown-item"
                    data-bs-toggle="modal"
                    data-bs-target="#updateCensor"
                    onClick={() => openEditModal(row.original)}
                  >
                    <LuClipboardEdit size={"20"} /> Edit
                  </button>
                </li>
                <li>
                  <button
                    className="btn btn-sm dropdown-item"
                    onClick={() => handleDelete(row.original._id)}
                  >
                    <AiOutlineDeleteRow size={"20"} /> Delete
                  </button>
                </li>
                {row.original.disabled === false ? (
                  <li>
                    <button
                      type="button"
                      className="btn btn-sm dropdown-item"
                      onClick={() =>
                        handleToggle(row.original._id, { disable: true })
                      }
                    >
                      <FiToggleLeft size={"20"} /> Disable
                    </button>
                  </li>
                ) : (
                  <li>
                    <button
                      type="button"
                      className="btn btn-sm dropdown-item"
                      onClick={() =>
                        handleToggle(row.original._id, { disable: false })
                      }
                    >
                      <FiToggleRight size={"20"} /> Enable
                    </button>
                  </li>
                )}
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
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    // pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    // setPageSize,
    state: { pageIndex, pageSize, globalFilter },
    setGlobalFilter,
  } = useTable(
    {
      columns: COLUMNS,
      data: useMemo(() => modelsData?.models || [], [modelsData]),
      initialState: { pageIndex: 0, pageSize: 10 },
      manualPagination: true,
      pageCount: calculatedPageCount,
    },
    useGlobalFilter,
    usePagination
  );

  useEffect(() => {
    setPageNumber(pageIndex + 1);
    refetch({ page: pageIndex + 1, pageSize });
  }, [refetch, pageIndex, pageSize]);

  const MemoizedMathsQuill = React.memo(MathsQuill);

  return (
    <>
      <Header />
      <DashboardMenu />
      {/* <DashboardVariations /> */}

      <div className="container-fluid">
        <div className="row px-lg-5 p-2 justify-content-end me-lg-1 pb-5">
          <button
            className="btn btn-light w-auto border"
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#addModel"
          >
            Create Model
          </button>
        </div>

        <div className="row px-lg-5 justify-content-center align-items-center py-5">
          <div className="col-lg-12">
            <div className="card shadow">
              <div className="card-header">Created Models</div>
              <div className="card-body">
                {isLoading ? (
                  <ClipLoader color="#212121" loading={true} />
                ) : (
                  <>
                    {page.length === 0 ? (
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
                                  <th>S/N</th>
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
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="addModel"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Create Model
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
                onSubmit={(values, form) => onSubmit(values, form)}
                validate={validateForm}
                render={({ handleSubmit, form, submitting }) => (
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label
                        htmlFor="exampleFormControlInput1"
                        className="form-label"
                      >
                        Enter Model name
                      </label>
                      <Field
                        name="model_name"
                        component="input"
                        type="text"
                        className="form-control variable-input"
                      />
                      {form.getState().submitFailed &&
                        form.getState().errors.model_name && (
                          <span className="text-danger">
                            {form.getState().errors.model_name}
                          </span>
                        )}
                    </div>

                    <div className="mb-3">
                      <label
                        htmlFor="exampleFormControlInput1"
                        className="form-label"
                      >
                        Nature of outputs
                      </label>
                      <Field
                        name="nature_of_output"
                        component="select"
                        className="form-control variable-input"
                      >
                        <option value="">-- select --</option>
                        <option value="Percentage">Percentage</option>
                        <option value="Time">Time</option>
                        <option value="Nominal value">Nominal value</option>
                        <option value="Nominal opposite">
                          Nominal opposite
                        </option>
                        <option value="Others">Others</option>
                      </Field>
                      {form.getState().submitFailed &&
                        form.getState().errors.nature_of_output && (
                          <span className="text-danger">
                            {form.getState().errors.nature_of_output}
                          </span>
                        )}
                    </div>

                    <div className="mb-3">
                      <div className="row">
                        <div className="col">
                          <label
                            htmlFor="exampleFormControlInput1"
                            className="form-label"
                          >
                            Range of Values
                          </label>
                          <Field
                            name="range"
                            component="select"
                            className="form-control variable-input"
                          >
                            <option value="">-- select --</option>
                            <option value="0 - 100%">0 - 100%</option>
                            <option value="0 - 10">0 - 10</option>
                            <option value="A - Z">A - Z</option>
                          </Field>
                          {form.getState().submitFailed &&
                            form.getState().errors.range && (
                              <span className="text-danger">
                                {form.getState().errors.range}
                              </span>
                            )}
                        </div>
                        <div className="col">
                          <label
                            htmlFor="exampleFormControlInput1"
                            className="form-label"
                          >
                            Number of Operating Zone
                          </label>
                          <Field
                            name="no_of_operation_zone"
                            component="input"
                            type="number"
                            className="form-control variable-input"
                          />
                          {form.getState().submitFailed &&
                            form.getState().errors.no_of_operation_zone && (
                              <span className="text-danger">
                                {form.getState().errors.no_of_operation_zone}
                              </span>
                            )}
                        </div>
                      </div>
                    </div>

                    <div className="mb-3">
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

                    <div className="mb-5">
                      <label
                        htmlFor="exampleFormControlInput1"
                        className="form-label"
                      >
                        Enter Model
                      </label>

                      <Field name="model">
                        {({ input, meta }) => (
                          <>
                            <MemoizedMathsQuill
                              onChange={(value) => {
                                console.log(
                                  "Form: MathsQuillEditor onChange triggered",
                                  value
                                );
                                input.onChange(value);
                              }}
                              value={input.value}
                            />
                            {meta.error && meta.touched && (
                              <span className="text-danger">{meta.error}</span>
                            )}
                          </>
                        )}
                      </Field>
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

      <div
        className="modal fade"
        id="updateModel"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Update Model
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={closeEditModal}
              ></button>
            </div>
            <div className="modal-body">
              <Form
                onSubmit={(values) => handleEditSubmit(editRowData._id, values)}
                validate={validateForm}
                initialValues={{
                  model_name: editRowData?.model_name || "",
                  model: editRowData?.model || "",
                  nature_of_output: editRowData?.nature_of_output || "",
                  range: editRowData?.range || "",
                  no_of_operation_zone: editRowData?.no_of_operation_zone || "",
                  variables: (editRowData?.variables || []).map((variable) => ({
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
                        Enter Model name
                      </label>
                      <Field
                        name="model_name"
                        component="input"
                        type="text"
                        className="form-control variable-input"
                      />
                      {form.getState().submitFailed &&
                        form.getState().errors.model_name && (
                          <span className="text-danger">
                            {form.getState().errors.model_name}
                          </span>
                        )}
                    </div>

                    <div className="mb-3">
                      <label
                        htmlFor="exampleFormControlInput1"
                        className="form-label"
                      >
                        Enter Model
                      </label>
                      <Field
                        name="model"
                        component="input"
                        type="text"
                        className="form-control variable-input"
                      />
                      {form.getState().submitFailed &&
                        form.getState().errors.model && (
                          <span className="text-danger">
                            {form.getState().errors.model}
                          </span>
                        )}
                    </div>

                    <div className="mb-3">
                      <label
                        htmlFor="exampleFormControlInput1"
                        className="form-label"
                      >
                        Nature of outputs
                      </label>
                      <Field
                        name="nature_of_output"
                        component="select"
                        className="form-control variable-input"
                      >
                        <option value="">-- select --</option>
                        <option value="Percentage">Percentage</option>
                        <option value="Time">Time</option>
                        <option value="Nominal value">Nominal value</option>
                        <option value="Nominal opposite">
                          Nominal opposite
                        </option>
                        <option value="Others">Others</option>
                      </Field>
                      {form.getState().submitFailed &&
                        form.getState().errors.nature_of_output && (
                          <span className="text-danger">
                            {form.getState().errors.nature_of_output}
                          </span>
                        )}
                    </div>

                    <div className="mb-3">
                      <div className="row">
                        <div className="col">
                          <label
                            htmlFor="exampleFormControlInput1"
                            className="form-label"
                          >
                            Range of Values
                          </label>
                          <Field
                            name="range"
                            component="select"
                            className="form-control variable-input"
                          >
                            <option value="">-- select --</option>
                            <option value="0 - 100%">0 - 100%</option>
                            <option value="0 - 10">0 - 10</option>
                            <option value="A - Z">A - Z</option>
                          </Field>
                          {form.getState().submitFailed &&
                            form.getState().errors.range && (
                              <span className="text-danger">
                                {form.getState().errors.range}
                              </span>
                            )}
                        </div>
                        <div className="col">
                          <label
                            htmlFor="exampleFormControlInput1"
                            className="form-label"
                          >
                            Number of Operating Zone
                          </label>
                          <Field
                            name="no_of_operation_zone"
                            component="input"
                            type="number"
                            className="form-control variable-input"
                          />
                          {form.getState().submitFailed &&
                            form.getState().errors.no_of_operation_zone && (
                              <span className="text-danger">
                                {form.getState().errors.no_of_operation_zone}
                              </span>
                            )}
                        </div>
                      </div>
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
