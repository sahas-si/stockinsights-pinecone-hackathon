import { create } from 'zustand';
// eslint-disable-next-line import/extensions
import { apiResponse } from '../types/type';
// eslint-disable-next-line import/extensions
import { source, company } from '../data/data';

const useApiStore = create((set) => ({
  apiResponse: null,
  setApiResponse: (response: apiResponse) =>
    set(() => ({ apiResponse: response })),
  companies: company,
  setCompanies: (response: any) => set(() => ({ companies: response })),
  publishers: source,
  setPublishers: (response: any) => set(() => ({ publishers: response })),
  selectedDate: new Date('24 June'),
  setSelectedDate: (response: any) => set(() => ({ selectedDate: response })),
}));

export default useApiStore;
