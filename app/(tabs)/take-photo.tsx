import { Camera, Lightbulb, LightbulbOff, SwitchCamera, Zap, ZapOff } from "@tamagui/lucide-icons";
import { useToastController } from "@tamagui/toast";
import { type CameraType, CameraView, type FlashMode, useCameraPermissions } from "expo-camera";
import {
	addAssetsToAlbumAsync,
	createAlbumAsync,
	createAssetAsync,
	getAlbumAsync,
	usePermissions as useMediaLibraryPermissions,
} from "expo-media-library";
import { useCallback, useEffect, useRef, useState } from "react";
import { StyleSheet } from "react-native";
import { Button, View, XStack, isWeb } from "tamagui";
import { useBoolean } from "../hooks/useBoolean";

const mediaLibraryName = "catographer-app";

export default function TakePhoto() {
	const [facing, setFacing] = useState<CameraType>("back");
	const [flash, setFlash] = useState<FlashMode>("off");

	const [cameraReady, setCameraReady] = useBoolean();
	const [torch, setTorch] = useBoolean();

	const cameraRef = useRef<CameraView | null>(null);

	const [cameraPermission, requestCameraPermission] = useCameraPermissions();
	const [mediaPermission, requestMediaPermission] = useMediaLibraryPermissions({ granularPermissions: ["photo"] });

	const toast = useToastController();

	// request camera and media permissions
	useEffect(() => {
		if (!cameraPermission?.granted) void requestCameraPermission();
		if (!mediaPermission?.granted) void requestMediaPermission();
	}, [cameraPermission, mediaPermission, requestCameraPermission, requestMediaPermission]);

	// handle camera facing change
	const onFacingChange = useCallback(() => {
		setFacing((current) => {
			return current === "back" ? "front" : "back";
		});
	}, []);

	// handle flash change
	const onFlashChange = useCallback(() => {
		return setFlash((current) => {
			return current === "on" ? "off" : "on";
		});
	}, []);

	// handle taking the photo
	const onTakePhoto = useCallback(() => {
		if (!cameraRef.current) return;
		cameraRef.current.takePictureAsync().then(async (photo) => {
			if (!photo) return;

			// turn the photo into an asset
			const asset = await createAssetAsync(photo.uri).catch(() => {
				toast.show("Error!", {
					message: "Unable to create photo asset.",
					status: "error",
				});
				return;
			});
			if (!asset) return;

			// find existing media library album
			const album = await getAlbumAsync(mediaLibraryName).catch(() => {
				toast.show("Error!", {
					message: "Unable to locate photo album.",
					status: "error",
				});
			});

			// add the photo to the existing photo album
			if (album) {
				await addAssetsToAlbumAsync(asset, album, false)
					.then(() => {
						toast.show("Photo Saved!", {
							duration: 2000,
							message: "Your photo has been saved.",
						});
					})
					.catch(() => {
						toast.show("Error!", {
							message: "Unable to save photo.",
							status: "error",
						});
					});
			}

			// add the photo to a new photo album
			if (!album) {
				await createAlbumAsync(mediaLibraryName, asset.id, false)
					.then(() => {
						toast.show("Photo Saved!", {
							duration: 2000,
							message: "Your photo has been saved.",
						});
					})
					.catch(() => {
						toast.show("Error!", {
							message: "Unable to create photo album.",
							status: "error",
						});
					});
			}
		});
	}, [toast.show]);

	return (
		<View flex={1}>
			<CameraView
				enableTorch={torch}
				facing={facing}
				flash={flash}
				onCameraReady={setCameraReady.on}
				ref={cameraRef}
				style={styles.camera}
			>
				{cameraReady && cameraPermission?.granted && (
					<XStack
						alignSelf={"center"}
						flex={1}
						flexDirection={"row"}
						gap={"$4"}
						marginBottom={isWeb ? "$2" : undefined}
					>
						{/* change camera facing */}
						{!isWeb && (
							<Button
								alignSelf={"flex-end"}
								chromeless
								icon={<SwitchCamera size={25} />}
								onPress={onFacingChange}
							/>
						)}
						{/* take a photo */}
						<Button
							alignSelf={"flex-end"}
							chromeless
							icon={<Camera size={25} />}
							onPress={onTakePhoto}
							size={isWeb ? "$3" : undefined}
						/>
						{/* change flash mode */}
						{!isWeb && (
							<Button
								alignSelf={"flex-end"}
								chromeless
								icon={flash === "on" ? <Zap size={25} /> : <ZapOff size={25} />}
								onPress={onFlashChange}
							/>
						)}
						{/* change torch mode */}
						{!isWeb && (
							<Button
								alignSelf={"flex-end"}
								chromeless
								icon={torch ? <Lightbulb size={25} /> : <LightbulbOff size={25} />}
								onPress={setTorch.toggle}
							/>
						)}
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
