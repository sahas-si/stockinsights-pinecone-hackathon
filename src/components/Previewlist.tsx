import React from 'react';

interface PreviewlistProp {
  children: React.ReactNode;
}
const Previewlist: React.FC<PreviewlistProp> = ({ children }) => {
  return (
    <div className="flex flex-col absolute border rounded-md bg-white z-20 top-10">
      {children}
    </div>
  );
};
export default Previewlist;
