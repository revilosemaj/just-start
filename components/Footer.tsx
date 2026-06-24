import { FOOTER } from '@/lib/content';

export default function Footer() {
  return (
    <footer className="portfolio-section-alt">
      <div className="max-w-5xl mx-auto px-6 sm:px-10 py-12">
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-black/25 dark:text-white/25 text-xs">
            Copyright &copy; {new Date().getFullYear()} {FOOTER.copyright}
          </p>
          <p className="text-black/20 dark:text-white/20 text-xs">{FOOTER.builtWith}</p>
        </div>
      </div>
    </footer>
  );
}
