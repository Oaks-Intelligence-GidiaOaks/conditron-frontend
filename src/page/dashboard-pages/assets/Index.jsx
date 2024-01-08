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
import { LuClipboardEdit } from "react-icons/lu";
import { AiOutlineDeleteRow } from "react-icons/ai";
import {
  useGetAssetQuery,
  useDeleteAssetMutation,
  useSaveAssetMutation,
  useUpdateAssetMutation,
} from "../../../service/assets.service";
import { showAlert } from "../../../static/alert";
import rtkMutation from "../../../utils/rtkMutation";
import { Form, Field } from "react-final-form";
import validate from "validate.js";
import Select from "react-select";
import { useGetAllCategoryQuery } from "../../../service/category.service";
import { useGetAllCensorQuery } from "../../../service/censor.service";
import { useGetAllModelsQuery } from "../../../service/models.service";
import CustomFileUploader from "../../../utils/CustomFileUploader";
import Swal from "sweetalert2";
import { extractDate } from "../../../utils/extractDate";
import MapComponent from "../../../utils/Map";

const constraints = {
  asset_name: {
    presence: true,
  },
  sensors: {
    presence: true,
  },
  asset_type: {
    presence: true,
  },
  asset_value: {
    presence: true,
  },
  installed_date: {
    presence: true,
  },
  longitude: {
    presence: true,
  },
  latitude: {
    presence: true,
  },
  data_source: {
    presence: true,
  },
  model: {
    presence: true,
  },
};

