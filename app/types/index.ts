// ──────────────────────────────────────────
//  Shared TypeScript types
// ──────────────────────────────────────────

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

export interface Group {
  id: string;
  name: string;
  emoji: string;
  members: User[];
  totalOwed: number;   // positive = others owe you, negative = you owe others
  currency: string;
}

export interface Expense {
  id: string;
  groupId: string;
  description: string;
  amount: number;
  currency: string;
  paidBy: User;
  splitAmong: ExpenseSplit[];
  createdAt: string;
  category: ExpenseCategory;
}

export interface ExpenseSplit {
  user: User;
  amount: number;
  settled: boolean;
}

export type ExpenseCategory =
  | 'food'
  | 'transport'
  | 'accommodation'
  | 'entertainment'
  | 'utilities'
  | 'shopping'
  | 'other';

export interface Friend {
  user: User;
  balance: number; // positive = they owe you, negative = you owe them
  currency: string;
}

export type SplitType = 'equal' | 'exact' | 'percentage';
