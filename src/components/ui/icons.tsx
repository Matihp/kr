import Icon from '@mdi/react';
import { mdiPencilCircle } from '@mdi/js';
import React from 'react';

export const PencilIcon = React.forwardRef<SVGSVGElement, any>((props, ref) => {
  const { className, ...rest } = props;
  return (
    <Icon className={`cursor-pointer h-6 ${className}`} path={mdiPencilCircle} ref={ref} {...rest} />
  );
});
