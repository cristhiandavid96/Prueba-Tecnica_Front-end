// src/components/UserDetail.test.js
import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import UserDetail from "../components/table/UserDetail";

describe("UserDetail", () => {
  test("El componente se renderiza completamente", () => {
    // Mock de useParams y useLocation
    const mockParams = { userName: "testUser" };
    const mockLocation = {
      state: {
        avatar_url: "https://example.com/avatar.jpg",
        login: "testLogin",
        html_url: "https://github.com/testUser",
      },
    };

    // Renderizamos el componente con el MemoryRouter y la ruta especificada usando Routes
    const { getByText, getByAltText } = render(
      <MemoryRouter initialEntries={[{ pathname: "/user/testUser", state: mockLocation.state }]}>
        <Routes>
          <Route path="/user/:userName" element={<UserDetail />} />
        </Routes>
      </MemoryRouter>
    );

    // Verificar si los detalles del usuario están presentes
    expect(getByText("Datos del usuario")).toBeInTheDocument();
    expect(getByAltText("testLogin")).toHaveAttribute("src", "https://example.com/avatar.jpg");
    expect(getByText("Url github:")).toBeInTheDocument();
    expect(getByText("https://github.com/testUser")).toBeInTheDocument();
    expect(getByText("Usuario:")).toBeInTheDocument();
    expect(getByText("testUser")).toBeInTheDocument();
    expect(getByText("Regresar")).toBeInTheDocument();
  });
});
