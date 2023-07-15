import React, { useState } from 'react'
import { SimpleGrid, FormControl, FormLabel, Input, Select, FormHelperText, Textarea, Tag, InputGroup, InputLeftElement, Button, Box } from '@chakra-ui/react'
import { FaFacebookF, FaTwitter, FaYoutube, FaLinkedin, FaInstagram } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { editProfileAction } from "../../redux/actions/profileAction";
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import ServerErrorPage from '../../pages/Error/ServerErrorPage';

export default function EditProfileForm({ profileReducer }) {
    const dispatch = useDispatch();
    const { profile, isFormSubmitting, error } = profileReducer;
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


    useEffect(() => {
        setFormData({
            bio: profile?.bio,
            company: profile?.company,
            website: profile?.website,
            location: profile?.location,
            status: profile?.status,
            skills: profile?.skills?.join(", "),
            githubusername: profile?.githubusername,
            facebook: profile?.social?.facebook,
            twitter: profile?.social?.twitter,
            youtube: profile?.social?.youtube,
            linkedin: profile?.social?.linkedin,
            instagram: profile?.social?.instagram
        })
        // eslint-disable-next-line
    }, [])

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(editProfileAction(formData));
    }

    return (
        <>
        {
            error ? (
                <ServerErrorPage statusCode={500}/> 
            ) : (
            <form onSubmit={(e) => onSubmit(e)}>
                <SimpleGrid columns={{ base: 1, sm: 1, md: 1, lg: 1 }} >
                    <FormControl>
                        <FormLabel>Bio</FormLabel>
                        <Textarea type='text' name='bio' isDisabled={isFormSubmitting} value={bio || ""} onChange={(e) => onChange(e)} />
                        <FormHelperText>Tell us a little about yourself</FormHelperText>
                    </FormControl>
                </SimpleGrid>
                <SimpleGrid columns={{ base: 1, sm: 1, md: 2, lg: 2, xl: 2 }} spacing={5}>
                    <FormControl>
                        <FormLabel>Company</FormLabel>
                        <Input type='text' name='company' isDisabled={isFormSubmitting} value={company || ""} onChange={(e) => onChange(e)} />
                        <FormHelperText>Could be your own company or one you work for</FormHelperText>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Website</FormLabel>
                        <Input type='url' name='website' isDisabled={isFormSubmitting} value={website || ""} onChange={(e) => onChange(e)} />
                        <FormHelperText>Could be your own or a company website</FormHelperText>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Location</FormLabel>
                        <Input type='text' name='location' isDisabled={isFormSubmitting} value={location || ""} onChange={(e) => onChange(e)} />
                        <FormHelperText>City & state suggested (eg. Kolkata, WB, India)</FormHelperText>
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>professional Status</FormLabel>
                        <Select placeholder='Select option' name='status' isDisabled={isFormSubmitting} value={status || ""} onChange={(e) => onChange(e)} >
                        <option value='Student'>Student</option>
                            <option value='Intern'>Intern</option>
                            <option value='Software Engineer'>Software Engineer</option>
                            <option value='Analyst'>Analyst</option>
                            <option value='Instructor'>Instructor</option>
                            <option value='Manager'>Manager</option>
                            <option value='Other'>Other</option>
                        </Select>
                        <FormHelperText>Give us an idea of where your are at in your career</FormHelperText>
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Skills</FormLabel>
                        <Input type='text' name='skills' isDisabled={isFormSubmitting} value={skills || ""} onChange={(e) => onChange(e)} />
                        <FormHelperText>Please use comma separated values (eg. HTML,CSS,React,Node)</FormHelperText>
                    </FormControl>
                    <FormControl>
                        <FormLabel>GitHub Username</FormLabel>
                        <Input type='text' name='githubusername' isDisabled={isFormSubmitting} value={githubusername || ""} onChange={(e) => onChange(e)} />
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
                        <Input type='url' placeholder='Facebook URL' name='facebook' isDisabled={isFormSubmitting} value={facebook || ""} onChange={(e) => onChange(e)} />
                    </InputGroup>
                    <InputGroup>
                        <InputLeftElement
                            pointerEvents='none'
                            children={<FaTwitter color='gray.300' />}
                        />
                        <Input type='url' placeholder='Twitter URL' name='twitter' isDisabled={isFormSubmitting} value={twitter || ""} onChange={(e) => onChange(e)} />
                    </InputGroup>
                    <InputGroup>
                        <InputLeftElement
                            pointerEvents='none'
                            children={<FaYoutube color='gray.300' />}
                        />
                        <Input type='url' placeholder='YouTube URL' name='youtube' isDisabled={isFormSubmitting} value={youtube || ""} onChange={(e) => onChange(e)} />
                    </InputGroup>
                    <InputGroup>
                        <InputLeftElement
                            pointerEvents='none'
                            children={<FaLinkedin color='gray.300' />}
                        />
                        <Input type='url' placeholder='Linkedin URL' name='linkedin' isDisabled={isFormSubmitting} value={linkedin || ""} onChange={(e) => onChange(e)} />
                    </InputGroup>
                    <InputGroup>
                        <InputLeftElement
                            pointerEvents='none'
                            children={<FaInstagram color='gray.300' />}
                        />
                        <Input type='url' placeholder='Instagram URL' name='instagram' isDisabled={isFormSubmitting} value={instagram || ""} onChange={(e) => onChange(e)} />
                    </InputGroup>
                </SimpleGrid>
                <Box display={"flex"} justifyContent={"flex-end"} gap={2} mb={3}>
                    <Link to={"/dashboard"}><Button isDisabled={isFormSubmitting}>Back to Dashboard</Button></Link>
                    <Button colorScheme='blue' type='submit' isDisabled={isFormSubmitting}>Save</Button>
                </Box>
            </form>

            )
        }
        </>
    )
}
