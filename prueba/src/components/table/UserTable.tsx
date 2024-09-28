// src/components/UserTable.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./UserTable.scss";
import "./SearchComponent.scss"; // Importamos el archivo de estilo en Sass
import { Bar } from 'react-chartjs-2'; // Importamos el gráfico de barras
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js'; // Registro de elementos de Chart.js

// Registrar elementos de Chart.js
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);
const UserTable = () => {
  const navigate = useNavigate();

  const handleImageClick = (name: any,user:any) => {
    navigate(`/user/${name}`, { state: user });
  };


  
  const [searchTerm, setSearchTerm] = useState(""); // Estado para el término de búsqueda
  const [users, setUsers] = useState([]); // Estado para almacenar los resultados de la búsqueda
  const [error, setError] = useState(""); // Estado para manejar errores o mensajes
  const [isValid, setIsValid] = useState(true); // Estado para manejar la validez del texto de búsqueda

  // Validación del texto de búsqueda
  const validateInput = (text: any) => {
    // Verificar longitud y palabra prohibida
    if (text.trim().length < 4) {
      setIsValid(false);
      setError("El término de búsqueda debe tener al menos 4 caracteres.");
    } else if (text.toLowerCase() === "iseijasunow") {
      setIsValid(false);
      setError('La palabra "iseijasunow" no está permitida para la búsqueda.');
    } else {
      setIsValid(true);
      setError("");
    }
  };
  // Configuración de datos para el gráfico de barras
  const chartData = {
    labels: users.slice(0, 10).map((user:any) => user.login), // Nombres de usuario
    datasets: [
      {
        label: 'Número de seguidores',
        data: users.slice(0, 10).map((user:any) => user?.followers_url.length), // Número de seguidores
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Función para manejar el cambio en el campo de texto
  const handleInputChange = (e: any) => {
    const value = e.target.value;
    setSearchTerm(value);
    validateInput(value);
  };

  useEffect(() => {
    query();
  }, []);

  const query = async (parameter?: string) => {
    const Url = parameter
      ? `https://api.github.com/search/users?q=${parameter}`
      : `https://api.github.com/users`;
    const response = await fetch(Url);
    const data = await response.json();
    setUsers((parameter ? data.items : data) || []); // Guardar los resultados de búsqueda
  };
  const handleSearch = async () => {
    if (!isValid) return;

    setUsers([]); // Limpiar los resultados anteriores
    setError(""); // Limpiar el mensaje de error
    try {
      query(searchTerm);
    } catch (err) {
      setError("Ocurrió un error al realizar la búsqueda. Intenta nuevamente.");
    }
  };

  console.log(users)
  return (
    <div className="user-table">
      <h2>Buscar Usuarios en GitHub</h2>
      {/* Campo de texto para la búsqueda */}
      <input
        type="text"
        placeholder="Ingresa el nombre de usuario"
        value={searchTerm}
        onChange={handleInputChange}
        className={`search-input ${!isValid ? "invalid" : ""}`} // Aplicar estilo condicional
      />
      {/* Botón para iniciar la búsqueda */}
      <button
        onClick={handleSearch}
        className="search-button"
        disabled={!isValid}
      >
        Buscar
      </button>

      {/* Mensaje de error si hay algún problema */}
      {error && <p className="error-message">{error}</p>}

      {/* Mostrar los resultados si existen */}
      <div className="results-table">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Login</th>
            <th>Profile</th>
            <th>Seguidores</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 &&
            users.slice(0, 10).map((user: any) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>
                  <a onClick={() => handleImageClick(user.login,user)}>
                    {user.login}
                  </a>
                </td>
                <td>
                  <img
                    src={user.avatar_url}
                    alt={user.login}
                    className="user-image"
                    onClick={() => handleImageClick(user.login,user)}
                  />
                </td>
                <td>{user.followers || 'N/A'}</td>
              </tr>
            ))}
        </tbody>
      </table>

      </div>
      
      {/* Gráfico de barras */}
      {users.length > 0 && (
        <div className="chart-container">
          <h3>Gráfico de Seguidores de los 10 Primeros Usuarios</h3>
          <Bar data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
      )}
    </div>
  );
};

export default UserTable;
