import { SimpleGrid, FormControl, FormLabel, Input, FormHelperText, Textarea, Button, HStack } from '@chakra-ui/react'
import React, { Fragment, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { newPostAction } from "../../redux/actions/postAction";
export default function NewPostForm({ onClose }) {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        title: "",
        desc: "",
        cover: ""
    });
    const {
        title,
        desc,
        cover
    } = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        await dispatch(newPostAction(formData));
        await onClose();
    }

    const newPostRes = useSelector((state) => state.postReducer);
    const { isFormSubmitting } = newPostRes;

    return (
        <Fragment>
            <form onSubmit={onSubmit}>
                <SimpleGrid columns={1} spacing={5}>
                    <FormControl>
                        <FormLabel>Cover image URL</FormLabel>
                        <Input type="url" name="cover" value={cover} onChange={(e) => onChange(e)} isDisabled={isFormSubmitting} />
                        <FormHelperText>Could be the image url for your post's cover</FormHelperText>
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Title</FormLabel>
                        <Input type="text" name="title" maxLength={100} value={title} onChange={(e) => onChange(e)} isDisabled={isFormSubmitting} />
                        <FormHelperText>Could be the title of your post (100 characters maximum)</FormHelperText>
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Description</FormLabel>
                        <Textarea type="text" name="desc" height={200} value={desc} onChange={(e) => onChange(e)} isDisabled={isFormSubmitting} />
                        <FormHelperText>Could be the description of your post</FormHelperText>
                    </FormControl>
                </SimpleGrid>
                <HStack mt={3} justifyContent={"flex-end"}>
                    <Button colorScheme={"blue"} type="submit" isDisabled={isFormSubmitting}>Publish</Button>
                </HStack>
            </form>
        </Fragment>
    )
}
