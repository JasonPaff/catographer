import { Camera, Cat, Image, Settings } from '@tamagui/lucide-icons';
import { Link, Tabs } from 'expo-router';
import { Button } from 'tamagui';

export default function TabLayout() {
    return (
        <Tabs initialRouteName={'home'}>
            <Tabs.Screen
                name={'home'}
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color }) => <Cat color={color} />,
                    headerRight: () => (
                        <Link asChild href={'/settings'}>
                            <Button iconAfter={Settings} marginRight={'$3'} scaleIcon={1.8} size={'$3'} />
                        </Link>
                    ),
                }}
            />
            <Tabs.Screen
                name={'take-photo'}
                options={{
                    tabBarIcon: ({ color }) => <Camera color={color} />,
                    title: 'Take Photo',
                }}
            />
            <Tabs.Screen
                name={'photos'}
                options={{
                    tabBarIcon: ({ color }) => <Image color={color} />,
                    title: 'Photos',
                }}
            />
        </Tabs>
    );
}
