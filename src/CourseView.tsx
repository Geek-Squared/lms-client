// CourseView.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCourseStore } from './state/course/course';
import CourseNav from './components/nav/CourseNav';
import { VideoJS } from './components/shared/cards/videoPlayer';
import CourseDetailsNav from './components/nav/CourseDetailsNav';
import CourseDescription from './components/CourseDescription';
import Discussions from './components/Discussions';
import Resources from './components/Resources';
import Forum from './components/Forum';
import './styles.scss';
import { useAuthStore } from './state/auth/auth';


const CourseView: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<string>('description');
  const playerRef = React.useRef(null);
  const fetchCourse = useCourseStore((state) => state.fetchCourse)
  const course = useCourseStore((state) => state.course);
  const [currentVideoUrl, setCurrentVideoUrl] = useState<string>(course?.modules[0]?.videoUrl);
  const { courseId } = useParams<{ courseId: string }>();
  const { getUser, user } = useAuthStore();


  useEffect(() => {
    getUser();
  }, [getUser]);

  useEffect(() => {
    fetchCourse(courseId, user?.token);
  }, [courseId, fetchCourse]);
  
  console.log('coursee', course);
  console.log('user', user);

  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    sources: course?.modules.map((module) => ({
      src: currentVideoUrl,
      type: 'video/mp4'
    }))
  };

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    // You can handle player events here, for example:
    player.on('waiting', () => {
      videojs.log('player is waiting');
    });

    player.on('dispose', () => {
      videojs.log('player will dispose');
    });
  };

  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
  }

  return (
    <div className='admin-view'>
      <CourseNav courses={course} onModuleClick={setCurrentVideoUrl}/>
      <div className='admin-content'>
        <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />

        <div className="course-description">
          <CourseDetailsNav onTabChange={handleTabChange} />
          {selectedTab === 'description' && <CourseDescription description={course?.description} />}
          {selectedTab === 'discussion' && <Discussions />}
          {selectedTab === 'resources' && <Resources />}
          {selectedTab === 'qa' && <Forum />}
        </div>
      </div>
    </div>
  );
};

export default CourseView;