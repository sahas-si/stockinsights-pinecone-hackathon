import React from 'react';

export const Allert = () => (
  <p className="w-full h-60 bg-gray-200 rounded-md skeleton"></p>
);
const Skeleton: React.FC = () => {
  return (
    <div className="">
      <div className="flex flex-col gap-4">
        {[...Array(20)].map((e, i) => (
          <Allert key={JSON.stringify(i)} />
        ))}
      </div>
    </div>
  );
};
export default Skeleton;
