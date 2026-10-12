import React from "react";
import { getDepartmentByValue } from "../../../data/departments";
import DepartmentPrograms from "./DepartmentPrograms";

const Evan = () => (
  <DepartmentPrograms department={getDepartmentByValue("evan")} />
);

export default Evan;
