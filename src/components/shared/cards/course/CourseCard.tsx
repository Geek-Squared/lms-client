import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faUsers, faStar, faShoppingCart, faHeart } from '@fortawesome/free-solid-svg-icons';
import './styles.scss';

interface CourseCardProps {
    title: string;
    description?: string;
    imageUrl: string;
    authorPic: string;
    authorName: string;
    level: string;
    studentsEnrolled: number;
    rating?: number;
    price?: number;
}

const CourseCard: React.FC<CourseCardProps> = ({ title, imageUrl, authorPic, authorName, level, studentsEnrolled, rating, price }) => {
    const [isLiked, setIsLiked] = useState(false);

    const handleLikeClick = () => {
        setIsLiked(!isLiked);
    };

    return (
        <div className="course-card">
            <div className="course-card__image-container">
                <img src={imageUrl} alt={title} className="course-card__image" />
                <FontAwesomeIcon 
                    icon={faHeart} 
                    className="course-card__favourite-icon" 
                    onClick={handleLikeClick} 
                    color={isLiked ? 'red' : 'white'} 
                />
                <div className="course-card__author">
                    <img src={authorPic} alt={authorName} className="course-card__author-pic" />
                    <span className="course-card__author-name">{authorName}</span>
                </div>
            </div>
            <h2 className="course-card__title">{title}</h2>
            {/* <div className="course-card__description three-lines" dangerouslySetInnerHTML={{ __html: description }} /> */}
            <div className="course-card__details">
                <span className="course-card__level"><FontAwesomeIcon icon={faBriefcase} /> {level}</span>
                <span className="course-card__students"><FontAwesomeIcon icon={faUsers} /> {studentsEnrolled}</span>
                <span className="course-card__rating"><FontAwesomeIcon icon={faStar} color="orange" /> {rating}</span>
            </div>
            <hr className="course-card__divider" />
            <div className="course-card__footer">
                <span className="course-card__price">ZAR{' '}{price}</span>
                <span className="course-card__add-to-cart"><FontAwesomeIcon icon={faShoppingCart} /> Add to cart</span>
            </div>
        </div>
    );
};

export default CourseCard;