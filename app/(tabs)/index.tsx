import { useToastController } from '@tamagui/toast';
import { Button, H1, H4, XStack, YStack } from 'tamagui';

export default function HomeTab() {
    return (
        <YStack alignItems={'center'} paddingHorizontal={'$10'} paddingTop={'$5'}>
            <H1>Catographer</H1>
            <ToastTest />
        </YStack>
    );
}

function ToastTest() {
    const toast = useToastController();

    return (
        <YStack alignItems={'center'} gap={'$2'}>
            <H4>Toast Tester</H4>
            <XStack gap={'$2'} justifyContent={'center'}>
                <Button
                    onPress={() => {
                        toast.show('Successfully saved!', {
                            message: "Don't worry, we've got your data.",
                        });
                    }}
                >
                    Create Toast
                </Button>
            </XStack>
        </YStack>
    );
}
