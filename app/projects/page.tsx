import type { Metadata } from 'next';
import { asset, projects, site } from '../content';
import { Effects } from '../components/effects/Effects';
import { Header } from '../components/site/Header';
import { Footer } from '../components/site/Footer';
import { CommandPalette } from '../components/site/CommandPalette';
import { Toaster } from '../components/ui/Toaster';
import { Icon } from '../components/ui/Icon';
import { ProjectArchive } from '../components/work/ProjectArchive';
import { ProjectDialog } from '../components/work/ProjectDialog';
import styles from './projects.module.css';

export const metadata: Metadata = {
  title: `All projects — ${site.name}`,
  description: 'Web products, mobile apps, APIs, practical tools, and experiments. Explore the complete project collection with galleries and engineering notes.',
  alternates: { canonical: asset('/projects/') },
};

export default function ProjectsPage() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to projects</a>
      <Header home={false} />
      <main id="main" className={styles.main}>
        <div className="container">
          <header id="top" className={styles.intro}>
            <a className={styles.back} href={asset('/#work')}><Icon name="arrow-right" size={15} /> Back to selected work</a>
            <p className="eyebrow"><span className="eyebrow-index">02</span>Project index <span className={styles.total}>{projects.length} projects</span></p>
            <h1 className="heading">Every build has <em>a story.</em></h1>
            <p className={`lead ${styles.lead}`}>A complete collection of products, tools, and experiments. Open a project for its gallery, product context, and engineering decisions.</p>
          </header>
          <ProjectArchive collection items={projects.map((project, index) => ({ project, number: index + 1 }))} />
        </div>
        <ProjectDialog />
      </main>
      <Footer home={false} />
      <CommandPalette />
      <Toaster />
      <Effects />
    </>
  );
}
