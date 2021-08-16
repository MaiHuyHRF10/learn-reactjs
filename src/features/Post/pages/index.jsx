import React, { useEffect, useState } from 'react';
import querySting from 'query-string';
import PostList from '../Components/PostList';
import Pagination from '../Components/Pagination'
import PostFiltersForm from '../Components/PostFiltersForm';




function PostFeature(props) {
    const [postList, setPostList] = useState([]);
    const [pagination, setPagination] = useState({
        _page: 1,
        _limit: 10,
        _totalRows: 1,
    });

    const [filters, setFilters] = useState({
        _limit: 10,
        _page: 1,
        title_like: '',
    });


    useEffect(() => {
        async function fetchPostList() {
            try {
                const paramString = querySting.stringify(filters)
                const requestUrl = `http://js-post-api.herokuapp.com/api/posts?${paramString}`;

                const response = await fetch(requestUrl);
                const responseJSON = await response.json();

                const { data, pagination } = responseJSON;


                setPostList(data);
                setPagination(pagination);

            } catch (error) {
                console.log(error.message);
            }
        }

        fetchPostList();
    }, [filters])


    function handlePageChange(newPage) {
        setFilters({
            ...filters,
            _page: newPage
        })
    }

    function handleFiltersChange(newFilters) {
        setFilters({
            ...filters,
            _page: 1,
            title_like: newFilters.searchTerm,
        })
    }
    return (
        <div>
            <h3>Use Effect</h3>
            <PostFiltersForm onSubmit={handleFiltersChange} />
            <PostList posts={postList} />

            <Pagination pagination={pagination} onPageChange={handlePageChange} />
        </div>
    );
}

export default PostFeature;