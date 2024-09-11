import { useEffect, useState } from "react";
import { Table, ScrollArea, Badge, useMantineTheme } from "@mantine/core";
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
      <Table.Td>
        <Badge color={company.rating > 4.5 ? "green" : "yellow"}>
          {company.rating !== undefined ? company.rating : "N/A"}
        </Badge>
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
            <Table.Th>Rating</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </ScrollArea>
  );
};

export default Home;
