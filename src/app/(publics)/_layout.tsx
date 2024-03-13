import React from "react";
import { Stack } from "expo-router";

const PublicLayout = () => {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
            }}>
        <Stack.Screen
            name="login/index"
            options={{ 
                headerTitle: 'Login' 
            }}>
        </Stack.Screen>
        </Stack>
    )

};

export default PublicLayout;