import React, { useState } from "react";
import { Clock, Mail, Phone } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EditableField from "./EditableField";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";

function PrivateProfileContactCard() {
  const [profile, setProfile] = useState({
    title: "Software Engineer",
    availabilityType: "full-time",
    workingHours: "08:00 - 17:00",
    email: "john.doe@acme.com",
    phone: "+1 (555) 123-4567",
  });

  const [tempStartHour, setTempStartHour] = useState("08:00");
  const [tempEndHour, setTempEndHour] = useState("17:00");
  const [isTimeDialogOpen, setIsTimeDialogOpen] = useState(false);

  const handleUpdate = (field: keyof typeof profile, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
    console.log(`Updated ${field} to:`, value);
  };

  const handleTimeUpdate = () => {
    const newWorkingHours = `${tempStartHour} - ${tempEndHour}`;
    handleUpdate("workingHours", newWorkingHours);
    setIsTimeDialogOpen(false);
  };

  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute of ["00", "30"]) {
        const time = `${hour.toString().padStart(2, "0")}:${minute}`;
        options.push(time);
      }
    }
    return options;
  };

  const timeOptions = generateTimeOptions();
  return (
    <div className="mx-auto sticky top-[250px] hidden md:block w-[30vw] h-[56vh] my-6 xl:ml-4 bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-gray-100 px-6 py-2">
        <EditableField
          value={profile.title}
          onSave={(value) => handleUpdate("title", value)}
          // label="Área de Trabajo"
          placeholder="Enter your professional title"
          className="font-semibold text-base"
        />
      </div>
      
      <div className="p-6 space-y-6">
        <div className="space-y-4">
          <div className="flex items-start gap-3">
          <Clock className="w-5 h-5 text-gray-500 mt-1" />
            <div className="flex-1">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm text-gray-500">Tipo de Disponibilidad</label>
                  <Select
                    value={profile.availabilityType}
                    onValueChange={(value) => handleUpdate("availabilityType", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select availability" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full-time">Full-time</SelectItem>
                      <SelectItem value="part-time">Part-time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm text-gray-500">Horario de Trabajo</label>
                  <div className="flex items-center justify-between group">
                    <span className="block py-2">{profile.workingHours}</span>
                    <Dialog open={isTimeDialogOpen} onOpenChange={setIsTimeDialogOpen}>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="opacity-0 group-hover:opacity-100"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Set Working Hours</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Start Time</label>
                            <Select
                              value={tempStartHour}
                              onValueChange={setTempStartHour}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select start time" />
                              </SelectTrigger>
                              <SelectContent>
                                {timeOptions.map((time) => (
                                  <SelectItem key={time} value={time}>
                                    {time}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">End Time</label>
                            <Select
                              value={tempEndHour}
                              onValueChange={setTempEndHour}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select end time" />
                              </SelectTrigger>
                              <SelectContent>
                                {timeOptions.map((time) => (
                                  <SelectItem key={time} value={time}>
                                    {time}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <Button onClick={handleTimeUpdate}>Save</Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t">
            <h3 className="text-sm font-medium text-gray-500 mb-4">Contacto</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-gray-500 mt-6" />
                <EditableField
                  value={profile.email}
                  onSave={(value) => handleUpdate("email", value)}
                  label="Email"
                  placeholder="Enter your email"
                  className="flex-1"
                />
              </div>
              
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-gray-500 mt-6" />
                <EditableField
                  value={profile.phone}
                  onSave={(value) => handleUpdate("phone", value)}
                  label="Phone"
                  placeholder="Enter your phone number"
                  className="flex-1"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PrivateProfileContactCard;
