/*
 * @Author       : fallen_zero
 * @Date         : 2024-08-07 10:53:58
 * @LastEditors  : fallen_zero
 * @LastEditTime : 2024-08-08 00:55:29
 * @FilePath     : /earthworm/src/stores/useCourse.ts
 * @FileName     :
 */

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface Statement {
  chinese: string;
  english: string;
  soundMark: string;
}

interface CourseData {
  name: string;
  statements: Statement[];
}

interface State {
  statementIndex: number;
  currentCourse: CourseData[];
}

interface Action {
  setStatementIndex: (index: number) => void;
  toNextStatement: () => void;
  fetchCourse: () => Promise<void>;
  getCurrentStatement: () => Statement | undefined;
  checkCorrect: (input: string) => boolean;
}

const useCourse = create(
  persist<State & Action, [], [], Partial<State>>(
    (set, get) => ({
      statementIndex: 0,
      currentCourse: [],
      setStatementIndex(index) {
        set({ statementIndex: index });
      },
      toNextStatement() {
        set((state) => {
          const nextStatementIndex = state.statementIndex + 1;
          const statements = state.currentCourse[0].statements;

          if (nextStatementIndex >= statements.length) {
            return {
              statementIndex: 0,
            };
          }
          return {
            statementIndex: nextStatementIndex,
          };
        });
      },
      async fetchCourse() {
        const response = await fetch(`/api/course`);
        const data = await response.json();
        set({
          currentCourse: data.data,
        });
      },
      getCurrentStatement() {
        const { currentCourse, statementIndex } = get();
        return currentCourse[0]?.statements?.[statementIndex];
      },
      checkCorrect(input) {
        const { getCurrentStatement } = get();
        return input === getCurrentStatement()?.english;
      },
    }),
    {
      name: 'course-storage',
      partialize: (state) => ({
        statementIndex: state.statementIndex,
      }),
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCourse;
