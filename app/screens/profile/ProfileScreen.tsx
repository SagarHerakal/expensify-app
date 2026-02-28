import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuthStore } from '../../stores/authStore';
import { useGroupStore } from '../../stores/groupStore';
import { useExpenseStore } from '../../stores/expenseStore';
import { Colors, Spacing, Radius, Typography } from '../../theme/theme';

const MENU_ITEMS = [
    { icon: 'bell-outline', label: 'Notifications', badge: '3' },
    { icon: 'credit-card-outline', label: 'Payment methods' },
    { icon: 'currency-inr', label: 'Default currency' },
    { icon: 'palette-outline', label: 'Appearance' },
    { icon: 'shield-check-outline', label: 'Privacy & Security' },
    { icon: 'help-circle-outline', label: 'Help & Support' },
    { icon: 'information-outline', label: 'About' },
];

export default function ProfileScreen() {
    const user = useAuthStore((s) => s.user);
    const logout = useAuthStore((s) => s.logout);
    const groups = useGroupStore((s) => s.groups);
    const expenses = useExpenseStore((s) => s.expenses);

    const totalSpend = expenses.reduce((s, e) => s + e.amount, 0);

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            {/* Profile Header */}
            <View style={styles.profileCard}>
                <View style={styles.avatarLarge}>
                    <Text style={styles.avatarLargeText}>{user?.name?.[0] ?? 'U'}</Text>
                </View>
                <Text style={styles.profileName}>{user?.name}</Text>
                <Text style={styles.profileEmail}>{user?.email}</Text>
                <TouchableOpacity style={styles.editBtn}>
                    <MaterialCommunityIcons name="pencil" size={14} color={Colors.primary} />
                    <Text style={styles.editBtnText}>Edit Profile</Text>
                </TouchableOpacity>
            </View>

            {/* Stats Row */}
            <View style={styles.statsRow}>
                <View style={styles.statItem}>
                    <Text style={styles.statValue}>{groups.length}</Text>
                    <Text style={styles.statLabel}>Groups</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                    <Text style={styles.statValue}>{expenses.length}</Text>
                    <Text style={styles.statLabel}>Expenses</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                    <Text style={styles.statValue}>₹{(totalSpend / 1000).toFixed(1)}k</Text>
                    <Text style={styles.statLabel}>Total Split</Text>
                </View>
            </View>

            {/* Settings Menu */}
            <View style={styles.menuCard}>
                {MENU_ITEMS.map((item, index) => (
                    <TouchableOpacity
                        key={item.label}
                        style={[styles.menuItem, index < MENU_ITEMS.length - 1 && styles.menuItemBorder]}
                    >
                        <View style={styles.menuIconWrap}>
                            <MaterialCommunityIcons name={item.icon as any} size={20} color={Colors.primary} />
                        </View>
                        <Text style={styles.menuLabel}>{item.label}</Text>
                        {item.badge && (
                            <View style={styles.badge}>
                                <Text style={styles.badgeText}>{item.badge}</Text>
                            </View>
                        )}
                        <MaterialCommunityIcons name="chevron-right" size={20} color={Colors.textMuted} style={{ marginLeft: 'auto' }} />
                    </TouchableOpacity>
                ))}
            </View>

            {/* Logout */}
            <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
                <MaterialCommunityIcons name="logout" size={18} color={Colors.danger} />
                <Text style={styles.logoutText}>Sign Out</Text>
            </TouchableOpacity>

            <Text style={styles.versionText}>Expensify v1.0.0</Text>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.background },
    content: { padding: Spacing.md, paddingBottom: 120 },
    profileCard: {
        backgroundColor: Colors.surface, borderRadius: Radius.lg,
        padding: Spacing.lg, alignItems: 'center',
        borderWidth: 1, borderColor: Colors.border, marginBottom: Spacing.md,
    },
    avatarLarge: {
        width: 80, height: 80, borderRadius: 40,
        backgroundColor: Colors.primary,
        justifyContent: 'center', alignItems: 'center',
        marginBottom: Spacing.md,
    },
    avatarLargeText: { fontSize: 36, color: Colors.white, fontWeight: Typography.weights.bold },
    profileName: { fontSize: Typography.sizes.xl, fontWeight: Typography.weights.bold, color: Colors.textPrimary },
    profileEmail: { fontSize: Typography.sizes.sm, color: Colors.textSecondary, marginTop: 2 },
    editBtn: {
        flexDirection: 'row', alignItems: 'center', gap: 4,
        marginTop: Spacing.md, borderWidth: 1, borderColor: Colors.primary,
        borderRadius: Radius.full, paddingHorizontal: 16, paddingVertical: 6,
    },
    editBtnText: { color: Colors.primary, fontSize: Typography.sizes.sm, fontWeight: Typography.weights.medium },
    statsRow: {
        flexDirection: 'row', backgroundColor: Colors.surface,
        borderRadius: Radius.lg, padding: Spacing.md,
        borderWidth: 1, borderColor: Colors.border, marginBottom: Spacing.md,
    },
    statItem: { flex: 1, alignItems: 'center' },
    statValue: { fontSize: Typography.sizes.xl, fontWeight: Typography.weights.bold, color: Colors.primary },
    statLabel: { fontSize: Typography.sizes.xs, color: Colors.textMuted, marginTop: 2 },
    statDivider: { width: 1, backgroundColor: Colors.border },
    menuCard: {
        backgroundColor: Colors.surface, borderRadius: Radius.lg,
        borderWidth: 1, borderColor: Colors.border, marginBottom: Spacing.md,
        overflow: 'hidden',
    },
    menuItem: {
        flexDirection: 'row', alignItems: 'center',
        padding: Spacing.md, gap: Spacing.md,
    },
    menuItemBorder: { borderBottomWidth: 1, borderBottomColor: Colors.border },
    menuIconWrap: {
        width: 36, height: 36, borderRadius: 10,
        backgroundColor: `${Colors.primary}22`,
        justifyContent: 'center', alignItems: 'center',
    },
    menuLabel: { fontSize: Typography.sizes.md, color: Colors.textPrimary, flex: 1 },
    badge: {
        backgroundColor: Colors.danger,
        borderRadius: Radius.full, minWidth: 20,
        paddingHorizontal: 6, paddingVertical: 2,
        alignItems: 'center',
    },
    badgeText: { color: Colors.white, fontSize: 10, fontWeight: Typography.weights.bold },
    logoutBtn: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
        gap: 8, backgroundColor: `${Colors.danger}18`,
        borderRadius: Radius.md, padding: Spacing.md,
        borderWidth: 1, borderColor: `${Colors.danger}44`,
        marginBottom: Spacing.md,
    },
    logoutText: { color: Colors.danger, fontWeight: Typography.weights.semiBold, fontSize: Typography.sizes.md },
    versionText: { textAlign: 'center', color: Colors.textMuted, fontSize: Typography.sizes.xs },
});
