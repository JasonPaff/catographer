import { Camera, Lightbulb, LightbulbOff, SwitchCamera, Zap, ZapOff } from '@tamagui/lucide-icons';
import {
    type CameraCapturedPicture,
    type CameraType,
    CameraView,
    Camera as ExpoCamera,
    type FlashMode,
} from 'expo-camera';
import { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Text, View, XStack } from 'tamagui';

export default function TakePhoto() {
    const [facing, setFacing] = useState<CameraType>('back');
    const [flash, setFlash] = useState<FlashMode>('off');
    const [torch, setTorch] = useState(false);
    const [hasCameraPermission, setHasCameraPermission] = useState(false);
    const [isCameraReady, setIsCameraReady] = useState(false);

    const [photo, setPhoto] = useState<CameraCapturedPicture>();

    const cameraRef = useRef<CameraView | null>(null);

    useEffect(() => {
        ExpoCamera.requestCameraPermissionsAsync().then((result) => {
            setHasCameraPermission(result.status === 'granted');
        });
    }, []);

    // handle camera facing change
    const onFacingChange = useCallback(() => {
        setFacing((current) => {
            return current === 'back' ? 'front' : 'back';
        });
    }, []);

    // handle flash change
    const onFlashChange = useCallback(() => {
        return setFlash((current) => {
            return current === 'on' ? 'off' : 'on';
        });
    }, []);

    // handle torch change
    const onTorchChange = useCallback(() => {
        return setTorch((current) => {
            return !current;
        });
    }, []);

    // handle taking the photo
    const onTakePhoto = useCallback(() => {
        if (!cameraRef.current) return;
        cameraRef.current.takePictureAsync().then((photo) => {
            setPhoto(photo);
        });
    }, []);

    // camera permissions are still loading.
    if (hasCameraPermission === undefined) return <Text>Requesting permissions...</Text>;

    // camera permissions are not granted yet.
    if (!hasCameraPermission) {
        return (
            <View>
                <Text>We need your permission to show the camera</Text>
                <Button
                    onPress={() => {
                        ExpoCamera.requestCameraPermissionsAsync().then((result) => {
                            setHasCameraPermission(result.status === 'granted');
                        });
                    }}
                >
                    Grant Permission
                </Button>
            </View>
        );
    }

    return (
        <View flex={1}>
            <CameraView
                enableTorch={torch}
                facing={facing}
                flash={flash}
                onCameraReady={() => setIsCameraReady(true)}
                ref={cameraRef}
                style={styles.camera}
            >
                {isCameraReady && (
                    <XStack alignSelf={'center'} flex={1} flexDirection={'row'} gap={'$4'}>
                        <Button
                            alignSelf={'flex-end'}
                            chromeless
                            icon={<SwitchCamera size={25} />}
                            onPress={onFacingChange}
                        />
                        <Button alignSelf={'flex-end'} chromeless icon={<Camera size={25} />} onPress={onTakePhoto} />
                        <Button
                            alignSelf={'flex-end'}
                            chromeless
                            icon={flash === 'on' ? <Zap size={25} /> : <ZapOff size={25} />}
                            onPress={onFlashChange}
                        />
                        <Button
                            alignSelf={'flex-end'}
                            chromeless
                            icon={torch ? <Lightbulb size={25} /> : <LightbulbOff size={25} />}
                            onPress={onTorchChange}
                        />
                    </XStack>
                )}
            </CameraView>
        </View>
    );
}

const styles = StyleSheet.create({
    camera: {
        flex: 1,
    },
});
