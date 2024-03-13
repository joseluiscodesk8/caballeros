import Image from "next/image";
import dynamic from "next/dynamic";

const DynamicCharacters = dynamic(() => import('./components/CharacterCarousel'));

export default function Home() {
  return (
    <main>
      <DynamicCharacters />
    </main>
  );
}
