import {VStack} from "@/components/ui/vstack";
import { Text, View } from '@/components/Themed';
import {ButtonText, Button} from "@/components/ui/button";
import {FontAwesome5} from "@expo/vector-icons";
import React, {useEffect} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function CounterComponent(props: { type: number }) {

    return (
        <VStack className="w-full max-w-[160px] rounded-md border border-background-200 p-4 pt-5">
            <Text>{props.type ? "No Flow" : "Low Flow"}</Text>
            <Text>Inj. : X</Text>
            <VStack>
                <Button size="md" variant="solid" action="primary" className={"mt-5"}>
                    <FontAwesome5 name="pen" size={15} color="white"/>
                    <ButtonText>Modifier</ButtonText>
                </Button>
                <Button size="md" variant="solid" action="primary" className={"mt-5"}>
                    <FontAwesome5 name="pen" size={15} color="white"/>
                    <ButtonText>Modifier</ButtonText>
                </Button>
            </VStack>
        </VStack>
    )
}
