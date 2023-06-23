import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useRef, useState } from "react";
const Companyfilter: React.FC = () => {
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
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);
  const toggleChevron = showCompanies ? (
    <ChevronUpIcon className="w-4 h-4 text-gray-600" />
  ) : (
    <ChevronDownIcon className="w-4 h-4 text-gray-600" />
  );
  let selectedPreview;
  let selComp = [];
  return (
    <div
      ref={companyRef}
      className="flex whitespace-nowrap white cursor-pointer select-none sm:text-sm text-xs relative rounded-3xl w-fit "
    >
      <main
        className={`flex sm:text-sm text-xs justify-start gap-2 items-center sm:py-2 sm:px-4 px-2 py-1 rounded-3xl w-full border shadow-filterBox ${
          selComp.length
            ? "bg-selectedFilter border-signatureBlue text-[#3175CC]"
            : ""
        }`}
        onClick={() => {
          setShowCompanies((prev) => !prev);
        }}
      >
        <h3 className="">Company</h3>
        <span className="flex items-center gap-2 cursor-pointer">
          {selectedPreview}
          {toggleChevron}
        </span>
      </main>
      {showCompanies && <main>Sectors</main>}
    </div>
  );
};
export default React.memo(Companyfilter);
type Sectors = {
  onClick: () => void;
  showCompanies: boolean;
};
export type companies = {
  company_name: string;
  bse_id: string;
  selected: boolean;
};
