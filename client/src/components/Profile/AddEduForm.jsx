import React, { Fragment, useState } from 'react'
import { SimpleGrid, Text, FormControl, FormLabel, Input, FormHelperText, Checkbox, Textarea, Box, Button } from "@chakra-ui/react";
import { Link } from 'react-router-dom';
import { addEduAction } from '../../redux/actions/profileAction';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

export default function AddEduForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [disableToDate, setDisableToDate] = useState(false);
    const [formData, setFormData] = useState({
        school: "",
        degree: "",
        fieldofstudy: "",
        from: "",
        to: "",
        current: false,
        description: "",
    });

    const {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        description
    } = formData;

    const handleCurrentJobChange = (e) => {
        setDisableToDate(e.target.checked);
    }
    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        if (disableToDate === true) {
            formData.to = "";
            formData.current = true;
        }
        else {
            formData.current = false;
        }
        await dispatch(addEduAction(formData));
        await navigate("/dashboard");
    }

    const profileReducer = useSelector((state) => state.profileReducer);
    const { isFormSubmitting } = profileReducer;

    return (
        <Fragment>
            <form onSubmit={onSubmit}>
                <Text fontSize={"3xl"} fontWeight={"bold"} mb={3}>Add Education</Text>
                <SimpleGrid columns={{ base: 1, sm: 1, md: 2, lg: 2, xl: 2 }} spacing={5}>
                    <FormControl isRequired>
                        <FormLabel>School</FormLabel>
                        <Input type='text' name='school' value={school} onChange={(e) => onChange(e)} isDisabled={isFormSubmitting} />
                        <FormHelperText>Could be the name of your school</FormHelperText>
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Degree</FormLabel>
                        <Input type='text' name='degree' value={degree} onChange={(e) => onChange(e)} isDisabled={isFormSubmitting} />
                        <FormHelperText>Could be the degree you've earned from school</FormHelperText>
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Field of Study</FormLabel>
                        <Input type='text' name='fieldofstudy' value={fieldofstudy} onChange={(e) => onChange(e)} isDisabled={isFormSubmitting} />
                        <FormHelperText>Could be your field of study</FormHelperText>
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>From Date</FormLabel>
                        <Input type='date' name='from' value={from} onChange={(e) => onChange(e)} isDisabled={isFormSubmitting} />
                        <FormHelperText>Could be your start date of the institute</FormHelperText>
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>To Date</FormLabel>
                        <Input type='date' name='to' isDisabled={disableToDate || isFormSubmitting} value={to} onChange={(e) => onChange(e)} />
                        <FormHelperText>Could be your end date of the institute</FormHelperText>
                        <Checkbox mt={2} onChange={(e) => handleCurrentJobChange(e)} isDisabled={isFormSubmitting}>Current Institute</Checkbox>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Description</FormLabel>
                        <Textarea type='text' name='description' value={description} onChange={(e) => onChange(e)} isDisabled={isFormSubmitting} />
                        <FormHelperText>Tell us a little about your study and experience</FormHelperText>
                    </FormControl>
                </SimpleGrid>
                <Box display={"flex"} justifyContent={"flex-end"} gap={2} mb={3} mt={3}>
                    <Link to={"/dashboard"}><Button isDisabled={isFormSubmitting}>Back to Dashboard</Button></Link>
                    <Button colorScheme='blue' type='submit' isDisabled={isFormSubmitting}>Save</Button>
                </Box>
            </form>
        </Fragment>
    )
}
