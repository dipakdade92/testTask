import { useEffect, useState } from "react";
import {
  Table,
  ScrollArea,
  Badge,
  useMantineTheme,
  Button,
  Pagination,
  Box,
} from "@mantine/core";
import { contactPageData } from "../../services/apis";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [companyData, setCompanyData] = useState([]);
  const [record, setRecord] = useState("");
  const [page, setPage] = useState(0);
  const theme = useMantineTheme();
  const navigate = useNavigate();

  const rows = companyData?.map((company, idx) => (
    <Table.Tr key={idx}>
      <Table.Td>{company.name || "-"}</Table.Td>
      <Table.Td>{company.ownerName || "-"}</Table.Td>
      <Table.Td>{company.email || "-"}</Table.Td>
      <Table.Td>{company.phone || "-"}</Table.Td>
      <Table.Td>{company.headOffice.address.cityName || "-"}</Table.Td>
      <Table.Td>{company.headOffice.address.country || "-"}</Table.Td>
      <Table.Td>{company.headOffice.address.addressLine || "-"}</Table.Td>

      <Table.Td>
        <Badge color={company.rating > 4.5 ? "green" : "yellow"}>
          {company.rating !== undefined ? company.rating : "N/A"}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Button
          onClick={() => navigate("/view-details", { state: { company } })}
          size="xs"
          variant="outline"
          color="green"
          style={{ marginRight: "10px" }}
        >
          View
        </Button>
        <Button
          onClick={() => navigate("/add-edit", { state: { company } })}
          size="xs"
          variant="outline"
          color="blue"
        >
          Edit
        </Button>
      </Table.Td>
    </Table.Tr>
  ));

  useEffect(() => {
    getCompanyData();
  }, [page]);

  const getCompanyData = async () => {
    let pageNumber;
    if (page === 0) {
      pageNumber = page;
    } else {
      pageNumber = page - 1;
    }
    try {
      const { data } = await contactPageData(pageNumber);
      setCompanyData(data.data);
      setRecord(data?.totalCount);
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

      <Box style={{margin: "40px", display: "flex", justifyContent: "center"}}>
        <Pagination
          page={page}
          onChange={setPage}
          total={Math.ceil(record / 20)}
          position="center"
          mt="md"
        />
      </Box>
    </ScrollArea>
  );
};

export default Home;
