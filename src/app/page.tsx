//src/app/page.tsx
import TurkeyMap from "@/components/turkey-map/TurkeyMap";
import { COMMON_CLASSES } from "@/constants/styles";

export default function Home() {
  return (
    <div className={COMMON_CLASSES.CONTAINER}>
      <div className="mb-5 text-center">
        <h1 className="my-3 text-4xl font-bold tracking-tight text-primary">
          Yapı Denetim Platformu
        </h1>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          Türkiye genelindeki yapı denetim faaliyetlerini takip edin, bölgesel
          raporlara ulaşın ve binaların denetim süreçlerini yönetin.
        </p>
      </div>
      <TurkeyMap />
    </div>
  );
}
