import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, X } from "lucide-react";
import { CVData, Course } from "@/types/cv";

interface CoursesProps {
  cvData: CVData;
  setCVData: React.Dispatch<React.SetStateAction<CVData>>;
}

const Courses: React.FC<CoursesProps> = ({ cvData, setCVData }) => {
  const addCourse = () => {
    setCVData((prevData) => ({
      ...prevData,
      courses: [
        ...prevData.courses,
        {
          id: Date.now().toString(),
          title: "",
          provider: "",
          date: null,
          description: "",
        },
      ],
    }));
  };

  const updateCourse = (
    id: string,
    field: keyof Course,
    value: string | Date | null
  ) => {
    setCVData((prevData) => ({
      ...prevData,
      courses: prevData.courses.map((course) =>
        course.id === id ? { ...course, [field]: value } : course
      ),
    }));
  };

  const deleteCourse = (id: string) => {
    setCVData((prevData) => ({
      ...prevData,
      courses: prevData.courses.filter((course) => course.id !== id),
    }));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Courses</h2>
      {cvData.courses.map((course) => (
        <div
          key={course.id}
          className="space-y-2 border border-border p-4 rounded-md relative"
        >
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2"
            onClick={() => deleteCourse(course.id)}
          >
            <X className="h-4 w-4" />
          </Button>
          <Input
            placeholder="Course Title"
            value={course.title}
            onChange={(e) => updateCourse(course.id, "title", e.target.value)}
          />
          <Input
            placeholder="Provider"
            value={course.provider}
            onChange={(e) =>
              updateCourse(course.id, "provider", e.target.value)
            }
          />
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">
                {course.date ? (
                  format(course.date, "PPP")
                ) : (
                  <span>Course Date</span>
                )}
                <CalendarIcon className="ml-2 h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={course.date}
                onSelect={(date) => updateCourse(course.id, "date", date)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <Textarea
            placeholder="Description"
            value={course.description}
            onChange={(e) =>
              updateCourse(course.id, "description", e.target.value)
            }
          />
        </div>
      ))}
      <Button onClick={addCourse}>Add Course</Button>
    </div>
  );
};

export default Courses;
