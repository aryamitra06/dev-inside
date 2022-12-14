import React, {  useState } from 'react'
import { SimpleGrid, FormControl, FormLabel, Input, Select, FormHelperText, Textarea, Tag, InputGroup, InputLeftElement, Button, Box } from '@chakra-ui/react'
import { FaFacebookF, FaTwitter, FaYoutube, FaLinkedin, FaInstagram } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { editProfileAction } from "../redux/actions/profileAction";
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

export default function EditProfileForm({ profile }) {
    const dispatch = useDispatch();
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
            bio: profile.response?.bio,
            company: profile?.response?.company,
            website: profile?.response?.website,
            location: profile?.response?.location,
            status: profile?.response?.status,
            skills: profile?.response?.skills?.join(", "),
            githubusername: profile?.response?.githubusername,
            facebook: profile?.response?.social?.facebook,
            twitter: profile?.response?.social?.twitter,
            youtube: profile?.response?.social?.youtube,
            linkedin: profile?.response?.social?.linkedin,
            instagram: profile?.response?.social?.instagram
        })
        // eslint-disable-next-line
    }, [])

    const editProfileRes = useSelector((state) => state.editprofile);
    const { loading } = editProfileRes;

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(editProfileAction(formData));
    }

    return (
        <>
            <form onSubmit={(e) => onSubmit(e)}>
                <SimpleGrid columns={{ base: 1, sm: 1, md: 1, lg: 1 }} >
                    <FormControl>
                        <FormLabel>Bio</FormLabel>
                        <Textarea type='text' name='bio' isDisabled={loading} value={bio || ""} onChange={(e) => onChange(e)} />
                        <FormHelperText>Tell us a little about yourself</FormHelperText>
                    </FormControl>
                </SimpleGrid>
                <SimpleGrid columns={{ base: 1, sm: 1, md: 2, lg: 2, xl: 2 }} spacing={5}>
                    <FormControl>
                        <FormLabel>Company</FormLabel>
                        <Input type='text' name='company' isDisabled={loading} value={company || ""} onChange={(e) => onChange(e)} />
                        <FormHelperText>Could be your own company or one you work for</FormHelperText>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Website</FormLabel>
                        <Input type='url' name='website' isDisabled={loading} value={website || ""} onChange={(e) => onChange(e)} />
                        <FormHelperText>Could be your own or a company website</FormHelperText>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Location</FormLabel>
                        <Input type='text' name='location' isDisabled={loading} value={location || ""} onChange={(e) => onChange(e)} />
                        <FormHelperText>City & state suggested (eg. Kolkata, WB, India)</FormHelperText>
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>professional Status</FormLabel>
                        <Select placeholder='Select option' name='status' isDisabled={loading} value={status || ""} onChange={(e) => onChange(e)} >
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
                        <Input type='text' name='skills' isDisabled={loading} value={skills || ""} onChange={(e) => onChange(e)} />
                        <FormHelperText>Please use comma separated values (eg. HTML,CSS,React,Node)</FormHelperText>
                    </FormControl>
                    <FormControl>
                        <FormLabel>GitHub Username</FormLabel>
                        <Input type='text' name='githubusername' isDisabled={loading} value={githubusername || ""} onChange={(e) => onChange(e)} />
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
                        <Input type='url' placeholder='Facebook URL' name='facebook' isDisabled={loading} value={facebook || ""} onChange={(e) => onChange(e)} />
                    </InputGroup>
                    <InputGroup>
                        <InputLeftElement
                            pointerEvents='none'
                            children={<FaTwitter color='gray.300' />}
                        />
                        <Input type='url' placeholder='Twitter URL' name='twitter' isDisabled={loading} value={twitter || ""} onChange={(e) => onChange(e)} />
                    </InputGroup>
                    <InputGroup>
                        <InputLeftElement
                            pointerEvents='none'
                            children={<FaYoutube color='gray.300' />}
                        />
                        <Input type='url' placeholder='YouTube URL' name='youtube' isDisabled={loading} value={youtube || ""} onChange={(e) => onChange(e)} />
                    </InputGroup>
                    <InputGroup>
                        <InputLeftElement
                            pointerEvents='none'
                            children={<FaLinkedin color='gray.300' />}
                        />
                        <Input type='url' placeholder='Linkedin URL' name='linkedin' isDisabled={loading} value={linkedin || ""} onChange={(e) => onChange(e)} />
                    </InputGroup>
                    <InputGroup>
                        <InputLeftElement
                            pointerEvents='none'
                            children={<FaInstagram color='gray.300' />}
                        />
                        <Input type='url' placeholder='Instagram URL' name='instagram' isDisabled={loading} value={instagram || ""} onChange={(e) => onChange(e)} />
                    </InputGroup>
                </SimpleGrid>
                <Box display={"flex"} justifyContent={"flex-end"} gap={2} mb={3}>
                    <Link to={"/dashboard"}><Button isDisabled={loading}>Back to Dashboard</Button></Link>
                    <Button colorScheme='blue' type='submit' isDisabled={loading}>Save</Button>
                </Box>
            </form>
        </>
    )
}
