import { useCallback, useState } from 'react';
// eslint-disable-next-line import/extensions
import { TabElement } from '@/components/Tabelelement';
// eslint-disable-next-line import/extensions
import Companyfilter from '@/components/Companyfilter';
// eslint-disable-next-line import/extensions
import Datefilter from '@/components/Datefilter';
// eslint-disable-next-line import/extensions
import Newsalerts from '@/components/Newsalerts';
// eslint-disable-next-line import/extensions
// import Sectorfilter from '@/components/Sectorfilter';
// eslint-disable-next-line import/extensions
import Sourcefilter from '@/components/Sourcefilter';
// eslint-disable-next-line import/extensions
import useApiStore from '@/store/store';

type tabtype = 'Me' | 'Explore';
export default function Home() {
  const [tab, setTab] = useState<tabtype>('Me');
  const [currPage, setCurrPage] = useState<number>(1);
  const itemsPerPage = 50;
  const apiResponse = useApiStore((state: any) => state.apiResponse);
  const companies = useApiStore((state: any) => state.companies);
  const publishers = useApiStore((state: any) => state.publishers);
  const selectedDate = useApiStore((state: any) => state.selectedDate);
  const setLoading = useApiStore((state: any) => state.setLoading);
  const setApiResponse = useApiStore((state: any) => state.setApiResponse);
  const totalItems = apiResponse?.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
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
    const dateString = selectedDate.toISOString().slice(0, 10);
    setLoading(true);
    fetch(
      `api/newsfeed/?import:anyant=true&publisher=${selectedPublishers}&company=${selectedCompanies}&publishedFrom=${dateString}`
    )
      .then((res) => res.json())
      .then((res) => {
        setApiResponse(res.data);
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setLoading(false);
      });
  }, [publishers, companies, selectedDate, setApiResponse, setLoading]);
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
  const paginationInfo = (
    <main className="flex items-center justify-between gap-4">
      {totalItems ? (
        <p className="text-sm !font-normal text-gray-500">
          {/* {displayPaginationResults(currPage, totalAllerts)} */}
          {totalItems > itemsPerPage
            ? currPage * itemsPerPage
            : totalItems}{' '}
          results of {totalItems}
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
          <h3 className="text-4xl font-semibold ">News Feed</h3>
          <p className="font-medium text-lg text-textLightGray">
            Stay ahead of the market
          </p>
        </div>
        <p className="cursor-pointer text-sm font-normal text-gray-500">
          Last Updated: 25th June
        </p>
      </div>
      <div className="my-6 flex gap-5">
        <Sourcefilter setCurrPage={setCurrPage} />
        <Datefilter setCurrPage={setCurrPage} />
        {/* <Sectorfilter /> */}
        <Companyfilter setCurrPage={setCurrPage} />
      </div>
      <div className="flex justify-between items-center pb-2 text-xs sm:text-sm mt-5 border-b border-gray-200 gap-2 flex-wrap">
        {Tabs}
      </div>

      <div className="mt-6 text-sm flex justify-between items-center">
        {/* <span className="flex items-center gap-2">
          <p className="">Filtered Articles: </p>
          <h1 className="font-medium">53</h1>
        </span> */}
        {paginationInfo}
      </div>
      <Newsalerts
        currPage={currPage}
        itemsPerPage={itemsPerPage}
        totalPages={totalPages}
      />
      {/* footer */}
      <div>{paginationInfo}</div>
    </main>
  );
}
