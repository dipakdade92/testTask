import React from "react";
import { Box, Text, Title, Group, Paper } from "@mantine/core";
import { useLocation } from "react-router-dom";

const ViewCompany = () => {
  const location = useLocation();
  const company = location.state?.company;

  if (!company) {
    return <div>No company data available</div>;
  }

  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <Paper
        shadow="md"
        radius="md"
        p="lg"
        style={{
          width: "100%",
          maxWidth: 800,
          border: "1px solid #ddd",
          padding: "20px",
        }}
      >
        <Title order={2} mb="lg">
          Company Details
        </Title>
        <Group position="apart">
          <Text weight={500}>Company Name:</Text>
          <Text>{company.name || "-"}</Text>
        </Group>
        <Group position="apart" mt="sm">
          <Text weight={500}>Owner Name:</Text>
          <Text>{company.ownerName || "-"}</Text>
        </Group>
        <Group position="apart" mt="sm">
          <Text weight={500}>Email:</Text>
          <Text>{company.email || "-"}</Text>
        </Group>
        <Group position="apart" mt="sm">
          <Text weight={500}>Phone:</Text>
          <Text>{company.phone || "-"}</Text>
        </Group>
        <Group position="apart" mt="sm">
          <Text weight={500}>City:</Text>
          <Text>{company.headOffice?.address.cityName || "-"}</Text>
        </Group>
        <Group position="apart" mt="sm">
          <Text weight={500}>Country:</Text>
          <Text>{company.headOffice?.address.country || "-"}</Text>
        </Group>
        <Group position="apart" mt="sm">
          <Text weight={500}>Address:</Text>
          <Text>{company.headOffice?.address.addressLabel || "-"}</Text>
        </Group>
        <Group position="apart" mt="sm">
          <Text weight={500}>Rating:</Text>
          <Text>{company.rating !== undefined ? company.rating : "N/A"}</Text>
        </Group>
      </Paper>
    </Box>
  );
};

export default ViewCompany;
