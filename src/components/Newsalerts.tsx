import React, { memo, FC, useEffect, useState } from 'react';
// eslint-disable-next-line import/extensions
import useApiStore from '@/store/store';
// eslint-disable-next-line import/no-extraneous-dependencies
// import axios from 'axios';\
// eslint-disable-next-line import/extensions
import { dataPoint } from '@/types/type';
// import main from '.storybook/main';
// eslint-disable-next-line import/extensions
import Rendercompany from './Rendercompany';
// eslint-disable-next-line import/extensions
import Skeleton from './Skeletonloader';

const Newsalerts: FC = () => {
  const apiResponse = useApiStore((state: any) => state.apiResponse);
  const setApiResponse = useApiStore((state: any) => state.setApiResponse);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    setLoading(true);
    fetch(`api/newsfeed/?important=true`)
      .then((res) => res.json())
      .then((res) => {
        setApiResponse(res.data);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [setApiResponse]);
  const renderList = apiResponse?.map((element: dataPoint) => {
    const date = new Date(element?.publishedOn);
    return (
      <main
        // eslint-disable-next-line no-underscore-dangle
        key={element._id}
        onClick={() => {
          window.open(element.sourceUrl, '_blank');
        }}
        className="flex gap-8 py-6 px-6 cursor-pointer rounded-lg border border-transparent hover:bg-neutral-100"
      >
        <img src={element.imageUrl} alt="" className="w-24 h-16" />
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-textGray">{element.header}</h3>
          <span className="flex text-xs font-medium text-textLightGray gap-6">
            <h3>{element.publisher}</h3>
            <p>{date.toString()}</p>
          </span>
          <div className="flex text-xs gap-2 text-textLightGray">
            {element?.sectors.map((ele) => (
              <p key={ele}>{ele}</p>
            ))}
          </div>
          <p className="text-sm text-textLightGray2 line-clamp-3">
            {element.description}
          </p>
          <Rendercompany companies={element.companySentiment} />
        </div>
      </main>
    );
  });
  return (
    <div className="h-[500px] min-h-full my-6">
      <h3 className="text-xs font-semibold pb-6 text-textLightGray">
        BUSINESS NEWS
      </h3>
      {loading ? <Skeleton /> : renderList}
    </div>
  );
};

export default memo(Newsalerts);
