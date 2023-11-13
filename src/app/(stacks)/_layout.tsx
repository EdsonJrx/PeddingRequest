import { useContext } from 'react'
import { Stack } from "expo-router";
import { ThemeProvider } from "styled-components/native";
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import light from "../../theme/light";
import FlatListProvider from "../../contexts/flatlist";
import { FlatListContext } from "../../contexts/flatlist";

export default function StackRoutesLayout(){
    
    return (
        <FlatListProvider>
            <BottomSheetModalProvider>
                <ThemeProvider theme={light}>
                    <Stack screenOptions={{
                        headerShown: false,
                    }}>
                        <Stack.Screen
                            name="index"
                            options={{
                                title: 'Inicio',
                            }}
                        />
                    </Stack>
                </ThemeProvider>
            </BottomSheetModalProvider>
        </FlatListProvider>
    )
}