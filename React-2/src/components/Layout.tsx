import { Outlet } from "react-router-dom";
import { AppNavbar } from "./AppNavbar";
import { AppShell, Burger } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

export const Layout = () => {
  const [opened, { toggle }] = useDisclosure();
  return (
    <AppShell
      header={{ height: 90 }}
      navbar={{
        width: 0,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="sm"
    >
      <AppShell.Header bg={"lightgreen"}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            
          }}
        >
          <h1 style={{ margin: 0, marginTop: 10 }}>Flashcard Translator</h1>
        </div>
      </AppShell.Header>
      <AppShell.Main>
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "flex-start",
          }}
        >
          <AppNavbar />
        </div>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};
