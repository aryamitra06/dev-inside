import React, { Fragment, useState } from 'react'
import { SimpleGrid, FormControl, FormLabel, Input, Select, FormHelperText, Textarea, Tag, InputGroup, InputLeftElement, Button, Box } from '@chakra-ui/react'
import { FaFacebookF, FaTwitter, FaYoutube, FaLinkedin, FaInstagram } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { createProfileAction } from '../../redux/actions/profileAction';
import { useNavigate } from 'react-router-dom';

export default function CreateProfileForm({ profileReducer }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        company: "",
        website: "",
        location: "",
        status: "",
        skills: "",
        githubusername: "",
        bio: "",
        twitter: "",
        facebook: "",
        linkedin: "",
        youtube: "",
        instagram: ""
    });
    const {
        company,
        website,
        location,
        status,
        skills,
        githubusername,
        bio,
        twitter,
        facebook,
        linkedin,
        youtube,
        instagram
    } = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        await dispatch(createProfileAction(formData));
        await navigate("/dashboard");
    }

    const { isFormSubmitting } = profileReducer;

    return (
        <Fragment>
            <form onSubmit={(e) => onSubmit(e)}>
                <SimpleGrid columns={{ base: 1, sm: 1, md: 1, lg: 1, xl: 1 }} spacing={5} mb={3}>
                    <FormControl>
                        <FormLabel>Bio</FormLabel>
                        <Textarea type='text' name='bio' value={bio} onChange={(e) => onChange(e)} isDisabled={isFormSubmitting} />
                        <FormHelperText>Tell us a little about yourself</FormHelperText>
                    </FormControl>
                </SimpleGrid>
                <SimpleGrid columns={{ base: 1, sm: 1, md: 2, lg: 2, xl: 2 }} spacing={5}>
                    <FormControl>
                        <FormLabel>Company</FormLabel>
                        <Input type='text' name='company' value={company} onChange={(e) => onChange(e)} isDisabled={isFormSubmitting} />
                        <FormHelperText>Could be your own company or one you work for</FormHelperText>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Website</FormLabel>
                        <Input type='url' name='website' value={website} onChange={(e) => onChange(e)} isDisabled={isFormSubmitting} />
                        <FormHelperText>Could be your own or a company website</FormHelperText>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Location</FormLabel>
                        <Input type='text' name='location' value={location} onChange={(e) => onChange(e)} isDisabled={isFormSubmitting} />
                        <FormHelperText>City & state suggested (eg. Kolkata, WB, India)</FormHelperText>
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>professional Status</FormLabel>
                        <Select placeholder='Select option' name='status' value={status} onChange={(e) => onChange(e)} isDisabled={isFormSubmitting}>
                            <option value='Junior Software Developer'>Junior Software Developer</option>
                            <option value='Senior Software Developer'>Senior Software Developer</option>
                            <option value='Manager'>Manager</option>
                            <option value='Student'>Student</option>
                            <option value='Instructor'>Instructor</option>
                            <option value='Intern'>Intern</option>
                            <option value='Other'>Other</option>
                        </Select>
                        <FormHelperText>Give us an idea of where your are at in your career</FormHelperText>
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Skills</FormLabel>
                        <Input type='text' name='skills' value={skills} onChange={(e) => onChange(e)} isDisabled={isFormSubmitting} />
                        <FormHelperText>Please use comma separated values (eg. HTML,CSS,React,Node)</FormHelperText>
                    </FormControl>
                    <FormControl>
                        <FormLabel>GitHub Username</FormLabel>
                        <Input type='text' name='githubusername' value={githubusername} onChange={(e) => onChange(e)} isDisabled={isFormSubmitting} />
                        <FormHelperText>If you want your latest repos and a GitHub link, include your username</FormHelperText>
                    </FormControl>
                </SimpleGrid>
                <Tag mt={5} variant='subtle' colorScheme='cyan' size={"lg"} mb={4}>Add Social Links</Tag>
                <SimpleGrid columns={{ base: 2, sm: 2, md: 2, lg: 2, xl: 2 }} spacing={5} mb={3}>
                    <InputGroup>
                        <InputLeftElement
                            pointerEvents='none'
                            children={<FaFacebookF color='gray.300' />}
                        />
                        <Input type='url' placeholder='Facebook URL' name='facebook' value={facebook} onChange={(e) => onChange(e)} isDisabled={isFormSubmitting} />
                    </InputGroup>
                    <InputGroup>
                        <InputLeftElement
                            pointerEvents='none'
                            children={<FaTwitter color='gray.300' />}
                        />
                        <Input type='url' placeholder='Twitter URL' name='twitter' value={twitter} onChange={(e) => onChange(e)} isDisabled={isFormSubmitting} />
                    </InputGroup>
                    <InputGroup>
                        <InputLeftElement
                            pointerEvents='none'
                            children={<FaYoutube color='gray.300' />}
                        />
                        <Input type='url' placeholder='YouTube URL' name='youtube' value={youtube} onChange={(e) => onChange(e)} isDisabled={isFormSubmitting} />
                    </InputGroup>
                    <InputGroup>
                        <InputLeftElement
                            pointerEvents='none'
                            children={<FaLinkedin color='gray.300' />}
                        />
                        <Input type='url' placeholder='Linkedin URL' name='linkedin' value={linkedin} onChange={(e) => onChange(e)} isDisabled={isFormSubmitting} />
                    </InputGroup>
                    <InputGroup>
                        <InputLeftElement
                            pointerEvents='none'
                            children={<FaInstagram color='gray.300' />}
                        />
                        <Input type='url' placeholder='Instagram URL' name='instagram' value={instagram} onChange={(e) => onChange(e)} isDisabled={isFormSubmitting} />
                    </InputGroup>
                </SimpleGrid>
                <Box display={"flex"} justifyContent={"flex-end"} mb={3}>
                    <Button colorScheme='blue' type='submit' isDisabled={isFormSubmitting}>Create</Button>
                </Box>
            </form>
        </Fragment>
    )
}
