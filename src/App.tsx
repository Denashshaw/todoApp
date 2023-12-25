import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [color, setColor] = useState<string>();
  const [options, setOptions] = useState<string[]>([]);
  const [correct, setCorrect] = useState<CorrectEnum | undefined>(undefined);
  const [loader, setLoader] = useState<boolean>(false);

  enum CorrectEnum {
    Correct,
    Wrong,
  }

  const startGame = () => {
    const actualColor = generateRandomColor();
    setColor(actualColor);
    setOptions(
      [actualColor, generateRandomColor(), generateRandomColor()].sort(
        () => 0.5 - Math.random()
      )
    );
  };

  useEffect(() => {
    startGame();
  }, []);

  function generateRandomColor() {
    const digits = [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
    ];

    const color = new Array(6)
      .fill("")
      .map(() => digits[Math.floor(Math.random() * digits.length)])
      .join("");
    return "#" + color;
  }

  function checkAnswer(answer: string) {
    if (answer === color) {
      setCorrect(CorrectEnum.Correct);
      setLoader(true);
      setTimeout(() => {
        setCorrect(undefined);
        startGame();
        setLoader(false);
      }, 2000);
    } else {
      setCorrect(CorrectEnum.Wrong);
      setTimeout(() => [setCorrect(undefined), setLoader(false)], 1000);
    }
  }

  return (
    <>
      {/* <h1 className="text-black text-center mt">Guess the color</h1> */}
      <div className="h-screen flex justify-center">
        <div className="col">
          <h1 className="text-3xl text-center mb-5">Guess the color</h1>
          {loader === false ? (
            <>
              <div
                className="w-[310px] h-[200px] mb-4"
                style={{ backgroundColor: color }}
              ></div>
              {options.map((option) => (
                <button
                  key={option}
                  className="mr-2 px-4 bg-slate-700 text-white rounded-md"
                  onClick={() => checkAnswer(option)}
                >
                  {option}
                </button>
              ))}
            </>
          ) : (
            "Loading! Please wait..."
          )}

          {correct === CorrectEnum.Correct && (
            <div className="text-[green]">
              Great! You choosed the right answer. <br />
              Find the next one
            </div>
          )}
          {correct === CorrectEnum.Wrong && (
            <div className="text-[red]">
              Sorry! You choosed the wrong one! <br />
              Retry Again...
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
