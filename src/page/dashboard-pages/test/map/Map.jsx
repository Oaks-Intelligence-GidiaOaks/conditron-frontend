import { useState, useEffect } from "react";
import MapComponent from "./Index";
import { Form, Field } from "react-final-form";

const YourFormComponent = () => {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [isMapVisible, setIsMapVisible] = useState(false);

  const onSubmit = (values) => {
    console.log(values);
  };

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

  return (
    <div className="container">
      <div className="row pt-5 pb-5 justify-content-center">
        <div className="col-lg-6">
          <div className="card border shadow">
            <div className="p-4">
              <Form
                onSubmit={(values, form) => onSubmit(values, form)}
                render={({ handleSubmit, form }) => (
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="">Latitude</label>
                      <Field
                        name="latitude"
                        component="input"
                        type="number"
                        className="form-control variable-input"
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="">Longitude</label>
                      <Field
                        name="longitude"
                        component="input"
                        type="text"
                        className="form-control variable-input"
                      />
                    </div>

                    <div className="d-flex justify-content-center gap-3 pt-3 pb-3">
                      <button
                        className="btn btn-outline-dark btn-sm text-sm"
                        onClick={() => handleLoadMap(form.getState().values)}
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

                    <div className="text-center pt-5 pb-3">
                      <button className="btn btn-dark w-50" type="submit">
                        Submit
                      </button>
                    </div>
                  </form>
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YourFormComponent;
