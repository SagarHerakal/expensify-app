import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useExpenseStore } from '../../stores/expenseStore';
import { useGroupStore } from '../../stores/groupStore';
import { GroupsStackParamList } from '../../navigation/TabNavigator';
import { Colors, Spacing, Radius, Typography } from '../../theme/theme';
import { Expense } from '../../types';

type Route = RouteProp<GroupsStackParamList, 'GroupDetail'>;
type Nav = NativeStackNavigationProp<GroupsStackParamList, 'GroupDetail'>;

function getCategoryIcon(category: Expense['category']): string {
    const map: Record<string, string> = {
        food: 'food', transport: 'car', accommodation: 'bed',
        entertainment: 'ticket', utilities: 'lightning-bolt', shopping: 'shopping', other: 'dots-horizontal',
    };
    return map[category] || 'dots-horizontal';
}

export default function GroupDetailScreen() {
    const route = useRoute<Route>();
    const navigation = useNavigation<Nav>();
    const { groupId } = route.params;

    const group = useGroupStore((s) => s.getGroupById(groupId));
    const getExpensesByGroup = useExpenseStore((s) => s.getExpensesByGroup);
    const expenses = getExpensesByGroup(groupId);

    const isPositive = (group?.totalOwed ?? 0) > 0;
    const isSettled = (group?.totalOwed ?? 0) === 0;

    return (
        <View style={styles.container}>
            {/* Group Header Card */}
            <View style={styles.headerCard}>
                <Text style={styles.groupEmoji}>{group?.emoji}</Text>
                <View style={styles.headerInfo}>
                    <Text style={styles.memberInfo}>{group?.members.length} members</Text>
                    {!isSettled && (
                        <Text style={[styles.balanceText, { color: isPositive ? Colors.success : Colors.danger }]}>
                            {isPositive ? 'You are owed ' : 'You owe '}
                            {group?.currency}{Math.abs(group?.totalOwed ?? 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                        </Text>
                    )}
                    {isSettled && <Text style={{ color: Colors.success, fontWeight: '600' }}>✓ All settled up</Text>}
                </View>
                {!isSettled && (
                    <TouchableOpacity style={styles.settleBtn}>
                        <Text style={styles.settleBtnText}>Settle Up</Text>
                    </TouchableOpacity>
                )}
            </View>

            {/* Expense List */}
            <FlatList
                data={expenses}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.list}
                ListHeaderComponent={
                    <Text style={styles.listHeader}>{expenses.length} expenses</Text>
                }
                ListEmptyComponent={
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyEmoji}>💸</Text>
                        <Text style={styles.emptyText}>No expenses yet</Text>
                        <Text style={styles.emptySubtext}>Add your first expense below</Text>
                    </View>
                }
                renderItem={({ item }) => (
                    <View style={styles.expenseCard}>
                        <View style={styles.expenseIconWrap}>
                            <MaterialCommunityIcons
                                name={getCategoryIcon(item.category) as any}
                                size={20}
                                color={Colors.primary}
                            />
                        </View>
                        <View style={styles.expenseInfo}>
                            <Text style={styles.expenseDesc}>{item.description}</Text>
                            <Text style={styles.expenseMeta}>
                                Paid by {item.paidBy.name} · {new Date(item.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                            </Text>
                            <View style={styles.splitRow}>
                                {item.splitAmong.map((s) => (
                                    <View key={s.user.id} style={[styles.splitBadge, { backgroundColor: s.settled ? `${Colors.success}22` : `${Colors.danger}22` }]}>
                                        <Text style={[styles.splitBadgeText, { color: s.settled ? Colors.success : Colors.danger }]}>
                                            {s.user.name.split(' ')[0]}: ₹{s.amount}
                                        </Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                        <Text style={styles.expenseAmount}>₹{item.amount.toLocaleString('en-IN')}</Text>
                    </View>
                )}
                ItemSeparatorComponent={() => <View style={{ height: Spacing.sm }} />}
            />

            {/* FAB */}
            <TouchableOpacity
                style={styles.fab}
                onPress={() => navigation.navigate('AddExpense', { groupId })}
            >
                <MaterialCommunityIcons name="plus" size={28} color={Colors.white} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.background },
    headerCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.surface,
        margin: Spacing.md,
        borderRadius: Radius.lg,
        padding: Spacing.md,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    groupEmoji: { fontSize: 36, marginRight: Spacing.md },
    headerInfo: { flex: 1 },
    memberInfo: { fontSize: Typography.sizes.sm, color: Colors.textSecondary },
    balanceText: { fontSize: Typography.sizes.md, fontWeight: Typography.weights.semiBold, marginTop: 2 },
    settleBtn: {
        backgroundColor: Colors.primary,
        paddingHorizontal: 14, paddingVertical: 8,
        borderRadius: Radius.full,
    },
    settleBtnText: { color: Colors.white, fontSize: Typography.sizes.sm, fontWeight: Typography.weights.semiBold },
    list: { paddingHorizontal: Spacing.md, paddingBottom: 100 },
    listHeader: { fontSize: Typography.sizes.sm, color: Colors.textMuted, marginBottom: Spacing.sm },
    emptyState: { alignItems: 'center', paddingVertical: 60 },
    emptyEmoji: { fontSize: 48 },
    emptyText: { fontSize: Typography.sizes.lg, color: Colors.textPrimary, fontWeight: Typography.weights.semiBold, marginTop: Spacing.md },
    emptySubtext: { fontSize: Typography.sizes.sm, color: Colors.textMuted, marginTop: Spacing.xs },
    expenseCard: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: Colors.surface,
        borderRadius: Radius.md,
        padding: Spacing.md,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    expenseIconWrap: {
        width: 40, height: 40, borderRadius: 20,
        backgroundColor: Colors.surfaceVariant,
        justifyContent: 'center', alignItems: 'center',
        marginRight: Spacing.sm,
    },
    expenseInfo: { flex: 1 },
    expenseDesc: { fontSize: Typography.sizes.md, color: Colors.textPrimary, fontWeight: Typography.weights.medium },
    expenseMeta: { fontSize: Typography.sizes.xs, color: Colors.textMuted, marginTop: 2 },
    splitRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 4, marginTop: Spacing.xs },
    splitBadge: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: Radius.full },
    splitBadgeText: { fontSize: 10, fontWeight: Typography.weights.semiBold },
    expenseAmount: {
        fontSize: Typography.sizes.md, fontWeight: Typography.weights.bold,
        color: Colors.textPrimary, marginLeft: Spacing.sm,
    },
    fab: {
        position: 'absolute', bottom: 24, right: 24,
        width: 56, height: 56, borderRadius: 28,
        backgroundColor: Colors.primary,
        justifyContent: 'center', alignItems: 'center',
        elevation: 6,
    },
});
