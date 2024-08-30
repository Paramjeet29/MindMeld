
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
    postsPerPage: number,
    length: number,
    handlePagination: (page: number) => void,
    currentPage: number
}

const Pagination: React.FC<PaginationProps> = ({ postsPerPage, length, handlePagination, currentPage }) => {
    const totalPages = Math.ceil(length / postsPerPage);
    const maxVisiblePages = 3;

    const getVisiblePages = () => {
        if (totalPages <= maxVisiblePages) {
                        return Array.from({ length: totalPages }, (_, i) => i + 1);
                    }
            
                    const halfVisible = Math.floor(maxVisiblePages / 2);
                    let start = Math.max(currentPage - halfVisible, 1);
                    let end = Math.min(start + maxVisiblePages - 1, totalPages);
            
                    if (end - start + 1 < maxVisiblePages) {
                        start = Math.max(end - maxVisiblePages + 1, 1);
                    }
            
                    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    };

    const visiblePages = getVisiblePages();

    const safeHandlePagination = (pageNum: number) => {
        if (typeof handlePagination === 'function') {
            handlePagination(pageNum);
        } else {
            console.error('handlePagination is not a function', handlePagination);
        }
    };

    return (
        <nav className="flex justify-center items-center space-x-2 bg-orange-100 px-4 py-2 rounded-lg border-2">
            <button
                onClick={() => safeHandlePagination(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-1 rounded-md bg-orange-300 text-orange-700 disabled:opacity-50 hover:bg-orange-200"
            >
                <ChevronLeft size={15} />
            </button>
            {visiblePages.map((pageNum) => (
                <button
                    key={pageNum}
                    onClick={() => safeHandlePagination(pageNum)}
                    className={`w-8 h-8 flex items-center justify-center rounded-md ${
                        currentPage === pageNum
                            ? 'bg-orange-300 text-orange-700 border-2 border-orange-200'
                            : 'bg-orange-50 text-orange-700 hover:bg-orange-200'
                    }`}
                >
                    {pageNum}
                </button>
            ))}
            {totalPages > maxVisiblePages && currentPage < totalPages - 2 && (
                <span className="px-2 text-orange-700">...</span>
            )}
            {totalPages > maxVisiblePages && currentPage < totalPages - 1 && (
                <button
                    onClick={() => handlePagination(totalPages)}
                    className="w-8 h-8 flex items-center justify-center rounded-md bg-orange-50 text-orange-700 hover:bg-orange-200"
                >
                    {totalPages}
                </button>
            )}
            <button
                onClick={() => safeHandlePagination(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-1 rounded-md bg-orange-300 text-orange-700 disabled:opacity-50 hover:bg-orange-200"
            >
                <ChevronRight size={15} />
            </button>
        </nav>
    );
};

export default Pagination;