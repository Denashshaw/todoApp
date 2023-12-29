import { ErrorBoundary } from "react-error-boundary";
import Person from "./Person";
import Fallback from "./Fallback";

const First = () => {
  const errorHandler = (err: any, errInfo: any) => {
    console.log("err logs", err, errInfo);
  };

  const nameObj = { name: "denash" };
  return (
    <div>
      <p>First Component</p>
      <ErrorBoundary FallbackComponent={Fallback} onError={errorHandler}>
        <Person obj={nameObj} />
      </ErrorBoundary>
    </div>
  );
};

export default First;
