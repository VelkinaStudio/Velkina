"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { useLang } from "@/app/lib/LangProvider";
import { PROJECTS } from "@/app/lib/data/projects";
import WorkDetail from "./WorkDetail";

// The only dynamic(ssr:false) call. Must live in a client component — calling
// it inside the Server page is a hard build error in Next 15/16.
const MatterScene = dynamic(() => import("./MatterScene"), {
  ssr: false,
  loading: () => <div aria-hidden className="vk-stage vk-stage--skeleton" />,
});

export default function Playground() {
  const { t } = useLang();
  const [openId, setOpenId] = useState<string | null>(null);
  const open = openId ? PROJECTS.find((p) => p.id === openId) ?? null : null;

  return (
    <>
      <MatterScene onOpen={setOpenId} />
      <p className="vk-pile-hint" aria-hidden="true">{t.hero.pileHint}</p>
      {open && <WorkDetail project={open} onClose={() => setOpenId(null)} />}
    </>
  );
}
