/*
 * @Author       : fallen_zero
 * @Date         : 2024-08-07 10:53:58
 * @LastEditors  : fallen_zero
 * @LastEditTime : 2024-08-09 14:58:37
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
  currentCourse?: CourseData;
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
      currentCourse: void 0,
      setStatementIndex(index) {
        set({ statementIndex: index });
      },
      toNextStatement() {
        set((state) => {
          const nextStatementIndex = state.statementIndex + 1;
          const statements = state.currentCourse?.statements;

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
      async fetchCourse() {
        // TODO 先写死第一课的 courseId
        // 后续需要基于 courses 获取
        const firstCourseId = 'clzmar70v00662e3dj86e0azk';
        const response = await fetch(`/course/api/${firstCourseId}`);
        const data = await response.json();
        set({
          currentCourse: data.data,
        });
      },
      getCurrentStatement() {
        const { currentCourse, statementIndex } = get();
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
