import { User, Group, Expense, Friend } from '../types';

// ──────────────────────────────────────────
//  Mock Users
// ──────────────────────────────────────────
export const CURRENT_USER: User = {
    id: 'u1',
    name: 'Sagar Patel',
    email: 'sagar@example.com',
    avatarUrl: undefined,
};

export const MOCK_USERS: User[] = [
    CURRENT_USER,
    { id: 'u2', name: 'Priya Sharma', email: 'priya@example.com' },
    { id: 'u3', name: 'Rahul Mehra', email: 'rahul@example.com' },
    { id: 'u4', name: 'Ananya Iyer', email: 'ananya@example.com' },
    { id: 'u5', name: 'Vikram Nair', email: 'vikram@example.com' },
];

// ──────────────────────────────────────────
//  Mock Groups
// ──────────────────────────────────────────
export const MOCK_GROUPS: Group[] = [
    {
        id: 'g1',
        name: 'Goa Trip 🏖️',
        emoji: '🏖️',
        members: [MOCK_USERS[0], MOCK_USERS[1], MOCK_USERS[2], MOCK_USERS[3]],
        totalOwed: 1250.0,
        currency: '₹',
    },
    {
        id: 'g2',
        name: 'Flat 4B',
        emoji: '🏠',
        members: [MOCK_USERS[0], MOCK_USERS[1], MOCK_USERS[4]],
        totalOwed: -320.5,
        currency: '₹',
    },
    {
        id: 'g3',
        name: 'Office Lunch',
        emoji: '🍜',
        members: [MOCK_USERS[0], MOCK_USERS[2], MOCK_USERS[3], MOCK_USERS[4]],
        totalOwed: 0,
        currency: '₹',
    },
    {
        id: 'g4',
        name: 'Weekend Trek',
        emoji: '🥾',
        members: [MOCK_USERS[0], MOCK_USERS[3]],
        totalOwed: 800.0,
        currency: '₹',
    },
];

// ──────────────────────────────────────────
//  Mock Expenses
// ──────────────────────────────────────────
export const MOCK_EXPENSES: Expense[] = [
    {
        id: 'e1',
        groupId: 'g1',
        description: 'Hotel booking',
        amount: 6000,
        currency: '₹',
        paidBy: MOCK_USERS[0],
        splitAmong: [
            { user: MOCK_USERS[0], amount: 1500, settled: true },
            { user: MOCK_USERS[1], amount: 1500, settled: false },
            { user: MOCK_USERS[2], amount: 1500, settled: false },
            { user: MOCK_USERS[3], amount: 1500, settled: false },
        ],
        createdAt: '2025-02-20T10:00:00Z',
        category: 'accommodation',
    },
    {
        id: 'e2',
        groupId: 'g1',
        description: 'Cab to airport',
        amount: 1200,
        currency: '₹',
        paidBy: MOCK_USERS[1],
        splitAmong: [
            { user: MOCK_USERS[0], amount: 300, settled: false },
            { user: MOCK_USERS[1], amount: 300, settled: true },
            { user: MOCK_USERS[2], amount: 300, settled: false },
            { user: MOCK_USERS[3], amount: 300, settled: false },
        ],
        createdAt: '2025-02-20T07:30:00Z',
        category: 'transport',
    },
    {
        id: 'e3',
        groupId: 'g1',
        description: 'Dinner at beach shack',
        amount: 2400,
        currency: '₹',
        paidBy: MOCK_USERS[2],
        splitAmong: [
            { user: MOCK_USERS[0], amount: 600, settled: false },
            { user: MOCK_USERS[1], amount: 600, settled: false },
            { user: MOCK_USERS[2], amount: 600, settled: true },
            { user: MOCK_USERS[3], amount: 600, settled: false },
        ],
        createdAt: '2025-02-21T20:00:00Z',
        category: 'food',
    },
    {
        id: 'e4',
        groupId: 'g2',
        description: 'Electricity bill',
        amount: 1800,
        currency: '₹',
        paidBy: MOCK_USERS[1],
        splitAmong: [
            { user: MOCK_USERS[0], amount: 600, settled: false },
            { user: MOCK_USERS[1], amount: 600, settled: true },
            { user: MOCK_USERS[4], amount: 600, settled: false },
        ],
        createdAt: '2025-02-15T09:00:00Z',
        category: 'utilities',
    },
    {
        id: 'e5',
        groupId: 'g3',
        description: 'Pizza Friday',
        amount: 960,
        currency: '₹',
        paidBy: MOCK_USERS[0],
        splitAmong: [
            { user: MOCK_USERS[0], amount: 240, settled: true },
            { user: MOCK_USERS[2], amount: 240, settled: true },
            { user: MOCK_USERS[3], amount: 240, settled: true },
            { user: MOCK_USERS[4], amount: 240, settled: true },
        ],
        createdAt: '2025-02-14T13:00:00Z',
        category: 'food',
    },
];

// ──────────────────────────────────────────
//  Mock Friends (per-person balances)
// ──────────────────────────────────────────
export const MOCK_FRIENDS: Friend[] = [
    { user: MOCK_USERS[1], balance: 850, currency: '₹' },
    { user: MOCK_USERS[2], balance: -320.5, currency: '₹' },
    { user: MOCK_USERS[3], balance: 600, currency: '₹' },
    { user: MOCK_USERS[4], balance: 0, currency: '₹' },
];
