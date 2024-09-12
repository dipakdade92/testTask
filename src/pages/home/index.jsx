import { useEffect, useState } from "react";
import {
  Table,
  ScrollArea,
  Badge,
  useMantineTheme,
  Button,
  Pagination,
  Box,
  Title,
  Divider,
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
    <Table.Tr
      key={idx}
      style={{
        backgroundColor: idx % 2 === 0 ? "#f0f4f8" : "#fff",
        transition: "all 0.3s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.1)";
        e.currentTarget.style.transform = "scale(1.01)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.transform = "scale(1)";
      }}
    >
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
          variant="gradient"
          gradient={{ from: "teal", to: "lime", deg: 105 }}
          style={{ marginRight: "10px", borderRadius: "10px" }}
        >
          View
        </Button>
        <Button
          onClick={() => navigate("/add-edit", { state: { company } })}
          size="xs"
          variant="gradient"
          gradient={{ from: "indigo", to: "cyan", deg: 120 }}
          style={{ borderRadius: "10px" }}
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
    <Box
      style={{
        padding: "30px",
        backgroundColor: theme.colors.gray[0],
        minHeight: "100vh",
      }}
    >
      <Title
        order={2}
        style={{
          textAlign: "center",
          marginBottom: "30px",
          fontFamily: "Montserrat, sans-serif",
        }}
      >
        Company List
      </Title>
      <Divider mb="lg" />
      <ScrollArea>
        <Table
          striped
          highlightOnHover
          withBorder
          horizontalSpacing="xl"
          verticalSpacing="md"
          fontSize="md"
          style={{
            minWidth: 700,
            borderRadius: "10px",
            border: `1px solid ${theme.colors.gray[3]}`,
            overflow: "hidden",
            boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#fff",
            [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
              fontSize: theme.fontSizes.sm,
            },
          }}
        >
          <Table.Thead
            tyle={{
              background: `linear-gradient(90deg, ${theme.colors.indigo[6]} 0%, ${theme.colors.blue[6]} 100%)`,
              color: "#fff",
            }}
          >
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

      <Box mt="xl" style={{ display: "flex", justifyContent: "center" }}>
        <Pagination
          page={page}
          onChange={setPage}
          total={Math.ceil(record / 20)}
          position="center"
          size="lg"
          withEdges
          styles={(theme) => ({
            item: {
              borderRadius: "50%",
              "&[data-active]": {
                backgroundColor: theme.colors.blue[6],
                color: "#fff",
              },
              "&:hover": {
                backgroundColor: theme.colors.gray[2],
              },
            },
          })}
        />
      </Box>
    </Box>
  );
};

export default Home;
