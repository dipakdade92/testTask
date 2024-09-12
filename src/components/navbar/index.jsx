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
        background: "linear-gradient(135deg, #0072ff, #00c6ff)",
        padding: theme.spacing.md,
        borderBottom: `1px solid ${theme.colors.gray[2]}`,
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Container style={{ maxWidth: "100%" }}>
        <Group position="apart" style={{ justifyContent: "space-between" }}>
          <Title order={3} style={{ color: "#fff" }}>
            Company Management
          </Title>
          <Group>
            <Button
              variant="filled"
              style={{
                backgroundColor: "#00c6ff",
                borderRadius: "12px",
                color: "#fff",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
              }}
              onClick={() => navigate("/add-edit")}
            >
              Add Company
            </Button>
            <Button
              variant="outline"
              style={{
                borderColor: "#ff4d4f",
                color: "#ff4d4f",
                borderRadius: "12px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
              }}
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
