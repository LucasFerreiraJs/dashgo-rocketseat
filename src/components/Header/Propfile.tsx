import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

interface IProfileProps {
  showProfileData?: boolean;


}



export default function Profile({ showProfileData = true }: IProfileProps) {

  return (
    <Flex align="center">
      {showProfileData && <Box mr="4" textAlign="right">
        <Text>Lucas Ferreira</Text>
        <Text color="gray.300" fontSize="small">casferreiraa@gmail.com</Text>
      </Box>}

      <Avatar size="md" name="Lucas Ferreira" src="https://github.com/thasuka.png" />
    </Flex>

  )


}