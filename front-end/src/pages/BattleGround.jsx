import { useState, useEffect } from "react";
import "./styles.css";
import { fetchBattleDeck } from "../../node-api/server-api";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";


function BattleGround() {
  const [selectedCardPlayer1, setSelectedCardPlayer1] = useState(null);
  const [selectedCardPlayer2, setSelectedCardPlayer2] = useState(null);
  const [title, setTitle] = useState("Start Battle🔥");
  const [titleClass, setTitleClass] = useState("");
  const [isBattleStarted, setIsBattleStarted] = useState(false);
  const [winner, setWinner] = useState(null);
  const [scorePlayer1, setScorePlayer1] = useState(0);
  const [scorePlayer2, setScorePlayer2] = useState(0);
  const [battlesCount, setBattlesCount] = useState(0);

  const fight = new Audio("/fight.mp3");
  const cardAudio = new Audio("/card.mp3");
  const roundWinAudio = new Audio("/win2.mp3");
  const winnerAudio = new Audio("/winner.mp3");
  const [queryParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (isBattleStarted && selectedCardPlayer1 && selectedCardPlayer2) {
      compareCards();
    }
  }, [isBattleStarted, selectedCardPlayer1, selectedCardPlayer2]);

  const [battleDeck1, setBattleDeck1] = useState([]);
  const [battleDeck2, setBattleDeck2] = useState([]);

  const getBattleDeck = async () => {
    const resp1 = await fetchBattleDeck();
    setBattleDeck1(resp1.data.battleDeck);
    const resp2 = await fetchBattleDeck(queryParams.get("opponent"));
    setBattleDeck2(resp2.data.battleDeck);
  };

  useEffect(() => {
    getBattleDeck();
  }, []);

  const handleCardClick = (card, player) => {
    if (isBattleStarted) {
      if (player === 1) {
        cardAudio.play();
        setSelectedCardPlayer1(card);
        const opponentCard =
          battleDeck2[Math.floor(Math.random() * battleDeck2.length)];
        cardAudio.play();
        setSelectedCardPlayer2(opponentCard);
      }
    } else {
      toast.error("Start the battle first!");
    }
  };

  const compareCards = () => {
    if (selectedCardPlayer1 && selectedCardPlayer2) {
      const player1Value = selectedCardPlayer1[title.toLowerCase()];
      const player2Value = selectedCardPlayer2[title.toLowerCase()];

      if (player1Value > player2Value) {
        roundWinAudio.play();
        setWinner(1);
        setScorePlayer1(scorePlayer1 + 1);
        toast.success("You won the battle!");
      } else if (player1Value < player2Value) {
        setWinner(2);
        setScorePlayer2(scorePlayer2 + 1);
        toast.error("You lost the battle!");
      } else {
        setWinner("draw");
        toast.success("The battle is a draw!");
      }

      setBattlesCount(battlesCount + 1);
      if (battlesCount + 1 === 3) {
        setTimeout(determineFinalWinner, 500);
      } else {
        endGame();
      }
    }
  };

  useEffect(() => {
    if (battlesCount === 3) {
      determineFinalWinner();
    }
  }, [battlesCount]);

  const determineFinalWinner = () => {
    if (scorePlayer1 > scorePlayer2) {
      toast.success("🏆 You WON the battle 🏆");
    } else if (scorePlayer1 < scorePlayer2) {
      toast.error("💔 You LOST the batlle 💔");
    } else {
      toast("🏳️ The final battle is a draw! 🏳️");
    }

    setTimeout(() => {
      navigate("/mappage");
    }, 2000);
  };

  const endGame = () => {
    setTitle("Rebattle");
    setIsBattleStarted(false);

    setTimeout(() => {
      setTitleClass("");
    }, 500);
  };

  const startBattle = () => {
    if (battlesCount < 3) {
      setSelectedCardPlayer1(null);
      setSelectedCardPlayer2(null);

      fight.play();
      const titles = ["stamina", "power", "speed", "hp"];
      const randomTitle =
        titles[Math.floor(Math.random() * titles.length)].toUpperCase();
      setTitle(randomTitle);
      setTitleClass("title-reveal");
      setIsBattleStarted(true);
      setWinner(null);

      setTimeout(() => {
        setTitleClass("");
      }, 500);
    } else {
      toast.error("You've reached the maximum number of battles!");
    }
  };

  const Card = ({ card, player }) => (
    <div
      className="mt-8 flex flex-col items-center relative cursor-pointer hover:scale-105 duration-300 transition-transform"
      style={{ width: "auto", height: "20%" }}
      onClick={() => handleCardClick(card, player)}
    >
      <img
        src={card.src}
        alt={card.name}
        className="w-full h-full object-cover rounded-xl border-[7px] border-double border-amber-400 shadow-2xl shadow-yellow-500"
      />
      <div className="text-sm bg-white rounded-full px-1 py-1">
        (🏃‍♂️{card.stamina}|💪{card.power}|🐎{card.hp}|🚅{card.speed})
      </div>
    </div>
  );

  const Card2 = ({ card, isWinner }) => (
    <div
      className={`mt-8 flex flex-col items-center relative border-[10px] ${
        isWinner === 1
          ? "border-green-500"
          : isWinner === 2
          ? "border-red-500"
          : isWinner === "draw"
          ? "border-gray-500"
          : "border-transparent"
      }`}
      style={{ width: "auto", height: "40%" }}
    >
      <img
        src={card.src || card.cardImgUrl}
        alt={card.name}
        className="w-full h-full object-cover"
      />
      <div className="w-full card-details bg-opacity-80 text-center py-2 border-t-2 border-black font-bold">
        <h3 className="text-[1em] mb-1">{card.name}</h3>
        <p className="text-[0.9em] mb-1">Level📈: {card.level}</p>
        <p className="text-[0.9em] mb-1">Power💪: {card.power}</p>
        <p className="text-[0.9em] mb-1">Speed🚅: {card.speed}</p>
        <p className="text-[0.9em] mb-1">Stamina🏃: {card.stamina}</p>
        <p className="text-[0.9em] mb-1">HP🐎: {card.hp}</p>
      </div>
    </div>
  );

  return (
    <div className="battleground w-[100vw] h-[100vh]">
   
      <div className="w-[100vw] h-[100vh] flex justify-between">
        <div className="first_player w-[50%] h-[100vh] flex flex-row items-center justify-between">
          <div className="card-area w-[33%] h-[100vh] flex flex-col justify-evenly p-4 py-10 items-center">
            <h3 className="text-[2vw] underline">
              Player 1<p className="text-lg font-bold no-underline">(You)</p>
            </h3>
            {battleDeck1.map((card) => (
              <Card
                key={card._id}
                card={{
                  src: card.cardImgUrl,
                  name: card.name,
                  power: card.power,
                  speed: card.speed,
                  stamina: card.stamina,
                  level: card.level,
                  hp: card.hp,
                }}
                player={1}
              />
            ))}
          </div>

          <div className="playing_card w-[75%] h-[100vh] flex justify-center items-center">
            {selectedCardPlayer1 && (
              <Card2
                card={selectedCardPlayer1}
                isWinner={winner === 1 ? 1 : winner === "draw" ? "draw" : null}
              />
            )}
          </div>
        </div>

        <div className="second_player w-[50%] h-[100vh] flex flex-row items-center justify-between">
          <div className="playing_card w-[75%] h-[100vh] flex justify-center items-center">
            {selectedCardPlayer2 && (
              <Card2
                card={selectedCardPlayer2}
                isWinner={winner === 2 ? 2 : winner === "draw" ? "draw" : null}
              />
            )}
          </div>

          <div className="card-area w-[33%] h-[100vh] flex flex-col justify-evenly p-4 py-10 items-center">
            <h3 className="text-[2vw] underline">Player 2</h3>
            {battleDeck2.map((card) => (
              <Card
                key={card._id}
                card={{
                  src: card.cardImgUrl,
                  name: card.name,
                  power: card.power,
                  speed: card.speed,
                  stamina: card.stamina,
                  level: card.level,
                  hp: card.hp,
                }}
                player={2}
              />
            ))}
          </div>
        </div>
        <div className="battle-button absolute top-0 w-[100%] flex justify-center items-center h-[200px]">
          <button
            className={`w-[150px] border-4 border-dotted border-yellow-100 h-[50px] bg-gradient-to-r from-green-400 to-green-600 hover:from-green-600 hover:to-green-400 rounded-[6px] text-[1.5vw] flex justify-center items-center ${titleClass}`}
            onClick={startBattle}
          >
            {title}
          </button>
        </div>
        <div className="absolute top-[0] left-0 w-full bg-gradient-to-b from-yellow-500 to-amber-600 bg-cover text-white text-center py-2 flex justify-between px-12 border-4 border-dotted border-amber-700">
          <p className="text-xl">Score: {scorePlayer1}</p>
          <div className="flex gap-7 items-center">
            <Link to={"/mappage"} className="text-red-900 hover:bg-yellow-300">
              Exit Battle!⛔
            </Link>
            <p className="text-xl">Score: {scorePlayer2}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BattleGround;
