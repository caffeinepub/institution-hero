import PageSection from '../components/PageSection';
import { proposalContent } from '../content/proposalContent';
import { GraduationCap, Globe } from 'lucide-react';
import { SiInstagram, SiLinkedin } from 'react-icons/si';

export default function BioPage() {
  return (
    <PageSection>
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <GraduationCap className="h-10 w-10 text-primary" />
          <h1 className="text-4xl font-bold text-foreground">About the Author</h1>
        </div>

        <div className="rounded-lg border border-border bg-card p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">{proposalContent.author}</h2>
          <p className="text-muted-foreground mb-4">{proposalContent.organization}</p>
          <div className="h-px bg-border my-6" />
          <p className="text-foreground leading-relaxed mb-6">{proposalContent.bio}</p>
          
          <div className="flex flex-wrap gap-3 mt-6">
            <a
              href="https://www.linkedin.com/in/michael-viernes-11mv52/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <SiLinkedin className="h-4 w-4" />
              <span className="font-medium">LinkedIn</span>
            </a>
            
            <a
              href="https://www.instagram.com/michaelviernes152/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <SiInstagram className="h-4 w-4" />
              <span className="font-medium">Instagram</span>
            </a>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-muted/50 p-6">
          <div className="flex items-center gap-2 mb-3">
            <Globe className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">International Experience</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Study-abroad experiences in Berlin, Zurich, and Johannesburg continue to inspire work in
            resilience, culture, and ethical leadership across diverse educational contexts.
          </p>
        </div>
      </div>
    </PageSection>
  );
}
