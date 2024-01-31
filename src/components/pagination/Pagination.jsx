import React, { useEffect, useState } from "react";
import './pagination.scss';

const Pagination = () => {
  const [post, setPost] = useState([]);
  const [loading, isLoading] = useState(false);
  const [currenPage, setCurrentPage] = useState(1);
  const [postPerpage] = useState(10);

  const fetchApi = () => {
    isLoading(true);
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((json) => {
        setPost(json);
        isLoading(false);
      });
  };

  //get current post
  const pageNumbers = [];
  const indexOfLastPost = currenPage * postPerpage; //3*10
  const indexOftheFirstPost = indexOfLastPost - postPerpage; // 30-10
  const getCurrentPost = post.slice(indexOftheFirstPost, indexOfLastPost);

  const handleNext = () => {
    setCurrentPage((prev) => prev + 1);
  };
  const handlePrev = () => {
    setCurrentPage((prev) => prev - 1);
  };
  // on page change
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const renderPages = () => {
    for (let i = 1; i <= Math.ceil(post.length / postPerpage); i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };
  useEffect(() => {
    fetchApi();
  }, []);

  return (
    <div>
      <h1>{loading && "loading...."}</h1>
      <table border="1">
        {getCurrentPost &&
          getCurrentPost.map((item, i) => {
            return (
              <tr>
                <td>{i}</td>
                <td>{item.userId}</td>
                <td>{item.title}</td>
              </tr>
            );
          })}
      </table>
      <ul className="pagination">
        <button value={"prev"} onClick={handlePrev}>
          Prev
        </button>
        {renderPages().map((number) => {
          return (
            <li>
              <a
                href="!#"
                onClick={() => {
                  paginate(number);
                }}
              >
                {number}
              </a>
            </li>
          );
        })}
        <button value={"next"} onClick={handleNext}>
          Next
        </button>
      </ul>
    </div>
  );
};
export default Pagination;
