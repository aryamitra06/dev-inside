import { Avatar, Box, Button, Card, IconButton, HStack, Text, Textarea, Menu, MenuButton, MenuList, MenuItem, Alert, AlertIcon, Stack, CircularProgress, Center } from '@chakra-ui/react'
import React, { Fragment, memo, useState } from 'react'
import { BsThreeDotsVertical } from "react-icons/bs";

function CommentSection({ loggedInUser }) {
    const [showBtn, setShowBtn] = useState(false);

    const displaySubmitBtn = () => {
        setShowBtn(true);
    }

    const { response, loading, error } = loggedInUser;

    const AllComments = () => (
        <Box pl={5} pr={5}>

            <Box display={"flex"} gap={3}>
                <Avatar size={"sm"} />
                <Box width={"100%"}>
                    <Card variant={"outline"} p={3}>
                        <HStack justifyContent={"space-between"}>
                            <Box display={"flex"} gap={2} alignItems={"center"}>
                                <Text fontWeight={"bold"} fontSize={{ base: "sm", sm: "sm", md: "md", lg: "md", xl: "md" }}>Aryamitra Chaudhuri</Text>
                                <Text color={"gray.400"} fontSize={{ base: "xs" }}>&bull; 14 Dec</Text>
                            </Box>
                            <Menu>
                                <MenuButton as={IconButton} icon={<BsThreeDotsVertical />} size={"sm"}>
                                </MenuButton>
                                <MenuList>
                                    <MenuItem>Delete</MenuItem>
                                </MenuList>
                            </Menu>
                        </HStack>
                        <Text mb={2} mt={2}>Nice post dear!</Text>
                    </Card>
                </Box>
            </Box>
        </Box>
    )
    return (
        <Fragment>
            <Text fontSize={"2xl"} fontWeight={"bold"} p={5}>Comments (10)</Text>
            {
                loading ? (
                    <Stack>
                        <Center>
                            <CircularProgress isIndeterminate size={10} mb={10}/>
                        </Center>
                    </Stack>
                ) : (
                    <>
                        {
                            error ? (
                                <Alert status='error'>
                                    <AlertIcon />
                                    {error?.msg}
                                </Alert>
                            ) : (
                                <Box pl={5} pr={5} mb={3}>
                                    <Box display={"flex"} gap={3}>
                                        <Avatar size={"sm"} src={response?.avatar}/>
                                        <Box width={"100%"}>
                                            <Textarea placeholder='Add to the discussion' width={"100%"} mb={2} onClick={displaySubmitBtn}></Textarea>
                                            {showBtn && <Button colorScheme={"blue"}>Submit</Button>}
                                        </Box>
                                    </Box>
                                </Box>
                            )
                        }
                    </>
                )
            }

            {AllComments()}
            <Box mb={5} />
        </Fragment>
    )
}

export default memo(CommentSection)
