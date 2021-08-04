import React from 'react';
import PropTypes from 'prop-types';
import AlbumList from '../components/AlbumList';

AlbumFeature.propTypes = {

};

function AlbumFeature(props) {
    const albumList = [
        {
            id: 1,
            name: 'Animal'
        },
        {
            id: 2,
            name: 'Sugar'
        },
        {
            id: 3,
            name: 'One call away'
        }
    ]
    return (
        <div>
            <h3>Your album !!!</h3>
            <AlbumList albumList={albumList} />
        </div>
    );
}

export default AlbumFeature;