import { 
  Sparkles, 
  Clock, 
  ShieldCheck, 
  Film, 
  Cpu, 
  TrendingUp,
  CheckCircle2
} from "lucide-react";

export default function WhyChooseUs() {
  const pillars = [
    {
      icon: Film,
      title: "Creative Editing",
      description: "Non-linear storytelling, pacing mastery, rhythmic cut points, and high emotional resonance engineered to keep eyes locked on screen.",
    },
    {
      icon: ShieldCheck,
      title: "Professional Quality",
      description: "Lossless 4K color workflows, acoustic sound design, studio audio mastering, and broadcast-ready delivery standards.",
    },
    {
      icon: Clock,
      title: "Fast Delivery",
      description: "Quick 24 to 48-hour turnarounds without ever cutting corners on visual finesse, VFX details, or narrative quality.",
    },
    {
      icon: Sparkles,
      title: "Motion Graphics",
      description: "Custom keyframed typography, 3D title sequences, and graphic callouts that elevate ordinary video into bespoke agency cinema.",
    },
    {
      icon: Cpu,
      title: "AI-Powered Workflow",
      description: "State-of-the-art diffusion generative models, AI voice enhancement, motion synthesis, and upscale engines for cutting-edge visuals.",
    },
    {
      icon: TrendingUp,
      title: "Social Media Expertise",
      description: "Deep algorithmic knowledge of Instagram Reels, YouTube CTR, retention graphs, hook psychology, and viral framing tactics.",
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-obsidian-950 relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-400 text-xs font-semibold uppercase tracking-widest">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Why Choose Karmayogi</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cinzel font-bold text-white tracking-tight">
            The Standard of <span className="text-gold-gradient">Excellence</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">
            Engineered precision, cinematic taste, and relentless attention to every frame.
          </p>
        </div>

        {/* 6 Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group relative rounded-2xl p-7 glass-panel border border-white/10 hover:border-gold-500/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-gold-sm"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gold-500/10 text-gold-400 flex items-center justify-center border border-gold-500/20 group-hover:bg-gold-500 group-hover:text-obsidian-950 transition-all duration-300">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-cinzel font-bold text-white group-hover:text-gold-400 transition-colors">
                    {item.title}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
