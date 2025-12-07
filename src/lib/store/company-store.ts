import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface GrokopediaData {
  summary: string;
  industry: string;
  foundingDate?: string;
  keyProducts?: string[];
  [key: string]: any;
}

export interface Segment {
  id: string;
  name: string;
  description: string;
  icon: string;
  matchScore: number;
}

export interface AdContent {
  id: string;
  segmentId: string;
  copy: string;
  imageSrc: string;
  handle?: string;
  name?: string;
}

interface CompanyState {
  name: string;
  description: string;
  goal: string;
  useGrokopedia: boolean;
  grokopediaData: GrokopediaData | null;
  isLoading: boolean;
  segments: Segment[];
  selectedSegmentIds: string[];
  ads: AdContent[];
  
  setName: (name: string) => void;
  setDescription: (description: string) => void;
  setGoal: (goal: string) => void;
  toggleGrokopedia: () => void;
  setGrokopediaData: (data: GrokopediaData | null) => void;
  setIsLoading: (isLoading: boolean) => void;
  setSegments: (segments: Segment[]) => void;
  toggleSegment: (id: string) => void;
  setAds: (ads: AdContent[]) => void;
  reset: () => void;
}

export const useCompanyStore = create<CompanyState>()(
  persist(
    (set) => ({
      name: '',
      description: '',
      goal: '',
      useGrokopedia: false,
      grokopediaData: null,
      isLoading: false,
      segments: [],
      selectedSegmentIds: [],
      ads: [],

      setName: (name) => set({ name }),
      setDescription: (description) => set({ description }),
      setGoal: (goal) => set({ goal }),
      toggleGrokopedia: () => set((state) => ({ useGrokopedia: !state.useGrokopedia })),
      setGrokopediaData: (data) => set({ grokopediaData: data }),
      setIsLoading: (isLoading) => set({ isLoading }),
      setSegments: (segments) => set({ segments }),
      toggleSegment: (id) => set((state) => {
        const isSelected = state.selectedSegmentIds.includes(id);
        return {
          selectedSegmentIds: isSelected
            ? state.selectedSegmentIds.filter(sid => sid !== id)
            : [...state.selectedSegmentIds, id]
        };
      }),
      setAds: (ads) => set({ ads }),
      reset: () => set({
        name: '',
        description: '',
        goal: '',
        useGrokopedia: false,
        grokopediaData: null,
        isLoading: false,
        segments: [],
        selectedSegmentIds: [],
        ads: []
      }),
    }),
    {
      name: 'company-storage',
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
    }
  )
);
