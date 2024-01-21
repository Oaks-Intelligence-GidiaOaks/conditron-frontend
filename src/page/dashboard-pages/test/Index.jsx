import { useState } from "react";
import Select from "react-select";
import { useGetAllVariablesQuery } from "../../../service/variables.service";
import { Form, Field } from "react-final-form";
// import { addStyles, EditableMathField } from "react-mathquill";
// import TexSymbols from "./TexSymbols";
// import "./style.css";
// addStyles();

const Index = () => {
  // const { data: variableData } = useGetAllVariablesQuery();
  // const variables = variableData?.variables;

  // const [equation, setEquation] = useState("");
  // const [variableMapping, setVariableMapping] = useState([]);
  // const [error, setError] = useState(null);

  // function InsertSymbol(symbol) {
  //   console.log(symbol);
  //   setEquation((prevEquation) => prevEquation + symbol);
  //   setError(null);
  // }

  // const validateEquation = (equation, variableMapping) => {
  //   const variableNames = variableMapping.map((variable) => variable.alias);
  //   console.log(variableNames);

  //   const allVariablesReferenced = variableNames.every((variableName) =>
  //     equation.includes(variableName)
  //   );

  //   console.log(allVariablesReferenced);
  //   console.log(equation);

  //   const extractVariables = (equation) => {
  //     return equation.match(/[A-Z]+\d+/g) || [];
  //   };

  //   const equationVariables = extractVariables(equation);
  //   console.log(equationVariables);

  //   if (equationVariables.length > variableNames.length) {
  //     return "Variables in equation is more than selected variables";
  //   }

  //   const missingVariables = variableNames.filter(
  //     (variableName) => !equation.includes(variableName)
  //   );

  //   return { isValid: allVariablesReferenced, missingVariables };
  // };

  // const onSubmit = async (values) => {
  //   const selectedVariables = values.variables.map(
  //     (variable) => variable.value
  //   );
  //   const updatedValues = {
  //     ...values,
  //     variables: selectedVariables,
  //     model: equation,
  //     variableMapping,
  //   };
  //   const validationResults = validateEquation(equation, variableMapping);

  //   if (typeof validationResults === "string") {
  //     setError(validationResults);
  //   } else if (!validationResults.isValid) {
  //     const missingVariables = validationResults.missingVariables.join(", ");
  //     setError(
  //       `Equation validation failed. Missing variables: ${missingVariables}`
  //     );
  //   } else {
  //     setVariableMapping([]);
  //     setEquation("");
  //   }
  // };

  // const updateVariableMapping = (variables) => {
  //   const mapping = variables.map((variable, index) => ({
  //     id: variable.value,
  //     name: variable.label,
  //     alias: `V${index + 1}`,
  //   }));

  //   setVariableMapping(mapping);
  // };

  return <div className="container">test</div>;
};

export default Index;
