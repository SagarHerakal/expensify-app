import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useAuthStore } from '../stores/authStore';
import AuthNavigator from './AuthNavigator';
import TabNavigator from './TabNavigator';

export default function AppNavigator() {
    const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
    return (
        <NavigationContainer>
            {isAuthenticated ? <TabNavigator /> : <AuthNavigator />}
        </NavigationContainer>
    );
}
