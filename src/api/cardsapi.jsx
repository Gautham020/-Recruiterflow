import axios from "axios";

// Api
const API_BASE_URL = "https://jsonplaceholder.typicode.com/posts";

// Fetching All Cards
export const fetchCards = async () => {
  const response = await axios.get(API_BASE_URL);
  return response.data.slice(0, 5); 
};

// Adding New Cards
export const addCard = async (newCard) => {
  const response = await axios.post(API_BASE_URL, newCard);
  return response.data; 
};

// Deleting Cards
export const deleteCard = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/${id}`);
  return response.status === 200; 
};
