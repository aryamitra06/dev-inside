import React from 'react'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Text, Switch, useColorMode, Box, Card, CardBody } from '@chakra-ui/react'

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
                    <ModalBody p={2}>
                        <Card variant={"filled"}>
                        <CardBody>
                        <Text fontWeight={"semibold"} fontSize={"md"} mb={1}>Dark Mode</Text>
                        <Box display={"flex"} alignItems={"center"} gap={2}>
                            <Switch size='md' onChange={(e) => handleChange(e)} isChecked={colorMode === "dark"} />
                            {colorMode === 'light' ? <Text>Off</Text> : <Text>On</Text>}
                        </Box>
                        </CardBody>
                        </Card>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}
