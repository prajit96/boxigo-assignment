import React from 'react';
import { Accordion, AccordionItem, AccordionButton, AccordionPanel, Box, Text, Flex, AccordionIcon } from '@chakra-ui/react';

const InventoryDetails = ({ data }) => {
  if (!data || !data.category || !Array.isArray(data.category)) {
    return <Text>No Inventory Details Available</Text>;
  }

  const category = data.category;

  const count = category.map((ele) => {
    return ele.items.reduce((acc, elem) => {
      return acc + Number(elem.qty);
    }, 0);
  });

  const total = count.reduce((acc, ele) => {
    return acc + ele;
  }, 0);

  return (
    <Accordion allowToggle>
      <AccordionItem>
        <AccordionButton>
          <Box flex="1" textAlign="left" fontWeight="bold">
            <Text color={'tomato'}>{data.displayName} <Box width="25px" height="25px" borderRadius="50%" color={'white'} backgroundColor="tomato">{total}</Box> </Text>
          </Box>
          {/* <Box>{total}</Box> */}
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel pb={4}>
          {total <= 0 ? (
            <Text>No Items in this Category</Text>
          ) : (
            <Box>
              {category.map((ele, i) => (
                count[i] !== 0 && (
                  <Box key={i} mb={4}>
                    <Text fontWeight="bold" mb={2}>{ele.displayName}</Text>
                    {ele.items.map((elem, index) => (
                      elem.qty >= 1 && (
                        <Flex key={index} mb={2}>
                          <Box>
                            <Text>{elem.displayName}</Text>

                            <Text>Q: {elem.qty}</Text>
                          </Box>
                          {elem.type.length > 0 ? (
                            elem.type
                              .filter(typeEle => typeEle.selected)
                              .map((typeEle, typeind) => (
                                <Text key={typeind} ml={4}> {typeEle.option}</Text>
                              ))
                          ) : (
                            <Text ml={4}></Text>
                          )}
                        </Flex>
                      )
                    ))}
                  </Box>
                )
              ))}
            </Box>
          )}
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default InventoryDetails;
