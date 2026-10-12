import React from "react";
import { getDepartmentByValue } from "../../../data/departments";
import DepartmentPrograms from "./DepartmentPrograms";

const Child = () => (
  <DepartmentPrograms department={getDepartmentByValue("child")} />
);

export default Child;
