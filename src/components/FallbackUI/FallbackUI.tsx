import { useDispatch } from "react-redux";
import { resetStatus } from "../../features/trips/tripsSlice";
import { AppDispatch } from "../../store/store";

const FallbackUI = ({ error }: any) => {
  const dispatch = useDispatch<AppDispatch>();

  const resetHandler = () => {
    dispatch(resetStatus());
  };

  return (
    <div>
      <p>Something went wrong, Goha</p>
      <pre>{error}</pre>
      <button onClick={resetHandler}>Try again!</button>
    </div>
  );
};

export default FallbackUI;
