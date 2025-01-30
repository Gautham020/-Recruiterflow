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
      <div className="p-6 bg-white rounded-lg shadow-lg border border-gray-300 max-w-md mx-auto text-center mt-5">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Create New Card
        </h2>
        <p className="text-gray-500 mb-6">Click below to add a new card.</p>
        <button
          onClick={handleAdd}
          className={`px-6 py-3 text-lg font-semibold rounded-lg shadow-md transition-all duration-300 ease-in-out ${
            loading
              ? "bg-blue-700 cursor-not-allowed"
              : "bg-[#77CDFF] hover:bg-blue-700 text-white"
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
