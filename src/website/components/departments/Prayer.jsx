import React from "react";
import { getDepartmentByValue } from "../../../data/departments";
import DepartmentPrograms from "./DepartmentPrograms";

const Prayer = () => (
  <DepartmentPrograms department={getDepartmentByValue("prayer")} />
);

export default Prayer;
