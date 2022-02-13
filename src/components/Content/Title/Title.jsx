import React from 'react';
import './Title.css';

const Title = (props) => {
    return (
        <div className="title">
            {props.value}
        </div>
    );
}

export default Title;