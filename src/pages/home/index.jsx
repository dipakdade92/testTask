import { useEffect, useState } from "react";
import { Table, ScrollArea, Badge, useMantineTheme, Button } from "@mantine/core";
import { ContactPageData } from "../../services/apis";

const Home = () => {
  const [companyData, setCompanyData] = useState([]);
  const theme = useMantineTheme();

  const rows = companyData?.map((company, idx) => (
    <Table.Tr key={idx}>
      <Table.Td>{company.name || "-"}</Table.Td>
      <Table.Td>{company.ownerName || "-"}</Table.Td>
      <Table.Td>{company.email || "-"}</Table.Td>
      <Table.Td>{company.phone || "-"}</Table.Td>
      <Table.Td>{company.headOffice.address.cityName || "-"}</Table.Td>
      <Table.Td>{company.headOffice.address.country || "-"}</Table.Td>
      <Table.Td>{company.headOffice.address.addressLabel || "-"}</Table.Td>

      <Table.Td>
        <Badge color={company.rating > 4.5 ? "green" : "yellow"}>
          {company.rating !== undefined ? company.rating : "N/A"}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Button
        //   onClick={() => handleAdd()}
          size="xs"
          variant="outline"
          color="blue"
          style={{ marginRight: "10px" }}
        >
          Add
        </Button>
        <Button
        //   onClick={() => handleDelete()}
          size="xs"
          variant="outline"
          color="red"
        >
          Delete
        </Button>
      </Table.Td>
    </Table.Tr>
  ));

  useEffect(() => {
    getCompanyData();
  }, []);

  // Fetch company data from the API
  const getCompanyData = async () => {
    try {
      const { data } = await ContactPageData();
      setCompanyData(data.data);
    } catch (error) {
      console.log("Error fetching company data:", error);
    }
  };

  return (
    <ScrollArea>
      <Table
        striped
        highlightOnHover
        withBorder
        horizontalSpacing="lg"
        verticalSpacing="sm"
        fontSize="md"
        sx={{
          minWidth: 500,
          [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
            fontSize: theme.fontSizes.sm,
          },
        }}
      >
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Company name</Table.Th>
            <Table.Th>Owner name</Table.Th>
            <Table.Th>Email</Table.Th>
            <Table.Th>Phone</Table.Th>
            <Table.Th>City</Table.Th>
            <Table.Th>Country</Table.Th>
            <Table.Th>Address</Table.Th>
            <Table.Th>Rating</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </ScrollArea>
  );
};

export default Home;
