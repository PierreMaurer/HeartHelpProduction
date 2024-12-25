import {ScrollView, StyleSheet} from 'react-native';
import "@/global.css";
import React, {useEffect, useRef, useState} from "react";
import { Text } from "@/components/Themed";
import SelectPediatric from "@/components/selectPediatric";

export default function Settings() {
    const [pediatric, setPediatric] = useState<boolean>(false);
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text>Réglages</Text>
            <SelectPediatric pediatric={pediatric} setSelectPediatric={setPediatric}/>
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