function Index() {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [isMapVisible, setIsMapVisible] = useState(false);

  const { data: categoryData } = useGetAllCategoryQuery();
  const category = categoryData?.categorys;
  // console.log(category);

  const { data: sensorData } = useGetAllCensorQuery();
  const sensors = sensorData?.sensors;

  const { data: modelData } = useGetAllModelsQuery();
  const models = modelData?.models;

  const [pageNumber, setPageNumber] = useState(1);
  const {
    data: assetData,
    isLoading,
    refetch,
  } = useGetAssetQuery({ page: pageNumber });

  const totalCount = assetData?.total || 0;
  const calculatedPageCount = Math.ceil(totalCount / 10);

  console.log(assetData);

  const [editRowData, setEditRowData] = useState(null);

  const openEditModal = (rowData) => {
    setEditRowData(rowData);
    console.log(rowData);
  };

  const closeEditModal = () => {
    setEditRowData(null);
  };

  const validateForm = (values) => {
    return validate(values, constraints) || {};
  };

  const [deleteAsset] = useDeleteAssetMutation();
  const handleDelete = async (rowId) => {
    try {
      console.log("Deleting row with ID:", rowId);

      await rtkMutation(deleteAsset, { id: rowId });
      showAlert("Great!", "Asset has been deleted Successfully", "success");
    } catch (error) {
      console.error("Error deleting Asset:", error);
      showAlert("Error", "An error occurred while deleting the Asset", "error");
    }
  };

  const [updateAsset] = useUpdateAssetMutation();
  const handleEditSubmit = async (id, values) => {
    console.log("Edit Form Data:", id, values);

    // Map sensors to an array of strings
    const selectedSensors = values.sensors.map((sensors) => sensors.value);
    const sensors = JSON.stringify(selectedSensors);

    // Create a copy of values with updated variables
    const updatedValues = {
      ...values,
      sensors,
      // asset_image: values.asset_image,
      model: values.model.value,
      category: values.category?.value,
    };

    const result = await Swal.fire({
      title: "Confirm Submission",
      text: "Are you sure you want to update the record?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, submit it!",
      cancelButtonText: "No, cancel!",
    });

    if (result.isConfirmed) {
      try {
        await rtkMutation(updateAsset, { id, data: updatedValues });
        showAlert("Great!", "Asset has been updated Successfully", "success");
        closeEditModal();
      } catch (error) {
        console.error("Unexpected error during update:", error);
        showAlert("Oops", "An unexpected error occurred", "error");
      }
    } else {
      console.log("Form submission cancelled by the user.");
    }
  };

  const [Asset, { error, isSuccess }] = useSaveAssetMutation({
    provideTag: ["Asset"],
  });

  const handleLoadMap = (formValues) => {
    const { latitude: lat, longitude: lng } = formValues;
    setLatitude(lat);
    setLongitude(lng);
    setIsMapVisible(true);
  };

  useEffect(() => {
    console.log("Latitude:", latitude);
    console.log("Longitude:", longitude);
  }, [latitude, longitude]);

  const onSubmit = async (values, form) => {
    const selectedSensors = values.sensors.map((sensor) => sensor.value);
    const sensors = JSON.stringify(selectedSensors);
    console.log(selectedSensors);
    const updatedValues = {
      ...values,
      sensors,
      asset_image: values.asset_image,
      model: values.model.value,
      category: values.category?.value,
    };
    console.log(updatedValues);
    const result = await Swal.fire({
      title: "Confirm Submission",
      text: "Are you sure you want to submit the form?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, submit it!",
      cancelButtonText: "No, cancel!",
    });

    if (result.isConfirmed) {
      await rtkMutation(Asset, updatedValues);
      refetch();
      form.reset();
    } else {
      console.log("Form submission cancelled by the user.");
    }
  };

  useEffect(() => {
    if (isSuccess) {
      showAlert("Great", "Asset created Successfully!", "success");
    } else if (error) {
      showAlert("Oops", error.data.message || "An error occurred", "error");
    }
  }, [isSuccess, error]);

  const COLUMNS = useMemo(
    () => [
      {
        Header: "Asset Name",
        accessor: "asset_name",
      },
      {
        Header: "Asset Type",
        accessor: "asset_type",
      },
      {
        Header: "Category Name",
        accessor: (row) =>
          Array.isArray(row.category)
            ? row.category.map((category) => category.category_name).join(", ")
            : row.category && row.category.category_name
            ? row.category.category_name
            : "",
        show: (instance) =>
          instance.data.some(
            (row) =>
              row.category &&
              (Array.isArray(row.category) || row.category.category_name)
          ),
      },

      {
        Header: "Installation Date",
        accessor: "installed_date",
        Cell: ({ cell: { value } }) => <span>{extractDate(value)}</span>,
      },
      {
        Header: "Longitude",
        accessor: "longitude",
      },
      {
        Header: "Latitude",
        accessor: "latitude",
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
                    data-bs-target="#updateAsset"
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
      data: useMemo(() => assetData?.assets || [], [assetData]),
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

      <div className="container">
        <div className="row justify-content-center align-items-center pt-4 pb-4">
          <div className="data-box d-none d-md-none d-lg-block">
            <div className="p-2 d-flex justify-content-between d-none d-md-none d-lg-flex">
              <div className="box-1">
                <p className="header d-flex">
                  <span className="d-none d-md-none d-lg-block me-1">
                    Total Asset
                  </span>
                  Value
                </p>
                <p className="subtitle text-center">$234,000.00</p>
              </div>

              <div className="box-2">
                <p className="header">Asset Qty</p>
                <p className="subtitle text-center">
                  42
                  <span className="users ms-1 d-none d-md-none d-lg-inline-flex">
                    Assets
                  </span>
                </p>
              </div>

              <div className="box-3">
                <p className="header"> Newly added Assets</p>
                <p className="subtitle text-center">
                  10
                  <span className="users ms-1 d-none d-md-none d-lg-inline-flex">
                    Assets
                  </span>
                </p>
              </div>

              <div className="box-4">
                <p className="header d-flex">% Change in Asset Qty</p>
                <p className="subtitle text-center">
                  15%
                  <span className="pb-1 ms-2">
                    <svg
                      width="14"
                      height="15"
                      viewBox="0 0 14 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12.6875 7.71875C12.5 7.90625 12.25 8 12 8C11.7188 8 11.4688 7.90625 11.2812 7.71875L8 4.4375V14C8 14.5625 7.53125 15 7 15C6.5 15 6 14.5625 6 14V4.4375L2.6875 7.71875C2.3125 8.125 1.65625 8.125 1.28125 7.71875C0.875 7.34375 0.875 6.6875 1.28125 6.3125L6.28125 1.3125C6.65625 0.90625 7.3125 0.90625 7.6875 1.3125L12.6875 6.3125C13.0938 6.6875 13.0938 7.34375 12.6875 7.71875Z"
                        fill="#49AA4C"
                      />
                    </svg>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid">
        <div className="row px-lg-5 p-2 justify-content-end me-lg-1">
          <button
            className="btn btn-light w-auto border"
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#addAsset"
          >
            Create Asset
          </button>
        </div>
        <div className="row px-lg-5 justify-content-center align-items-center py-5">
          <div className="col-lg-12">
            <div className="card shadow">
              <div className="card-header">Created Assets</div>
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
        id="addAsset"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Create Asset
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
                    <div className="mb-2">
                      <CustomFileUploader
                        name="asset_image"
                        label="Add asset Image"
                      />
                      {form.getState().submitFailed &&
                        form.getState().errors.asset_image && (
                          <span className="text-danger">
                            {form.getState().errors.asset_image}
                          </span>
                        )}
                    </div>

                    <div className="row mb-3">
                      <div className="col">
                        <label
                          htmlFor="exampleFormControlInput1"
                          className="form-label"
                        >
                          Enter asset name
                        </label>
                        <Field
                          name="asset_name"
                          component="input"
                          type="text"
                          className="form-control variable-input"
                        />
                        {form.getState().submitFailed &&
                          form.getState().errors.asset_name && (
                            <span className="text-danger">
                              {form.getState().errors.asset_name}
                            </span>
                          )}
                      </div>
                      <div className="col">
                        <label
                          htmlFor="exampleFormControlInput1"
                          className="form-label"
                        >
                          Enter asset type
                        </label>
                        <Field
                          name="asset_type"
                          component="input"
                          type="text"
                          className="form-control variable-input"
                        />
                        {form.getState().submitFailed &&
                          form.getState().errors.asset_type && (
                            <span className="text-danger">
                              {form.getState().errors.asset_type}
                            </span>
                          )}
                      </div>
                      <div className="col">
                        <label
                          htmlFor="exampleFormControlInput1"
                          className="form-label"
                        >
                          Enter asset value
                        </label>
                        <Field
                          name="asset_value"
                          component="input"
                          type="number"
                          className="form-control variable-input"
                        />
                        {form.getState().submitFailed &&
                          form.getState().errors.asset_value && (
                            <span className="text-danger">
                              {form.getState().errors.asset_value}
                            </span>
                          )}
                      </div>
                    </div>

                    <div className="row mb-3">
                      <div className="col">
                        <label
                          htmlFor="exampleFormControlInput1"
                          className="form-label"
                        >
                          Enter Data Source
                        </label>
                        <Field
                          name="data_source"
                          component="select"
                          type="text"
                          className="form-control variable-input"
                        >
                          <option value="">-- select --</option>
                          <option value="Sensor">Sensor</option>
                          <option value="Database">Database</option>
                        </Field>
                        {form.getState().submitFailed &&
                          form.getState().errors.data_source && (
                            <span className="text-danger">
                              {form.getState().errors.data_source}
                            </span>
                          )}
                      </div>
                      <div className="col">
                        <label
                          htmlFor="exampleFormControlInput1"
                          className="form-label"
                        >
                          Enter Installed date
                        </label>
                        <Field
                          name="installed_date"
                          component="input"
                          type="date"
                          className="form-control variable-input"
                        />
                        {form.getState().submitFailed &&
                          form.getState().errors.installed_date && (
                            <span className="text-danger">
                              {form.getState().errors.installed_date}
                            </span>
                          )}
                      </div>
                    </div>

                    <div className="row mb-3">
                      <div className="col">
                        <label
                          htmlFor="exampleFormControlInput1"
                          className="form-label"
                        >
                          Enter Latitude
                        </label>
                        <Field
                          name="latitude"
                          component="input"
                          type="text"
                          className="form-control variable-input"
                        />
                        {form.getState().submitFailed &&
                          form.getState().errors.latitude && (
                            <span className="text-danger">
                              {form.getState().errors.latitude}
                            </span>
                          )}
                      </div>
                      <div className="col">
                        <label
                          htmlFor="exampleFormControlInput1"
                          className="form-label"
                        >
                          Enter Longitude
                        </label>
                        <Field
                          name="longitude"
                          component="input"
                          type="text"
                          className="form-control variable-input"
                        />
                        {form.getState().submitFailed &&
                          form.getState().errors.longitude && (
                            <span className="text-danger">
                              {form.getState().errors.longitude}
                            </span>
                          )}
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col">
                        <div className="d-flex justify-content-center gap-3 pt-3 pb-3">
                          <button
                            className="btn btn-outline-dark btn-sm text-sm"
                            onClick={() =>
                              handleLoadMap(form.getState().values)
                            }
                          >
                            Load cordinates
                          </button>

                          {latitude && longitude ? (
                            <button
                              className="btn btn-outline-success btn-sm text-sm"
                              onClick={() => setIsMapVisible(!isMapVisible)}
                            >
                              toggle map
                            </button>
                          ) : null}
                        </div>

                        {isMapVisible && (
                          <div className="card card-body">
                            <MapComponent
                              latitude={latitude}
                              longitude={longitude}
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="row mb-5">
                      {category && category.length > 0 && (
                        <div className="col">
                          <label
                            htmlFor="exampleFormControlInput1"
                            className="form-label"
                          >
                            Select Category <small>(optional)</small>
                          </label>
                          <Field
                            name="category"
                            component={({ input }) => (
                              <Select
                                {...input}
                                //   isMulti
                                options={category?.map((row) => ({
                                  value: row._id,
                                  label: row.category_name,
                                }))}
                                placeholder="-- Select category --"
                              />
                            )}
                          />
                        </div>
                      )}

                      <div className="col">
                        <label
                          htmlFor="exampleFormControlInput1"
                          className="form-label"
                        >
                          Select Sensor
                        </label>
                        <Field
                          name="sensors"
                          component={({ input }) => (
                            <Select
                              {...input}
                              isMulti
                              options={sensors?.map((row) => ({
                                value: row._id,
                                label: row.sensor_name,
                              }))}
                              placeholder="-- Select sensor --"
                            />
                          )}
                        />
                        {form.getState().submitFailed &&
                          form.getState().errors.sensors && (
                            <span className="text-danger">
                              {form.getState().errors.sensors}
                            </span>
                          )}
                      </div>

                      <div className="col">
                        <label
                          htmlFor="exampleFormControlInput1"
                          className="form-label"
                        >
                          Select Model
                        </label>
                        <Field
                          name="model"
                          component={({ input }) => (
                            <Select
                              {...input}
                              //   isMulti
                              options={models?.map((row) => ({
                                value: row._id,
                                label: row.model_name,
                              }))}
                              placeholder="-- Select model --"
                            />
                          )}
                        />
                        {form.getState().submitFailed &&
                          form.getState().errors.model && (
                            <span className="text-danger">
                              {form.getState().errors.model}
                            </span>
                          )}
                      </div>
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
        id="updateAsset"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Update Asset
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
                  asset_name: editRowData?.asset_name || "",
                  asset_type: editRowData?.asset_type || "",
                  asset_image: editRowData?.asset_image || "",
                  asset_value: editRowData?.asset_value || "",
                  installed_date:
                    extractDate(editRowData?.installed_date) || "",
                  longitude: editRowData?.longitude || "",
                  latitude: editRowData?.latitude || "",
                  data_source: editRowData?.data_source || "",
                  sensors: (editRowData?.sensors || []).map((sensors) => ({
                    value: sensors._id,
                    label: sensors.sensor_name,
                  })),
                  model: Array.isArray(editRowData?.model)
                    ? editRowData?.model.map((model) => ({
                        value: model._id,
                        label: model.model_name,
                      }))
                    : editRowData?.model
                    ? [
                        {
                          value: editRowData.model._id,
                          label: editRowData.model.model_name,
                        },
                      ]
                    : [],

                  category: Array.isArray(editRowData?.category)
                    ? editRowData.category.map((category) => ({
                        value: category._id,
                        label: category.category_name,
                      }))
                    : editRowData?.category
                    ? [
                        {
                          value: editRowData.category._id,
                          label: editRowData.category.category_name,
                        },
                      ]
                    : [],
                }}
                render={({ handleSubmit, form, submitting }) => (
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <CustomFileUploader
                        name="asset_image"
                        label="Update asset Image"
                      />
                      {form.getState().submitFailed &&
                        form.getState().errors.asset_image && (
                          <span className="text-danger">
                            {form.getState().errors.asset_image}
                          </span>
                        )}
                    </div>
                    <div className="row mb-3">
                      <div className="col">
                        <label
                          htmlFor="exampleFormControlInput1"
                          className="form-label"
                        >
                          Enter asset name
                        </label>
                        <Field
                          name="asset_name"
                          component="input"
                          type="text"
                          className="form-control variable-input"
                        />
                        {form.getState().submitFailed &&
                          form.getState().errors.asset_name && (
                            <span className="text-danger">
                              {form.getState().errors.asset_name}
                            </span>
                          )}
                      </div>
                      <div className="col">
                        <label
                          htmlFor="exampleFormControlInput1"
                          className="form-label"
                        >
                          Enter asset type
                        </label>
                        <Field
                          name="asset_type"
                          component="input"
                          type="text"
                          className="form-control variable-input"
                        />
                        {form.getState().submitFailed &&
                          form.getState().errors.asset_type && (
                            <span className="text-danger">
                              {form.getState().errors.asset_type}
                            </span>
                          )}
                      </div>
                      <div className="col">
                        <label
                          htmlFor="exampleFormControlInput1"
                          className="form-label"
                        >
                          Enter asset value
                        </label>
                        <Field
                          name="asset_value"
                          component="input"
                          type="number"
                          className="form-control variable-input"
                        />
                        {form.getState().submitFailed &&
                          form.getState().errors.asset_value && (
                            <span className="text-danger">
                              {form.getState().errors.asset_value}
                            </span>
                          )}
                      </div>
                    </div>

                    <div className="row mb-3">
                      <div className="col">
                        <label
                          htmlFor="exampleFormControlInput1"
                          className="form-label"
                        >
                          Enter Longitude
                        </label>
                        <Field
                          name="longitude"
                          component="input"
                          type="text"
                          className="form-control variable-input"
                        />
                        {form.getState().submitFailed &&
                          form.getState().errors.longitude && (
                            <span className="text-danger">
                              {form.getState().errors.longitude}
                            </span>
                          )}
                      </div>
                      <div className="col">
                        <label
                          htmlFor="exampleFormControlInput1"
                          className="form-label"
                        >
                          Enter Latitude
                        </label>
                        <Field
                          name="latitude"
                          component="input"
                          type="text"
                          className="form-control variable-input"
                        />
                        {form.getState().submitFailed &&
                          form.getState().errors.latitude && (
                            <span className="text-danger">
                              {form.getState().errors.latitude}
                            </span>
                          )}
                      </div>

                      <div className="col">
                        <label
                          htmlFor="exampleFormControlInput1"
                          className="form-label"
                        >
                          Enter Data Source
                        </label>
                        <Field
                          name="data_source"
                          component="select"
                          type="text"
                          className="form-control variable-input"
                        >
                          <option value="Sensor">Sensor</option>
                          <option value="Database">Database</option>
                        </Field>
                        {form.getState().submitFailed &&
                          form.getState().errors.data_source && (
                            <span className="text-danger">
                              {form.getState().errors.data_source}
                            </span>
                          )}
                      </div>
                      <div className="col">
                        <label
                          htmlFor="exampleFormControlInput1"
                          className="form-label"
                        >
                          Enter Installed date
                        </label>
                        <Field
                          name="installed_date"
                          component="input"
                          type="date"
                          className="form-control variable-input"
                        />
                        {form.getState().submitFailed &&
                          form.getState().errors.installed_date && (
                            <span className="text-danger">
                              {form.getState().errors.installed_date}
                            </span>
                          )}
                      </div>
                    </div>
                    <div className="row mb-5">
                      {category && category.length > 0 && (
                        <div className="col">
                          <label
                            htmlFor="exampleFormControlInput1"
                            className="form-label"
                          >
                            Select Category <small>(optional)</small>
                          </label>
                          <Field
                            name="category"
                            component={({ input }) => (
                              <Select
                                {...input}
                                //   isMulti
                                options={category?.map((row) => ({
                                  value: row._id,
                                  label: row.category_name,
                                }))}
                                placeholder="-- Select category --"
                              />
                            )}
                          />
                        </div>
                      )}

                      <div className="col">
                        <label
                          htmlFor="exampleFormControlInput1"
                          className="form-label"
                        >
                          Select Sensor
                        </label>
                        <Field
                          name="sensors"
                          component={({ input }) => (
                            <Select
                              {...input}
                              isMulti
                              options={sensors?.map((row) => ({
                                value: row._id,
                                label: row.sensor_name,
                              }))}
                              placeholder="-- Select sensor --"
                            />
                          )}
                        />
                        {form.getState().submitFailed &&
                          form.getState().errors.sensors && (
                            <span className="text-danger">
                              {form.getState().errors.sensors}
                            </span>
                          )}
                      </div>

                      <div className="col">
                        <label
                          htmlFor="exampleFormControlInput1"
                          className="form-label"
                        >
                          Select Model
                        </label>
                        <Field
                          name="model"
                          component={({ input }) => (
                            <Select
                              {...input}
                              //   isMulti
                              options={models?.map((row) => ({
                                value: row._id,
                                label: row.model_name,
                              }))}
                              placeholder="-- Select model --"
                            />
                          )}
                        />
                        {form.getState().submitFailed &&
                          form.getState().errors.model && (
                            <span className="text-danger">
                              {form.getState().errors.model}
                            </span>
                          )}
                      </div>
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
    </>
  );
}

Index.propTypes = {
  row: PropTypes.object,
  cell: PropTypes.object,
};

export default Index;
