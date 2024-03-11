import { useContext } from 'react'
import { Stack } from "expo-router";
import { ThemeProvider } from "styled-components/native";
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import light from "../../theme/light";
import FlatListProvider from "../../contexts/flatlist";
import { FlatListContext } from "../../contexts/flatlist";
import { AuthProvider, useAuth } from '../../contexts/AuthContexts';

export default function StackRoutesLayout(){
    const {authState, onLogout } = useAuth();

    return (
        <AuthProvider>
            <ThemeProvider theme={light}>
                <FlatListProvider>
                    <BottomSheetModalProvider>
                        <Stack screenOptions={{
                            headerShown: false,
                        }}>
                            { authState?.authenticated ? (
                            <Stack.Screen
                                 name="home/index"
                                 options={{
                                     title: 'home',
                                 }}
                             />
                            ): (
                            <Stack.Screen
                                name="index"
                                options={{
                                    title: 'Inicio',
                                }}
                            />
                            )}
                        </Stack>
                    </BottomSheetModalProvider>
                </FlatListProvider>
            </ThemeProvider>
        </AuthProvider>
    )
}