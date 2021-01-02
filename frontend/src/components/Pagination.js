import React from "react";

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];
  const [index, setIndex] = React.useState(1);

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  const handlePagination = (number) => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    paginate(number);
    setIndex(number);
  };
  return (
    <div>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={index === number ? "page-item current" : "page-item"}
          >
            <button
              onClick={() => handlePagination(number)}
              className="page-link"
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
