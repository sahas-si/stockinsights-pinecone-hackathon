/* eslint-disable import/no-extraneous-dependencies */
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

// eslint-disable-next-line import/no-extraneous-dependencies
// eslint-disable-next-line import/no-extraneous-dependencies
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
// eslint-disable-next-line import/extensions
import { format } from 'date-fns';
// eslint-disable-next-line import/extensions
import useApiStore from '@/store/store';
// eslint-disable-next-line import/extensions
import Previewlist from './Previewlist';

const Datefilter: React.FC = () => {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);
  const selectedDate = useApiStore((state: any) => state.selectedDate);
  const companies = useApiStore((state: any) => state.companies);
  const publishers = useApiStore((state: any) => state.publishers);
  const setSelectedDate = useApiStore((state: any) => state.setSelectedDate);
  const setApiResponse = useApiStore((state: any) => state.setApiResponse);
  let footer = <p>Please pick a day.</p>;
  if (selectedDate) {
    footer = <p>You picked {format(selectedDate, 'PP')}.</p>;
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
  const selectedDateStr = useMemo(
    () =>
      selectedDate.toLocaleString('default', {
        day: '2-digit',
        month: 'long',
      }),
    [selectedDate]
  );
  const applyFilter = useCallback(() => {
    setShowCompanies(false);
    const selectedCompanies = companies
      ?.filter((ele: any) => ele.selected)
      ?.map((ele: any) => ele.name)
      .join(',');
    const selectedPublishers = publishers
      .filter((ele: any) => ele.selected)
      .map((ele: any) => ele.name)
      .join(',');
    const dateString = selectedDate.toISOString().slice(0, 10);
    fetch(
      `api/newsfeed/?import:anyant=true&publisher=${selectedPublishers}&company=${selectedCompanies}&publishedFrom=${dateString}`
    )
      .then((res) => res.json())
      .then((res) => {
        setApiResponse(res.data);
      })
      .catch((error) => console.error(error))
      .finally(() => {});
  }, [publishers, companies, selectedDate, setApiResponse]);
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
        <h3 className="">{hydrated ? selectedDateStr : ''}</h3>
        <span className="flex items-center gap-2 cursor-pointer">
          {toggleChevron}
        </span>
      </main>
      {showCompanies && (
        <Previewlist>
          <style>{css}</style>
          <DayPicker
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            footer={footer}
            disabled={{ after: new Date() }}
            modifiersClassNames={{
              selected: 'my-selected',
            }}
            modifiersStyles={{
              disabled: { fontSize: '75%' },
            }}
          />
          <button
            onClick={applyFilter}
            className="bg-webColor hover:bg-sky-700 text-xs w-fit text-white mx-4 px-4 py-1 rounded-md my-4"
          >
            Apply
          </button>
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
