import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuthStore } from '../../stores/authStore';
import { useGroupStore } from '../../stores/groupStore';
import { useExpenseStore } from '../../stores/expenseStore';
import { Colors, Spacing, Radius, Typography } from '../../theme/theme';
import { Expense } from '../../types';

function formatCurrency(amount: number) {
    return `₹${Math.abs(amount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;
}

function getCategoryIcon(category: Expense['category']): string {
    const map: Record<string, string> = {
        food: 'food',
        transport: 'car',
        accommodation: 'bed',
        entertainment: 'ticket',
        utilities: 'lightning-bolt',
        shopping: 'shopping',
        other: 'dots-horizontal',
    };
    return map[category] || 'dots-horizontal';
}

export default function HomeScreen() {
    const user = useAuthStore((s) => s.user);
    const groups = useGroupStore((s) => s.groups);
    const expenses = useExpenseStore((s) => s.expenses);

    const totalOwed = groups.reduce((sum, g) => sum + (g.totalOwed > 0 ? g.totalOwed : 0), 0);
    const totalOwe = groups.reduce((sum, g) => sum + (g.totalOwed < 0 ? Math.abs(g.totalOwed) : 0), 0);
    const netBalance = totalOwed - totalOwe;

    const recentExpenses = [...expenses]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 5);

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            {/* Greeting */}
            <View style={styles.greetingRow}>
                <View>
                    <Text style={styles.greeting}>Hey, {user?.name?.split(' ')[0]} 👋</Text>
                    <Text style={styles.greetingSubtitle}>Here's your expense summary</Text>
                </View>
                <View style={styles.avatarCircle}>
                    <Text style={styles.avatarText}>{user?.name?.[0] ?? 'U'}</Text>
                </View>
            </View>

            {/* Balance Summary Card */}
            <View style={styles.balanceCard}>
                <Text style={styles.balanceLabel}>Net Balance</Text>
                <Text style={[styles.balanceAmount, { color: netBalance >= 0 ? Colors.success : Colors.danger }]}>
                    {netBalance >= 0 ? '+' : '-'}{formatCurrency(netBalance)}
                </Text>

                <View style={styles.balanceRow}>
                    <View style={styles.balanceItem}>
                        <View style={[styles.balanceDot, { backgroundColor: Colors.success }]} />
                        <View>
                            <Text style={styles.balanceItemLabel}>You are owed</Text>
                            <Text style={[styles.balanceItemAmount, { color: Colors.success }]}>
                                {formatCurrency(totalOwed)}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.balanceDivider} />
                    <View style={styles.balanceItem}>
                        <View style={[styles.balanceDot, { backgroundColor: Colors.danger }]} />
                        <View>
                            <Text style={styles.balanceItemLabel}>You owe</Text>
                            <Text style={[styles.balanceItemAmount, { color: Colors.danger }]}>
                                {formatCurrency(totalOwe)}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>

            {/* Active Groups Quick View */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Active Groups</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.groupsRow}>
                    {groups.slice(0, 4).map((g) => (
                        <View key={g.id} style={styles.groupChip}>
                            <Text style={styles.groupChipEmoji}>{g.emoji}</Text>
                            <Text style={styles.groupChipName} numberOfLines={1}>{g.name}</Text>
                            <Text
                                style={[
                                    styles.groupChipBalance,
                                    { color: g.totalOwed >= 0 ? Colors.success : Colors.danger },
                                ]}
                            >
                                {g.totalOwed === 0 ? 'Settled' : (g.totalOwed > 0 ? '+' : '-') + formatCurrency(g.totalOwed)}
                            </Text>
                        </View>
                    ))}
                </ScrollView>
            </View>

            {/* Recent Expenses */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Recent Activity</Text>
                {recentExpenses.map((expense) => (
                    <TouchableOpacity key={expense.id} style={styles.expenseItem}>
                        <View style={styles.expenseIcon}>
                            <MaterialCommunityIcons
                                name={getCategoryIcon(expense.category) as any}
                                size={20}
                                color={Colors.primary}
                            />
                        </View>
                        <View style={styles.expenseInfo}>
                            <Text style={styles.expenseDesc}>{expense.description}</Text>
                            <Text style={styles.expenseMeta}>
                                Paid by {expense.paidBy.name} · {new Date(expense.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
                            </Text>
                        </View>
                        <Text style={styles.expenseAmount}>{expense.currency}{expense.amount.toLocaleString('en-IN')}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.background },
    content: { padding: Spacing.md, paddingBottom: 120 },

    greetingRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Spacing.lg },
    greeting: { fontSize: Typography.sizes.xxl, fontWeight: Typography.weights.bold, color: Colors.textPrimary },
    greetingSubtitle: { fontSize: Typography.sizes.sm, color: Colors.textSecondary, marginTop: 2 },
    avatarCircle: {
        width: 44, height: 44, borderRadius: 22,
        backgroundColor: Colors.primary, justifyContent: 'center', alignItems: 'center',
    },
    avatarText: { color: Colors.white, fontWeight: Typography.weights.bold, fontSize: Typography.sizes.lg },

    balanceCard: {
        backgroundColor: Colors.surface,
        borderRadius: Radius.lg,
        padding: Spacing.lg,
        borderWidth: 1,
        borderColor: Colors.border,
        marginBottom: Spacing.lg,
    },
    balanceLabel: { fontSize: Typography.sizes.sm, color: Colors.textSecondary },
    balanceAmount: { fontSize: 36, fontWeight: Typography.weights.extraBold, marginVertical: Spacing.xs },
    balanceRow: { flexDirection: 'row', marginTop: Spacing.sm },
    balanceItem: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 8 },
    balanceDot: { width: 8, height: 8, borderRadius: 4 },
    balanceDivider: { width: 1, backgroundColor: Colors.border, marginHorizontal: Spacing.sm },
    balanceItemLabel: { fontSize: Typography.sizes.xs, color: Colors.textMuted },
    balanceItemAmount: { fontSize: Typography.sizes.md, fontWeight: Typography.weights.semiBold },

    section: { marginBottom: Spacing.lg },
    sectionTitle: {
        fontSize: Typography.sizes.lg,
        fontWeight: Typography.weights.semiBold,
        color: Colors.textPrimary,
        marginBottom: Spacing.sm,
    },
    groupsRow: { flexDirection: 'row' },
    groupChip: {
        backgroundColor: Colors.surface,
        borderRadius: Radius.md,
        padding: Spacing.sm,
        marginRight: Spacing.sm,
        width: 110,
        borderWidth: 1,
        borderColor: Colors.border,
        alignItems: 'center',
    },
    groupChipEmoji: { fontSize: 28, marginBottom: 4 },
    groupChipName: {
        fontSize: Typography.sizes.xs,
        color: Colors.textPrimary,
        fontWeight: Typography.weights.medium,
        textAlign: 'center',
    },
    groupChipBalance: { fontSize: Typography.sizes.xs, fontWeight: Typography.weights.semiBold, marginTop: 2 },

    expenseItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.surface,
        borderRadius: Radius.md,
        padding: Spacing.md,
        marginBottom: Spacing.sm,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    expenseIcon: {
        width: 40, height: 40,
        borderRadius: 20,
        backgroundColor: Colors.surfaceVariant,
        justifyContent: 'center', alignItems: 'center',
        marginRight: Spacing.sm,
    },
    expenseInfo: { flex: 1 },
    expenseDesc: { fontSize: Typography.sizes.md, color: Colors.textPrimary, fontWeight: Typography.weights.medium },
    expenseMeta: { fontSize: Typography.sizes.xs, color: Colors.textMuted, marginTop: 2 },
    expenseAmount: {
        fontSize: Typography.sizes.md,
        fontWeight: Typography.weights.semiBold,
        color: Colors.textPrimary,
    },
});
