import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import {useRouter} from "expo-router";
import {useSearchParams} from "expo-router/build/hooks";
import {VStack} from "@/components/ui/vstack";
import TimeCounterComponent from "@/components/ui/TimeCounter";
import {Button, ButtonText} from "@/components/ui/button";
import {FontAwesome5} from "@expo/vector-icons";
import React from "react";
import CounterComponent from "@/components/ui/CounterComponent";
import AsyncStorage from '@react-native-async-storage/async-storage';
import SyntheseComponent from "@/components/ui/synthese";
import CounterDSAComponent from "@/components/ui/CounterDSAComponent";

export default function Reanimation() {
    const  searchParams = useSearchParams();
    const type = searchParams.get('type');
    console.log(type)
    return (
        <View style={styles.container} >
            <View className={"flex-row"}>
                <TimeCounterComponent type={false}></TimeCounterComponent>
                <TimeCounterComponent type={true}></TimeCounterComponent>
            </View>
            <SyntheseComponent></SyntheseComponent>
            <CounterDSAComponent></CounterDSAComponent>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
    synthesebutton: {
        backgroundColor: "#005D85",
    }
});
