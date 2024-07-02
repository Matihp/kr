import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { WithContext as ReactTags, Tag } from 'react-tag-input';
import './TechTagsInput.css';

const suggestions: Tag[] = [
  { id: 'JavaScript', text: 'JavaScript' },
  { id: 'TypeScript', text: 'TypeScript' },
  { id: 'React', text: 'React' },
  { id: 'Next.js', text: 'Next.js' },
  { id: 'Node.js', text: 'Node.js' },
  // Agrega más sugerencias según sea necesario
].map(suggestion => ({ ...suggestion, className: '' }));

interface TechTagsInputProps {
  value: string[];
  onChange: (tags: string[]) => void;
}

const TechTagsInput: React.FC<TechTagsInputProps> = ({ value, onChange }) => {
  const [tags, setTags] = useState<Tag[]>(value.map(v => ({ id: v, text: v, className: '' })));
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    onChange(tags.map(tag => tag.text));
  }, [tags, onChange]);

  const handleDelete = (i: number) => {
    const newTags = tags.filter((_, index) => index !== i);
    setTags(newTags);
  };

  const handleAddition = (tag: Tag) => {
    if (tags.length < 5) {
      setTags([...tags, tag]);
    }
  };

  const handleInputChange = (inputValue: string) => {
    setInputValue(inputValue);
  };

  const handleSelect = (selectedOption: any) => {
    if (selectedOption && tags.length < 5) {
      handleAddition({ id: selectedOption.value, text: selectedOption.label, className: '' });
      setInputValue('');
    }
  };

  const filteredSuggestions = suggestions.filter(
    (suggestion) =>
      !tags.some((tag) => tag.id === suggestion.id) &&
      suggestion.text.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <div>
      <Select
        value={null}
        onChange={handleSelect}
        onInputChange={handleInputChange}
        options={filteredSuggestions.map((suggestion) => ({
          value: suggestion.id,
          label: suggestion.text,
        }))}
        isClearable
        placeholder="Escribe para buscar tecnologías..."
      />
      <ReactTags
        tags={tags}
        suggestions={suggestions}
        handleDelete={handleDelete}
        handleAddition={handleAddition}
        inputFieldPosition="none"
        allowDragDrop={false}
        autocomplete
        readOnly={tags.length >= 5}
      />
    </div>
  );
};

export default TechTagsInput;