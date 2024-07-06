import React, { useState, useEffect, useCallback } from 'react';
import Select from 'react-select';
import { WithContext as ReactTags, Tag } from 'react-tag-input';
import './TechTagsInput.css';

const suggestions: Tag[] = [
  { id: 'JavaScript', text: 'JavaScript' },
  { id: 'TypeScript', text: 'TypeScript' },
  { id: 'React', text: 'React' },
  { id: 'Next.js', text: 'Next.js' },
  { id: 'C++', text: 'C++' },
  { id: 'C#', text: 'C#' },
  { id: 'Java', text: 'Java' },
  { id: 'Php', text: 'Php' },
  { id: 'Python', text: 'Python' },
].map(suggestion => ({ ...suggestion, className: '' }));

interface TechTagsInputProps {
  value: string[];
  onChange: (tags: string[]) => void;
}

const SkillsTagsInput: React.FC<TechTagsInputProps> = ({
    value,
    onChange,
  }) => {
    const [tags, setTags] = useState<Tag[]>(
      value.map((v) => ({ id: v, text: v, className: "" }))
    );
    const [inputValue, setInputValue] = useState("");
    const [maxTags, setMaxTags] = useState(15);
  
    useEffect(() => {
      setTags(value.map((v) => ({ id: v, text: v, className: "" })));
    }, [value]);
  
    const handleDelete = useCallback((i: number) => {
      const newTags = tags.filter((_, index) => index !== i);
      onChange(newTags.map((tag) => tag.text));
    }, [tags, onChange]);
  
    const handleAddition = useCallback((tag: Tag) => {
      if (
        tags.length < maxTags &&
        tag.text.trim() !== "" &&
        !tags.some((t) => t.text.toLowerCase() === tag.text.toLowerCase()) &&
        tag.text.length >= 2 &&
        tag.text.length <= 25
      ) {
        const newTags = [...tags, tag];
        onChange(newTags.map((t) => t.text));
        setInputValue("");
        setMaxTags(maxTags - 1);
      }
    }, [tags, maxTags, onChange]);
  
    const handleInputChange = useCallback((input: string) => {
      setInputValue(input);
    }, []);
  
    const handleKeyDown = useCallback(
      (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter" && inputValue.trim()) {
          event.preventDefault();
          handleAddition({ id: inputValue.trim(), text: inputValue.trim() });
        }
      },
      [inputValue, handleAddition]
    );
  
    const filteredSuggestions = suggestions.filter(
      (suggestion) =>
        !tags.some((tag) => tag.id.toLowerCase() === suggestion.id.toLowerCase()) &&
        suggestion.text.toLowerCase().includes(inputValue.toLowerCase())
    );
  
    return (
      <div>
        <div style={{ display: "flex", marginBottom: "10px" }}>
          <Select
            value={null}
            onChange={(selectedOption: any) => {
              if (selectedOption) {
                handleAddition({
                  id: selectedOption.value,
                  text: selectedOption.label,
                });
              }
            }}
            onInputChange={handleInputChange}
            options={filteredSuggestions.map((suggestion) => ({
              value: suggestion.id,
              label: suggestion.text,
            }))}
            inputValue={inputValue}
            onKeyDown={handleKeyDown}
            isClearable
            placeholder="Escribe para buscar o agregar tecnologías..."
            styles={{
              container: (provided) => ({
                ...provided,
                flex: 1,
              }),
            }}
          />
        </div>
        <ReactTags
          tags={tags}
          suggestions={suggestions}
          handleDelete={handleDelete}
          handleAddition={handleAddition}
          inputFieldPosition="none"
          allowDragDrop={false}
          autocomplete
          readOnly={tags.length >= maxTags}
        />
        <p>
          {maxTags - tags.length} de {maxTags} skills permitidas
        </p>
      </div>
    );
  };

export default SkillsTagsInput;