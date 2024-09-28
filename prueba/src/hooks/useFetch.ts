// src/hooks/useFetch.js
import { useState, useEffect } from 'react';
export interface User {
  login: string
  id: number
  node_id: string
  avatar_url: string
  gravatar_id: string
  url: string
  html_url: string
  followers_url: string
  following_url: string
  gists_url: string
  starred_url: string
  subscriptions_url: string
  organizations_url: string
  repos_url: string
  events_url: string
  received_events_url: string
  type: string
  site_admin: boolean
  name: string
  company: string
  blog: string
  location: string
  email: any
  hireable: any
  bio: any
  twitter_username: string
  public_repos: number
  public_gists: number
  followers: number
  following: number
  created_at: string
  updated_at: string
}
interface UserListProps {
  users: User[];
}
const useFetch = (url:any) => {
  const [data, setData] = useState<UserListProps[]>([]); // Estado para los datos
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null); // Estado de error

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Iniciar la carga
        const response = await fetch(url); // Realizar la llamada HTTP
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`); // Manejar errores HTTP
        }
        const result = await response.json(); // Parsear la respuesta a JSON
        setData(result); // Guardar la data obtenida
      } catch (err:any) {
        setError(err?.message); // Manejar cualquier error
      } finally {
        setLoading(false); // Terminar la carga
      }
    };

    fetchData();
  }, [url]); // Ejecutar el efecto solo si la URL cambia

  return { data, loading, error }; // Retornar la data, el estado de carga y el error
};

export default useFetch;
