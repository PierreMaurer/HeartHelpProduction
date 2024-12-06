import {
    AlertDialog,
    AlertDialogBackdrop,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogCloseButton,
    AlertDialogFooter,
    AlertDialogBody,
} from "@/components/ui/alert-dialog"
import {Button, ButtonText} from "@/components/ui/button";
import {Heading} from "@/components/ui/heading";
import {useEffect, useState} from "react";
import {Text} from "@/components/Themed";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function InfoLegalComponent() {
    const [isOpen, setIsOpen] = useState(false);
    useEffect(() => {

        const check = async () => {
            await AsyncStorage.getItem('infoLegal').then((value) => {
                if (value === null) {
                    setIsOpen(true);
                }
            });
        }
        check();
    }, []);
    const handleClose = async () => {
        setIsOpen(false);
        await AsyncStorage.setItem('infoLegal', 'true');
    }
    return (
        <>
            <AlertDialog isOpen={isOpen} onClose={handleClose} size="md">
                <AlertDialogBackdrop/>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <Heading className="text-typography-950 font-semibold" size="md">
                            Information légale
                        </Heading>
                    </AlertDialogHeader>
                    <AlertDialogBody className="mt-3 mb-4">
                        <Text>
                            Le responsable légal de HeartHelp décline toute responsabilité en cas de litige lié aux informations fournies par HeartHelp.
                            HeartHelp doit être utilisé uniquement par des personnes formées à la réanimation, et toutes les actions ou informations fournies par HeartHelp doivent être considérées comme purement informatives. Elles ne doivent en aucun cas être utilisées comme référence médicale.
                        </Text>
                    </AlertDialogBody>
                    <AlertDialogFooter className="">
                        <Button
                            action="positive"
                            onPress={handleClose}
                            size="sm"
                        >
                            <ButtonText>J'accepte</ButtonText>
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
