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
    return (
        <VStack
            className="w-full max-w-[350px] rounded-md border border-background-200 mt-5 p-2">
            <Text>Analyse DSA: {analyse}</Text>
            <View className={""}>
                <Button onPress={() => setShowModal(true)} className={"max-w-[150px]"} action={"positive"}>
                    <ButtonText>Ajouter</ButtonText>
                </Button>
                <Button className={"max-w-[150px]"} action={"negative"}>
                    <ButtonText>Supprimer</ButtonText>
                </Button>
            </View>
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
                            Choc délivrer ?
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
        </VStack>
    )
}
