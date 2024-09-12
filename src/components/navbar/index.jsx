import {
  Box,
  Button,
  Group,
  Title,
  Container,
  useMantineTheme,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const theme = useMantineTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <Box
      style={{
        backgroundColor: theme.colors.gray[0],
        padding: theme.spacing.md,
        borderBottom: `1px solid ${theme.colors.gray[2]}`,
        marginBottom: theme.spacing.lg,
      }}
    >
      <Container style={{ maxWidth: "100%" }}>
        <Group position="apart" style={{ justifyContent: "space-between" }}>
          <Title order={3}>Company Management</Title>
          <Group>
            <Button
              variant="filled"
              color="blue"
              onClick={() => navigate("/add-edit")}
            >
              Add Company
            </Button>
            <Button
              variant="outline"
              color="red"
              onClick={() => handleLogout()}
            >
              Logout
            </Button>
          </Group>
        </Group>
      </Container>
    </Box>
  );
};

export default Navbar;
