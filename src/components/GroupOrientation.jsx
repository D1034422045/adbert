import { useSelector, useDispatch } from "react-redux";
import { increment, reset, toggleDisable } from "../store/actions";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

export default function GroupOrientation() {
  const count = useSelector((state) => state.count);
  const isDisable = useSelector((state) => state.isDisable);
  const dispatch = useDispatch();

  const buttons = [
    <Button
      key="one"
      onClick={() => {
        dispatch(increment());
      }}
      disabled={isDisable}
    >
      CLICK：{count}
    </Button>,
    <Button
      key="two"
      onClick={() => {
        dispatch(reset());
      }}
    >
      CLEAR
    </Button>,
    <Button
      key="three"
      onClick={() => {
        dispatch(toggleDisable());
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
