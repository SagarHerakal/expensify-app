import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useGroupStore } from '../../stores/groupStore';
import { GroupsStackParamList } from '../../navigation/TabNavigator';
import { Colors, Spacing, Radius, Typography } from '../../theme/theme';
import { Group } from '../../types';

type Nav = NativeStackNavigationProp<GroupsStackParamList, 'GroupsList'>;

function getInitials(name: string) {
    return name.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2);
}

function GroupCard({ group, onPress }: { group: Group; onPress: () => void }) {
    const isPositive = group.totalOwed > 0;
    const isSettled = group.totalOwed === 0;
    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <View style={styles.cardLeft}>
                <View style={styles.emojiContainer}>
                    <Text style={styles.emoji}>{group.emoji}</Text>
                </View>
                <View style={styles.cardInfo}>
                    <Text style={styles.groupName}>{group.name}</Text>
                    <Text style={styles.memberCount}>{group.members.length} members</Text>
                    {/* Member avatars */}
                    <View style={styles.avatarRow}>
                        {group.members.slice(0, 3).map((m, i) => (
                            <View key={m.id} style={[styles.memberAvatar, { marginLeft: i === 0 ? 0 : -8 }]}>
                                <Text style={styles.memberAvatarText}>{getInitials(m.name)}</Text>
                            </View>
                        ))}
                        {group.members.length > 3 && (
                            <View style={[styles.memberAvatar, { marginLeft: -8, backgroundColor: Colors.border }]}>
                                <Text style={styles.memberAvatarText}>+{group.members.length - 3}</Text>
                            </View>
                        )}
                    </View>
                </View>
            </View>
            <View style={styles.cardRight}>
                {isSettled ? (
                    <View style={styles.settledBadge}>
                        <Text style={styles.settledText}>Settled</Text>
                    </View>
                ) : (
                    <>
                        <Text style={styles.balanceLabel}>{isPositive ? 'You are owed' : 'You owe'}</Text>
                        <Text style={[styles.balanceAmount, { color: isPositive ? Colors.success : Colors.danger }]}>
                            {group.currency}{Math.abs(group.totalOwed).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                        </Text>
                    </>
                )}
                <MaterialCommunityIcons name="chevron-right" size={20} color={Colors.textMuted} style={{ marginTop: 4 }} />
            </View>
        </TouchableOpacity>
    );
}

export default function GroupsScreen() {
    const navigation = useNavigation<Nav>();
    const groups = useGroupStore((s) => s.groups);

    return (
        <View style={styles.container}>
            <FlatList
                data={groups}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.list}
                ListHeaderComponent={
                    <Text style={styles.totalLabel}>
                        {groups.length} groups · {groups.filter((g) => g.totalOwed !== 0).length} with open balances
                    </Text>
                }
                renderItem={({ item }) => (
                    <GroupCard
                        group={item}
                        onPress={() =>
                            navigation.navigate('GroupDetail', { groupId: item.id, groupName: item.name })
                        }
                    />
                )}
                ItemSeparatorComponent={() => <View style={{ height: Spacing.sm }} />}
            />

            {/* FAB */}
            <TouchableOpacity style={styles.fab}>
                <MaterialCommunityIcons name="plus" size={28} color={Colors.white} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.background },
    list: { padding: Spacing.md, paddingBottom: 120 },
    totalLabel: {
        fontSize: Typography.sizes.sm,
        color: Colors.textMuted,
        marginBottom: Spacing.md,
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Colors.surface,
        borderRadius: Radius.lg,
        padding: Spacing.md,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    cardLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
    emojiContainer: {
        width: 52, height: 52,
        borderRadius: Radius.md,
        backgroundColor: Colors.surfaceVariant,
        justifyContent: 'center', alignItems: 'center',
        marginRight: Spacing.md,
    },
    emoji: { fontSize: 26 },
    cardInfo: { flex: 1 },
    groupName: {
        fontSize: Typography.sizes.md,
        fontWeight: Typography.weights.semiBold,
        color: Colors.textPrimary,
    },
    memberCount: { fontSize: Typography.sizes.xs, color: Colors.textMuted, marginTop: 2 },
    avatarRow: { flexDirection: 'row', marginTop: Spacing.xs },
    memberAvatar: {
        width: 22, height: 22, borderRadius: 11,
        backgroundColor: Colors.primary,
        justifyContent: 'center', alignItems: 'center',
        borderWidth: 1.5, borderColor: Colors.surface,
    },
    memberAvatarText: { fontSize: 8, color: Colors.white, fontWeight: Typography.weights.bold },
    cardRight: { alignItems: 'flex-end' },
    balanceLabel: { fontSize: Typography.sizes.xs, color: Colors.textMuted },
    balanceAmount: { fontSize: Typography.sizes.md, fontWeight: Typography.weights.bold, marginTop: 2 },
    settledBadge: {
        backgroundColor: `${Colors.success}22`,
        paddingHorizontal: 8, paddingVertical: 3,
        borderRadius: Radius.full,
    },
    settledText: { color: Colors.success, fontSize: Typography.sizes.xs, fontWeight: Typography.weights.semiBold },
    fab: {
        position: 'absolute', bottom: 24, right: 24,
        width: 56, height: 56, borderRadius: 28,
        backgroundColor: Colors.primary,
        justifyContent: 'center', alignItems: 'center',
        elevation: 6,
    },
});
