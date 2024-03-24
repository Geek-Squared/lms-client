import React from 'react';
import CourseCard from '../../shared/cards/course/CourseCard';
import './styles.scss'

interface ICourseListProps {
    title: string;
    description: string;
    image?: any;
    authorPic?: string;
    authorName?: string;
    level?: any;
    students?: number;
    rating?: number;
    price?: number;
}

const CourseList: React.FC<ICourseListProps> = ({
    title,
    description,
    image,
    authorPic,
    authorName,
    level,
    students,
    rating,
    price
}) => {

    return (
        <CourseCard
            title={title}
            description={description}
            imageUrl={image}
            authorPic={authorPic || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
            authorName={authorName || "DR Hannah Stills"}
            level={level}
            studentsEnrolled={students || 100}
            rating={rating || 4.5}
            price={price || 19.99}
        />
    );
};

export default CourseList;