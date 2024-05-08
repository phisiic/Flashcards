import React, { useContext } from "react";
import { AuthContext } from "../AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { NavLink } from "@mantine/core";
import { Tabs } from "@mantine/core";
import {
  IconSquareRoundedPlus,
  IconLayoutList,
  IconLogin2,
  IconUserPlus,
  IconHeart,
  IconKeyOff,
} from "@tabler/icons-react";

export const AppNavbar = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Tabs defaultValue="flashcard">
        <Tabs.List>
          {isLoggedIn && (
            <>
              <Tabs.Tab value="flashcard">
                <NavLink
                  onClick={() => navigate("flashcard/")}
                  label="Your Flashcards"
                  leftSection={<IconLayoutList size={24} />}
                />
              </Tabs.Tab>
              <Tabs.Tab value="flashcardnew">
                <NavLink
                  onClick={() => navigate("flashcard/new/")}
                  label="New Flashcard"
                  leftSection={<IconSquareRoundedPlus size={24} />}
                />
              </Tabs.Tab>
            </>
          )}
          <Tabs.Tab value="public">
            <NavLink
              onClick={() => navigate("flashcard/public/")}
              label="Public Flashcards"
              leftSection={<IconLayoutList size={24} />}
            />
          </Tabs.Tab>
          {isLoggedIn && (
            <Tabs.Tab value="public">
              <NavLink
                onClick={() => navigate("flashcard/saved/")}
                label="Saved Flashcards"
                leftSection={<IconHeart size={24} />}
              />
            </Tabs.Tab>
          )}

          {!isLoggedIn && (
            <>
              <Tabs.Tab value="login" color="green">
                <NavLink
                  onClick={() => navigate("login/")}
                  label="Login"
                  leftSection={<IconLogin2 size={24} />}
                />
              </Tabs.Tab>
              <Tabs.Tab value="register">
                <NavLink
                  onClick={() => navigate("register/")}
                  label="Register"
                  leftSection={<IconUserPlus size={24} />}
                />
              </Tabs.Tab>
            </>
          )}

          {isLoggedIn && (
            <Tabs.Tab value="Logout">
              <NavLink
                onClick={() => navigate("logout/")}
                label="Log out"
                leftSection={<IconKeyOff size={24} />}
              />
            </Tabs.Tab>
          )}
        </Tabs.List>
      </Tabs>
    </div>
  );
};
