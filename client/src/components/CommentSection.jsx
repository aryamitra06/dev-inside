import { Avatar, Box, Button, Card, IconButton, HStack, Text, Textarea, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react'
import React, { Fragment, memo, useState } from 'react'
import { BsThreeDotsVertical } from "react-icons/bs";

function CommentSection() {
    const [showBtn, setShowBtn] = useState(false);

    const displaySubmitBtn = () => {
        setShowBtn(true);
    }

    const AllComments = () => (
        <Box pl={5} pr={5}>

            <Box display={"flex"} gap={3}>
                <Avatar size={"sm"} />
                <Box width={"100%"}>
                    <Card variant={"outline"} p={3}>
                        <HStack justifyContent={"space-between"}>
                            <Box display={"flex"} gap={2} alignItems={"center"}>
                                <Text fontWeight={"bold"}>Aryamitra Chaudhuri</Text>
                                <Text color={"gray.400"}>&bull; 14 Dec</Text>
                            </Box>
                            <Menu>
                                <MenuButton as={IconButton} icon={<BsThreeDotsVertical />}>
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
            <Box pl={5} pr={5} mb={3}>
                <Box display={"flex"} gap={3}>
                    <Avatar size={"sm"} />
                    <Box width={"100%"}>
                        <Textarea placeholder='Add to the discussion' width={"100%"} mb={2} onClick={displaySubmitBtn}></Textarea>
                        {showBtn && <Button colorScheme={"blue"}>Submit</Button>}
                    </Box>
                </Box>
            </Box>
            {AllComments()}
            <Box mb={10} />
        </Fragment>
    )
}

export default memo(CommentSection)
