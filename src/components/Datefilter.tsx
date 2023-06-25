/* eslint-disable import/no-extraneous-dependencies */
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import React, { useEffect, useRef, useState } from 'react';

// eslint-disable-next-line import/no-extraneous-dependencies
// eslint-disable-next-line import/no-extraneous-dependencies
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
// eslint-disable-next-line import/extensions
import { format } from 'date-fns';
// eslint-disable-next-line import/extensions
import Previewlist from './Previewlist';

export type dateType = {
  startDate: Date;
  endDate: Date;
  modifiled: boolean;
};

const Datefilter: React.FC = () => {
  const [selected, setSelected] = React.useState<any>(new Date());
  let footer = <p>Please pick a day.</p>;
  if (selected) {
    footer = <p>You picked {format(selected, 'PP')}.</p>;
  }
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
  const css = `
  .my-selected:not([disabled]) { 
    font-weight: bold; 
    border: 2px solid #2383E2;
    color: #2383E2;

  }
  .my-selected:hover:not([disabled]) { 
    border-color: ;
    color: #2383E2;
  }
`;
  return (
    <div
      ref={companyRef}
      className="flex whitespace-nowrap white cursor-pointer select-none sm:text-sm text-xs relative rounded-3xl w-fit "
    >
      <main
        className={`flex sm:text-sm text-xs justify-start gap-2 items-center sm:py-2 sm:px-4 px-2 py-1 rounded-3xl w-full border shadow-filterBox `}
        onClick={() => {
          setShowCompanies((prev) => !prev);
        }}
      >
        <h3 className="">14 June</h3>
        <span className="flex items-center gap-2 cursor-pointer">
          {toggleChevron}
        </span>
      </main>
      {showCompanies && (
        <Previewlist>
          <style>{css}</style>
          <DayPicker
            mode="single"
            selected={selected}
            onSelect={setSelected}
            footer={footer}
            disabled={{ after: new Date() }}
            modifiersClassNames={{
              selected: 'my-selected',
            }}
            modifiersStyles={{
              disabled: { fontSize: '75%' },
            }}
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
