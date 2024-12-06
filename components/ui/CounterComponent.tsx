import {VStack} from "@/components/ui/vstack";
import { Text, View } from '@/components/Themed';
import {ButtonText, Button} from "@/components/ui/button";
import {FontAwesome5} from "@expo/vector-icons";
import React, {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    Modal,
    ModalBackdrop,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader
} from "@/components/ui/modal";
import {Heading} from "@/components/ui/heading";
import {CloseIcon, Icon} from "@/components/ui/icon";
import { Audio } from 'expo-av';
import InfoModalText from "@/components/ui/InfoModalText";
interface Injection {
    time: string;
    dosage: number;
}

export default function CounterComponent({nameInjection, timer, time_number }: { nameInjection: string, timer: boolean, time_number: number }) {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [showModalAdding, setShowModalAdding] = useState<boolean>(false);
    const [sound, setSound] = useState()
    const [injections, setInjections] = useState<Injection[]>([]);
    const [cancelAlarm, setCancelAlarm] = useState<boolean>(false);
    const [numberInjection, setAdrenaline] = useState<number>(0);
    const [isModalAlarm, setIsModalAlarm] = useState<boolean>(false);

    const handleAddInjection = (request_timer: boolean) => {
        const currentTime = new Date().toLocaleTimeString();
        const newInjection = { time: currentTime, dosage: 1 }; // Assuming each injection has a dosage of 1
        setInjections([...injections, newInjection]);
        setAdrenaline(numberInjection + 1);
        if (timer && request_timer) {
            setTimeout(async () => {
                const sound = await Audio.Sound.createAsync(require('../../assets/sounds/alarm.mp3')
                );
                setSound(sound);
                if (!cancelAlarm) {
                    console.log("Alarm");
                    await sound.sound.playAsync();
                    setIsModalAlarm(true);
                } else {
                    setCancelAlarm(false)
                }
            }, time_number);
        }
    };
    useEffect(() => {
        const fetchInjections = async () => {
            const injections_send = await AsyncStorage.setItem(nameInjection+'_history', JSON.stringify(injections));
            const total_inj = await AsyncStorage.setItem(nameInjection, numberInjection.toString());
        };
        fetchInjections();
    }, [injections]);

    const deleteLastInjection = () => {
        const newInjections = [...injections];
        newInjections.pop();
        setInjections(newInjections);
        setAdrenaline(numberInjection - 1);
        setCancelAlarm(true)
    }

    const renew_injection = () => {
        setIsModalAlarm(false);
        setShowModalAdding(true);
    }
    return (
        <VStack
            className="w-full max-w-[250px] rounded-md border border-background-200 mt-5 p-2 justify-center items-center">
            <Text className={"m-3"}>{nameInjection}: {numberInjection}</Text>
            {injections.length > 0 && (
                <Text className={"m-3"}>Dernière injection: {injections[injections.length-1].time}</Text>
            )}<View className={"flex-row"}>
                <Button onPress={() => setShowModalAdding(true)} className={"max-w-[150px] me-3"} action={"positive"}>
                    <ButtonText>Ajouter</ButtonText>
                </Button>
                <Button className={"max-w-[150px]"} action={"negative"} onPress={() => setShowModal(true)}>
                    <ButtonText>Supprimer</ButtonText>
                </Button>
            </View>
            <InfoModalText isOpen={isModalAlarm} setisOpen={setIsModalAlarm} time_elapse={time_number} setShowModalAdding={setShowModalAdding} medName={nameInjection}></InfoModalText>
            <Modal
                isOpen={showModalAdding}
                onClose={() => {
                    setShowModalAdding(false);
                }}
                size="lg"
            >
                <ModalBackdrop/>
                <ModalContent>
                    <ModalHeader>
                        <Heading size="md" className="text-typography-950">
                            Ajout d'injection de {nameInjection} ?
                        </Heading>
                        <ModalCloseButton
                        onPress={() => setShowModalAdding(false)}>
                            <Icon
                                as={CloseIcon}
                                size="md"
                                className="stroke-background-400 group-[:hover]/modal-close-button:stroke-background-700 group-[:active]/modal-close-button:stroke-background-900 group-[:focus-visible]/modal-close-button:stroke-background-900"/>
                        </ModalCloseButton>
                    </ModalHeader>
                    <ModalBody>
                        <Text>Souhaitez-vous ajouter une nouvelle injection ?</Text>
                    </ModalBody>
                    <ModalFooter>
                        {timer && (
                            <><Button
                                variant="solid"
                                action="positive"
                                onPress={() => {
                                    handleAddInjection(true);
                                    setShowModalAdding(false);
                                }}
                            >
                                <ButtonText>Inj avec alarme</ButtonText>
                            </Button><Button
                                variant="solid"
                                className={"bg-blue-600"}
                                onPress={() => {
                                    handleAddInjection(true);
                                    setShowModalAdding(false);
                                }}
                            >
                                <ButtonText>Inj sans alarmes</ButtonText>
                            </Button></>
                        )}
                        {!timer && (
                            <Button
                                variant="solid"
                                action="positive"
                                onPress={() => {
                                    handleAddInjection(false);
                                    setShowModalAdding(false);
                                }}
                            >
                                <ButtonText>Ajouter</ButtonText>
                            </Button>
                        )}
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <Modal
                isOpen={showModal}
                onClose={() => {
                    setShowModal(false);
                }}
                size="lg"
            >
                <ModalBackdrop/>
                <ModalContent>
                    <ModalHeader>
                        <Heading size="md" className="text-typography-950">
                            Supprimer la dernière injection ?
                        </Heading>
                        <ModalCloseButton>
                            <Icon
                                as={CloseIcon}
                                size="md"
                                className="stroke-background-400 group-[:hover]/modal-close-button:stroke-background-700 group-[:active]/modal-close-button:stroke-background-900 group-[:focus-visible]/modal-close-button:stroke-background-900"/>
                        </ModalCloseButton>
                    </ModalHeader>
                    <ModalBody>
                        <Text>Souhaitez-vous annuler la dernière injection ?</Text>
                        <Text>Les alarmes seront supprimé pour l'injection de {nameInjection}</Text>
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
                                deleteLastInjection();
                                setShowModal(false);
                            }}
                        >
                            <ButtonText>Supprimer</ButtonText>
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

        </VStack>
    )
}
