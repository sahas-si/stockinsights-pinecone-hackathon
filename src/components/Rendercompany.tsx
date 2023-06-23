import React, { FC, memo } from "react";
import { apiResponse } from "@/types/type";
const bgColors = [
  {
    bgcolor: "#CBF4C9",
    textcolor: `#0E6245`,
  },
  {
    bgcolor: "#F8E5BA",
    textcolor: `#9C3F0F`,
  },
];
const Rendercompany: FC<Rendercompany> = ({ companies }) => {
  return (
    <div className="flex gap-4 text-sm">
      {companies.map((ele, index) => {
        const { bgcolor, textcolor } = bgColors[index];
        return (
          <p
            key={ele}
            style={{
              backgroundColor: bgcolor,
              color: textcolor,
            }}
            className={`px-4 py-[2px] rounded-md`}
          >
            {ele}
          </p>
        );
      })}
    </div>
  );
};
interface Rendercompany {
  companies: string[];
}
export default memo(Rendercompany);
