import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    ActivityIndicator,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/AuthNavigator';
import { useAuthStore } from '../../stores/authStore';
import { Colors, Spacing, Radius, Typography } from '../../theme/theme';

type Nav = NativeStackNavigationProp<AuthStackParamList, 'Login'>;

export default function LoginScreen() {
    const navigation = useNavigation<Nav>();
    const { login, isLoading } = useAuthStore();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) return;
        await login(email, password);
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
                {/* Logo / Header */}
                <View style={styles.header}>
                    <Text style={styles.logoEmoji}>💸</Text>
                    <Text style={styles.appName}>Expensify</Text>
                    <Text style={styles.tagline}>Split smarter, settle faster</Text>
                </View>

                {/* Card */}
                <View style={styles.card}>
                    <Text style={styles.title}>Welcome back</Text>
                    <Text style={styles.subtitle}>Sign in to your account</Text>

                    <TextInput
                        label="Email"
                        value={email}
                        onChangeText={setEmail}
                        mode="outlined"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        style={styles.input}
                        theme={{ colors: { primary: Colors.primary, background: Colors.surfaceVariant } }}
                        textColor={Colors.textPrimary}
                        left={<TextInput.Icon icon="email-outline" color={Colors.textSecondary} />}
                    />

                    <TextInput
                        label="Password"
                        value={password}
                        onChangeText={setPassword}
                        mode="outlined"
                        secureTextEntry={!showPassword}
                        style={styles.input}
                        theme={{ colors: { primary: Colors.primary, background: Colors.surfaceVariant } }}
                        textColor={Colors.textPrimary}
                        left={<TextInput.Icon icon="lock-outline" color={Colors.textSecondary} />}
                        right={
                            <TextInput.Icon
                                icon={showPassword ? 'eye-off' : 'eye'}
                                color={Colors.textSecondary}
                                onPress={() => setShowPassword(!showPassword)}
                            />
                        }
                    />

                    <TouchableOpacity style={styles.forgotBtn}>
                        <Text style={styles.forgotText}>Forgot password?</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.loginBtn, isLoading && styles.loginBtnDisabled]}
                        onPress={handleLogin}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <ActivityIndicator color={Colors.white} />
                        ) : (
                            <Text style={styles.loginBtnText}>Sign In</Text>
                        )}
                    </TouchableOpacity>

                    {/* Divider */}
                    <View style={styles.divider}>
                        <View style={styles.dividerLine} />
                        <Text style={styles.dividerText}>or continue with</Text>
                        <View style={styles.dividerLine} />
                    </View>

                    {/* Google Button */}
                    <TouchableOpacity style={styles.googleBtn}>
                        <Text style={styles.googleIcon}>G</Text>
                        <Text style={styles.googleBtnText}>Sign in with Google</Text>
                    </TouchableOpacity>
                </View>

                {/* Footer */}
                <View style={styles.footer}>
                    <Text style={styles.footerText}>Don't have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                        <Text style={styles.footerLink}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.background },
    content: { flexGrow: 1, padding: Spacing.lg, justifyContent: 'center' },
    header: { alignItems: 'center', marginBottom: Spacing.xl },
    logoEmoji: { fontSize: 56 },
    appName: {
        fontSize: Typography.sizes.xxxl,
        fontWeight: Typography.weights.extraBold,
        color: Colors.primary,
        marginTop: Spacing.sm,
    },
    tagline: {
        fontSize: Typography.sizes.sm,
        color: Colors.textSecondary,
        marginTop: Spacing.xs,
    },
    card: {
        backgroundColor: Colors.surface,
        borderRadius: Radius.lg,
        padding: Spacing.lg,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    title: {
        fontSize: Typography.sizes.xxl,
        fontWeight: Typography.weights.bold,
        color: Colors.textPrimary,
    },
    subtitle: {
        fontSize: Typography.sizes.sm,
        color: Colors.textSecondary,
        marginBottom: Spacing.lg,
        marginTop: Spacing.xs,
    },
    input: { marginBottom: Spacing.md, backgroundColor: Colors.surfaceVariant },
    forgotBtn: { alignSelf: 'flex-end', marginBottom: Spacing.md },
    forgotText: { color: Colors.primary, fontSize: Typography.sizes.sm },
    loginBtn: {
        backgroundColor: Colors.primary,
        paddingVertical: 14,
        borderRadius: Radius.md,
        alignItems: 'center',
    },
    loginBtnDisabled: { opacity: 0.6 },
    loginBtnText: {
        color: Colors.white,
        fontWeight: Typography.weights.semiBold,
        fontSize: Typography.sizes.md,
    },
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: Spacing.lg,
    },
    dividerLine: { flex: 1, height: 1, backgroundColor: Colors.border },
    dividerText: {
        color: Colors.textMuted,
        fontSize: Typography.sizes.xs,
        marginHorizontal: Spacing.sm,
    },
    googleBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: Colors.border,
        borderRadius: Radius.md,
        paddingVertical: 12,
        gap: 8,
    },
    googleIcon: {
        fontSize: 18,
        fontWeight: Typography.weights.bold,
        color: '#4285F4',
    },
    googleBtnText: {
        color: Colors.textPrimary,
        fontWeight: Typography.weights.medium,
        fontSize: Typography.sizes.md,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: Spacing.xl,
    },
    footerText: { color: Colors.textSecondary, fontSize: Typography.sizes.sm },
    footerLink: {
        color: Colors.primary,
        fontSize: Typography.sizes.sm,
        fontWeight: Typography.weights.semiBold,
    },
});
