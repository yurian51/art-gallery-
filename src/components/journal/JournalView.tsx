import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { JournalArticle } from '../../types';
import { BookOpen, Clock, ArrowRight, ArrowLeft, Share2, Check } from 'lucide-react';

export const JournalView: React.FC = () => {
  const { journalArticles } = useApp();
  const [selectedArticle, setSelectedArticle] = useState<JournalArticle | null>(null);
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (selectedArticle) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button
          onClick={() => setSelectedArticle(null)}
          className="flex items-center gap-2 text-xs font-semibold text-[#817C73] hover:text-[#171717] mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to All Essays & Journal</span>
        </button>

        {/* Article Header */}
        <div className="space-y-4 border-b border-[#817C73]/20 pb-8 mb-8">
          <div className="flex items-center justify-between text-xs text-[#817C73]">
            <div className="flex items-center gap-2 font-sans">
              <span className="text-[#B89B62] font-semibold uppercase tracking-wider">{selectedArticle.category}</span>
              <span>·</span>
              <span>{selectedArticle.readTimeMinutes} min read</span>
              <span>·</span>
              <span>{selectedArticle.publishedAt}</span>
            </div>

            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 hover:text-[#171717] transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copied ? 'Link Copied' : 'Share'}</span>
            </button>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#171717] leading-tight">
            {selectedArticle.title}
          </h1>

          <div className="flex items-center gap-3 pt-2">
            <div>
              <p className="font-serif font-bold text-sm text-[#171717]">{selectedArticle.author}</p>
              <p className="text-xs text-[#817C73]">{selectedArticle.authorRole} · Mrisho Art Gallery</p>
            </div>
          </div>
        </div>

        {/* Lead Image */}
        <div className="aspect-[16/9] overflow-hidden bg-[#EBE6DF] mb-8 border border-[#817C73]/20">
          <img
            src={selectedArticle.coverImage}
            alt={selectedArticle.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Essay Body with Reading Measure & Drop Cap */}
        <div className="prose prose-stone max-w-2xl mx-auto space-y-6 text-[#171717] font-serif text-base sm:text-lg leading-relaxed">
          <p className="first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-[#B89B62]">
            {selectedArticle.content.split('\n\n')[0]}
          </p>

          {selectedArticle.content.split('\n\n').slice(1).map((paragraph, idx) => (
            <p key={idx} className="leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Tags */}
        <div className="mt-12 pt-6 border-t border-[#817C73]/20 max-w-2xl mx-auto flex items-center gap-2">
          <span className="text-xs text-[#817C73]">Topics:</span>
          {selectedArticle.tags.map((tag, idx) => (
            <span key={idx} className="text-xs text-[#171717] bg-[#EBE6DF] px-2 py-0.5">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="border-b border-[#817C73]/20 pb-8 mb-10">
        <span className="text-[10px] uppercase tracking-[0.25em] text-[#B89B62] font-semibold block mb-1">
          Curatorial Essays & Critical Discourse
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#171717] tracking-tight">
          The Mrisho Art Journal
        </h1>
        <p className="text-xs sm:text-sm text-[#817C73] max-w-2xl mt-2 font-sans font-light">
          Stories, ideas and perspectives on African visual creativity will appear here when approved for publication.
        </p>
      </div>

      {journalArticles.length === 0 ? (
        <div className="border border-[#817C73]/20 bg-white px-6 py-16 text-center"><h2 className="font-serif text-2xl text-[#171717]">The journal is being prepared</h2><p className="mt-2 text-sm text-[#817C73]">Editorial articles will appear here when approved for publication.</p></div>
      ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {journalArticles.map(article => (
          <article
            key={article.id}
            onClick={() => setSelectedArticle(article)}
            className="bg-white border border-[#817C73]/20 p-6 group cursor-pointer hover:border-[#171717] transition-all flex flex-col justify-between"
          >
            <div>
              <div className="aspect-[16/9] overflow-hidden bg-[#EBE6DF] mb-5">
                <img
                  src={article.coverImage}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="flex items-center gap-2 text-xs text-[#817C73] mb-2 font-sans">
                <span className="text-[#B89B62] font-semibold uppercase">{article.category}</span>
                <span>·</span>
                <span>{article.readTimeMinutes} min read</span>
                <span>·</span>
                <span>{article.publishedAt}</span>
              </div>

              <h2 className="font-serif text-2xl font-bold text-[#171717] group-hover:text-[#B89B62] transition-colors leading-snug">
                {article.title}
              </h2>

              <p className="text-xs text-[#817C73] mt-2 line-clamp-3 leading-relaxed font-sans">
                {article.excerpt}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#817C73]/15 flex items-center justify-between text-xs text-[#171717]">
              <span>By {article.author} ({article.authorRole})</span>
              <span className="flex items-center gap-1 font-semibold text-[#B89B62] group-hover:translate-x-1 transition-transform">
                Read Complete Essay <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </article>
        ))}
      </div>
      )}
    </div>
  );
};
