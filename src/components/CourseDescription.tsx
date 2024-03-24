import React from "react";
import "./styles.scss"

interface ICourseDescriptionProps {
    description?: string;
}

const CourseDescription: React.FC<ICourseDescriptionProps> = ({description}) => {
    return (
        <div className="toogle-items">
            <h3>Course Description</h3>
            <div className="course-card__desc" dangerouslySetInnerHTML={{ __html: description }} style={{marginBottom: "2%"}} />
        </div>
    )
}

export default CourseDescription;