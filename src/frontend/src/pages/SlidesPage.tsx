import HeroBanner from "../components/HeroBanner";
import PageSection from "../components/PageSection";

export default function SlidesPage() {
  return (
    <div>
      <HeroBanner title="Slides" />

      <PageSection>
        <div className="max-w-3xl mx-auto">
          <p className="text-lg text-muted-foreground mb-8">
            Access the presentation slides and materials for this session.
          </p>

          <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
            <div className="rounded-lg border border-border bg-card p-6 flex flex-col items-center flex-1">
              <img
                src="/assets/morris_2012_qr_code-019d4c74-c4f1-7196-86ac-707ca34a5ba6.png"
                alt="Morris, 2021 QR Code"
                className="w-full max-w-xs h-auto rounded-lg shadow-lg"
              />
            </div>

            <div className="rounded-lg border border-border bg-card p-6 flex flex-col items-center flex-1">
              <img
                src="/assets/viernes_2026_fie_1-019d4c74-c4bc-7218-aa3f-1af13aa4b0e4.png"
                alt="Viernes, 2026 QR Code"
                className="w-full max-w-xs h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </PageSection>
    </div>
  );
}
