import React from "react";
import {
  Box,
  Text,
  Title,
  Group,
  Paper,
  Divider,
  Grid,
  Badge,
} from "@mantine/core";
import { useLocation } from "react-router-dom";
import {
  IconBuilding,
  IconUser,
  IconAt,
  IconPhone,
  IconMapPin,
  IconStar,
} from "@tabler/icons-react";

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
        background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)", // Match with the navbar gradient
        minHeight: "100vh",
      }}
    >
      <Paper
        shadow="xl"
        radius="md"
        p="lg"
        style={{
          width: "100%",
          maxWidth: 800,
          border: "1px solid #ddd",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(10px)",
          borderRadius: "16px",
        }}
      >
        <Title order={2} align="center" mb="lg" color="blue">
          Company Details
        </Title>
        <Divider mb="xl" />

        <Grid>
          <Grid.Col span={6}>
            <Group align="flex-start">
              <IconBuilding size={20} color="gray" />
              <div>
                <Text weight={500}>Company Name:</Text>
                <Text color="dimmed">{company.name || "-"}</Text>
              </div>
            </Group>
          </Grid.Col>

          <Grid.Col span={6}>
            <Group align="flex-start">
              <IconUser size={20} color="gray" />
              <div>
                <Text weight={500}>Owner Name:</Text>
                <Text color="dimmed">{company.ownerName || "-"}</Text>
              </div>
            </Group>
          </Grid.Col>

          <Grid.Col span={6}>
            <Group align="flex-start">
              <IconAt size={20} color="gray" />
              <div>
                <Text weight={500}>Email:</Text>
                <Text color="dimmed">{company.email || "-"}</Text>
              </div>
            </Group>
          </Grid.Col>

          <Grid.Col span={6}>
            <Group align="flex-start">
              <IconPhone size={20} color="gray" />
              <div>
                <Text weight={500}>Phone:</Text>
                <Text color="dimmed">{company.phone || "-"}</Text>
              </div>
            </Group>
          </Grid.Col>

          <Grid.Col span={6}>
            <Group align="flex-start">
              <IconMapPin size={20} color="gray" />
              <div>
                <Text weight={500}>City:</Text>
                <Text color="dimmed">
                  {company.headOffice?.address.cityName || "-"}
                </Text>
              </div>
            </Group>
          </Grid.Col>

          <Grid.Col span={6}>
            <Group align="flex-start">
              <IconMapPin size={20} color="gray" />
              <div>
                <Text weight={500}>Country:</Text>
                <Text color="dimmed">
                  {company.headOffice?.address.country || "-"}
                </Text>
              </div>
            </Group>
          </Grid.Col>

          <Grid.Col span={12}>
            <Group align="flex-start">
              <IconMapPin size={20} color="gray" />
              <div>
                <Text weight={500}>Address:</Text>
                <Text color="dimmed">
                  {company.headOffice?.address.addressLabel || "-"}
                </Text>
              </div>
            </Group>
          </Grid.Col>

          <Grid.Col span={6}>
            <Group align="flex-start">
              <IconStar size={20} color="gray" />
              <div>
                <Text weight={500}>Rating:</Text>
                <Badge
                  color={company.rating > 4.5 ? "green" : "yellow"}
                  size="lg"
                >
                  {company.rating !== undefined ? company.rating : "N/A"}
                </Badge>
              </div>
            </Group>
          </Grid.Col>
        </Grid>

        {/* Footer or Additional Details */}
        <Divider my="xl" />
        <Text align="center" size="sm" color="dimmed">
          Last updated: {new Date().toLocaleDateString()}
        </Text>
      </Paper>
    </Box>
  );
};

export default ViewCompany;
