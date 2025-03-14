import { auth } from "@/auth";
import { Heading } from "@/components/Heading";
import { PreferencesForm } from "@/ui/profile/PreferencesForm";
import { Card, CardContent, Typography } from "@mui/material";

export default async function Page() {
  const session = await auth();
  return <div className="mx-auto">
    <Card>
      <CardContent className="flex flex-col gap-4">
        <Heading className="mb-4" level={1}>Данни по подразбиране</Heading>
        <Typography variant="subtitle1">Тези данни ще се попълват автоматично при касата</Typography>
        <PreferencesForm session={session!} />
      </CardContent>
    </Card>
  </div>
}