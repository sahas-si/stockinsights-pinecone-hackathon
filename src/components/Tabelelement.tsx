import { ReactNode, useState } from "react";
export const TabElement: React.FC<TabElementProps> = ({
  children,
  active,
  onClick,
}) => {
  const [hover, setHover] = useState<boolean>(false);
  if (active)
    return (
      <h3
        onClick={onClick}
        className="text-webColor cursor-pointer relative whitespace-nowrap text-base"
      >
        {children}
        <div className="h-[2px] bg-webColor w-full absolute top-8"></div>
        {/* <div className="h-[1px] bg-gray-400 w-full absolute top-7"></div> */}
      </h3>
    );
  else {
    return (
      <h3
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={() => {
          onClick();
          setHover(false);
        }}
        className="text-textLightGray2 cursor-pointer text-base relative"
      >
        {children}
        {hover && (
          <div className="h-[2px] bg-gray-300 w-full absolute top-8"></div>
        )}
      </h3>
    );
  }
};
type TabElementProps = {
  children: ReactNode;
  active: boolean;
  onClick: () => void;
};
