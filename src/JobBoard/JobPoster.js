import React, { useEffect, useState } from "react";
import JobBoardWrapper from "./JobBoard";

const JobPoster = () => {
  const [userId, setUserId] = useState(null);
  const [fetchingDetails, setFetchingDetails] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchJobs(currentPage);
  }, [currentPage]);

  const fetchJobIds = async (currentPage) => {
    let ids = userId;
    if (!ids) {
      const response = await fetch(
        "https://hacker-news.firebaseio.com/v0/jobstories.json"
      );
      ids = await response.json();
      setUserId(ids);
    }

    return ids.slice(currentPage * 6, currentPage * 6 + 6);
  };

  async function fetchJobs(currPage) {
    const jobIdsForPage = await fetchJobIds(currPage);
    setFetchingDetails(true);
    const jobsForPage = await Promise.all(
      jobIdsForPage.map((jobId) =>
        fetch(`https://hacker-news.firebaseio.com/v0/item/${jobId}.json`).then(
          (res) => res.json()
        )
      )
    );
    setFetchingDetails(false);
    setJobs((prevJobs) => [...prevJobs, ...jobsForPage]);
  }

  const handleClick = () => {
    setCurrentPage((page) => page + 1);
  };

  return (
    <JobBoardWrapper>
      <JobBoardWrapper.heading>Hacker News Job Board</JobBoardWrapper.heading>
      {jobs.map((item, index) => (
        <div key={index}>
          <JobBoardWrapper.title>{item.title}</JobBoardWrapper.title>
          <JobBoardWrapper.JobPostdetails>
            <span>Job Poster: {item.by}</span>
            <span>
              Date Posted: {new Date(item.time * 1000).toLocaleDateString()}
            </span>
          </JobBoardWrapper.JobPostdetails>
        </div>
      ))}
      <button onClick={handleClick} disabled={fetchingDetails}>
        Load More Jobs
      </button>
    </JobBoardWrapper>
  );
};

export default JobPoster;
