import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import './styles.scss';

interface CourseItem {
    title: string;
    videoUrl: string;
}

const CourseDetails: React.FC = () => {
    const courseItems: CourseItem[] = [
        { title: 'Video 1', videoUrl: 'https://www.sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4' },
        { title: 'Video 2', videoUrl: 'https://www.sample-videos.com/video123/mp4/720/big_buck_bunny_720p_2mb.mp4' },
        // Add more items as needed
    ];

    const [currentVideo, setCurrentVideo] = useState(courseItems[0].videoUrl);

    const handleItemClick = (videoUrl: string) => {
        setCurrentVideo(videoUrl);
    };

    return (
        <div className="course-details">
            <ReactPlayer url={currentVideo} className="course-details__player" />
            <div className="course-details__sidebar">
               // nav on the left
                 
               //video player on the right
               // Course details below video
               // toggle tab for 
            </div>
        </div>
    );
};

export default CourseDetails;