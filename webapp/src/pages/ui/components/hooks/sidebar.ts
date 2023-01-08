import { useState } from 'react';

export function useSideBarOpen(defaultValue: boolean): [boolean, () => void] {
  const [isSideBarOpen, setIsSideBarOpen] = useState(defaultValue);

  const toggleValue = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };

  return [isSideBarOpen, toggleValue];
}
