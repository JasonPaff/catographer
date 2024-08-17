import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import '../tamagui-web.css';
import AppProvider from './providers/app-provider';

// catch any errors thrown by the Layout component.
export { ErrorBoundary } from 'expo-router';

// ensure that reloading on `/settings` keeps a back button present.
export const unstable_settings = {
    initialRouteName: '(tabs)',
};

// prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [interLoaded, interError] = useFonts({
        Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
        InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
    });

    // hide the splash screen after the fonts have loaded (or an error was returned) and the UI is ready.
    useEffect(() => {
        if (interLoaded || interError) SplashScreen.hideAsync();
    }, [interLoaded, interError]);

    if (!interLoaded && !interError) return null;

    return (
        <AppProvider>
            <Stack>
                <Stack.Screen
                    name={'(tabs)'}
                    options={{
                        headerShown: false,
                    }}
                />

                <Stack.Screen
                    name={'settings'}
                    options={{
                        animation: 'slide_from_right',
                        gestureDirection: 'horizontal',
                        gestureEnabled: true,
                        presentation: 'modal',
                        title: 'Settings',
                    }}
                />
            </Stack>
        </AppProvider>
    );
}
