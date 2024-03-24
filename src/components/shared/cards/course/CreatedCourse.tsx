import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faUsers, faStar } from '@fortawesome/free-solid-svg-icons';
import './styles.scss';

interface CourseCardProps {
    title: string;
    description?: string;
    imageUrl: string;
    authorPic: string;
    authorName: string;
    //@ts-ignore
    level: string;
    studentsEnrolled: number;
    rating?: number;
    price?: number;
    children?:any;
}

const UniqueCourseCard: React.FC<CourseCardProps> = ({ title, description, imageUrl, level, studentsEnrolled, rating, price, children }) => {
    // const [isLiked, setIsLiked] = useState(false);

    return (
        <div className="unique-course-card">
            <div className="unique-course-card__image-container">
                <img src={imageUrl} alt={title} className="unique-course-card__image" />
            </div>
            <h2 className="unique-course-card__title">{title}</h2>
            <p className="unique-course-card__description">{description}</p>
            <div className="unique-course-card__details">
                <span className="unique-course-card__level"><FontAwesomeIcon icon={faBriefcase} /> {level}</span>
                <span className="unique-course-card__students"><FontAwesomeIcon icon={faUsers} /> {studentsEnrolled}</span>
                <span className="unique-course-card__rating"><FontAwesomeIcon icon={faStar} color="orange" /> {rating}</span>
            </div>
            <hr className="unique-course-card__divider" />
            <div className="unique-course-card__footer">
                <span className="unique-course-card__price">ZAR{' '}{price}</span>
             
            </div>
            {children}
        </div>
    );
};

export default UniqueCourseCard;