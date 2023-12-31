import { create } from 'zustand';
// eslint-disable-next-line import/extensions
import { apiResponse } from '../types/type';
// eslint-disable-next-line import/extensions
import { source, company } from '../data/data';

const useApiStore = create((set) => ({
  loading: false,
  setLoading: (response: apiResponse) => set(() => ({ loading: response })),
  apiResponse: null,
  setApiResponse: (response: apiResponse) =>
    set(() => ({ apiResponse: response })),
  companies: company,
  setCompanies: (response: any) => set(() => ({ companies: response })),
  publishers: source,
  setPublishers: (response: any) => set(() => ({ publishers: response })),
  selectedDate: new Date('24 June 2023'),
  setSelectedDate: (response: any) => set(() => ({ selectedDate: response })),
}));

export default useApiStore;
