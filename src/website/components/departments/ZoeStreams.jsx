import React from "react";
import { getDepartmentByValue } from "../../../data/departments";
import DepartmentPrograms from "./DepartmentPrograms";

const ZoeStreams = () => (
  <DepartmentPrograms department={getDepartmentByValue("zoestreams")} />
);

export default ZoeStreams;
