import React from 'react';
import { Center, Box, Heading, Image, Input, Button } from '@chakra-ui/react'; // Assuming you're using Chakra UI components
import double from '../assets/images/doubleline.svg';


function InvitePage() {
    return (
        <Center mt="-3rem"> 
            <Center flexDirection='column' height='95vh' width='fit-content'>
                <Box flex='0.2'>
                    <Image src={double} alt='Double' />
                </Box>
                <Heading size='2xl' flex='0.15'>
                    Invite your friends
                </Heading>
                <Box maxWidth='55%' fontSize='1.2rem' textAlign='center' my='0.5rem'>
                    Let's invite some of your friends to <span style={{ fontWeight: 'bold' }}>{"347 Grace Street."}</span> Give the below join code to your friends.
                </Box>
                <Box>
                    <Input
                        placeholder='JD68N912K'
                        mb='0.5rem'
                        width="543px"
                        textAlign="center"
                    />
                </Box>
                <Button
                    width='543px'
                    colorScheme="blue"
                    variant="solid"
                    backgroundColor="#1E82F8"
                    _hover={{ backgroundColor: "#1E68F8" }}
                    my='0.5rem'
                >
                    Send Invitation
                </Button>
            </Center>
        </Center>
    );
}


export default InvitePage;





