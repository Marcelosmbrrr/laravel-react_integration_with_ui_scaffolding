// React
import * as React from 'react';
// Chakra UI components
import { Button, AlertDialog, AlertDialogContent, AlertDialogBody, AlertDialogFooter, AlertDialogOverlay, AlertDialogHeader, AlertDialogCloseButton, useDisclosure } from "@chakra-ui/react"

export function ModalAlert({...props}){

    const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: props.state.open });
    const cancelRef = React.useRef();

    return (
        <>
            <AlertDialog
                motionPreset='slideInBottom'
                leastDestructiveRef={cancelRef}
                onClose={onClose}
                isOpen={isOpen}
                isCentered
            >
                <AlertDialogOverlay />

                <AlertDialogContent>
                <AlertDialogHeader>{props.state.title}</AlertDialogHeader>
                <AlertDialogCloseButton />
                <AlertDialogBody>
                    {props.state.text}
                </AlertDialogBody>
                {props.state.actions && 
                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>
                            Close
                        </Button>
                        <Button colorScheme='primary' ml={3} onClick = {() => {props.handleSubmit()}}>
                            Confirm
                        </Button>
                    </AlertDialogFooter>
                }
                </AlertDialogContent>
            </AlertDialog>
        </>
    )

}