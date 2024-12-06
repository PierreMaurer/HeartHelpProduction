import { StatusBar } from 'expo-status-bar';
import {Platform, ScrollView, StyleSheet} from 'react-native';
import "@/global.css";
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import {useRouter} from "expo-router";
import {useSearchParams} from "expo-router/build/hooks";
import {VStack} from "@/components/ui/vstack";
import TimeCounterComponent from "@/components/ui/TimeCounter";
import React, {useEffect, useRef, useState} from "react";
import CounterComponent from "@/components/ui/CounterComponent";
import AsyncStorage from '@react-native-async-storage/async-storage';
import SyntheseComponent from "@/components/ui/synthese";
import CounterDSAComponent from "@/components/ui/CounterDSAComponent";

export default function Reanimation() {
    const  searchParams = useSearchParams();
    const type = searchParams.get('type');
    const [adrenaline, setAdrenaline] = useState<number>(0)
    const scrollViewRef = useRef<ScrollView>(null);

    useEffect(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
    }, [adrenaline]);
    return (
        <ScrollView ref={scrollViewRef} contentContainerStyle={styles.container}>
            <View className={"flex-row"}>
                <TimeCounterComponent type={false}></TimeCounterComponent>
                <TimeCounterComponent type={true}></TimeCounterComponent>
            </View>
            <SyntheseComponent></SyntheseComponent>
            <CounterDSAComponent></CounterDSAComponent>
            <CounterComponent nameInjection={"Adrenaline"} time_number={240000} timer={true}></CounterComponent>
            <CounterComponent nameInjection={"Amiodarone"} time_number={1000} timer={false}></CounterComponent>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 200,
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
