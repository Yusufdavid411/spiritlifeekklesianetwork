import React from "react";
import { getDepartmentByValue } from "../../../data/departments";
import DepartmentPrograms from "./DepartmentPrograms";

const Welfare = () => (
  <DepartmentPrograms department={getDepartmentByValue("welfare")} />
);

export default Welfare;
