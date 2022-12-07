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
                        <Card mb={3}>
                            <CardBody>
                                <Text mb={2} fontWeight={"semibold"} fontSize={"lg"}>Delete Profile</Text>
                                <HStack>
                                    <Button colorScheme={"red"}>Delete</Button>
                                </HStack>
                            </CardBody>
                        </Card>
                    </ModalBody>
                    {/* <ModalFooter>
                        <Button variant='ghost' mr={2} onClick={onClose}>Cancel</Button>
                        <Button colorScheme='blue' onClick={() => { onClose(); }}>
                            Save
                        </Button>
                    </ModalFooter> */}
                </ModalContent>
            </Modal>
        </>
    )
}
