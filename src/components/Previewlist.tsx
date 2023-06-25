import React from 'react';

interface PreviewlistProp {
  children: React.ReactNode;
}
const Previewlist: React.FC<PreviewlistProp> = ({ children }) => {
  return (
    <div className="border flex flex-col absolute rounded-md bg-white z-20 top-10">
      {children}
    </div>
  );
};
export default Previewlist;
