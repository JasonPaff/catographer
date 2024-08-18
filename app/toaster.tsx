import { Toast, ToastViewport, useToastState } from '@tamagui/toast';
import { XIcon } from 'lucide-react';
import { Button, isWeb, View } from 'tamagui';
import { useBoolean } from './hooks/useBoolean';

export function Toaster() {
    const [hideClose, setHideClose] = useBoolean(true);

    const currentToast = useToastState();
    const isErrorToast = currentToast?.status === 'error';

    if (!currentToast || currentToast.isHandledNatively) return null;

    return (
        <>
            <Toast
                animation={'quicker'}
                backgroundColor={isErrorToast ? '$red7Dark' : '$green7Dark'}
                borderRadius={'$4'}
                duration={currentToast.duration}
                enterStyle={{ opacity: 0, x: 300 }}
                exitStyle={{ opacity: 0, x: 300 }}
                key={currentToast.id}
                onHoverIn={setHideClose.off}
                onHoverOut={setHideClose.on}
                paddingHorizontal={'$3.5'}
                maxWidth={isWeb ? '$20' : undefined}
                viewportName={currentToast.viewportName}
            >
                <View
                    alignItems={'center'}
                    display={'flex'}
                    flexDirection={'row'}
                    justifyContent={'space-between'}
                    marginBottom={5}
                >
                    <Toast.Title fontWeight={'bold'}>{currentToast.title}</Toast.Title>
                    {isWeb && !hideClose && (
                        <Toast.Close asChild>
                            <Button chromeless icon={<XIcon size={20} />} size={'$1'} />
                        </Toast.Close>
                    )}
                </View>
                <View paddingHorizontal={0} paddingVertical={'$2'}>
                    {!!currentToast.message && (
                        <Toast.Description fontSize={12}>{currentToast.message}</Toast.Description>
                    )}
                </View>
            </Toast>
            <ToastViewport
                bottom={isErrorToast ? '$12' : undefined}
                right={'$2'}
                top={isErrorToast ? undefined : '$12'}
            />
        </>
    );
}
