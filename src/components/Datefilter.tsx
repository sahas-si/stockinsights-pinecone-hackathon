/* eslint-disable import/no-extraneous-dependencies */
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import React, { useCallback, useEffect, useRef, useState } from 'react';

// eslint-disable-next-line import/no-extraneous-dependencies
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
// eslint-disable-next-line import/no-extraneous-dependencies
import { DateRange } from 'react-date-range';
// eslint-disable-next-line import/extensions
import Previewlist from './Previewlist';

export type dateType = {
  startDate: Date;
  endDate: Date;
  modifiled: boolean;
};

const Datefilter: React.FC = () => {
  const [date, setDate] = useState<dateType>({
    startDate: new Date(Date.now() - 86400000),
    endDate: new Date(Date.now()),
    modifiled: false,
  });
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
  const [selectedRange, setSelectedRange] = useState([
    {
      startDate: date.startDate,
      endDate: date.endDate,
      key: 'selection',
    },
  ]);
  const handleChange = useCallback(
    (item: any) => {
      setSelectedRange([item.selection]);
      setDate((prev) => ({
        ...prev,
        modifiled: true,
      }));
    },
    [setDate]
  );
  useEffect(() => {
    setDate((prev) => ({
      ...prev,
      startDate: selectedRange[0]?.startDate,
      endDate: selectedRange[0]?.endDate,
    }));
  }, [selectedRange, setDate]);
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
        <h3 className="">14 June</h3>
        <span className="flex items-center gap-2 cursor-pointer">
          {selectedPreview}
          {toggleChevron}
        </span>
      </main>
      {showCompanies && (
        <Previewlist>
          <DateRange
            className=""
            rangeColors={['#2383E2']}
            editableDateInputs={true}
            direction="vertical"
            minDate={new Date('1 May, 2023')}
            maxDate={new Date(Date.now())}
            showDateDisplay={false}
            onChange={(item) => handleChange(item)}
            moveRangeOnFirstSelection={false}
            ranges={selectedRange}
          />
        </Previewlist>
      )}
    </div>
  );
};
export default React.memo(Datefilter);
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
