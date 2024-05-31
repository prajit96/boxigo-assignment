import React, { useEffect, useState } from 'react';
import { Accordion, Box, Button, Checkbox, Flex, Icon, Spinner, Text } from '@chakra-ui/react';
import { IoMdHome } from "react-icons/io";
import { FaCarSide } from "react-icons/fa";
import { GiPathDistance } from "react-icons/gi";
import { TiPencil } from "react-icons/ti";
import { TbInfoTriangle } from "react-icons/tb";
import { FaArrowRightLong } from "react-icons/fa6";
import InventoryDetails from './InventoryDetails';

const MyMoves = () => {
  const [moves, setMoves] = useState([]);
  const [expandedMove, setExpandedMove] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMoves = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/sample-data`);
        console.log(response);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setMoves(data.Customer_Estimate_Flow);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMoves();
  }, []);

  const handleToggle = (estimate_id) => {
    setExpandedMove(expandedMove === estimate_id ? null : estimate_id);
  };

  if (loading) {
    return (
      <Flex justifyContent="center" alignItems="center" height="100vh">
        <Spinner
          thickness='4px'
          speed='0.65s'
          emptyColor='gray.200'
          color='tomato'
          size='xl'
        />
      </Flex>
    );
  }

  if (error) {
    return (
      <Flex justifyContent="center" alignItems="center" height="100vh">
        <Text>{error}</Text>
      </Flex>
    );
  }

  return (
    <Box p="4">
      <Text fontWeight="bold" fontSize="xl" mb="4">My Moves</Text>
      {moves.map(move => (
        <Box key={move.estimate_id} p="4" shadow="md" borderWidth="1px" mb="4">
          <Flex alignItems="center" mb="2" flexWrap="wrap">
            <Text fontWeight="bold" fontSize="sm">From: </Text>
            <Text fontSize="sm" ml='2'>{move.moving_from}</Text>
            <Icon as={FaArrowRightLong} ml="2" mr="2" size={30} color={'tomato'} />
            <Text fontWeight="bold" fontSize="sm">To: </Text>
            <Text fontSize="sm" ml='2'>{move.moving_to}</Text>
            <Text fontWeight="bold" fontSize="sm" ml={{ base: 0, md: 8 }} mt={{ base: 2, md: 0 }}>Request#: </Text>
            <Text color={'tomato'} ml={{ base: 0, md: 2 }} mt={{ base: 2, md: 0 }}>{move.estimate_id}</Text>
          </Flex>
          <Flex mb="2" flexWrap="wrap">
            <Flex alignItems="center" mb={{ base: 2, md: 0 }}>
              <Icon as={IoMdHome} ml="2" mr="2" size={24} color={'tomato'} />
              <Text>{move.property_size}</Text>
            </Flex>
            <Flex alignItems="center" mb={{ base: 2, md: 0 }} ml={{ base: 0, md: 6 }}>
              <Icon as={GiPathDistance} ml="2" mr="2" size={24} color={'tomato'} />
              <Text>{move.distance}</Text>
            </Flex>
            <Flex alignItems="center" mb={{ base: 2, md: 0 }} ml={{ base: 0, md: 6 }}>
              <Icon as={FaCarSide} ml="2" mr="2" size={24} color={'tomato'} />
              <Text>{move.moving_on}</Text>
            </Flex>
            <Flex alignItems="center" ml={{ base: 0, md: 6 }}>
              <Icon as={TiPencil} size={24} />
              <Checkbox colorScheme='red' defaultChecked ml="2">is flexible</Checkbox>
            </Flex>
          </Flex>
          <Flex mb="4" flexWrap="wrap">
            <Button color={'tomato'} borderColor="tomato" variant="outline" onClick={() => handleToggle(move.estimate_id)} mb={{ base: 2, md: 0 }}>
              {expandedMove === move.estimate_id ? 'Hide Details' : 'View move details'}
            </Button>
            <Button backgroundColor={'tomato'} color={'white'} ml={{ base: 0, md: 2 }} mb={{ base: 2, md: 0 }}>
              Quotes Awaiting
            </Button>
          </Flex>
          <Flex mt="2" fontSize="sm" color="gray.500" alignItems="center" flexWrap="wrap">
            <Icon as={TbInfoTriangle} mr="2" size={24} color={'tomato'} />
            <Text fontWeight="bold">Disclaimer: </Text>
            <Text ml="2">Please update your move date before two days of shifting</Text>
          </Flex>
          {expandedMove === move.estimate_id && (
            <Box mb="4" mt={10}>
              <Flex justifyContent={'space-between'} flexWrap="wrap">
                <Text fontWeight="bold" mb="2" mt={2}>Additional Information</Text>
                <Button color="tomato" borderColor="tomato" variant="outline">Edit Additional Info</Button>
              </Flex>
              <Text fontSize="sm">Test Data</Text>
              <Flex justifyContent={'space-between'} flexWrap="wrap">
                <Text fontWeight="bold" mt={4}>House Details</Text>
                <Button color="tomato" borderColor="tomato" variant="outline" mt={4}>Edit House Details</Button>
              </Flex>
              <Text mt={4} color={'tomato'} fontWeight="bold">Existing House Details</Text>
              <Flex justifyContent={'space-between'} fontWeight="bold" flexWrap="wrap">
                <Text>Floor No. </Text>
                <Text mr={8}>Elevator Available: </Text>
                <Text mr={60}>Distance from Elevator / Staircase to truck: </Text>
              </Flex>
              <Flex justifyContent={'space-between'} flexWrap="wrap">
                <Text>{move.old_floor_no}</Text>
                <Text mr={60}>{move.old_elevator_availability}</Text>
                <Text mr={80}>{move.new_parking_distance}</Text>
              </Flex>
              <Text mt={4} color={'tomato'} fontWeight="bold">New House Details</Text>
              <Flex justifyContent={'space-between'} fontWeight="bold" flexWrap="wrap">
                <Text>Floor No. </Text>
                <Text mr={8}>Elevator Available: </Text>
                <Text mr={60}>Distance from Elevator / Staircase to truck: </Text>
              </Flex>
              <Flex justifyContent={'space-between'} flexWrap="wrap">
                <Text>{move.new_floor_no}</Text>
                <Text mr={60}>{move.new_elevator_availability}</Text>
                <Text mr={80}>{move.new_parking_distance}</Text>
              </Flex>
              <Flex justifyContent={'space-between'} flexWrap="wrap">
                <Text fontWeight="bold" mb="2" mt={4}>Inventory Details</Text>
                <Button color="tomato" borderColor="tomato" variant="outline" mt="3" ml="2">Edit Inventory</Button>
              </Flex>
              <Box mt="4">
                <Accordion allowToggle>
                  {move.items.inventory.map(item => (
                    <InventoryDetails key={item.id} data={item} />
                  ))}
                </Accordion>
              </Box>
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default MyMoves;