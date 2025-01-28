import React, { useEffect, useState } from "react";
import Header from "../Component/Header";
import Card from "../Component/Card";
import { fetchCards, addCard as AddCards, deleteCard } from "../api/cardsApi";

function Index() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch card detailes
  useEffect(() => {
    const getCards = async () => {
      const data = await fetchCards();
      setCards(data);
    };
    getCards();
  }, []);

  // Adding new card
  const handleAdd = async () => {
    const newId =
      cards.length > 0 ? Math.max(...cards.map((card) => card.id)) + 1 : 1;
    const newCard = {
      id: newId,
      title: `Card ${newId}`,
      body: "New card",
    };

    setLoading(true);
    try {
      const response = await AddCards(newCard);
      console.log("Response from AddCards:", response.data);

      const addedCard = response.data || newCard;

      setCards((prevCards) => [...prevCards, addedCard]);
    } catch (error) {
      console.error("Error adding card:", error);
    } finally {
      setLoading(false);
    }
  };

  // Deleting a card
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

      <div className="p-6 bg-gray-100 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Add New Card</h2>
        <button
          onClick={handleAdd}
          className={`px-4 py-2 rounded ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Card"}
        </button>
      </div>

      <main className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.length > 0 ? (
          cards.map((card) => (
            <Card
              key={card.id}
              id={card.id}
              title={card.title}
              description={card.body}
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
