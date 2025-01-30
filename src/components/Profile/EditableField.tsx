import React, { useState } from "react";
import { Check, X, Pencil } from "lucide-react";
import { cn } from "@/lib/utils";
interface EditableFieldProps {
  value: string;
  onSave: (value: string) => void;
  label?: string;
  placeholder?: string;
  className?: string;
}
const EditableField = ({ value, onSave, label, placeholder, className }: EditableFieldProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);
  const handleSave = () => {
    onSave(tempValue);
    setIsEditing(false);
  };
  const handleCancel = () => {
    setTempValue(value);
    setIsEditing(false);
  };
  return (
    <div className={cn("relative group", className)}>
      <label className="text-sm text-gray-500 mb-1 block">{label}</label>
      {isEditing ? (
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={placeholder}
          />
          <button
            onClick={handleSave}
            className="p-1 text-green-600 hover:text-green-700"
            title="Save"
          >
            <Check size={20} />
          </button>
          <button
            onClick={handleCancel}
            className="p-1 text-red-600 hover:text-red-700"
            title="Cancel"
          >
            <X size={20} />
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-between group">
          <span className="block py-2">{value || placeholder}</span>
          <button
            onClick={() => setIsEditing(true)}
            className="opacity-0 group-hover:opacity-100 p-1 text-gray-500 hover:text-gray-700 transition-opacity"
            title="Edit"
          >
            <Pencil size={16} />
          </button>
        </div>
      )}
    </div>
  );
};
export default EditableField;