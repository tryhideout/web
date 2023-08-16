import React from 'react';
import { Button, Input, Box, Link, Divider, Text, Center, Heading, Image } from '@chakra-ui/react';

import single from '../assets/images/singleline.svg';



function JoinPage() {
    return(
        <Center>
            <Center  flexDirection='column' height='95vh' width='fit-content'>
                <Box flex='0.2'>
                    <Image src={single} alt='Single' />
                </Box>
                <Heading size='2xl' flex='0.15'>
                    Join a Hideout
                </Heading>
                <Box maxWidth='55%' fontSize='1.2rem' textAlign='center' my='1rem'>
                    To continue, either join a hideout by entering in the join code below or switch to  creating a new one.
                </Box>
                <Box>
                    <Input placeholder='Join code' mb='1rem' width="543px" />
                </Box>
                <Button
                    width='543px'
                    colorScheme="blue"
                    variant="solid"
                    backgroundColor="#1E82F8"
                    _hover={{ backgroundColor: "#1E68F8" }}
                    my='1rem'
                >
                    Join a Hideout
                </Button>
                <Divider my='1rem' maxWidth='55%' />
                <Text>
                    Don't have a hideout?{' '}
                    <Link href='/onboard/create' color='#4299E1' fontWeight='bold'>
                        Create one here.
                    </Link>
                </Text>

            </Center>
        </Center>
    );
}




export default JoinPage;

