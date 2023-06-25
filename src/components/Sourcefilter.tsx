// eslint-disable-next-line import/extensions
import useApiStore from '@/store/store';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
// eslint-disable-next-line import/no-extraneous-dependencies
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md';

import React, { useEffect, useRef, useState } from 'react';
// eslint-disable-next-line import/extensions
import Previewlist from './Previewlist';
// eslint-disable-next-line import/extensions
import { source } from '../data/source';

const Sourcefilter: React.FC = () => {
  const [showCompanies, setShowCompanies] = useState<boolean>(false);
  const [publishers, setPublishers] = useState(source);
  const companyRef = useRef<HTMLDivElement>(null);
  const handleClickOutside = (event: MouseEvent): void => {
    if (
      companyRef.current &&
      !companyRef.current.contains(event.target as Node)
    ) {
      setShowCompanies(false);
    }
  };
  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);
  const toggleChevron = showCompanies ? (
    <ChevronUpIcon className="w-4 h-4 text-gray-600" />
  ) : (
    <ChevronDownIcon className="w-4 h-4 text-gray-600" />
  );
  const publishersList = publishers?.map((ele: any) => {
    return (
      <div
        key={ele.name}
        onClick={() =>
          setPublishers((prev) =>
            prev.map((item) =>
              // eslint-disable-next-line no-undef
              item.name === ele.name
                ? { ...item, selected: !item.selected }
                : item
            )
          )
        }
        className="px-8 py-2 hover:bg-neutral-100 text-xs font-medium flex items-center gap-2"
      >
        {ele.selected ? (
          <MdCheckBox className="text-blue-600" />
        ) : (
          <MdCheckBoxOutlineBlank className="text-blue-600" />
        )}
        <p>{ele.name}</p>
      </div>
    );
  });
  return (
    <div
      ref={companyRef}
      className="flex whitespace-nowrap white cursor-pointer select-none sm:text-sm text-xs relative rounded-3xl w-fit "
    >
      <main
        className={`flex sm:text-sm text-xs justify-start gap-2 items-center sm:py-2 sm:px-4 px-2 py-1 rounded-3xl w-full border shadow-filterBox`}
        onClick={() => {
          setShowCompanies((prev) => !prev);
        }}
      >
        <h3 className="">Source</h3>
        <span className="flex items-center gap-2 cursor-pointer">
          {/* {selectedPreview} */}
          {toggleChevron}
        </span>
      </main>
      {showCompanies && (
        <Previewlist>
          <>
            <main className="h-60 overflow-x-auto">{publishersList}</main>
            <button className="bg-webColor hover:bg-sky-700 text-xs w-fit text-white mx-8 px-4 py-1 rounded-md my-4">
              Apply
            </button>
          </>
        </Previewlist>
      )}
    </div>
  );
};
export default React.memo(Sourcefilter);
// eslint-disable-next-line no-unused-vars
type Sectors = {
  onClick: () => void;
  showCompanies: boolean;
};
export type companies = {
  company_name: string;
  bse_id: string;
  selected: boolean;
};
