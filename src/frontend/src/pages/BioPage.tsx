import PageSection from '../components/PageSection';
import HeroBanner from '../components/HeroBanner';
import { proposalContent } from '../content/proposalContent';
import { GraduationCap, Globe } from 'lucide-react';
import { SiInstagram, SiLinkedin } from 'react-icons/si';

export default function BioPage() {
  return (
    <div>
      <HeroBanner title="Bio" />

      <PageSection>
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <GraduationCap className="h-10 w-10 text-primary" />
            <div>
              <h2 className="text-4xl font-bold text-foreground">Michael Viernes</h2>
              <p className="text-lg text-muted-foreground mt-2">
                The Chicago School - Foundation for International Education - Student Global Leadership Conference - 2026
              </p>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-8 mb-8">
            <h3 className="text-2xl font-semibold mb-4 text-foreground">{proposalContent.author}</h3>
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

              <a
                href="https://div52.net/members/join/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-accent text-accent-foreground hover:bg-accent/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <span className="font-medium">APA Division 52</span>
              </a>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-muted/50 p-6">
            <div className="flex items-center gap-2 mb-3">
              <Globe className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">International Educational Experience</h3>
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Berlin, Germany</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Zurich, Switzerland</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Milan, Italy</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>London, England</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Johannesburg, South Africa</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Antigua, Guatemala</span>
              </li>
            </ul>
          </div>
        </div>
      </PageSection>
    </div>
  );
}
