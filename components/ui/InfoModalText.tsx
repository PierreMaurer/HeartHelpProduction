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
import {useState} from "react";
import {Text} from "@/components/Themed";


export default function InfoModalText({isOpen, setisOpen, time_elapse, setShowModalAdding, medName} : { isOpen: boolean, setisOpen: any, time_elapse: number, setShowModalAdding: any, medName: string }) {
    const handleClose = () => setisOpen(false)
    const renew_injection = () => {
        setShowModalAdding(true);
        setisOpen(false);
    }
    return (
        <>
            <AlertDialog isOpen={isOpen} onClose={handleClose} size="md">
                <AlertDialogBackdrop/>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <Heading className="text-typography-950 font-semibold" size="md">
                           Les {time_elapse} ms sont écoulées pour l'injection de {medName}
                        </Heading>
                    </AlertDialogHeader>
                    <AlertDialogBody className="mt-3 mb-4">
                        <Text>Souhaitez-vous réinjecter de l'{medName}?</Text>
                    </AlertDialogBody>
                    <AlertDialogFooter className="">
                        <Button
                            action="negative"
                            onPress={handleClose}
                            size="sm"
                        >
                            <ButtonText>Non</ButtonText>
                        </Button>
                        <Button size="sm"
                                onPress={renew_injection}
                                action="positive"
                        >
                            <ButtonText>Injecter à nouveau</ButtonText>
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
