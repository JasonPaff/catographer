import { Link, Stack } from 'expo-router';
import { StyleSheet } from 'react-native';
import { Button, Text, View } from 'tamagui';

export default function NotFoundScreen() {
    return (
        <>
            <Stack.Screen options={{ title: 'Oops!' }} />
            <View alignItems={'center'} display={'flex'} flex={1} gap={'$5'} justifyContent={'center'} margin={10}>
                <Text fontSize={20}>This screen doesn't exist.</Text>
                <Link asChild href={'/index'}>
                    <Button>Go to home screen</Button>
                </Link>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    link: {
        marginTop: 15,
        paddingVertical: 15,
    },
    linkText: {
        color: '#2e78b7',
        fontSize: 14,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});
