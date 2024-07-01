// react-tag-input.d.ts
declare module 'react-tag-input' {
    export interface Tag {
      id: string;
      text: string;
      className?: string;
    }
  
    export interface ReactTagsProps {
      tags: Tag[];
      suggestions: Tag[];
      handleDelete: (i: number) => void;
      handleAddition: (tag: Tag) => void;
      inputFieldPosition?: string;
      allowDragDrop?: boolean;
      autocomplete?: boolean;
      readOnly?: boolean;
    }
  
    export class WithContext extends React.Component<ReactTagsProps> {}
  }