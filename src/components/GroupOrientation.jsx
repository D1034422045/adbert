import { useSelector, useDispatch } from "react-redux";
import { INCREMENT, RESET, TOGGLE_DISABLE } from "../store/counterSlice";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

export default function GroupOrientation() {
  const count = useSelector((state) => state.counter.count);
  const isDisable = useSelector((state) => state.counter.isDisable);
  const dispatch = useDispatch();

  const buttons = [
    <Button
      key="one"
      onClick={() => {
        dispatch(INCREMENT());
      }}
      disabled={isDisable}
    >
      CLICK：{count}
    </Button>,
    <Button
      key="two"
      onClick={() => {
        dispatch(RESET());
      }}
    >
      CLEAR
    </Button>,
    <Button
      key="three"
      onClick={() => {
        dispatch(TOGGLE_DISABLE());
      }}
    >
      {isDisable ? "ABLE" : "DISABLE"}
    </Button>,
  ];

  return (
    <ButtonGroup orientation="vertical" aria-label="Vertical button group">
      {buttons}
    </ButtonGroup>
  );
}
