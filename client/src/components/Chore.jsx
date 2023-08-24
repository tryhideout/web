import React  from 'react'
import  {AsyncCreatableSelect,AsyncSelect, CreatableSelect, Select,} from "chakra-react-select";
import { FormControl, Button, Input, Box, Link, Divider, Text, Center, Heading, Image } from '@chakra-ui/react';


export default function Chore() {

    return (
        <Box>  
        <Select
        colorScheme="purple"
        options={[
          {
            label: "I am red",
            value: "i-am-red",
            colorScheme: "red", // The option color scheme overrides the global
          },
          {
            label: "I fallback to purple",
            value: "i-am-purple",
          },
        ]}
        />       <Text>hello</Text>
        </Box>
      )
}
