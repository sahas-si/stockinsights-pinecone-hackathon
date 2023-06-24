// eslint-disable-next-line import/extensions
import useApiStore from '@/store/store';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import React, { useEffect, useRef, useState } from 'react';
// eslint-disable-next-line import/extensions
import Previewlist from './Previewlist';

const Sourcefilter: React.FC = () => {
  const [showCompanies, setShowCompanies] = useState<boolean>(false);
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
  let selectedPreview;
  const selComp = [];
  const publishers = useApiStore((state: any) =>
    state.apiResponse.map((item: any) => item.publisher)
  );
  const publishersList = publishers.map((ele: any) => {
    return (
      <div
        key={ele}
        className="px-8 py-1 hover:bg-neutral-100 text-xs font-medium"
      >
        {ele}
      </div>
    );
  });
  return (
    <div
      ref={companyRef}
      className="flex whitespace-nowrap white cursor-pointer select-none sm:text-sm text-xs relative rounded-3xl w-fit "
    >
      <main
        className={`flex sm:text-sm text-xs justify-start gap-2 items-center sm:py-2 sm:px-4 px-2 py-1 rounded-3xl w-full border shadow-filterBox ${
          selComp.length
            ? 'bg-selectedFilter border-signatureBlue text-[#3175CC]'
            : ''
        }`}
        onClick={() => {
          setShowCompanies((prev) => !prev);
        }}
      >
        <h3 className="">Source</h3>
        <span className="flex items-center gap-2 cursor-pointer">
          {selectedPreview}
          {toggleChevron}
        </span>
      </main>
      {showCompanies && <Previewlist>{publishersList}</Previewlist>}
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
