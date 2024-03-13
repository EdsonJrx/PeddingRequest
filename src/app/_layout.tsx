import { Slot, useRouter, useSegments } from "expo-router";
import { ThemeProvider } from "styled-components/native";
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import light from "../theme/light";
import { AuthProvider, useAuth } from '../contexts/AuthContexts';
import { useEffect } from "react";

const RootLayoutNav = () =>{
    const InitialLayout = () => {
        const { authState } = useAuth();
        const segments = useSegments();
        const router = useRouter();
        useEffect(() => {
            if (!authState?.loading) return;
            const inTabsGroup = segments[0] === '(auth)';
            if (authState?.authenticated && !inTabsGroup) {
                router.push("home");
            } else if (!authState?.authenticated) {
                router.push("login");
            }
        },[authState]);

        return <Slot/>;
    }
    return (
        <AuthProvider>
            <ThemeProvider theme={light}>
                <BottomSheetModalProvider>
                    <InitialLayout />
                </BottomSheetModalProvider>
            </ThemeProvider>
        </AuthProvider>
    )
}
export default RootLayoutNav