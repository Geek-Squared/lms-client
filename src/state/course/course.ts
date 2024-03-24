import create from 'zustand';
import axios from 'axios';

type Module = {
  title: string;
  resources: { type: string; file: string }[];
  quizzes: { question: string; answers: string[]; correctAnswer: string }[];
  prerequisites: string[];
  releaseDate: Date;
};

type Course = {
  title: string;
  description: string;
  category: string;
  duration: string;
  language: string;
  level: string;
  image: string;
  instructor: string;
  students: string[];
  materials: string[];
  modules: Module[];
  courses: any
};

type CourseState = {
  course: Course | null;
  courses: any ,
  error: string | null;
  setCourse: (course: Course) => void;
  createCourse: (course: Course, token: string) => Promise<void>;
  updateCourse: (courseId: string, course: Course, token: string) => Promise<void>;
  fetchCourse: (courseId: string, token: string) => Promise<void>;
  addModuleToCourse: (courseId: string, module: Module, files: File[], token: string) => Promise<void>;
  fetchAllCourses: any;
};

export const useCourseStore = create<CourseState>((set) => ({
  course: null,
  courses: null,
  error: null,
  setCourse: (course) => set({ course }),
  createCourse: async (course, token) => {
    try {
      const response = await axios.post('http://localhost:5000/course', course, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      set({ course: response.data, error: null });
      return response.data.course.id;
    } catch (error: any) {
      set({ error: error.message });
    }
  },
  fetchAllCourses: async () => {
    try {
      const response = await axios.get('http://localhost:5000/course');
      set({ courses: response.data, error: null });
      return response.data; // return the courses
    } catch (error: any) {
      set({ error: error.message });
    }
  },
  updateCourse: async (courseId, course, token) => {
    try {
      const response = await axios.put(`http://localhost:5000/course/${courseId}`, course, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      set({ course: response.data, error: null });
    } catch (error: any) {
      set({ error: error.message });
    }
  },
  fetchCourse: async (courseId, token) => {
    try {
      const response = await axios.get(`http://localhost:5000/course/${courseId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set({ course: response.data, error: null });
    } catch (error: any) {
      set({ error: error.message });
    }
  },
  addModuleToCourse: async (courseId, module, files, token) => {
    const formData = new FormData();
  
    // Module fields
    formData.append('title', module.title);
    formData.append('prerequisites', JSON.stringify(module.prerequisites));
    //@ts-ignore
    formData.append('releaseDate', module.releaseDate);
    const filesArray = Array.isArray(files) ? files : [];
    // Video file
    //@ts-ignore
    const videoFile = filesArray.find(file => file.name === module.videoUrl);
  
  
    if (videoFile) {
      formData.append('videoUrl', videoFile, videoFile.name); 
    }
  
    // Make API call
    const response = await axios.put(
      `http://localhost:5000/course/${courseId}/modules`,
      formData,
      {headers: {Authorization: `Bearer ${token}`}}
    );
  
    // Update state
    set({course: response.data});
  }
  
}));