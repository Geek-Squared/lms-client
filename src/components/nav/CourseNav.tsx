import React from 'react';
import { faTimes, faArrowRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './styles.scss';

interface ICourseNavProps {
    courses?: any;
    onModuleClick?: any;
}
//@ts-ignore
const CourseNavItems = ({ title, children }) => {
    return (
        <details className="module-items">
            <summary>{title}</summary>
            {children}
        </details>
    )
}

const CourseNav: React.FC<ICourseNavProps> = ({ courses, onModuleClick }) => {
    const [isSidebarOpen, setSidebarOpen] = React.useState(true);

    return (
        <>
            {isSidebarOpen ? (
                <div className="course-details-nav">
                    <div className="sticky-header">
                        Course Content
                        <FontAwesomeIcon
                            icon={faTimes}
                            onClick={() => setSidebarOpen(!isSidebarOpen)}
                            style={{ cursor: 'pointer', float: 'right' }}
                        />
                    </div>
                    <CourseNavItems title="Section 1: Introduction">
                        {
                            //@ts-ignore
                            courses?.modules.map((module) => (
                                <ul>
                                     <li className="module-items__list" onClick={() => onModuleClick(module.videoUrl)}>{module?.title}</li>
                                </ul>
                            ))
                        }
                    </CourseNavItems>
                </div>
            ) : (
                <FontAwesomeIcon
                    icon={faArrowRight}
                    onClick={() => setSidebarOpen(!isSidebarOpen)}
                    style={{ cursor: 'pointer' }}
                />
            )}
        </>
    );
};

export default CourseNav;