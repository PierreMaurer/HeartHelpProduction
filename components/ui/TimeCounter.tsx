import {VStack} from "@/components/ui/vstack";
import { Text, View } from '@/components/Themed';
import {ButtonText, Button} from "@/components/ui/button";
import {FontAwesome5} from "@expo/vector-icons";
import React, {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Modal, ModalBackdrop, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@/components/ui/modal';
import {Heading} from "@/components/ui/heading";
import {CloseIcon, Icon} from "@/components/ui/icon";
import {Input, InputField} from "@/components/ui/input";
import {StyleSheet} from "react-native";

export default function TimeCounterComponent(props: { type: boolean }) {
    const [time, setTime] = useState<number>(0);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [newTime, setNewTime] = useState<number>(0);
    const [temoinTimeEdited, setTemoinTimeEdited] = useState<number>(0);
    const [temoinTime, setTemoinTime] = useState<number>(0);
    useEffect(() => {
        if (!props.type) {
        const timer = setInterval(async () => {
            const timeasync = await AsyncStorage.getItem('lowflow')
            if (timeasync !== null) {
                const value = Number(timeasync) + 1;
                await AsyncStorage.setItem('lowflow', value.toString());
                setTime(value);
            }
        }, 60000);

        return () => clearInterval(timer);
        }
    }, []);

    async function submitNewTime() {
        if (newTime > 0) {
            if (!props.type) {
                await AsyncStorage.setItem('lowflow', newTime.toString());
                await AsyncStorage.setItem('lowflowtemoin', temoinTimeEdited.toString());
                setTemoinTime(temoinTimeEdited);
            } else {
                await AsyncStorage.setItem('noflow', newTime.toString());
            }
            setTime(newTime);
            setShowModal(false);
        }
    }
    return (
        <VStack
            className="w-full max-w-[160px] rounded-md border border-background-200 p-4 justify-center align-middle flex-1">
            <Text>{props.type ? "No Flow" : "Low Flow"}</Text>
            <Text> {props.type ? time : (Number(time) + Number(temoinTime))} Minutes</Text>
            <Button onPress={() => setShowModal(true)} size="md" variant="solid" action="primary" className={"mt-5"}>
                <FontAwesome5 name="pen" size={15} color="white"/>
                <ButtonText>Modifier</ButtonText>
            </Button>
            <Modal
                isOpen={showModal}
                onClose={() => {
                    setShowModal(false)
                }}
                size="lg"
            >
                <ModalBackdrop />
                <ModalContent>
                    <ModalHeader>
                        <Heading size="md" className="text-typography-950">
                           Modifier le {props.type ? "No Flow" : "Low Flow"}
                        </Heading>
                        <ModalCloseButton>
                            <Icon
                                as={CloseIcon}
                                size="md"
                                className="stroke-background-400 group-[:hover]/modal-close-button:stroke-background-700 group-[:active]/modal-close-button:stroke-background-900 group-[:focus-visible]/modal-close-button:stroke-background-900"
                            />
                        </ModalCloseButton>
                    </ModalHeader>
                    {!props.type && (
                    <ModalBody>

                            <Text>Temps de massage SP</Text>
                            <Input>
                                <InputField defaultValue={time.toString()} onChangeText={text => setNewTime(text) } type={"text"} placeholder={"2"}/>
                            </Input>
                            <Text style={styles.input_container}>Temps de massage par témoins</Text>
                            <Input style={styles.input_container}>
                                <InputField defaultValue={temoinTime.toString()} onChangeText={text => setTemoinTimeEdited(text) } type={"text"} placeholder={"2"}/>
                            </Input>
                    </ModalBody>
                    )}
                    {props.type && (
                        <ModalBody>
                            <Input>
                                <InputField defaultValue={time.toString()} onChangeText={text => setNewTime(text) } type={"text"} placeholder={"2"}/>
                            </Input>
                        </ModalBody>
                    )}
                    <ModalFooter>
                        <Button
                            variant="solid"
                            action="negative"
                            onPress={() => {
                                setShowModal(false)
                            }}
                        >
                            <ButtonText>Annuler</ButtonText>
                        </Button>
                        <Button
                            variant="solid"
                            action="positive"
                            onPress={() => {
                                submitNewTime();
                            }}
                        >
                            <ButtonText>Modifier</ButtonText>
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </VStack>
    )
}

const styles = StyleSheet.create({
    input_container: {
        paddingTop: 10,
    }
});

