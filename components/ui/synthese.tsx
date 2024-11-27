import {VStack} from "@/components/ui/vstack";
import { Text, View } from '@/components/Themed';
import {ButtonText, Button} from "@/components/ui/button";
import {FontAwesome5} from "@expo/vector-icons";
import React, {useEffect} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {StyleSheet} from "react-native";
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

export default function SyntheseComponent() {
    const [showModal, setShowModal] = React.useState<boolean>(false);
    const [lowFlow, setLowFlow] = React.useState<string>('0');
    const [noflow, setNoFlow] = React.useState<string>('0');

    useEffect(() => {
        const getData = async () => {
            try {
                const lowflowAsync = await AsyncStorage.getItem('lowflow');
                if (lowflowAsync !== null) {
                    setLowFlow(lowflowAsync);
                }
                const noflowAsync = await AsyncStorage.getItem('noflow');
                if (noflowAsync !== null) {
                    setNoFlow(noflowAsync);
                }
            } catch (e) {
                console.log(e);
            }
        };
        getData();
    }, [showModal]);
    return (
        <VStack>
            <Button onPress={() => setShowModal(true)} style={styles.synthesebutton} variant="solid" action="primary" className={"mt-5"}>
                <FontAwesome5 name="newspaper" size={24} color="white" />
                <ButtonText>Ouvrir la synthèse</ButtonText>
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
                            Synthèse de la réanimation
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
                        <Text>NoFlow : {noflow}</Text>
                        <Text>LowFlow : {lowFlow}</Text>
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
    synthesebutton: {
        backgroundColor: "#005D85",
    }
});
