import { useState } from "react";
import Select from "react-select";
import { useGetAllVariablesQuery } from "../../../service/variables.service";
import { Form, Field } from "react-final-form";
import { addStyles, EditableMathField } from "react-mathquill";
import TexSymbols from "./TexSymbols";
import "./style.css";
addStyles();

const Index = () => {
  const { data: variableData } = useGetAllVariablesQuery();
  const variables = variableData?.variables;

  const [equation, setEquation] = useState("");
  const [variableMapping, setVariableMapping] = useState([]);
  const [error, setError] = useState(null);

  function InsertSymbol(symbol) {
    console.log(symbol);
    setEquation((prevEquation) => prevEquation + symbol);
    setError(null);
  }

  const validateEquation = (equation, variableMapping) => {
    const variableNames = variableMapping.map((variable) => variable.alias);
    console.log(variableNames);

    const allVariablesReferenced = variableNames.every((variableName) =>
      equation.includes(variableName)
    );

    console.log(allVariablesReferenced);
    console.log(equation);

    const extractVariables = (equation) => {
      return equation.match(/[A-Z]+\d+/g) || [];
    };

    const equationVariables = extractVariables(equation);
    console.log(equationVariables);

    if (equationVariables.length > variableNames.length) {
      return "Variables in equation is more than selected variables";
    }

    const missingVariables = variableNames.filter(
      (variableName) => !equation.includes(variableName)
    );

    return { isValid: allVariablesReferenced, missingVariables };
  };

  const onSubmit = async (values) => {
    const selectedVariables = values.variables.map(
      (variable) => variable.value
    );
    const updatedValues = {
      ...values,
      variables: selectedVariables,
      model: equation,
      variableMapping,
    };
    const validationResults = validateEquation(equation, variableMapping);

    if (typeof validationResults === "string") {
      setError(validationResults);
    } else if (!validationResults.isValid) {
      const missingVariables = validationResults.missingVariables.join(", ");
      setError(
        `Equation validation failed. Missing variables: ${missingVariables}`
      );
    } else {
      setVariableMapping([]);
      setEquation("");
    }
  };

  const updateVariableMapping = (variables) => {
    const mapping = variables.map((variable, index) => ({
      id: variable.value,
      name: variable.label,
      alias: `V${index + 1}`,
    }));

    setVariableMapping(mapping);
  };

  return (
    <div className="container">
      <div className="row justify-content-center pt-5 pb-5">
        <div className="col-lg-6">
          <div className="card shadow">
            <div className="p-5">
              <Form
                onSubmit={(values, form) => onSubmit(values, form)}
                render={({ handleSubmit }) => (
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="selectVariables" className="form-label">
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
                            onChange={(selectedVariables) => {
                              input.onChange(selectedVariables);
                              updateVariableMapping(selectedVariables);
                              setError(null);
                            }}
                          />
                        )}
                      />
                    </div>

                    {variableMapping && variableMapping.length > 0 ? (
                      <div className="mb-4">
                        <p>Variable Mapping:</p>
                        {variableMapping.map((variable) => (
                          <p key={variable.id}>
                            {`${variable.alias} = ${variable.name}`}
                          </p>
                        ))}
                      </div>
                    ) : null}

                    <div className="mb-3">
                      <label htmlFor="equation" className="form-label">
                        Enter Equation
                      </label>
                      <EditableMathField
                        latex={equation}
                        onChange={(mathField) => {
                          setEquation(mathField.latex());
                          setError(null);
                        }}
                      />
                      {error && <div className="text-danger">{error}</div>}
                      <hr />
                      <TexSymbols onClick={InsertSymbol} />
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary w-100 mt-4"
                    >
                      Save
                    </button>
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

export default Index;
