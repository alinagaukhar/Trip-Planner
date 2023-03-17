import routes from "../../../assets/routes.png";
import Button from "../../Button/Button";
import plus from "../../../assets/plus.svg";
import "./Empty.scss";

type EmptyProps = {
  show: Function;
};

const Empty = (props: EmptyProps) => {
  return (
    <div id="empty-container">
      <img src={routes} />
      <p>No places yet</p>
      <Button
        src={plus}
        text="Add Place"
        id="addPlaceBtn"
        onClick={() => props.show(true)}
      />
    </div>
  );
};

export default Empty;
