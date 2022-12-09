import React, { Fragment, useState } from 'react'
import { Container, SimpleGrid, Text, FormControl, FormLabel, Input, FormHelperText, Checkbox, Textarea, Box, Button } from "@chakra-ui/react";
import { Link } from 'react-router-dom';
export default function AddExp() {
  const [disableToDate, setDisableToDate] = useState(false);
  const handleCurrentJobChange = (e) => {
    console.log(e.target.checked);
    setDisableToDate(e.target.checked);
  }
  return (
    <Fragment>
      <Container maxW={"7xl"} mt={4}>
        <Text fontSize={"3xl"} fontWeight={"bold"} mb={3}>Add Experience</Text>
        <SimpleGrid columns={{ base: 1, sm: 1, md: 2, lg: 2, xl: 2 }} spacing={5}>
          <FormControl isRequired>
            <FormLabel>Job Title</FormLabel>
            <Input type='text' name='title' />
            <FormHelperText>Could be the role you work for</FormHelperText>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Company</FormLabel>
            <Input type='text' name='company' />
            <FormHelperText>Could be your own company or one you work for</FormHelperText>
          </FormControl>
          <FormControl>
            <FormLabel>Location</FormLabel>
            <Input type='text' name='location' />
            <FormHelperText>Could be your company location</FormHelperText>
          </FormControl>
          <FormControl>
            <FormLabel>From Date</FormLabel>
            <Input type='date' name='from' />
            <FormHelperText>Could be your start date of the company</FormHelperText>
          </FormControl>
          <FormControl>
            <FormLabel>To Date</FormLabel>
            <Input type='date' name='to' isDisabled={disableToDate} />
            <FormHelperText>Could be your end date of the company</FormHelperText>
            <Checkbox mt={2} onChange={(e) => handleCurrentJobChange(e)}>Current Job</Checkbox>
          </FormControl>
          <FormControl>
            <FormLabel>Description</FormLabel>
            <Textarea type='text' name='to' />
            <FormHelperText>Tell us a little about your job and experience</FormHelperText>
          </FormControl>
        </SimpleGrid>
        <Box display={"flex"} justifyContent={"flex-end"} gap={2} mb={3} mt={3}>
          <Link to={"/dashboard"}><Button>Back to Dashboard</Button></Link>
          <Button colorScheme='blue' type='submit'>Save</Button>
        </Box>
      </Container>
    </Fragment>
  )
}
