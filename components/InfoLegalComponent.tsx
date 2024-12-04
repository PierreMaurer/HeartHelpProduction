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
                            Le responsable légale de HeartHelp décline toute responsabilité en cas de litige suite au informations fournis par HeartHelp.
                            Hearthelp ne doit être utilisé que par des personnes formés à la réanimation et toutes actions doit toutes informations fournis par HeartHelp doit être
                            doit être considéré à titre informatif et ne doit pas être utilisé comme référence médicale.
                        </Text>
                    </AlertDialogBody>
                    <AlertDialogFooter className="">
                        <Button
                            action="negative"
                            onPress={handleClose}
                            size="sm"
                        >
                            <ButtonText>Non</ButtonText>
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
