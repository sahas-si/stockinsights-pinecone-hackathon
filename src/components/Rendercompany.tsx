// eslint-disable-next-line import/extensions
import { companySentiment } from '@/types/type';
import React, { FC, memo } from 'react';
// import { apiResponse } from '@/types/type';

// const bgColors = [
//   {
//     bgcolor: '#CBF4C9',
//     textcolor: `#0E6245`,
//   },
//   {
//     bgcolor: '#F8E5BA',
//     textcolor: `#9C3F0F`,
//   },
//   {
//     bgcolor: '#FFCFCC',
//     textcolor: `#FF3D31`,
//   },
// ];
const bgColors = {
  positive: {
    bgcolor: '#CBF4C9',
    textcolor: `#0E6245`,
  },
  neutral: {
    bgcolor: '#F8E5BA',
    textcolor: `#9C3F0F`,
  },
  negative: {
    bgcolor: '#F8E5BA',
    textcolor: `#9C3F0F`,
  },
};
interface RendercompanyProp {
  companies: companySentiment[];
}
const Rendercompany: FC<RendercompanyProp> = ({ companies }) => {
  return (
    <div className="flex gap-4 text-sm">
      {companies.map((ele, index) => {
        const { company, sentiment } = ele;
        let bgcolor, textcolor
        if(bgColors[sentiment]) {
          bgcolor = bgColors[sentiment]['bgcolor'];
          textcolor = bgColors[sentiment]['textcolor'];
        }else {
          console.log(sentiment)
          bgcolor = '#F8E5BA'
          textcolor = `#9C3F0F`
        }
        
        return (
          <p
            key={ele.company + index}
            style={{
              backgroundColor: bgcolor,
              color: textcolor,
            }}
            className={`px-4 py-[2px] rounded-md text-xs font-medium`}
          >
            {company}
          </p>
        );
      })}
    </div>
  );
};
export default memo(Rendercompany);
