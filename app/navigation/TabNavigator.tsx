import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../theme/theme';

import HomeScreen from '../screens/home/HomeScreen';
import GroupsScreen from '../screens/groups/GroupsScreen';
import GroupDetailScreen from '../screens/groups/GroupDetailScreen';
import AddExpenseScreen from '../screens/expenses/AddExpenseScreen';
import FriendsScreen from '../screens/friends/FriendsScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';

// ── Groups Stack ──────────────────────────
export type GroupsStackParamList = {
    GroupsList: undefined;
    GroupDetail: { groupId: string; groupName: string };
    AddExpense: { groupId: string };
};

const GroupsStack = createNativeStackNavigator<GroupsStackParamList>();

function GroupsStackNavigator() {
    return (
        <GroupsStack.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: Colors.surface },
                headerTintColor: Colors.textPrimary,
                headerTitleStyle: { fontWeight: '600' },
            }}
        >
            <GroupsStack.Screen
                name="GroupsList"
                component={GroupsScreen}
                options={{ title: 'Groups' }}
            />
            <GroupsStack.Screen
                name="GroupDetail"
                component={GroupDetailScreen}
                options={({ route }) => ({ title: route.params.groupName })}
            />
            <GroupsStack.Screen
                name="AddExpense"
                component={AddExpenseScreen}
                options={{ title: 'Add Expense' }}
            />
        </GroupsStack.Navigator>
    );
}

// ── Bottom Tabs ───────────────────────────
export type TabParamList = {
    Home: undefined;
    Groups: undefined;
    Friends: undefined;
    Profile: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

export default function TabNavigator() {
    const insets = useSafeAreaInsets();
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    const icons: Record<string, string> = {
                        Home: 'home',
                        Groups: 'account-group',
                        Friends: 'account-multiple',
                        Profile: 'account-circle',
                    };
                    return (
                        <MaterialCommunityIcons
                            name={icons[route.name] as any}
                            size={size}
                            color={color}
                        />
                    );
                },
                tabBarActiveTintColor: Colors.primary,
                tabBarInactiveTintColor: Colors.textMuted,
                tabBarStyle: {
                    backgroundColor: Colors.surface,
                    borderTopColor: Colors.border,
                    height: 60 + insets.bottom,
                    paddingBottom: 8 + insets.bottom,
                },
                tabBarLabelStyle: { fontSize: 11, fontWeight: '500' },
                headerStyle: { backgroundColor: Colors.surface },
                headerTintColor: Colors.textPrimary,
                headerTitleStyle: { fontWeight: '700' },
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Overview' }} />
            <Tab.Screen name="Groups" component={GroupsStackNavigator} options={{ headerShown: false }} />
            <Tab.Screen name="Friends" component={FriendsScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
}
