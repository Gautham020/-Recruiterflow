import React, { useEffect, useState } from "react";
import Header from "../Component/Header";
import Card from "../Component/Card";
import { fetchCards, addCard as AddCards, deleteCard } from "../api/cardsApi";

function Index() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch cards on initial load
  useEffect(() => {
    const getCards = async () => {
      const data = await fetchCards();
      setCards(data);
    };
    getCards();
  }, []);

  // Add a new card with a unique ID
  const handleAdd = async () => {
    const newId = cards.length > 0 ? Math.max(...cards.map((card) => card.id)) + 1 : 1;
    const newCard = { id: newId, title: `Card ${newId}`, description: "New card" };
  
    setLoading(true);
    try {
      // Send the new card to the API
      const response = await AddCards(newCard);
      console.log("Response from AddCards:", response.data);

  
      // Use the response data or fallback to the newCard object if necessary
      const addedCard = response.data || newCard;
  
      // Update the cards state
      setCards((prevCards) => [...prevCards, addedCard]);
    } catch (error) {
      console.error("Error adding card:", error);
    } finally {
      setLoading(false);
    }
  };
  

  // Delete a card
  const handleDeleteCard = async (id) => {
    try {
      const success = await deleteCard(id);
      if (success) {
        setCards((prevCards) => prevCards.filter((card) => card.id !== id));
      }
    } catch (error) {
      console.error("Error deleting card:", error);
    }
  };

  return (
    <div className="App">
      <Header />

      {/* Add New Card Button */}
      <div className="p-6 bg-gray-100 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Add New Card</h2>
        <button
          onClick={handleAdd}
          className={`px-4 py-2 rounded ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Card"}
        </button>
      </div>

      {/* Display Cards */}
      <main className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.length > 0 ? (
          cards.map((card) => (
            <Card
              key={card.id}
              id={card.id}
              title={card.title}
              description={card.description}
              onDelete={() => handleDeleteCard(card.id)}
            />
          ))
        ) : (
          <p>No cards available</p>
        )}
      </main>
    </div>
  );
}

export default Index;
