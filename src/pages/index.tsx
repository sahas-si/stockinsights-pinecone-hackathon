/* eslint-disable react/no-unescaped-entities */
import { useCallback, useMemo, useState } from 'react';
// eslint-disable-next-line import/extensions
import { TabElement } from '@/components/Tabelelement';
// eslint-disable-next-line import/extensions
import Companyfilter from '@/components/Companyfilter';
// eslint-disable-next-line import/extensions
import Newsalerts from '@/components/Newsalerts';
// eslint-disable-next-line import/extensions
import Sourcefilter from '@/components/Sourcefilter';
// eslint-disable-next-line import/extensions
import useApiStore from '@/store/store';
// eslint-disable-next-line no-unused-vars, import/extensions
import { company, source } from '@/data/data';

type tabtype = 'Me' | 'Explore';
export default function Home() {
  const [tab, setTab] = useState<tabtype>('Me');
  const [currPage, setCurrPage] = useState<number>(1);
  const itemsPerPage = 50;
  const apiResponse = useApiStore((state: any) => state.apiResponse);
  const companies = useApiStore((state: any) => state.companies);
  const setCompanies = useApiStore((state: any) => state.setCompanies);
  const publishers = useApiStore((state: any) => state.publishers);
  const setPublishers = useApiStore((state: any) => state.setPublishers);
  const setLoading = useApiStore((state: any) => state.setLoading);
  const setApiResponse = useApiStore((state: any) => state.setApiResponse);
  const totalItems = useMemo(() => apiResponse?.length, [apiResponse]);
  const totalPages = useMemo(
    () => Math.ceil(totalItems / itemsPerPage),
    [totalItems]
  );
  const Tabs = (
    <main className="flex gap-8 text-sm mt-4 w-full">
      <TabElement active={tab === 'Me'} onClick={() => setTab('Me')}>
        US
      </TabElement>
      {/* <TabElement active={tab === 'Explore'} onClick={() => setTab('Explore')}>
        Explore
      </TabElement> */}
    </main>
  );
  const applyFilter = useCallback(() => {
    const selectedCompanies = companies
      ?.filter((ele: any) => ele.selected)
      ?.map((ele: any) => ele.name)
      .join(',');
    const selectedPublishers = publishers
      .filter((ele: any) => ele.selected)
      .map((ele: any) => ele.name)
      .join(',');
    setLoading(true);
    fetch(
      `api/newsfeed/?important=true&publisher=${selectedPublishers}&company=${selectedCompanies}`
    )
      .then((res) => res.json())
      .then((res) => {
        setApiResponse(res.data);
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setLoading(false);
      });
  }, [publishers, companies, setApiResponse, setLoading]);
  const selectedCompaniesArr = companies?.filter((ele: any) => ele.selected);
  const selectedPublishersArr = publishers?.filter((ele: any) => ele.selected);
  const resetFilterHandler = useCallback(() => {
    setLoading(true);
    fetch(`api/newsfeed/?important=true&publisher`)
      .then((res) => res.json())
      .then((res) => {
        setApiResponse(res.data);
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setCompanies(company);
        setPublishers(source);
        setLoading(false);
      });
  }, [setCompanies, setPublishers, setLoading, setApiResponse]);
  const paginationButtons = (
    <div className="flex gap-4">
      {currPage > 1 ? (
        <button
          onClick={() => {
            setCurrPage(currPage - 1);
            applyFilter();
          }}
          className="border px-4 py-1 rounded-md hover:bg-gray-100 shadow-sm"
        >
          Prev
        </button>
      ) : (
        <button className="border px-4 py-1 rounded-md shadow-sm opacity-40 cursor-default">
          Prev
        </button>
      )}
      {currPage < Number(totalPages) ? (
        <button
          onClick={() => {
            setCurrPage(currPage + 1);
            applyFilter();
          }}
          className="border px-4 py-1 rounded-md hover:bg-gray-100 shadow-sm"
        >
          Next
        </button>
      ) : (
        <button className="border px-4 py-1 rounded-md shadow-sm opacity-40 cursor-default">
          Next
        </button>
      )}
    </div>
  );
  // eslint-disable-next-line no-unused-vars
  const pageRes =
    currPage * itemsPerPage > totalItems ? totalItems : currPage * itemsPerPage;
  const paginationInfo = (
    <main className="flex items-center justify-between gap-4">
      {totalItems ? (
        <p className="text-sm !font-normal text-gray-500">
          {/* {displayPaginationResults(currPage, totalAllerts)} */}
          {totalItems > itemsPerPage ? pageRes : totalItems} results of{' '}
          {totalItems}
        </p>
      ) : (
        <p className="text-sm invisible"></p>
      )}
      {paginationButtons}
    </main>
  );
  return (
    <main className="max-w-[888px] mx-auto">
      <div className="flex items-center justify-between mt-6">
        <div className="flex flex-col gap-3 text-textGray">
          <h3 className="text-2xl font-semibold ">News Mapper</h3>
          <p className="font-small text-sm text-textLightGray">
            Using Pinecone, stocks are tagged to news articles from the context
            of companies' earnings transcripts.
          </p>
        </div>
        <p className="cursor-pointer text-sm font-normal text-gray-500">
          Last Updated: 25th June
        </p>
      </div>
      <div className="my-6 flex gap-5">
        <Sourcefilter setCurrPage={setCurrPage} />
        {/* <Datefilter setCurrPage={setCurrPage} /> */}
        {/* <Sectorfilter /> */}
        <Companyfilter setCurrPage={setCurrPage} />
        {selectedCompaniesArr.length || selectedPublishersArr.length ? (
          <button
            className="text-sm border px-4 rounded-md text-webColor border-webColor hover:bg-sky-50"
            onClick={resetFilterHandler}
          >
            Reset filters
          </button>
        ) : (
          ''
        )}
      </div>
      <div className="flex justify-between items-center pb-2 text-xs sm:text-sm mt-5 border-b border-gray-200 gap-2 flex-wrap">
        {Tabs}
      </div>

      <div className="mt-6 text-sm flex justify-between items-center w-fit ml-auto">
        {paginationInfo}
      </div>
      <Newsalerts
        currPage={currPage}
        itemsPerPage={itemsPerPage}
        totalPages={totalPages}
      />
      {/* footer */}
    </main>
  );
}
