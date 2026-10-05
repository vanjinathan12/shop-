import React from 'react';
import { ShieldCheck, Compass, Sparkles, Feather } from 'lucide-react';

export const StorySection: React.FC = () => {
  return (
    <section id="craftsmanship" className="py-16 sm:py-24 border-t border-stone-200 bg-[#F4F3EE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <span className="text-xs uppercase tracking-widest text-stone-500 font-medium">
            Material Sincerity
          </span>
          <h2 className="font-display text-3xl sm:text-4xl text-stone-900 mt-2 font-normal [text-wrap:balance]">
            Crafted for generational provenance, not ephemeral seasons.
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-4 leading-relaxed font-light">
            Every object in our collection begins in small, family-owned European and Japanese
            foundries and joinery studios. We prioritize repairability, tactile integrity, and
            materials that mature gracefully with time.
          </p>
        </div>

        {/* 3 Pillars with Editorial Numbering (ALLOWED: Natural human editorial numbering) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
          <div className="bg-white/80 p-8 rounded-2xl border border-stone-200/70 shadow-xs flex flex-col justify-between">
            <div>
              <span className="font-mono text-xs text-stone-400 font-semibold tracking-wider block mb-4">
                01. Certified Hardwoods
              </span>
              <h3 className="font-display text-xl font-medium text-stone-900 mb-3">
                European White Oak & Walnut
              </h3>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed font-light">
                Sourced exclusively from sustainably managed Danish and German forests.
                Air-dried for six months before precision kiln curing to prevent warping under climate shifts.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-stone-100 flex items-center gap-2 text-stone-500 text-xs">
              <span className="text-emerald-700 font-medium">✓ FSC® C124892</span>
              <span aria-hidden="true">·</span>
              <span>100% Traceable Logs</span>
            </div>
          </div>

          <div className="bg-white/80 p-8 rounded-2xl border border-stone-200/70 shadow-xs flex flex-col justify-between">
            <div>
              <span className="font-mono text-xs text-stone-400 font-semibold tracking-wider block mb-4">
                02. Unlacquered Metallurgy
              </span>
              <h3 className="font-display text-xl font-medium text-stone-900 mb-3">
                Spun Brass & Lost-Wax Bronze
              </h3>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed font-light">
                We intentionally leave our metals free of artificial synthetic varnishes.
                Over months of human touch and atmospheric exposure, each surface gains its own unique amber patina.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-stone-100 flex items-center gap-2 text-stone-500 text-xs">
              <span className="text-stone-700 font-medium">Takaoka Metallurgy</span>
              <span aria-hidden="true">·</span>
              <span>Living Organic Finish</span>
            </div>
          </div>

          <div className="bg-white/80 p-8 rounded-2xl border border-stone-200/70 shadow-xs flex flex-col justify-between">
            <div>
              <span className="font-mono text-xs text-stone-400 font-semibold tracking-wider block mb-4">
                03. In-Home Assembly
              </span>
              <h3 className="font-display text-xl font-medium text-stone-900 mb-3">
                Dedicated White-Glove Care
              </h3>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed font-light">
                No curbside wooden pallets. Our private transit teams unpack each work in
                your chosen room, inspect leveling, and recycle all protective packing materials.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-stone-100 flex items-center gap-2 text-stone-500 text-xs">
              <span className="text-stone-700 font-medium">30-Day In-Home Trial</span>
              <span aria-hidden="true">·</span>
              <span>Carbon-Neutral Transit</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
