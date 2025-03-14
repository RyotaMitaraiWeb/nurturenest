import { auth } from "@/auth";
import { PaymentMethodPreferenceForm } from "@/ui/profile/PaymentMethodPreferenceForm";
import { Card, CardContent, Typography } from "@mui/material";

export default async function Page() {
  const session = await auth();

  return <div className="mx-auto">
    <Card>
      <CardContent>
        <Typography variant="h5">Начин на плащане по подразбиране</Typography>
        <Typography variant="subtitle1">
          Начинът на плащане по подразбиране ще се избира автоматичнчо на касата.
          Начините на изплащане ще се изберат само когато са налични (при покупки на стойност над 100 лв.).
        </Typography>
        <PaymentMethodPreferenceForm session={session!} />
      </CardContent>
    </Card>
  </div>
}