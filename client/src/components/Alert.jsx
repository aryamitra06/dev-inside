import React, { memo } from 'react'
import { useToast } from "@chakra-ui/react";

const Alert = () => {
    const toast = useToast();
    toast({
        title: "Profile Saved",
        status: "success",
        isClosable: true,
    })
    return (
        <>
        </>
    )
}
export default memo(Alert);