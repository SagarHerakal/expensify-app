import { create } from 'zustand';
import { Expense } from '../types';
import { MOCK_EXPENSES } from '../data/mockData';

interface ExpenseState {
    expenses: Expense[];
    addExpense: (expense: Expense) => void;
    getExpensesByGroup: (groupId: string) => Expense[];
    settleExpense: (expenseId: string, userId: string) => void;
}

export const useExpenseStore = create<ExpenseState>((set, get) => ({
    expenses: MOCK_EXPENSES,

    addExpense: (expense) =>
        set((state) => ({ expenses: [expense, ...state.expenses] })),

    getExpensesByGroup: (groupId) =>
        get().expenses.filter((e) => e.groupId === groupId),

    settleExpense: (expenseId, userId) =>
        set((state) => ({
            expenses: state.expenses.map((e) =>
                e.id === expenseId
                    ? {
                        ...e,
                        splitAmong: e.splitAmong.map((s) =>
                            s.user.id === userId ? { ...s, settled: true } : s
                        ),
                    }
                    : e
            ),
        })),
}));
