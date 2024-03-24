import React from 'react';
import { faVideo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './styles.scss';

const CourseMediaCard: React.FC = () => {
    return (
        <div className="card-container">
            <FontAwesomeIcon icon={faVideo} size="3x" />
            <h3>Dummy Header</h3>
            <p>Dummy text goes here</p>
        </div>
    )
}

export default CourseMediaCard;