import React from 'react';
import { Button, Input, Box, Link, Divider, Text, Center, Heading, Image } from '@chakra-ui/react';

import single from '../assets/images/singleline.svg';



function CreatePage() {
    return(
        <Center>
            <Center  flexDirection='column' height='95vh' width='fit-content'>
                <Box flex='0.2'>
                    <Image src={single} alt='Single' />
                </Box>
                <Heading size='2xl' flex='0.15'>
                    Create a Hideout
                </Heading>
                <Box maxWidth='55%' fontSize='1.2rem' textAlign='center' my='1rem'>
                    To continue, either create a hideout by choosing a name below or switch to joining an existing one.
                </Box>
                <Box>
                    <Input placeholder='Hideout name' mb='1rem' width="543px" />
                </Box>
                <Button
                    width='543px'
                    colorScheme="blue"
                    variant="solid"
                    backgroundColor="#1E82F8"
                    _hover={{ backgroundColor: "#1E68F8" }}
                    my='1rem'
                >
                    Create a Hideout
                </Button>
                <Divider my='1rem' maxWidth='55%' />
                <Text>
                    Already have a hideout?{' '}
                    <Link href='/onboard/join' color='#4299E1' fontWeight='bold'>
                        Join it here.
                    </Link>
                </Text>

            </Center>
        </Center>
    );
}

export default CreatePage;