import React from "react";
import { getDepartmentByValue } from "../../../data/departments";
import DepartmentPrograms from "./DepartmentPrograms";

const Protocol = () => (
  <DepartmentPrograms department={getDepartmentByValue("protocol")} />
);

export default Protocol;
