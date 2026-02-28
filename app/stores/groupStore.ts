import { create } from 'zustand';
import { Group } from '../types';
import { MOCK_GROUPS } from '../data/mockData';

interface GroupState {
    groups: Group[];
    selectedGroupId: string | null;
    setGroups: (groups: Group[]) => void;
    selectGroup: (id: string) => void;
    getGroupById: (id: string) => Group | undefined;
}

export const useGroupStore = create<GroupState>((set, get) => ({
    groups: MOCK_GROUPS,
    selectedGroupId: null,

    setGroups: (groups) => set({ groups }),

    selectGroup: (id) => set({ selectedGroupId: id }),

    getGroupById: (id) => get().groups.find((g) => g.id === id),
}));
