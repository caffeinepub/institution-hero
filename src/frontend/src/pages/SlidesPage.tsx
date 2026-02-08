import PageSection from '../components/PageSection';

export default function SlidesPage() {
  return (
    <PageSection>
      <div className="flex flex-col items-center gap-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground text-center">
          Slides
        </h1>
        <div className="w-full max-w-2xl">
          <img
            src="/assets/Morris, 2012, QR code.png"
            alt="QR code for Morris 2021 presentation materials"
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>
      </div>
    </PageSection>
  );
}
