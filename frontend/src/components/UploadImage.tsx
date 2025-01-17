import { ChangeEvent, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface Props {
  open: boolean;
  close: () => void;
  setFile: (file: File | undefined) => void;
}

export default function UploadImage({ open, close, setFile }: Props) {
  const [image, setImage] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(URL.createObjectURL(e.target.files[0]));
      setFile(e.target.files[0]);
    }
  };

  function onClose() {
    setImage("");
    setFile(undefined);
    close();
  }

  if (!open) return null;
  return (
    <div className=" fixed z-[999] w-full h-full top-0 left-0 flex items-center justify-center">
      <Card className="relative">
        <CardHeader>
          <button className="absolute top-2 right-2" onClick={onClose}>
            <X size={20} />
          </button>
          <Label className="hover:cursor-pointer" htmlFor="file">
            Upload
          </Label>
          <Input
            type="file"
            id="file"
            className="hover:cursor-pointer flex pt-1.5"
            onChange={handleChange}
          />
        </CardHeader>
        <CardContent className=" flex justify-center">
          {image && (
            <div className={cn(" relative overflow-hidden", "w-60 h-60")}>
              <img src={image} alt={"image"} className="w-full object-cover" />
            </div>
          )}
        </CardContent>
        <CardFooter className="flex items-center justify-end">
          <Button variant={"ghost"} onClick={onClose} type="button">
            Cancel
          </Button>

          <Button onClick={() => close()}>Save</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
