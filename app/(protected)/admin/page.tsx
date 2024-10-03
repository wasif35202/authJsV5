"use client";

import { admin } from "@/actions/admin";
import { RoleGate } from "@/components/auth/role-gate";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { UserRole } from "@prisma/client";
import { toast } from "sonner";

export default function AdminPage() {
  const onAPiRouteClick = () => {
    fetch("/api/admin").then((response) => {
      if (response.ok) {
        toast.success("Allowed Api Route");
      } else {
        toast.error("Forbidden Api Route");
      }
    });
  };

  const onServerActionClick = async () => {
    admin().then((data) => {
      if (data.error) {
        toast.error(data.error);
      }
      if (data.success) {
        toast.success(data.success);
      }
    });
  };

  return (
    <Card className="w-[600px]">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">👨‍💻Admin</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <RoleGate allowedRole={UserRole.ADMIN}>
          <FormSuccess message="You are allowed to view this content" />
        </RoleGate>
        <div className="flex flexrow items-center justify-between rounded-lg border p-3 shadow-md">
          <p className="text-sm font-medium">Admin only api route</p>
          <Button onClick={onAPiRouteClick}>Click to test</Button>
        </div>

        <div className="flex flexrow items-center justify-between rounded-lg border p-3 shadow-md">
          <p className="text-sm font-medium">Admin only server action</p>
          <Button onClick={onServerActionClick}>Click to test</Button>
        </div>
      </CardContent>
    </Card>
  );
}
