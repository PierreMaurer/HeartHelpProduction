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
import {number} from "prop-types";

export default function SyntheseComponent() {
    const [showModal, setShowModal] = React.useState<boolean>(false);
    const [lowFlow, setLowFlow] = React.useState<string>('0');
    const [noflow, setNoFlow] = React.useState<string>('0');
    const [adrenaline, setAdrenaline] = React.useState<string>('0');
    const [adrenalineHistory, setAdrenalineHistory] = React.useState<any[]>([]);
    const [amiodarone, setAmiodarone] = React.useState<string>('0');
    const [amiodaroneHistory, setAmiodaroneHistory] = React.useState<any[]>([]);
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
                const adrenaline_get = await AsyncStorage.getItem('Adrenaline');
                if (adrenaline_get !== null) {
                    setAdrenaline(adrenaline_get);
                }
                const adrenalineHistory_get = await AsyncStorage.getItem('Adrenaline_history');
                if (adrenalineHistory_get !== null) {
                    setAdrenalineHistory(JSON.parse(adrenalineHistory_get));
                }
                const amiodarone_get = await AsyncStorage.getItem('Amiodarone');
                if (amiodarone_get !== null) {
                    setAmiodarone(amiodarone_get);
                }
                const amiodaroneHistory_get = await AsyncStorage.getItem('Amiodarone_history');
                if (amiodaroneHistory_get !== null) {
                    setAmiodaroneHistory(JSON.parse(amiodaroneHistory_get));
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
                        <Text>Adrenaline : {adrenaline}</Text>
                        {adrenalineHistory.length > 0 && <Text>Historique de l'adrenaline :</Text>}
                        {adrenalineHistory.map((history, index)  => {
                            return (
                                <Text key={index}>Injection N°{index + 1} - {history.time} : {history.dosage}mg</Text>
                            )
                        })}
                        <Text>Amiodarone : {amiodarone}</Text>
                        {amiodaroneHistory.length > 0 && <Text>Historique de l'amiodarone :</Text>}
                        {amiodaroneHistory.map((history, index)  => {
                            return (
                                <Text key={index}>Injection N°{index + 1} - {history.time} : {history.dosage}mg</Text>
                            )
                        })}
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            variant="solid"
                            action="negative"
                            onPress={() => {
                                setShowModal(false)
                            }}
                        >
                            <ButtonText>Fermer</ButtonText>
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
