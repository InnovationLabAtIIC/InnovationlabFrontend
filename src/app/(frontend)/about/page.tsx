"use client";

import {
  Globe,
  Heart,
  Layers,
  Lightbulb,
  Rocket,
  Target,
  Trophy,
  Users,
  Zap,
} from "lucide-react";

export default function AboutPage() {
  const missionPanels = [
    {
  title: "Mission",
  subtitle: "Empower innovators with chiya-powered chaos",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sodales risus a mi pulvinar, ut varius lorem luctus.",
      icon: Target,
      accent: "from-primary/10 via-background to-background",
    },
    {
  title: "Vision",
  subtitle: "Lead the next lol-wave of impact",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sodales risus a mi pulvinar, ut varius lorem luctus.",
      icon: Lightbulb,
      accent: "from-background via-primary/10 to-background",
    },
    {
  title: "Approach",
  subtitle: "Learning-by-building, hacking-by-laughing",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sodales risus a mi pulvinar, ut varius lorem luctus.",
      icon: Layers,
      accent: "from-primary/5 via-background to-background",
    },
    {
  title: "Community",
  subtitle: "Inclusive by design, mazza by default",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sodales risus a mi pulvinar, ut varius lorem luctus.",
      icon: Users,
      accent: "from-background via-primary/5 to-background",
    },
  ];

  const values = [
    {
      title: "Passion (chiya-fueled)",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed rutrum purus in ipsum pretium aliquet.",
      icon: Heart,
    },
    {
      title: "Collaboration antics",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed rutrum purus in ipsum pretium aliquet.",
      icon: Users,
    },
    {
      title: "Innovation jukebox",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed rutrum purus in ipsum pretium aliquet.",
      icon: Zap,
    },
    {
      title: "Impact ko josh",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed rutrum purus in ipsum pretium aliquet.",
      icon: Globe,
    },
  ];

  const milestones = [
    {
  year: "2015",
  title: "Foundation: chai-driven beginnings",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer suscipit mauris nec odio posuere malesuada.",
    },
    {
  year: "2018",
  title: "First breakthrough: whiteboard ma wow",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer suscipit mauris nec odio posuere malesuada.",
    },
    {
  year: "2021",
  title: "Expansion: global ghumti",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer suscipit mauris nec odio posuere malesuada.",
    },
    {
  year: "2024",
  title: "Recognition: sabai le notice gare",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer suscipit mauris nec odio posuere malesuada.",
    },
  ];

  const achievements = [
    { value: "500+", label: "Projects delivered", icon: Rocket },
    { value: "12+", label: "Years of momentum", icon: Trophy },
    { value: "50+", label: "Collaborators", icon: Users },
    { value: "25", label: "Awards & honours", icon: Globe },
  ];

  return (
    <main className="w-full bg-background text-foreground">
      <section className="relative isolate overflow-hidden py-24">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,theme(colors.primary)/12%,transparent_55%),radial-gradient(circle_at_80%_0%,theme(colors.primary)/8%,transparent_45%)]" />
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-[1.3fr_1fr] lg:gap-24 items-center">
            <div>
              <p className="uppercase tracking-[0.35em] text-sm text-foreground/50">Innovation Lab</p>
              <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight">
                Hamro lab future design garcha, chiya khoi? bhane pani ready.
              </h1>
              <p className="mt-8 text-lg leading-relaxed text-foreground/75 max-w-2xl">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae felis sed justo convallis posuere in
                et urna. Phasellus fermentum, nibh nec congue maximus, elit enim iaculis sapien, vitae aliquet enim
                justo vitae erat.
              </p>
              <div className="mt-12 grid gap-4 sm:grid-cols-3">
                {["Strategy Studio", "Prototype Sprint", "Launch Pad"].map((label) => (
                  <div
                    key={label}
                    className="rounded-2xl border border-foreground/15 px-5 py-4 text-sm font-medium uppercase tracking-wide text-foreground/60"
                  >
                    {label}
                  </div>
                ))}
              </div>
            </div>
            <div className="grid gap-6">
              <div className="rounded-3xl border border-foreground/15 bg-gradient-to-br from-primary/10 via-background to-background p-8 backdrop-blur">
                <p className="text-sm uppercase tracking-wide text-foreground/60">Why it matters</p>
                <p className="mt-4 text-xl font-semibold leading-relaxed text-foreground/90">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis volutpat tortor quis lectus viverra,
                  nec vehicula purus commodo.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[{ value: "87%", label: "ideas shipped" }, { value: "42", label: "industry allies" }].map(
                  (item) => (
                    <div
                      key={item.label}
                      className="rounded-2xl border border-foreground/15 bg-background/60 p-6 text-center backdrop-blur"
                    >
                      <span className="block text-3xl font-semibold">{item.value}</span>
                      <span className="mt-1 block text-xs uppercase tracking-wider text-foreground/50">
                        {item.label}
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">Mission, vision, ra hamro kaam garne swag</h2>
            <p className="max-w-xl text-base leading-relaxed text-foreground/70">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin molestie tortor non malesuada laoreet.
            </p>
          </div>
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
            {missionPanels.map((panel) => {
              const Icon = panel.icon;
              return (
                <div
                  key={panel.title}
                  className={`group relative overflow-hidden rounded-3xl border border-foreground/12 bg-gradient-to-br ${panel.accent} p-8`}
                >
                  <div className="flex items-center gap-4">
                    <span className="rounded-full border border-foreground/20 p-3">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-xs uppercase tracking-[0.35em] text-foreground/50">{panel.title}</p>
                      <h3 className="mt-3 text-xl font-semibold text-foreground/90">{panel.subtitle}</h3>
                    </div>
                  </div>
                  <p className="mt-6 text-sm leading-relaxed text-foreground/70">{panel.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

  <section className="py-24 bg-gradient-to-b from-background via-primary/10 to-background">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">Values that keep hamro studio lit</h2>
              <p className="mt-6 text-base leading-relaxed text-foreground/70 max-w-xl">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi gravida ligula eu blandit venenatis.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {values.map((value) => {
                const Icon = value.icon;
                return (
                  <div
                    key={value.title}
                    className="flex flex-col gap-4 rounded-3xl border border-foreground/12 bg-background/80 p-8 backdrop-blur"
                  >
                    <Icon className="h-6 w-6 text-primary" />
                    <div>
                      <h3 className="text-lg font-semibold text-foreground/90">{value.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-foreground/65">{value.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-[1fr_1.2fr]">
            <div className="rounded-3xl border border-foreground/12 bg-background/70 p-10 backdrop-blur">
              <h2 className="text-3xl font-semibold tracking-tight">Hamro journey so far: dari, hoodie, chiya</h2>
              <p className="mt-6 text-base leading-relaxed text-foreground/70">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sodales purus id quam bibendum, sit amet
                commodo velit suscipit.
              </p>
              <div className="mt-10 grid grid-cols-2 gap-4 text-sm">
                <div className="rounded-2xl border border-foreground/12 p-6">
                  <p className="text-xs uppercase tracking-[0.35em] text-foreground/50">Global pilots</p>
                  <p className="mt-3 text-2xl font-semibold">72</p>
                </div>
                <div className="rounded-2xl border border-foreground/12 p-6">
                  <p className="text-xs uppercase tracking-[0.35em] text-foreground/50">Mentors onboard</p>
                  <p className="mt-3 text-2xl font-semibold">110</p>
                </div>
              </div>
            </div>
            <div className="relative pl-8">
              <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-primary/60 via-primary/20 to-transparent" />
              <div className="space-y-12">
                {milestones.map((item) => (
                  <div key={item.year} className="relative pl-6">
                    <span className="absolute left-0 top-2 h-4 w-4 rounded-full border border-primary/40 bg-primary/20" />
                    <p className="text-xs uppercase tracking-[0.35em] text-foreground/50">{item.year}</p>
                    <h3 className="mt-3 text-xl font-semibold text-foreground/90">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-foreground/70">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-tr from-primary/5 via-background to-background">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-center">
            Momentum we build with partners (ra snacks)
          </h2>
          <div className="mt-14 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {achievements.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="flex flex-col items-center gap-3 rounded-3xl border border-foreground/12 bg-background/85 p-8 backdrop-blur"
                >
                  <Icon className="h-6 w-6 text-primary" />
                  <span className="text-3xl font-semibold">{stat.value}</span>
                  <span className="text-xs uppercase tracking-[0.35em] text-foreground/55 text-center">
                    {stat.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
