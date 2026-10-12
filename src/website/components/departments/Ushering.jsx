import React from "react";
import { getDepartmentByValue } from "../../../data/departments";
import DepartmentPrograms from "./DepartmentPrograms";

const Ushering = () => (
  <DepartmentPrograms department={getDepartmentByValue("ushering")} />
);

export default Ushering;
