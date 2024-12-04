import {VStack} from "@/components/ui/vstack";
import {Text, View} from "react-native";
import {Button, ButtonText} from "@/components/ui/button";
import React, {useState} from "react";
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
import {Input, InputField} from "@/components/ui/input";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function CounterDSAComponent() {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [showRemoveModal, setShowRemoveModal] = useState<boolean>(false);
    const [showRemoveDSAModal, setShowRemoveDSAModal] = useState<boolean>(false);
    const [choc, setChoc] = useState<number>(0);
    const [analyse, setAnalyse] = useState<number>(0);

    const addingAnalyse = async (chocdelivered: boolean) => {
        if (chocdelivered) {
            setAnalyse(analyse + 1)
            setChoc(choc + 1);
            await AsyncStorage.setItem('analyse', analyse.toString());
            await AsyncStorage.setItem('choc', choc.toString());
        } else {
            setAnalyse(analyse + 1)
            await AsyncStorage.setItem('analyse', analyse.toString());
        }
        setShowModal(false)
    }

    const removeAnalyse = async () => {
        if (analyse > 0) {
            setAnalyse(analyse - 1)
            await AsyncStorage.setItem('analyse', analyse.toString());
        }
        setShowRemoveModal(false)
    }
    const removeDSA = async () => {
        if (choc > 0) {
            setChoc(choc - 1)
            await AsyncStorage.setItem('choc', choc.toString());
        }
        setShowRemoveDSAModal(false)
    }
    return (
        <><VStack
            className="w-full max-w-[250px] rounded-md border border-background-200 mt-5 p-2 justify-center items-center">
            <Text className={"m-3"}>Analyse DSA: {analyse}</Text>
            <View className={"flex-row"}>
                <Button onPress={() => setShowModal(true)} className={"max-w-[150px] me-3"} action={"positive"}>
                    <ButtonText>Ajouter</ButtonText>
                </Button>
                <Button onPress={() => setShowRemoveModal(true)} className={"max-w-[150px]"} action={"negative"}>
                    <ButtonText>Supprimer</ButtonText>
                </Button>
            </View>
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
                            Choc délivrer ?
                        </Heading>
                        <ModalCloseButton>
                            <Icon
                                as={CloseIcon}
                                size="md"
                                className="stroke-background-400 group-[:hover]/modal-close-button:stroke-background-700 group-[:active]/modal-close-button:stroke-background-900 group-[:focus-visible]/modal-close-button:stroke-background-900"/>
                        </ModalCloseButton>
                    </ModalHeader>
                    <ModalBody>
                        <Text>Un choc à été délivrer ?</Text>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            variant="solid"
                            action="negative"
                            onPress={() => {
                                addingAnalyse(false);
                            }}
                        >
                            <ButtonText>Non</ButtonText>
                        </Button>
                        <Button
                            variant="solid"
                            action="positive"
                            onPress={() => {
                                addingAnalyse(true);
                            }}
                        >
                            <ButtonText>Choc délivrer</ButtonText>
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Modal
                isOpen={showRemoveModal}
                onClose={() => {
                    setShowRemoveModal(false);
                }}
                size="lg"
            >
                <ModalBackdrop/>
                <ModalContent>
                    <ModalHeader>
                        <Heading size="md" className="text-typography-950">
                            Supprimer une analyse ?
                        </Heading>
                        <ModalCloseButton>
                            <Icon
                                as={CloseIcon}
                                size="md"
                                className="stroke-background-400 group-[:hover]/modal-close-button:stroke-background-700 group-[:active]/modal-close-button:stroke-background-900 group-[:focus-visible]/modal-close-button:stroke-background-900"/>
                        </ModalCloseButton>
                    </ModalHeader>
                    <ModalBody>
                        <Text>Souhaitez-vous supprimer une analyse ?</Text>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            variant="solid"
                            action="negative"
                            onPress={() => {
                                setShowRemoveModal(false);
                            }}
                        >
                            <ButtonText>Non</ButtonText>
                        </Button>
                        <Button
                            variant="solid"
                            action="positive"
                            onPress={() => {
                                removeAnalyse();
                            }}
                        >
                            <ButtonText>Supprimer</ButtonText>
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </VStack><VStack
            className="w-full max-w-[250px] rounded-md border border-background-200 mt-5 p-2 justify-center items-center">
            <Text className={"m-3"}>Choc DSA: {choc}</Text>
            <View className={"flex-row"}>
                <Button onPress={() => setShowRemoveDSAModal(true)} className={"max-w-[150px]"} action={"negative"}>
                    <ButtonText>Supprimer</ButtonText>
                </Button>
            </View>
            <Modal
                isOpen={showRemoveDSAModal}
                onClose={() => {
                    setShowRemoveDSAModal(false);
                }}
                size="lg"
            >
                <ModalBackdrop/>
                <ModalContent>
                    <ModalHeader>
                        <Heading size="md" className="text-typography-950">
                            Supprimer un choc ?
                        </Heading>
                        <ModalCloseButton>
                            <Icon
                                as={CloseIcon}
                                size="md"
                                className="stroke-background-400 group-[:hover]/modal-close-button:stroke-background-700 group-[:active]/modal-close-button:stroke-background-900 group-[:focus-visible]/modal-close-button:stroke-background-900"/>
                        </ModalCloseButton>
                    </ModalHeader>
                    <ModalBody>
                        <Text>Souhaitez-vous réellement supprimer un choc DSA ?</Text>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            variant="solid"
                            action="negative"
                            onPress={() => {
                                setShowRemoveDSAModal(false);
                            }}
                        >
                            <ButtonText>Non</ButtonText>
                        </Button>
                        <Button
                            variant="solid"
                            action="positive"
                            onPress={() => {
                                removeDSA();
                            }}
                        >
                            <ButtonText>Supprimer le choc</ButtonText>
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </VStack></>
    )
}
