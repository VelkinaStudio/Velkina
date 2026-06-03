import InkwellLab from "./InkwellLab";

// Isolated harness to develop + verify the Inkwell comic engine against a known
// object. Not linked from the site. Visit /lab/inkwell.
export const metadata = { title: "Inkwell Lab — Velkina" };

export default function Page() {
  return <InkwellLab />;
}
