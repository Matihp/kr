// src/components/ui/icons.tsx
import Icon from '@mdi/react';
import { mdiPencilCircle } from '@mdi/js';

export const PencilIcon = (props: any) => (
  <Icon className="cursor-pointer h-6" path={mdiPencilCircle} {...props} />
);
