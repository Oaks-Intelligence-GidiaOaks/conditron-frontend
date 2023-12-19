import {
  Header,
  DashboardMenu,
  // DashboardVariations,
} from "../../../components/layout";
import { Form, Field } from "react-final-form";
import { showAlert } from "../../../static/alert";
import validate from "validate.js";
import rtkMutation from "../../../utils/rtkMutation";
import {
  useSaveCategoryMutation,
  useGetCategoryQuery,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
} from "../../../service/category.service";
import PropTypes from "prop-types";
import { useTable, usePagination, useGlobalFilter } from "react-table";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { BsChevronDoubleRight, BsChevronDoubleLeft } from "react-icons/bs";
import { Filter } from "../../../blocks/organization-block/Filter";
import { ClipLoader } from "react-spinners";
import React, { useMemo, useState, useEffect } from "react";
import { CiMenuKebab } from "react-icons/ci";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { LuClipboardEdit } from "react-icons/lu";
import { AiOutlineDeleteRow } from "react-icons/ai";
import { useGetAllAssetsQuery } from "../../../service/assets.service";
import Select from "react-select";

const constraints = {
  category_name: {
    presence: true,
  },
  assets: {
    presence: true,
  },
};

function Index() {
  const { data: assetData } = useGetAllAssetsQuery();
  const assets = assetData?.assets;

  const [pageNumber, setPageNumber] = useState(1);
  const {
    data: categoryData,
    isLoading,
    refetch,
  } = useGetCategoryQuery({ page: pageNumber });

  const totalCount = categoryData?.total || 0;
  const calculatedPageCount = Math.ceil(totalCount / 10);

  const [editRowData, setEditRowData] = useState(null);

  const openEditModal = (rowData) => {
    setEditRowData(rowData);
  };

  const closeEditModal = () => {
    setEditRowData(null);
  };

  const validateForm = (values) => {
    return validate(values, constraints) || {};
  };

  const [deleteCategory] = useDeleteCategoryMutation();
  const handleDelete = async (rowId) => {
    try {
      console.log("Deleting row with ID:", rowId);

      await rtkMutation(deleteCategory, { id: rowId });
      showAlert("Great!", "Category has been deleted Successfully", "success");
    } catch (error) {
      console.error("Error deleting Category:", error);
      showAlert(
        "Error",
        "An error occurred while deleting the Category",
        "error"
      );
    }
  };

  const [updateCategory] = useUpdateCategoryMutation();
  const handleEditSubmit = async (id, values) => {
    console.log("Edit Form Data:", id, values);

    // Map assets to an array of strings
    const selectedAssets = values.assets.map((assets) => assets.value);

    // Create a copy of values with updated assets
    const updatedValues = { ...values, assets: selectedAssets };

    try {
      await rtkMutation(updateCategory, { id, data: updatedValues });
      showAlert("Great!", "Category has been updated Successfully", "success");
      closeEditModal();
    } catch (error) {
      console.error("Unexpected error during update:", error);
      showAlert("Oops", "An unexpected error occurred", "error");
    }
  };

  const [Category, { error, isSuccess }] = useSaveCategoryMutation({
    provideTag: ["Category"],
  });

  const onSubmit = async (values, form) => {
    const selectedAssets = values.assets.map((assets) => assets.value);
    const updatedValues = { ...values, assets: selectedAssets };
    await rtkMutation(Category, updatedValues);
    refetch();
    form.reset();
  };

  useEffect(() => {
    if (isSuccess) {
      showAlert("Great", "Category created Successfully!", "success");
    } else if (error) {
      showAlert("Oops", error.data.message || "An error occurred", "error");
    }
  }, [isSuccess, error]);

  const COLUMNS = useMemo(
    () => [
      {
        Header: "Category Name",
        accessor: "category_name",
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
                    className="btn btn-sm dropdown-item"
                    data-bs-toggle="modal"
                    data-bs-target="#updateCategory"
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
      data: useMemo(() => categoryData?.categorys || [], [categoryData]),
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

  return (
    <>
      <Header />
      <DashboardMenu />
      {/* <DashboardVariations /> */}

      <div className="container-fluid">
        <div className="row justify-content-center px-lg-5 pt-4 pb-5 gap-4">
          <div className="col-lg-4">
            <div className="card shadow">
              <div className="card-header">Add Category</div>
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
                          Enter Category
                        </label>
                        <Field
                          name="category_name"
                          component="input"
                          type="text"
                          className="form-control variable-input"
                          placeholder="Enter Category"
                        />
                        <Field name="_id" component="input" type="hidden" />

                        {form.getState().submitFailed &&
                          form.getState().errors.category_name && (
                            <span className="text-danger">
                              {form.getState().errors.category_name}
                            </span>
                          )}
                      </div>

                      <div className="mb-5">
                        <label
                          htmlFor="exampleFormControlInput1"
                          className="form-label"
                        >
                          Select Assets
                        </label>
                        <Field
                          name="assets"
                          component={({ input }) => (
                            <Select
                              {...input}
                              isMulti
                              options={assets?.map((row) => ({
                                value: row._id,
                                label: row.asset_name,
                              }))}
                              placeholder="-- Select assets --"
                            />
                          )}
                        />
                        {form.getState().submitFailed &&
                          form.getState().errors.assets && (
                            <span className="text-danger">
                              {form.getState().errors.assets}
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
              <div className="card-header">Categories</div>
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
                                      {row.cells.map((cell) => (
                                        <td
                                          key={cell.column.id}
                                          {...cell.getCellProps()}
                                        >
                                          {cell.render("Cell")}
                                        </td>
                                      ))}
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
        id="updateCategory"
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
                Modify Category Name
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
                  category_name: editRowData?.category_name || "",
                  assets: (editRowData?.assets || []).map((assets) => ({
                    value: assets._id,
                    label: assets.asset_name,
                  })),
                }}
                render={({ handleSubmit, form, submitting }) => (
                  <form onSubmit={handleSubmit}>
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label"
                    >
                      Category Name
                    </label>
                    <Field
                      name="category_name"
                      component="input"
                      type="text"
                      className="form-control variable-input"
                    />
                    {form.getState().submitFailed &&
                      form.getState().errors.category_name && (
                        <span className="text-danger">
                          {form.getState().errors.category_name}
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
