import React, { Fragment, useState } from 'react'
import { SimpleGrid, Text, FormControl, FormLabel, Input, FormHelperText, Checkbox, Textarea, Box, Button } from "@chakra-ui/react";
import { Link } from 'react-router-dom';
import { addExpAction } from '../redux/actions/profileAction';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function AddExpForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [disableToDate, setDisableToDate] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        company: "",
        location: "",
        from: "",
        to: "",
        current: false,
        description: "",
    });

    const {
        title,
        company,
        location,
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

    const onSubmit = (e) => {
        e.preventDefault();
        if (disableToDate === true) {
            formData.to = "";
            formData.current = true;
        }
        else {
            formData.current = false;
        }
        dispatch(addExpAction(formData));
    }

    const response = useSelector((state) => state.addexp);

    useEffect(()=>{
        if(response.success === true){
            navigate("/dashboard");
        }
    }, [response.success, navigate])

    return (
        <Fragment>
            <form onSubmit={onSubmit}>
                <Text fontSize={"3xl"} fontWeight={"bold"} mb={3}>Add Experience</Text>
                <SimpleGrid columns={{ base: 1, sm: 1, md: 2, lg: 2, xl: 2 }} spacing={5}>
                    <FormControl isRequired>
                        <FormLabel>Job Title</FormLabel>
                        <Input type='text' name='title' value={title} onChange={(e) => onChange(e)} isDisabled={response.loading} />
                        <FormHelperText>Could be the role you work for</FormHelperText>
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Company</FormLabel>
                        <Input type='text' name='company' value={company} onChange={(e) => onChange(e)} isDisabled={response.loading} />
                        <FormHelperText>Could be your own company or one you work for</FormHelperText>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Location</FormLabel>
                        <Input type='text' name='location' value={location} onChange={(e) => onChange(e)} isDisabled={response.loading} />
                        <FormHelperText>Could be your company location</FormHelperText>
                    </FormControl>
                    <FormControl>
                        <FormLabel>From Date</FormLabel>
                        <Input type='date' name='from' value={from} onChange={(e) => onChange(e)} isDisabled={response.loading} />
                        <FormHelperText>Could be your start date of the company</FormHelperText>
                    </FormControl>
                    <FormControl>
                        <FormLabel>To Date</FormLabel>
                        <Input type='date' name='to' isDisabled={disableToDate || response.loading} value={to} onChange={(e) => onChange(e)} />
                        <FormHelperText>Could be your end date of the company</FormHelperText>
                        <Checkbox mt={2} onChange={(e) => handleCurrentJobChange(e)} isDisabled={response.loading}>Current Job</Checkbox>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Description</FormLabel>
                        <Textarea type='text' name='description' value={description} onChange={(e) => onChange(e)} isDisabled={response.loading} />
                        <FormHelperText>Tell us a little about your job and experience</FormHelperText>
                    </FormControl>
                </SimpleGrid>
                <Box display={"flex"} justifyContent={"flex-end"} gap={2} mb={3} mt={3}>
                    <Link to={"/dashboard"}><Button isDisabled={response.loading}>Back to Dashboard</Button></Link>
                    <Button colorScheme='blue' type='submit' isDisabled={response.loading}>Save</Button>
                </Box>
            </form>
        </Fragment>
    )
}
