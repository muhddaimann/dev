import { create } from 'zustand';

interface DataPoint {
  value: number;
  label: string;
}

interface AppState {
  chartData: DataPoint[];
  addDataPoint: (point: DataPoint) => void;
  clearData: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  chartData: [
    { value: 50, label: 'Jan' },
    { value: 75, label: 'Feb' },
    { value: 60, label: 'Mar' },
    { value: 85, label: 'Apr' },
    { value: 70, label: 'May' },
  ],
  addDataPoint: (point) =>
    set((state) => ({
      chartData: [...state.chartData, point],
    })),
  clearData: () => set({ chartData: [] }),
}));