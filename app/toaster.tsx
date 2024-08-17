import { Toast, useToastState } from '@tamagui/toast';
import { XIcon } from 'lucide-react';
import { useState } from 'react';
import { Button, isWeb, View } from 'tamagui';

export function Toaster() {
    const [hideClose, setHideClose] = useState(true);

    const currentToast = useToastState();

    if (!currentToast || currentToast.isHandledNatively) return null;

    return (
        <Toast
            animation={'quicker'}
            borderRadius={'$4'}
            duration={currentToast.duration}
            enterStyle={{ opacity: 0, scale: 0.2, y: -25 }}
            exitStyle={{ opacity: 0, scale: 1, y: -20 }}
            key={currentToast.id}
            onHoverIn={() => setHideClose(false)}
            onHoverOut={() => setHideClose(true)}
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
                {!!currentToast.message && <Toast.Description>{currentToast.message}</Toast.Description>}
            </View>
        </Toast>
    );
}
