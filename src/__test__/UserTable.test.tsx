// src/components/UserTable.test.js
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import UserTable from "../components/table/UserTable";


afterAll(() => {
  jest.restoreAllMocks(); // Restaurar los mocks después de todas las pruebas
});

describe("UserTable Component", () => {
  
  test("renders the component and handles search input", () => {
    render(
      <MemoryRouter>
        <UserTable />
      </MemoryRouter>
    );

    // Verificar que el campo de búsqueda esté en el documento
    expect(screen.getByPlaceholderText("Ingresa el nombre de usuario")).toBeInTheDocument();

    // Simular entrada de texto
    const searchInput = screen.getByPlaceholderText("Ingresa el nombre de usuario");
    fireEvent.change(searchInput, { target: { value: "test" } });

    // Simular un término de búsqueda no válido
    fireEvent.change(searchInput, { target: { value: "abc" } });
    expect(screen.getByText("El término de búsqueda debe tener al menos 4 caracteres.")).toBeInTheDocument();

    // Simular un término prohibido
    fireEvent.change(searchInput, { target: { value: "iseijasunow" } });
    expect(screen.getByText('La palabra "iseijasunow" no está permitida para la búsqueda.')).toBeInTheDocument();
  });

  test("fetches and displays users correctly on initial load", async () => {
    render(
      <MemoryRouter>
        <UserTable />
      </MemoryRouter>
    );

    // Esperar a que los usuarios se carguen y se muestren en la tabla
    expect(await screen.findByText("mojombo")).toBeInTheDocument();
    expect(await screen.findByText("defunkt")).toBeInTheDocument();

    // Verificar que las imágenes de los usuarios se muestren correctamente
    const user1Image = screen.getByAltText("mojombo");
    const user2Image = screen.getByAltText("defunkt");

    expect(user1Image).toHaveAttribute("src", "https://avatars.githubusercontent.com/u/1?v=4");
    expect(user2Image).toHaveAttribute("src", "https://avatars.githubusercontent.com/u/2?v=4");
  });


  test("disables search button when search term is invalid", () => {
    render(
      <MemoryRouter>
        <UserTable />
      </MemoryRouter>
    );

    // Simular entrada de texto no válido
    const searchInput = screen.getByPlaceholderText("Ingresa el nombre de usuario");
    const searchButton = screen.getByText("Buscar");

    fireEvent.change(searchInput, { target: { value: "abc" } });
    expect(searchButton).toBeDisabled(); // El botón debería estar deshabilitado
  });

  test("enables search button when search term is valid", () => {
    render(
      <MemoryRouter>
        <UserTable />
      </MemoryRouter>
    );

    // Simular entrada de texto válido
    const searchInput = screen.getByPlaceholderText("Ingresa el nombre de usuario");
    const searchButton = screen.getByText("Buscar");

    fireEvent.change(searchInput, { target: { value: "validUser" } });
    expect(searchButton).toBeEnabled(); // El botón debería estar habilitado
  });
});
