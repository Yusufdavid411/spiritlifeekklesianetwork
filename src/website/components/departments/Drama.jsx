import React from "react";
import { getDepartmentByValue } from "../../../data/departments";
import DepartmentPrograms from "./DepartmentPrograms";

const Drama = () => (
  <DepartmentPrograms department={getDepartmentByValue("drama")} />
);

export default Drama;
