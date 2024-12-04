import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable, Text } from 'react-native';
import Svg, { Ellipse } from 'react-native-svg';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import TabOneScreen from "@/app/(tabs)/index";

function TabBarIcon(props: {
    name: React.ComponentProps<typeof FontAwesome>['name'];
    color: string;
}) {
    return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <Tabs
            screenOptions={{
                header: ({ navigation, route, options }) => (
                    <>
                        <Svg
                            width="100%"
                            height="200"
                            viewBox="0 0 393 143"
                            style={{ position: 'absolute', top: 0, left: 0, right: 0 }}
                        >
                            <Ellipse cx="196" cy="21.5" rx="246" ry="121.5" fill="#D60034" />
                        </Svg>
                        <Text
                            style={{
                                position: 'absolute',
                                top: 80,
                                fontSize: 36,
                                left: 0,
                                right: 0,
                                textAlign: 'center',
                                transform: [{ translateY: '-50%' }],
                                color: 'white',
                                fontWeight: 'bold',
                                zIndex: 1,
                            }}
                        >
                            Hearth Help
                        </Text>
                        {route.name != 'index' && (
                        <Link href="/(tabs)" asChild>
                            <Pressable
                                style={{
                                    position: 'absolute',
                                    top: 80,
                                    left: 25,
                                    zIndex: 1,
                                }}
                            >
                                {({ pressed }) => (
                                    <FontAwesome
                                        name="arrow-left"
                                        size={30}
                                        color={Colors.light.background}
                                        style={{ opacity: pressed ? 0.5 : 1 }}
                                    />
                                )}
                            </Pressable>
                        </Link> )}

                        {route.name === 'index' && (
                            <Link href="/(tabs)" asChild>
                                <Pressable
                                    style={{
                                        position: 'absolute',
                                        top: 80,
                                        left: 25,
                                        zIndex: 1,
                                    }}
                                >
                                    {({ pressed }) => (
                                        <FontAwesome
                                            name="gear"
                                            size={30}
                                            color={Colors.light.background}
                                            style={{ opacity: pressed ? 0.5 : 1 }}
                                        />
                                    )}
                                </Pressable>
                            </Link> )}
                        <Link href="/modal" asChild>
                            <Pressable
                                style={{
                                    position: 'absolute',
                                    top: 80,
                                    right: 25,
                                    zIndex: 1,
                                }}
                            >
                                {({ pressed }) => (
                                    <FontAwesome
                                        name="info-circle"
                                        size={30}
                                        color={Colors.light.background}
                                        style={{ opacity: pressed ? 0.5 : 1 }}
                                    />
                                )}
                            </Pressable>
                        </Link>
                    </>
                ),
                headerTintColor: 'transparent',
                tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                headerShown: true,
                tabBarStyle: { display: 'none' }
            }}>
        </Tabs>
    );
}
