import React from "react";

const JobBoardWrapper = (props) => {
  return <div>{props.children}</div>;
};

JobBoardWrapper.heading = function Jobheading(props) {
  return <h1>{props.children}</h1>;
};
JobBoardWrapper.title = function JobTitle(props) {
  return <div>{props.children}</div>;
};

JobBoardWrapper.JobPostdetails = function JobPostdetails(props) {
  return <span>{props.children}</span>;
};

export default JobBoardWrapper;
