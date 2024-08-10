/*
 * @Author       : fallen_zero
 * @Date         : 2024-08-07 10:53:58
 * @LastEditors  : fallen_zero
 * @LastEditTime : 2024-08-11 00:29:22
 * @FilePath     : /2024/HenryTSZ/english-learn-app/earthworm/src/stores/useCourse.ts
 * @FileName     :
 */

import { Course, Statement } from '@prisma/client';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface CourseData extends Course {
  statements: Statement[];
}

interface State {
  statementIndex: number;
  currentCourse?: CourseData;
  currentCourse?: CourseData;
}

interface Action {
  setStatementIndex: (index: number) => void;
  toNextStatement: () => void;
  fetchCourse: (courseId: CourseData['id']) => Promise<void>;
  getCurrentStatement: () => Statement | undefined;
  checkCorrect: (input: string) => boolean;
}

const useCourse = create(
  persist<State & Action, [], [], Partial<State>>(
    (set, get) => ({
      statementIndex: 0,
      currentCourse: void 0,
      currentCourse: void 0,
      setStatementIndex(index) {
        set({ statementIndex: index });
      },
      toNextStatement() {
        set((state) => {
          const nextStatementIndex = state.statementIndex + 1;
          const statements = state.currentCourse?.statements;
          const statements = state.currentCourse?.statements;

          if (!statements || nextStatementIndex >= statements.length) {
          if (!statements || nextStatementIndex >= statements.length) {
            return {
              statementIndex: 0,
            };
          }
          return {
            statementIndex: nextStatementIndex,
          };
        });
      },
      async fetchCourse(courseId) {
        const response = await fetch(`/course/api/${courseId}`);
        const data = await response.json();
        set({
          currentCourse: data.data,
        });
      },
      getCurrentStatement() {
        const { currentCourse, statementIndex } = get();
        return currentCourse?.statements?.[statementIndex];
        return currentCourse?.statements?.[statementIndex];
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
