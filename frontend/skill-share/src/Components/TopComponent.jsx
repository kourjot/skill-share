import { Avatar, Box, Button, Flex, Heading, HStack, Text, VStack,Image } from "@chakra-ui/react";
import { FaCog } from "react-icons/fa";

export default function Profile() {
  return (
    <Box bg="black" color="white" minH="100vh" p={5}>
      <Flex direction={{ base: "column", md: "row" }} align="center" gap={6}>
        {/* Profile Picture */}
        {/* <Avatar size="xl" name="Ritik Dethliya"></Avatar> */}
        <Box
  w="100px"
  h="100px"
  borderRadius="full"
  overflow="hidden"
  border="2px solid white"
>
  <Image
    src="https://via.placeholder.com/150"
    alt="Profile Picture"
    objectFit="cover"
    w="full"
    h="full"
  />
</Box>;
        
        {/* Profile Info */}
        <VStack align="start" spacing={2}>
          <HStack spacing={4}>
            <Heading size="md">_ritik_d</Heading>
            <Button size="sm" bg="gray.700" _hover={{ bg: "gray.600" }}>Edit profile</Button>
            <Button size="sm" bg="gray.700" _hover={{ bg: "gray.600" }}>View archive</Button>
            <FaCog size={18} />
          </HStack>

          {/* Stats */}
          <HStack spacing="xl">
            <Text><b>11</b> posts</Text>
            <Text><b>327</b> followers</Text>
            <Text><b>328</b> following</Text>
          </HStack>

          {/* Bio */}
          <VStack align="start" spacing={1}>
            <Text fontWeight="bold">ritik dethliya</Text>
            <Text>💤 स्वपिष्यामि यदा प्रियॆ</Text>
            <Text>🧡 सनातनी__</Text>
            <Text>💝 navodayan</Text>
            <Text>😊 गोलगप्पे</Text>
          </VStack>
        </VStack>
      </Flex>
    </Box>
  );
}
