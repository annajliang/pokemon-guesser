import { Input } from "../Input/Input";
import { Button } from "../Button/Button";

export const Form = () => {
  return (
    <form action="submit" onSubmit={(e) => e.preventDefault()}>
      <Input />
      <Button />
    </form>
  );
};
