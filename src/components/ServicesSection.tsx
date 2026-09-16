import { 
  Film, 
  Sparkles, 
  Youtube, 
  Instagram, 
  Smartphone, 
  Megaphone, 
  Building2, 
  Cpu,
  ArrowUpRight 
} from "lucide-react";

export default function ServicesSection() {
  const services = [
    {
      id: "1",
      icon: Film,
      title: "Video Editing",
      description: "High-end narrative editing, seamless pacing, multi-cam assembly, sound design, and color grading tailored for premium impact.",
      tag: "CORE PRODUCTION",
    },
    {
      id: "2",
      icon: Sparkles,
      title: "Motion Graphics",
      description: "Dynamic kinetic typography, 2D/3D title sequences, logo reveals, animated UI mockups, and sleek infographics.",
      tag: "VFX & ANIMATION",
    },
    {
      id: "3",
      icon: Youtube,
      title: "YouTube Video Editing",
      description: "High-retention editing built with proven storytelling hooks, sound effects, B-roll pacing, and thumbnail framing that drive click-through.",
      tag: "LONG FORM",
    },
    {
      id: "4",
      icon: Instagram,
      title: "Instagram Reels",
      description: "Fast-tempo, aesthetic reels with synchronized beats, animated captions, visual hooks, and seamless looping transitions.",
      tag: "VIRAL SOCIAL",
    },
    {
      id: "5",
      icon: Smartphone,
      title: "Short-form Content",
      description: "Optimized 9:16 vertical videos for YouTube Shorts and TikTok engineered to grab attention within the first 3 seconds.",
      tag: "GROWTH DRIVEN",
    },
    {
      id: "6",
      icon: Megaphone,
      title: "Advertisement Videos",
      description: "Commercial ads crafted for conversion, brand authority, and consumer engagement with high-conversion product storytelling.",
      tag: "COMMERCIAL",
    },
    {
      id: "7",
      icon: Building2,
      title: "Corporate Videos",
      description: "Refined brand documentaries, executive interviews, company overviews, and internal sizzle reels for enterprise prestige.",
      tag: "ENTERPRISE",
    },
    {
      id: "8",
      icon: Cpu,
      title: "AI-Powered Video Content",
      description: "Next-gen creative workflows using Midjourney, Runway Gen-3, Kling, and Luma to craft surreal, hyper-realistic cinematic sequences.",
      tag: "FUTURE TECH",
    },
  ];

  return (
    <section id="services" className="py-20 lg:py-28 bg-white relative border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-gold-500/30 text-gold-800 text-xs font-bold uppercase tracking-widest">
            <span>Specialized Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cinzel font-bold text-slate-950 tracking-tight">
            Comprehensive <span className="text-gold-gradient">Creative Services</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-normal">
            From viral social reels to enterprise commercials and cutting-edge generative AI cinema.
          </p>
        </div>

        {/* 8 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className="group relative rounded-2xl p-6 bg-slate-50/70 border border-slate-200 hover:border-gold-500 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:bg-white flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-gold-500/15 text-gold-800 flex items-center justify-center border border-gold-500/30 group-hover:scale-110 group-hover:bg-gold-500 group-hover:text-slate-950 transition-all duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold tracking-widest text-gold-700 uppercase">
                      {service.tag}
                    </span>
                  </div>

                  <h3 className="text-lg font-cinzel font-bold text-slate-900 group-hover:text-gold-700 transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="pt-6 mt-4 border-t border-slate-200 flex items-center justify-between">
                  <a
                    href="#enquiry"
                    className="text-xs font-bold text-slate-800 group-hover:text-gold-700 flex items-center gap-1 uppercase tracking-wider"
                  >
                    <span>Enquire</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                  <span className="text-[10px] text-slate-400 font-cinzel font-semibold">0{service.id}</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
