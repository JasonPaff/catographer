import { ToastProvider as Provider, ToastViewport } from '@tamagui/toast';
import { Toaster } from '../toaster';

export default function ToastProvider({ children }: RequiredChildren) {
    return (
        <Provider
            burntOptions={{ from: 'bottom' }}
            duration={115000}
            native={
                [
                    /* uncomment the next line to do native toasts on mobile */
                    //'mobile',
                ]
            }
            swipeDirection={'horizontal'}
        >
            {children}
            <Toaster />
            <ToastViewport bottom={'$10'} left={0} right={0} />
        </Provider>
    );
}
