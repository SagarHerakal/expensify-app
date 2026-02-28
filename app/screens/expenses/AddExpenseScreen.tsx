import React, { useState } from 'react';
import {
    View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput as RNTextInput
} from 'react-native';
import { TextInput } from 'react-native-paper';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useGroupStore } from '../../stores/groupStore';
import { useExpenseStore } from '../../stores/expenseStore';
import { useAuthStore } from '../../stores/authStore';
import { GroupsStackParamList } from '../../navigation/TabNavigator';
import { Colors, Spacing, Radius, Typography } from '../../theme/theme';
import { ExpenseCategory, SplitType } from '../../types';

type Route = RouteProp<GroupsStackParamList, 'AddExpense'>;
type Nav = NativeStackNavigationProp<GroupsStackParamList, 'AddExpense'>;

const CATEGORIES: { key: ExpenseCategory; label: string; icon: string }[] = [
    { key: 'food', label: 'Food', icon: 'food' },
    { key: 'transport', label: 'Transport', icon: 'car' },
    { key: 'accommodation', label: 'Hotel', icon: 'bed' },
    { key: 'entertainment', label: 'Fun', icon: 'ticket' },
    { key: 'utilities', label: 'Bills', icon: 'lightning-bolt' },
    { key: 'shopping', label: 'Shopping', icon: 'shopping' },
    { key: 'other', label: 'Other', icon: 'dots-horizontal' },
];

const SPLIT_TYPES: { key: SplitType; label: string }[] = [
    { key: 'equal', label: 'Equal' },
    { key: 'exact', label: 'Exact' },
    { key: 'percentage', label: '%' },
];

