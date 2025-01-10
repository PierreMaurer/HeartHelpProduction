
import { ScrollView, StyleSheet} from 'react-native';
import "@/global.css";
import { View } from '@/components/Themed';
import {useSearchParams} from "expo-router/build/hooks";
import TimeCounterComponent from "@/components/ui/TimeCounter";
import React, {useEffect, useRef, useState} from "react";
import CounterComponent from "@/components/ui/CounterComponent";
import SyntheseComponent from "@/components/ui/synthese";
import CounterDSAComponent from "@/components/ui/CounterDSAComponent";
import {HStack} from "@/components/ui/hstack";

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
            <HStack className={"flex-row"}>
                <TimeCounterComponent type={false}></TimeCounterComponent>
                <TimeCounterComponent type={true}></TimeCounterComponent>
            </HStack>
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
