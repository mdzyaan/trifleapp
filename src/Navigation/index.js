import HomeScreen from '../screens/Home';
import CollectionScreen from '../screens/Collection';
import OnboardingScreen from '../screens/Onboarding';
import localStorageConstant from '../common/localStorage';
import asyncStorage from '../utils/asyncStorage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useState, useEffect } from 'react';

export default function Navigation() {
    const Stack = createStackNavigator();
    const [isUserOnboarded, setIsUserOnboarded] = useState(false);

    useEffect(() => {
        async function fetchUserOnboardingStatus() {
            const getUserOnboardingStatus = await asyncStorage.getItem(localStorageConstant.USER_ONBOARDED);
            setIsUserOnboarded(getUserOnboardingStatus);
            alert(getUserOnboardingStatus)
        }
        fetchUserOnboardingStatus()
    }, []);

    
    return (
        <NavigationContainer>
            <Stack.Navigator>
                {isUserOnboarded ? (
                    <>
                        <Stack.Screen name="Home" component={HomeScreen} />
                        <Stack.Screen name="Collection" component={CollectionScreen} />
                    </>
                ) : (
                    <Stack.Screen name="Onboarding" component={OnboardingScreen} />
                    )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}