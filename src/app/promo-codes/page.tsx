import { Button, TextField } from "@mui/material";

export default async function Page() {
  return <form>
    <TextField label="Идентификатор на продукт" name="productId" />
    <TextField label="Идентификатор на потребител" name="userId" />
    <TextField label="Съдържание" name="text" />
    <Button type="submit">Създай</Button>
  </form>
}