import PageSection from '../components/PageSection';
import HeroBanner from '../components/HeroBanner';

export default function SlidesPage() {
  return (
    <div>
      <HeroBanner title="Slides" />

      <PageSection>
        <div className="max-w-3xl mx-auto">
          <p className="text-lg text-muted-foreground mb-8">
            Access the presentation slides and materials for this session.
          </p>

          <div className="rounded-lg border border-border bg-card p-8 flex flex-col items-center">
            <img
              src="/assets/Morris, 2012, QR code.png"
              alt="QR Code for Slides"
              className="w-full max-w-md h-auto rounded-lg shadow-lg"
            />
            <p className="text-sm text-muted-foreground mt-6 text-center">
              Scan the QR code to access the presentation slides
            </p>
          </div>
        </div>
      </PageSection>
    </div>
  );
}