export default function AddExpenseScreen() {
    const route = useRoute<Route>();
    const navigation = useNavigation<Nav>();
    const { groupId } = route.params;

    const group = useGroupStore((s) => s.getGroupById(groupId));
    const addExpense = useExpenseStore((s) => s.addExpense);
    const currentUser = useAuthStore((s) => s.user);

    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState<ExpenseCategory>('other');
    const [splitType, setSplitType] = useState<SplitType>('equal');
    const [selectedMembers, setSelectedMembers] = useState<string[]>(
        group?.members.map((m) => m.id) ?? []
    );

    const toggleMember = (id: string) => {
        setSelectedMembers((prev) =>
            prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
        );
    };

    const handleAdd = () => {
        if (!description || !amount || !group || !currentUser) return;
        const total = parseFloat(amount);
        const members = group.members.filter((m) => selectedMembers.includes(m.id));
        const splitAmount = total / members.length;

        addExpense({
            id: `e${Date.now()}`,
            groupId,
            description,
            amount: total,
            currency: '₹',
            paidBy: currentUser,
            splitAmong: members.map((m) => ({
                user: m,
                amount: parseFloat(splitAmount.toFixed(2)),
                settled: m.id === currentUser.id,
            })),
            createdAt: new Date().toISOString(),
            category,
        });
        navigation.goBack();
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            {/* Amount */}
            <View style={styles.amountCard}>
                <Text style={styles.currencySymbol}>₹</Text>
                <RNTextInput
                    style={styles.amountInput}
                    placeholder="0.00"
                    placeholderTextColor={Colors.textMuted}
                    value={amount}
                    onChangeText={setAmount}
                    keyboardType="decimal-pad"
                />
            </View>

            {/* Description */}
            <TextInput
                label="Description"
                value={description}
                onChangeText={setDescription}
                mode="outlined"
                style={styles.descInput}
                theme={{ colors: { primary: Colors.primary, background: Colors.surfaceVariant } }}
                textColor={Colors.textPrimary}
                placeholder="e.g. Dinner at rooftop restaurant"
                left={<TextInput.Icon icon="pencil-outline" color={Colors.textSecondary} />}
            />

            {/* Category */}
            <Text style={styles.sectionLabel}>Category</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryRow}>
                {CATEGORIES.map((c) => (
                    <TouchableOpacity
                        key={c.key}
                        style={[styles.categoryChip, category === c.key && styles.categoryChipActive]}
                        onPress={() => setCategory(c.key)}
                    >
                        <MaterialCommunityIcons
                            name={c.icon as any}
                            size={18}
                            color={category === c.key ? Colors.white : Colors.textSecondary}
                        />
                        <Text style={[styles.categoryLabel, category === c.key && { color: Colors.white }]}>
                            {c.label}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* Split Type */}
            <Text style={styles.sectionLabel}>Split type</Text>
            <View style={styles.splitRow}>
                {SPLIT_TYPES.map((s) => (
                    <TouchableOpacity
                        key={s.key}
                        style={[styles.splitChip, splitType === s.key && styles.splitChipActive]}
                        onPress={() => setSplitType(s.key)}
                    >
                        <Text style={[styles.splitChipText, splitType === s.key && { color: Colors.white }]}>
                            {s.label}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Members */}
            <Text style={styles.sectionLabel}>Split with</Text>
            <View style={styles.membersList}>
                {group?.members.map((m) => {
                    const selected = selectedMembers.includes(m.id);
                    return (
                        <TouchableOpacity
                            key={m.id}
                            style={[styles.memberRow, selected && styles.memberRowSelected]}
                            onPress={() => toggleMember(m.id)}
                        >
                            <View style={styles.memberAvatar}>
                                <Text style={styles.memberAvatarText}>{m.name[0]}</Text>
                            </View>
                            <Text style={styles.memberName}>{m.name}</Text>
                            {selected && (
                                <MaterialCommunityIcons name="check-circle" size={20} color={Colors.primary} />
                            )}
                        </TouchableOpacity>
                    );
                })}
            </View>

            {/* Paid by section */}
            <Text style={styles.sectionLabel}>Paid by</Text>
            <View style={[styles.memberRow, styles.memberRowSelected]}>
                <View style={[styles.memberAvatar, { backgroundColor: Colors.secondary }]}>
                    <Text style={styles.memberAvatarText}>{currentUser?.name[0]}</Text>
                </View>
                <Text style={styles.memberName}>{currentUser?.name} (you)</Text>
                <MaterialCommunityIcons name="check-circle" size={20} color={Colors.primary} />
            </View>

            {/* Submit */}
            <TouchableOpacity style={styles.addBtn} onPress={handleAdd}>
                <Text style={styles.addBtnText}>Add Expense</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.background },
    content: { padding: Spacing.md, paddingBottom: 60 },
    amountCard: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
        backgroundColor: Colors.surface, borderRadius: Radius.lg,
        padding: Spacing.lg, marginBottom: Spacing.md,
        borderWidth: 1, borderColor: Colors.border,
    },
    currencySymbol: { fontSize: 32, color: Colors.textSecondary, marginRight: 8 },
    amountInput: {
        fontSize: 48, fontWeight: Typography.weights.bold,
        color: Colors.textPrimary, minWidth: 120, textAlign: 'center',
    },
    descInput: { marginBottom: Spacing.md, backgroundColor: Colors.surfaceVariant },
    sectionLabel: {
        fontSize: Typography.sizes.sm, color: Colors.textSecondary,
        fontWeight: Typography.weights.semiBold,
        marginBottom: Spacing.sm, marginTop: Spacing.sm,
        textTransform: 'uppercase', letterSpacing: 0.5,
    },
    categoryRow: { marginBottom: Spacing.md },
    categoryChip: {
        flexDirection: 'row', alignItems: 'center', gap: 6,
        backgroundColor: Colors.surface, borderRadius: Radius.full,
        paddingHorizontal: 12, paddingVertical: 8,
        marginRight: 8, borderWidth: 1, borderColor: Colors.border,
    },
    categoryChipActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
    categoryLabel: { fontSize: Typography.sizes.sm, color: Colors.textSecondary },
    splitRow: { flexDirection: 'row', gap: 8, marginBottom: Spacing.md },
    splitChip: {
        flex: 1, alignItems: 'center', paddingVertical: 10,
        backgroundColor: Colors.surface, borderRadius: Radius.md,
        borderWidth: 1, borderColor: Colors.border,
    },
    splitChipActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
    splitChipText: { color: Colors.textSecondary, fontWeight: Typography.weights.semiBold },
    membersList: { gap: 8, marginBottom: Spacing.md },
    memberRow: {
        flexDirection: 'row', alignItems: 'center',
        backgroundColor: Colors.surface, borderRadius: Radius.md,
        padding: Spacing.sm, borderWidth: 1, borderColor: Colors.border,
    },
    memberRowSelected: { borderColor: Colors.primary },
    memberAvatar: {
        width: 36, height: 36, borderRadius: 18,
        backgroundColor: Colors.primary,
        justifyContent: 'center', alignItems: 'center',
        marginRight: Spacing.sm,
    },
    memberAvatarText: { color: Colors.white, fontWeight: Typography.weights.bold },
    memberName: { flex: 1, color: Colors.textPrimary, fontWeight: Typography.weights.medium },
    addBtn: {
        backgroundColor: Colors.primary, borderRadius: Radius.md,
        paddingVertical: 16, alignItems: 'center', marginTop: Spacing.md,
    },
    addBtnText: { color: Colors.white, fontWeight: Typography.weights.semiBold, fontSize: Typography.sizes.lg },
});
