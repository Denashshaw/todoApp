import { useState } from "react";
import { useErrorBoundary } from "react-error-boundary";

const Person = ({ obj }: { obj: { name: string } }) => {
  const { showBoundary } = useErrorBoundary();
  const [state, setState] = useState(0);
  const clickHandler = () => {
    try {
      if (state > 3) throw new Error("state condition failed");
      setState((prev) => prev + 1);
    } catch (error) {
      showBoundary(error);
    }
  };

  return (
    <div className="text-center">
      Person {obj.name.toUpperCase()}
      <br />
      <button onClick={clickHandler}>Click</button>
      <br />
      Count: {state}
    </div>
  );
};

export default Person;
