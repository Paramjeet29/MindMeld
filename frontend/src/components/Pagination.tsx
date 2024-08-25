import React from 'react'

interface paginationProps{
    postsPerPage:number,
    length:number,
    handlePagination:(page:number)=>void,
    currentPage:number
}

const Pagination:React.FC<paginationProps> = ({ postsPerPage, length, handlePagination, currentPage }) => {
    let paginationNumber = []
    for (let i = 1; i <= Math.ceil(length / postsPerPage); i++) {
        paginationNumber.push(i);
    }
    return (
        <div className=' space-x-4 bg-orange-400 px-2 py-1 rounded-lg  border-2 '>
            {
                paginationNumber.map((data) => (
                    <button  key={data} onClick={() => handlePagination(data)} className={`px-2  ${currentPage === data ? 'border-2 border-orange-50 rounded-md' : ''}`}>
                        {data}
                    </button>
                ))
            }
        </div>
    )
}
export default Pagination