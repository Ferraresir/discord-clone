import React from "react";
import { redirect } from "next/navigation";
import { initialProfile } from "@/lib/initial-profile";
import { db } from "@/lib/db";
import InitialModal from "@/components/modals/initial-modal";

async function SetupPage() {
  const profile = await initialProfile();
  const server = await db.server.findFirst({
    where: {
      Members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (server) {
    return redirect(`/server/${server.id}`);
  }

  return <InitialModal/>
}

export default SetupPage;
