import React from 'react'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Button, Text, Switch, useColorMode, HStack, Card, CardBody } from '@chakra-ui/react'

export default function SettingsModal({ isOpen, onClose }) {
    const { colorMode, toggleColorMode } = useColorMode();

    const handleChange = (e) => {
        toggleColorMode();
    }

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} motionPreset='slideInBottom' size={"xs"} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Settings</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Card mb={3}>
                            <CardBody>
                                <Text mb={2} fontWeight={"semibold"} fontSize={"lg"}>Dark Mode</Text>
                                <HStack>
                                    <Switch size='md' onChange={(e) => handleChange(e)} isChecked={colorMode === "dark"} />
                                    {colorMode === 'light' ? <Text>Off</Text> : <Text>On</Text>}
                                </HStack>
                            </CardBody>
                        </Card>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}
