import { HStack } from "components/shared/stack";
import { type CameraType, CameraView, type FlashMode, useCameraPermissions } from "expo-camera";
import {
	addAssetsToAlbumAsync,
	createAlbumAsync,
	createAssetAsync,
	getAlbumAsync,
	usePermissions as useMediaLibraryPermissions,
} from "expo-media-library";
import { Camera, Lightbulb, LightbulbOff, SwitchCamera, Zap, ZapOff } from "lucide-react-native";
import { useCallback, useEffect, useRef, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { mediaLibraryName } from "../../constants/albums";
import { useBoolean } from "../../hooks/use-boolean/use-boolean";

const styles = StyleSheet.create({
	buttonBar: {
		alignSelf: "center",
		gap: 4,
	},
	camera: {
		flex: 1,
	},
	container: { flex: 1 },
});

export default function CameraScreen() {
	const [facing, setFacing] = useState<CameraType>("back");
	const [flash, setFlash] = useState<FlashMode>("off");

	const [cameraReady, setCameraReady] = useBoolean();
	const [torch, setTorch] = useBoolean();

	const cameraRef = useRef<CameraView | null>(null);

	const [cameraPermission, requestCameraPermission] = useCameraPermissions();
	const [mediaPermission, requestMediaPermission] = useMediaLibraryPermissions({ granularPermissions: ["photo"] });

	// request camera and media permissions
	useEffect(() => {
		if (!cameraPermission?.granted) void requestCameraPermission();
		if (!mediaPermission?.granted) void requestMediaPermission();
	}, [cameraPermission, mediaPermission, requestCameraPermission, requestMediaPermission]);

	// handle taking the photo
	const onTakePhoto = useCallback(() => {
		if (!cameraRef.current) return;
		cameraRef.current.takePictureAsync().then(async (photo) => {
			if (!photo) return;

			// turn the photo into an asset
			const asset = await createAssetAsync(photo.uri).catch(() => {
				// toast.show("Error!", {
				// 	message: "Unable to create photo asset.",
				// 	status: "error",
				// });
				return;
			});
			if (!asset) return;

			// find existing media library album
			const album = await getAlbumAsync(mediaLibraryName).catch(() => {
				// toast.show("Error!", {
				// 	message: "Unable to locate photo album.",
				// 	status: "error",
				// });
			});

			// add the photo to the existing photo album
			if (album) {
				await addAssetsToAlbumAsync(asset, album)
					.then(() => {
						// toast.show("Photo Saved!", {
						// 	duration: 2000,
						// 	message: "Your photo has been saved.",
						// });
					})
					.catch(() => {
						// toast.show("Error!", {
						// 	message: "Unable to save photo.",
						// 	status: "error",
						// });
					});
			}

			// add the photo to a new photo album
			if (!album) {
				await createAlbumAsync(mediaLibraryName, asset.id)
					.then(() => {
						// toast.show("Photo Saved!", {
						// 	duration: 2000,
						// 	message: "Your photo has been saved.",
						// });
					})
					.catch(() => {
						// toast.show("Error!", {
						// 	message: "Unable to create photo album.",
						// 	status: "error",
						// });
					});
			}
		});
	}, []);

	return (
		<View style={styles.container}>
			<CameraView
				enableTorch={torch}
				facing={facing}
				flash={flash}
				onCameraReady={setCameraReady.on}
				ref={cameraRef}
				style={styles.camera}
			>
				{cameraReady && cameraPermission?.granted && (
					<HStack {...styles.buttonBar}>
						{/* change camera facing */}
						<Pressable onPress={() => setFacing((current) => (current === "back" ? "front" : "back"))}>
							<SwitchCamera size={25} />
						</Pressable>

						{/* take a photo */}
						<Pressable onPress={onTakePhoto}>
							<Camera size={25} />
						</Pressable>

						{/* change flash mode */}
						<Pressable onPress={() => setFlash((current) => (current === "on" ? "off" : "on"))}>
							{flash === "on" ? <Zap size={25} /> : <ZapOff size={25} />}
						</Pressable>

						{/* change torch mode */}
						<Pressable onPress={setTorch.toggle}>
							{torch ? <Lightbulb size={25} /> : <LightbulbOff size={25} />}
						</Pressable>
					</HStack>
				)}
			</CameraView>
		</View>
	);
}
