import React, {useState} from 'react';
import './Paginator.css';

const Paginator = ({portionSize = 7, pageSize, totalUserCount, currentPage, onCurrentChange}) => {
    let pagesCount = Math.ceil(totalUserCount / pageSize);
    let pagination = [];
    for(let i = 1; i <= pagesCount; i++){
        pagination.push(i);
    }

    let portionCount = Math.ceil(pagesCount / portionSize)
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;
    
    return (
        <div className="pagination">
            {portionNumber > 1 && <button onClick={() => setPortionNumber(portionNumber - 1)} >Prev</button>}
            {pagination.filter(d => d >= leftPortionPageNumber && d <= rightPortionPageNumber).map(d =>
                <button onClick={() => {onCurrentChange(d)}} className={currentPage === d ? "button pagination__button active__paggination" : "button pagination__button"}>
                    {d}
                </button>)}
            {portionCount > portionNumber && <button onClick={() => setPortionNumber(portionNumber + 1)} >Next</button>}
        </div>
    );
};

export default Paginator;