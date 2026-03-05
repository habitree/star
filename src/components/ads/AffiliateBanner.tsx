import { getAffiliateLink, type AffiliateProgram } from '@/lib/affiliate-config';

interface AffiliateBannerProps {
  program: AffiliateProgram;
  locale?: string;
  variant?: 'compact' | 'full';
  className?: string;
}

export default function AffiliateBanner({
  program,
  locale = 'ko',
  variant = 'full',
  className = '',
}: AffiliateBannerProps) {
  const link = getAffiliateLink(program);
  const label = link.label[locale] ?? link.label.en;
  const description = link.description[locale] ?? link.description.en;

  if (variant === 'compact') {
    return (
      <div className={`glass-card p-4 border border-purple-500/20 ${className}`}>
        <a
          href={link.url}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="flex items-center gap-3 group"
        >
          <span className="text-2xl shrink-0">{link.badge}</span>
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm font-medium group-hover:text-purple-300 transition-colors">
              {label}
            </p>
            <p className="text-white/50 text-xs leading-snug mt-0.5">{description}</p>
          </div>
          <span className="text-white/40 text-xs shrink-0">→</span>
        </a>
      </div>
    );
  }

  return (
    <div className={`glass-card p-5 border border-purple-500/20 text-center ${className}`}>
      <p className="text-white/30 text-xs mb-3 uppercase tracking-widest">Sponsored</p>
      <div className="text-3xl mb-2">{link.badge}</div>
      <p className="text-white/75 text-sm leading-relaxed mb-4 max-w-xs mx-auto">{description}</p>
      <a
        href={link.url}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className="inline-block px-6 py-2.5 rounded-full
                   bg-gradient-to-r from-purple-500/80 to-pink-500/80
                   hover:from-purple-500 hover:to-pink-500
                   text-white text-sm font-medium transition-all"
      >
        {label} →
      </a>
    </div>
  );
}
