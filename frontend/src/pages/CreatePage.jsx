import {
  Container,
  VStack,
  Heading,
  Box,
  useColorModeValue,
  Input,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useProductStore } from "../store/product";

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: 0,
    image: "",
  });

  const { createProduct } = useProductStore();
  const toast = useToast();
  const handleAddProduct = async () => {
    const { success, message } = await createProduct(newProduct);
    // console.log(`success: ${success}  message: ${message}`);
    setNewProduct({ name: "", price: 0, image: "" });
    if (!success) {
      return toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
    return toast({
      title: "Success",
      description: message,
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };
  return (
    <Container>
      <VStack spacing={0}>
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
          Create New Product
        </Heading>

        <Box
          w={"full"}
          bg={useColorModeValue("white", "gray.800")}
          p={6}
          rounded={"lg"}
          shadow={"md"}
        >
          <VStack spacing={4}>
            <Input
              placeholder="Product Name"
              name="name"
              value={newProduct.name}
              onChange={(element) =>
                setNewProduct({ ...newProduct, name: element.target.value })
              }
            />
            <Input
              type="number"
              placeholder="Product Price"
              name="price"
              value={newProduct.price || ""}
              onChange={(element) =>
                setNewProduct({ ...newProduct, price: element.target.value })
              }
            />
            <Input
              placeholder="Product Image URL"
              name="image"
              value={newProduct.image}
              onChange={(element) =>
                setNewProduct({ ...newProduct, image: element.target.value })
              }
            />
            <Button colorScheme="blue" onClick={handleAddProduct} w="full">
              Add Product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;
