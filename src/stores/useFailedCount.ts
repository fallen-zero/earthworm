/*
 * @Author       : fallen_zero
 * @Date         : 2024-08-07 11:54:16
 * @LastEditors  : fallen_zero
 * @LastEditTime : 2024-08-14 17:12:42
 * @FilePath     : /earthworm/src/stores/useFailedCount.ts
 * @FileName     :
 */

import { create } from 'zustand';

interface State {
  count: number;
}

interface Action {
  increaseFailedCount: (callback: () => void) => void;
  resetFailedCount: () => void;
}

const failedCountTotal = 3;

const useFailedCount = create<State & Action>((set) => ({
  count: 0,
  increaseFailedCount(callback) {
    set((state) => {
      const nextCount = state.count + 1;
      if (nextCount >= failedCountTotal) {
        callback();
      }
      return { count: nextCount };
    });
  },
  resetFailedCount() {
    set({ count: 0 });
  },
}));

export default useFailedCount;
