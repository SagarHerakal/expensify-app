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

type Nav = NativeStackNavigationProp<AuthStackParamList, 'Register'>;

export default function RegisterScreen() {
    const navigation = useNavigation<Nav>();
    const { login, isLoading } = useAuthStore();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleRegister = async () => {
        if (!name || !email || !password) return;
        await login(email, password); // Using mock login for now
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
                <View style={styles.header}>
                    <Text style={styles.logoEmoji}>💸</Text>
                    <Text style={styles.appName}>Expensify</Text>
                    <Text style={styles.tagline}>Create your free account</Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.title}>Get started</Text>
                    <Text style={styles.subtitle}>Join thousands splitting smarter</Text>

                    <TextInput
                        label="Full Name"
                        value={name}
                        onChangeText={setName}
                        mode="outlined"
                        autoCapitalize="words"
                        style={styles.input}
                        theme={{ colors: { primary: Colors.primary, background: Colors.surfaceVariant } }}
                        textColor={Colors.textPrimary}
                        left={<TextInput.Icon icon="account-outline" color={Colors.textSecondary} />}
                    />
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

                    <Text style={styles.terms}>
                        By signing up you agree to our{' '}
                        <Text style={styles.termsLink}>Terms of Service</Text> and{' '}
                        <Text style={styles.termsLink}>Privacy Policy</Text>
                    </Text>

                    <TouchableOpacity
                        style={[styles.registerBtn, isLoading && styles.registerBtnDisabled]}
                        onPress={handleRegister}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <ActivityIndicator color={Colors.white} />
                        ) : (
                            <Text style={styles.registerBtnText}>Create Account</Text>
                        )}
                    </TouchableOpacity>
                </View>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>Already have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.footerLink}>Sign In</Text>
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
    tagline: { fontSize: Typography.sizes.sm, color: Colors.textSecondary, marginTop: Spacing.xs },
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
    terms: {
        fontSize: Typography.sizes.xs,
        color: Colors.textMuted,
        marginBottom: Spacing.md,
        lineHeight: 18,
    },
    termsLink: { color: Colors.primary },
    registerBtn: {
        backgroundColor: Colors.primary,
        paddingVertical: 14,
        borderRadius: Radius.md,
        alignItems: 'center',
    },
    registerBtnDisabled: { opacity: 0.6 },
    registerBtnText: {
        color: Colors.white,
        fontWeight: Typography.weights.semiBold,
        fontSize: Typography.sizes.md,
    },
    footer: { flexDirection: 'row', justifyContent: 'center', marginTop: Spacing.xl },
    footerText: { color: Colors.textSecondary, fontSize: Typography.sizes.sm },
    footerLink: {
        color: Colors.primary,
        fontSize: Typography.sizes.sm,
        fontWeight: Typography.weights.semiBold,
    },
});
