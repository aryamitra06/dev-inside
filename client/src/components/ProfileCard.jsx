import { Avatar, Box, Card, CardBody, Center, HStack, IconButton, SimpleGrid, Tag, Text, VStack } from '@chakra-ui/react';
import React, { Fragment } from 'react'
import moment from "moment";
import { MdCelebration } from "react-icons/md";
import { GoGlobe } from "react-icons/go";
import { BsTwitter, BsInstagram, BsFacebook, BsYoutube, BsLinkedin } from "react-icons/bs";

export default function ProfileCard({ data }) {

    const SocialHandles = () => (
        <Box>
            <HStack>
                {data?.website && <a href={data?.website} target="_blank" rel="noreferrer"><IconButton isRound><GoGlobe /></IconButton></a>}
                {data?.social?.linkedin && <a href={data?.social?.linkedin} target="_blank" rel="noreferrer"><IconButton isRound><BsLinkedin /></IconButton></a>}
                {data?.social?.twitter && <a href={data?.social?.twitter} target="_blank" rel="noreferrer"><IconButton isRound><BsTwitter /></IconButton></a>}
                {data?.social?.instagram && <a href={data?.social?.instagram} target="_blank" rel="noreferrer"><IconButton isRound><BsInstagram /></IconButton></a>}
                {data?.social?.facebook && <a href={data?.social?.facebook} target="_blank" rel="noreferrer"><IconButton isRound><BsFacebook /></IconButton></a>}
                {data?.social?.youtube && <a href={data?.social?.youtube} target="_blank" rel="noreferrer"><IconButton isRound><BsYoutube /></IconButton></a>}
            </HStack>
        </Box>
    )
    const BioSection = () => (
        <Card mt={3}>
            <CardBody>
                <Text
                    bgGradient='linear(to-l, #5433FF, #20BDFF)'
                    bgClip='text'
                    fontSize='2xl'
                    fontWeight='extrabold'
                >
                    Bio
                </Text>
                <Text>{data?.bio || <>Not available</>}</Text>
            </CardBody>
        </Card>
    )
    const SkillsSection = () => (
        <Card mt={3}>
            <CardBody>
                <Text
                    bgGradient='linear(to-l, #5433FF, #20BDFF)'
                    bgClip='text'
                    fontSize='2xl'
                    fontWeight='extrabold'
                    mb={2}
                >
                    Skills
                </Text>
                {
                    data?.skills?.map((e) => (
                        <Tag fontWeight={"bold"} m={1} key={e}>{e}</Tag>
                    )) || <>Not available</>
                }
            </CardBody>
        </Card>
    )
    const ExpSection = () => (
        <Card mt={3}>
            <CardBody>
                <Text
                    bgGradient='linear(to-l, #5433FF, #20BDFF)'
                    bgClip='text'
                    fontSize='2xl'
                    fontWeight='extrabold'
                >
                    Experience
                </Text>
                {
                    data?.experience?.map((e) => (
                        <Fragment key={e?._id}>
                            <Card mt={3} variant='outline' overflow='hidden'>
                                <CardBody>
                                    <Text fontWeight={"bold"} fontSize={"sm"}>{e?.company}</Text>
                                    <Text fontSize={"xs"} color={"gray.400"}>{e?.title} &bull; {moment(e?.from).format('MMMM Do YYYY')} - {e?.current === false ? moment(e?.to).format('MMMM Do YYYY') : <>Current</>}</Text>
                                    <Text fontSize={"xs"} color={"gray.400"}>{e?.location}</Text>
                                    <Text fontSize={"xs"} mt={2}>{e?.description}</Text>
                                </CardBody>
                            </Card>
                        </Fragment>
                    )) || <>Not available</>
                }
            </CardBody>
        </Card>
    )

    const EduCard = () => (
        <Card mt={3}>
            <CardBody>
                <Text
                    bgGradient='linear(to-l, #5433FF, #20BDFF)'
                    bgClip='text'
                    fontSize='2xl'
                    fontWeight='extrabold'
                >
                    Education
                </Text>
                {
                    data?.education?.map((e) => (
                        <Fragment key={e?._id}>
                            <Card mt={3} variant='outline' overflow='hidden'>
                                <CardBody>
                                    <Text fontWeight={"bold"} fontSize={"sm"}>{e?.school}</Text>
                                    <Text fontSize={"xs"} color={"gray.400"} fontWeight={"bold"}>{data?.fieldofstudy}</Text>
                                    <Text fontSize={"xs"} color={"gray.400"}>{e?.degree} &bull; {moment(e?.from).format('MMMM Do YYYY')} - {e?.current === false ? moment(e?.to).format('MMMM Do YYYY') : <>Current</>}</Text>
                                    <Text fontSize={"xs"} mt={2}>{e?.description}</Text>
                                </CardBody>
                            </Card>
                        </Fragment>
                    )) || <>Not available</>
                }
            </CardBody>
        </Card>
    )

    return (
        <Fragment>
            <Card>
                <CardBody bgGradient='linear(to-l, #5433FF, #20BDFF)' borderRadius={"lg"}>
                    <Center>
                        <VStack>
                            <Avatar src={data?.user?.avatar} size={"2xl"} className="avatar">
                            </Avatar>
                            <Text fontSize={"3xl"} fontWeight={"bold"} color={"white"}>{data?.user?.name}</Text>
                            <Tag size={"lg"} variant='subtle' colorScheme='cyan'>{data?.status} at {data?.company}</Tag>
                            <Text fontSize={"lg"} color={"gray.300"} display={"flex"} alignItems={"center"} gap={1}><MdCelebration /> Joined {moment(data?.date).format("MMM Do YY")}</Text>
                            <Text fontSize={"md"} color={"gray.300"}>{data?.location}</Text>
                            {SocialHandles()}
                        </VStack>
                    </Center>
                </CardBody>
            </Card>
            {BioSection()}
            {SkillsSection()}
            <SimpleGrid columns={{ base: 1, sm: 1, md: 2, lg: 2, xl: 2 }} spacing={3} mb={4}>
                {ExpSection()}
                {EduCard()}
            </SimpleGrid>
        </Fragment>
    )
}
