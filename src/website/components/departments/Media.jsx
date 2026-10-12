import React from "react";
import { getDepartmentByValue } from "../../../data/departments";
import DepartmentPrograms from "./DepartmentPrograms";

const Media = () => (
  <DepartmentPrograms department={getDepartmentByValue("media")} />
);

export default Media;
