import {useEffect, useState} from "react";

interface Pagination {
    totalProducts: number
    productPerPage: number
    paginate: (number: number) => void
    currentPage: number
}

const Pagination = ({totalProducts, currentPage, productPerPage, paginate}: Pagination) => {

    const pageNumbers: number[] = []

    for (let i = 1; i <= Math.ceil(totalProducts / productPerPage); i++) {
        pageNumbers.push(i)
    }

    return (
        <div>
            <ul className="pagination">
                {pageNumbers.map(number => (
                    <li className={`page-item ${currentPage==number ? `active` : ``}`} key={number}>
                        <div className="page-link" onClick={() => paginate(number)}>
                            {number}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Pagination