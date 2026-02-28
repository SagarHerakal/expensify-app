import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MOCK_FRIENDS } from '../../data/mockData';
import { Colors, Spacing, Radius, Typography } from '../../theme/theme';

export default function FriendsScreen() {
    const totalOwedToMe = MOCK_FRIENDS.filter((f) => f.balance > 0).reduce((s, f) => s + f.balance, 0);
    const totalIOwe = MOCK_FRIENDS.filter((f) => f.balance < 0).reduce((s, f) => s + Math.abs(f.balance), 0);

    return (
        <View style={styles.container}>
            {/* Summary bar */}
            <View style={styles.summaryBar}>
                <View style={styles.summaryItem}>
                    <Text style={styles.summaryLabel}>Owed to you</Text>
                    <Text style={[styles.summaryAmount, { color: Colors.success }]}>
                        ₹{totalOwedToMe.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </Text>
                </View>
                <View style={styles.summaryDivider} />
                <View style={styles.summaryItem}>
                    <Text style={styles.summaryLabel}>You owe</Text>
                    <Text style={[styles.summaryAmount, { color: Colors.danger }]}>
                        ₹{totalIOwe.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </Text>
                </View>
            </View>

            <FlatList
                data={MOCK_FRIENDS}
                keyExtractor={(item) => item.user.id}
                contentContainerStyle={styles.list}
                renderItem={({ item }) => {
                    const isPositive = item.balance > 0;
                    const isSettled = item.balance === 0;
                    return (
                        <TouchableOpacity style={styles.friendCard}>
                            <View style={styles.avatar}>
                                <Text style={styles.avatarText}>{item.user.name[0]}</Text>
                            </View>
                            <View style={styles.info}>
                                <Text style={styles.name}>{item.user.name}</Text>
                                <Text style={styles.email}>{item.user.email}</Text>
                            </View>
                            <View style={styles.balanceSection}>
                                {isSettled ? (
                                    <Text style={styles.settledText}>Settled up</Text>
                                ) : (
                                    <>
                                        <Text style={[styles.balanceLabel, { color: isPositive ? Colors.success : Colors.danger }]}>
                                            {isPositive ? 'owes you' : 'you owe'}
                                        </Text>
                                        <Text style={[styles.balanceAmount, { color: isPositive ? Colors.success : Colors.danger }]}>
                                            {item.currency}{Math.abs(item.balance).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                                        </Text>
                                        <TouchableOpacity style={[styles.settleBtn, { borderColor: isPositive ? Colors.success : Colors.danger }]}>
                                            <Text style={[styles.settleBtnText, { color: isPositive ? Colors.success : Colors.danger }]}>
                                                Settle
                                            </Text>
                                        </TouchableOpacity>
                                    </>
                                )}
                            </View>
                        </TouchableOpacity>
                    );
                }}
                ItemSeparatorComponent={() => <View style={{ height: Spacing.sm }} />}
            />

            {/* FAB - Add Friend */}
            <TouchableOpacity style={styles.fab}>
                <MaterialCommunityIcons name="account-plus" size={26} color={Colors.white} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.background },
    summaryBar: {
        flexDirection: 'row',
        backgroundColor: Colors.surface,
        margin: Spacing.md,
        borderRadius: Radius.lg,
        padding: Spacing.md,
        borderWidth: 1, borderColor: Colors.border,
    },
    summaryItem: { flex: 1, alignItems: 'center' },
    summaryLabel: { fontSize: Typography.sizes.xs, color: Colors.textMuted },
    summaryAmount: { fontSize: Typography.sizes.xl, fontWeight: Typography.weights.bold, marginTop: 2 },
    summaryDivider: { width: 1, backgroundColor: Colors.border, marginHorizontal: Spacing.sm },
    list: { paddingHorizontal: Spacing.md, paddingBottom: 120 },
    friendCard: {
        flexDirection: 'row', alignItems: 'center',
        backgroundColor: Colors.surface,
        borderRadius: Radius.lg, padding: Spacing.md,
        borderWidth: 1, borderColor: Colors.border,
    },
    avatar: {
        width: 46, height: 46, borderRadius: 23,
        backgroundColor: Colors.primary,
        justifyContent: 'center', alignItems: 'center',
        marginRight: Spacing.md,
    },
    avatarText: { color: Colors.white, fontWeight: Typography.weights.bold, fontSize: Typography.sizes.lg },
    info: { flex: 1 },
    name: { fontSize: Typography.sizes.md, fontWeight: Typography.weights.semiBold, color: Colors.textPrimary },
    email: { fontSize: Typography.sizes.xs, color: Colors.textMuted, marginTop: 2 },
    balanceSection: { alignItems: 'flex-end' },
    balanceLabel: { fontSize: Typography.sizes.xs },
    balanceAmount: { fontSize: Typography.sizes.md, fontWeight: Typography.weights.bold },
    settledText: { fontSize: Typography.sizes.sm, color: Colors.textMuted },
    settleBtn: {
        marginTop: 4, borderWidth: 1, borderRadius: Radius.full,
        paddingHorizontal: 10, paddingVertical: 3,
    },
    settleBtnText: { fontSize: Typography.sizes.xs, fontWeight: Typography.weights.semiBold },
    fab: {
        position: 'absolute', bottom: 24, right: 24,
        width: 56, height: 56, borderRadius: 28,
        backgroundColor: Colors.primary,
        justifyContent: 'center', alignItems: 'center',
        elevation: 6,
    },
});
