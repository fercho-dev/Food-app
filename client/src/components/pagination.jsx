import React from "react";
import '../css/pagination.css'
import next from '../assets/right.png'
import prev from '../assets/left.png'

export default function Pagination({ postsPerPage, totalPosts, paginate, currentPage, onRecipesPerPageChange }) {    
    const pageNumbers = []
    
    for(let i=1; i<=Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i)
    }

    return (
        <div className="paginator-container">
        <div className="paginator">
            <span onClick={(e) => paginate(e, currentPage-1)}>
                <img src={prev} alt="prev page" />
            </span>
            {pageNumbers.map(number => {
                return <span className={currentPage === number ? 'active' : ''} key={number}>
                    <a href='/' onClick={(e) => paginate(e, number)}>{number}</a>
                </span>
            })}
            <span onClick={(e) => paginate(e, currentPage+1)}>
                <img src={next} alt="next page" />
            </span>
        </div>
        <div className="recipesPerPage">
            <select name="order" id="order" onChange={(e) => onRecipesPerPageChange(e)}>
                <option value="8">8 recipes per page</option>
                <option value="12">12 recipes per page</option>
                <option value="16">16 recipes per page</option>
                <option value="20">20 recipes per page</option>
            </select>
        </div>
        </div>
    )
}