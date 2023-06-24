import React, { memo, FC, useEffect } from 'react';
// eslint-disable-next-line import/extensions
import useApiStore from '@/store/store';
// eslint-disable-next-line import/no-extraneous-dependencies
// import axios from 'axios';\
// eslint-disable-next-line import/extensions
import { dataPoint } from '@/types/type';
// import main from '.storybook/main';
// import Rendercompany from './Rendercompany';

const Newsalerts: FC = () => {
  const apiResponse = useApiStore((state: any) => state.apiResponse);
  const setApiResponse = useApiStore((state: any) => state.setApiResponse);
  useEffect(() => {
    fetch(`api/newsfeed/`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res.data);
        setApiResponse(res.data);
      })
      .catch((error) => console.error(error));
  }, [setApiResponse]);
  const renderList = apiResponse?.map((element: dataPoint) => {
    return (
      <main
        // eslint-disable-next-line no-underscore-dangle
        key={element._id}
        onClick={() => {
          window.open(element.sourceUrl, '_blank');
        }}
        className="flex gap-8 py-6 px-6 cursor-pointer rounded-lg border border-transparent hover:bg-neutral-100"
      >
        <div
          className="h-20 w-32 border text-xs"
          style={{
            backgroundImage: `url(${element.imageUrl})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}
        ></div>
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-textGray">{element.header}</h3>
          <span className="flex text-xs font-medium text-textLightGray gap-6">
            <h3>{element.publisher}</h3>
            <p>13 hrs ago</p>
          </span>
          <div className="flex text-xs gap-2 text-textLightGray">
            {element?.sectors.map((ele) => (
              <p key={ele}>{ele}</p>
            ))}
          </div>
          <p className="text-sm text-textLightGray2">
            The first batch of Adidas remaining Yeezys went on sale Wednesday
            and appear to be available through Adidas app “Confirmed.”
          </p>
          {/* <Rendercompany companies={element.companyNames} /> */}
        </div>
      </main>
    );
  });
  return (
    <div className="h-[500px] min-h-full my-6">
      <h3 className="text-xs font-semibold pb-6 text-textLightGray">
        BUSINESS - NEWS, OPINION AND ANALYSIS
      </h3>
      {renderList}
    </div>
  );
};

export default memo(Newsalerts);
