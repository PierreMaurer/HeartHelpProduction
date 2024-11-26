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

export default function TimeCounterComponent(props: { type: boolean }) {
    const [time, setTime] = useState<number>(0);
    const [showModal, setShowModal] = useState<boolean>(false);
    useEffect(() => {
        if (props.type) {
        const timer = setInterval(async () => {
            const timeasync = await AsyncStorage.getItem('noflow')
            if (timeasync !== null) {
                const value = Number(timeasync) + 1;
                await AsyncStorage.setItem('noflow', value.toString());
                setTime(value);
            }
        }, 60000);

        return () => clearInterval(timer);
        }
    }, []);

    async function onPress() {
        console.log(await AsyncStorage.getItem('noflow'));
    }
    return (
        <VStack
            className="w-full max-w-[160px] rounded-md border border-background-200 p-4 justify-center align-middle flex-1">
            <Text>{props.type ? "No Flow" : "Low Flow"}</Text>
            <Text> {time} Minutes</Text>
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
                    <ModalBody>
                        <Input>
                            <InputField type={"text"} placeholder={"2"}/>
                        </Input>
                    </ModalBody>
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
                                setShowModal(false)
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
