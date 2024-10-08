import React from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { CVData } from "@/types/cv";

interface DesignOptionsProps {
  design: string;
  setDesign: (value: string) => void;
  cvData: CVData;
  setCVData: React.Dispatch<React.SetStateAction<CVData>>;
}

const DesignOptions: React.FC<DesignOptionsProps> = ({
  design,
  setDesign,
  setCVData,
}) => {
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCVData((prevData) => ({
          ...prevData,
          image: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Design Options</h2>
      <div>
        <Label htmlFor="design">CV Design</Label>
        <Select onValueChange={setDesign} defaultValue={design}>
          <SelectTrigger>
            <SelectValue placeholder="Select a design" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="classic">Classic</SelectItem>
            <SelectItem value="modern">Modern</SelectItem>
            <SelectItem value="creative">Creative</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="image">Profile Image</Label>
        <Input
          id="image"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
        />
      </div>
    </div>
  );
};

export default DesignOptions;
