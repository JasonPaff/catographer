import { ToastProvider as Provider } from '@tamagui/toast';
import { Toaster } from '../toaster';

export default function ToastProvider({ children }: RequiredChildren) {
    return (
        <Provider
            burntOptions={{ from: 'bottom' }}
            duration={3000}
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
        </Provider>
    );
}
