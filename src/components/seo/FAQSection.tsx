/**
 * FAQSection — GEO (Generative Engine Optimization) 컴포넌트
 *
 * FAQPage JSON-LD Schema + 시각적 accordion UI
 * AI 검색엔진(Google AI Overviews, Perplexity, ChatGPT) 인용 최적화
 */

import JsonLd from './JsonLd';

interface FAQSectionProps {
  /** locale이 이미 적용된 { question, answer } 배열 */
  items: { question: string; answer: string }[];
  title?: string;
  /** 인용 트래킹용 페이지 URL */
  pageUrl: string;
}

export default function FAQSection({ items, title, pageUrl }: FAQSectionProps) {
  if (items.length === 0) return null;

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    url: pageUrl,
    mainEntity: items.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: answer,
        url: pageUrl,
      },
    })),
  };

  return (
    <section aria-label={title ?? 'FAQ'} className="glass-card p-6 mb-8">
      <JsonLd data={faqJsonLd} />

      {title && (
        <h2 className="text-xl font-semibold text-white mb-5">{title}</h2>
      )}

      <dl className="space-y-4">
        {items.map(({ question, answer }, idx) => (
          <div key={idx} className="border border-white/10 rounded-xl overflow-hidden">
            <dt className="px-5 py-4 bg-white/5 text-white font-medium leading-snug">
              {question}
            </dt>
            <dd className="px-5 py-4 text-white/75 leading-relaxed text-sm">
              {answer}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
