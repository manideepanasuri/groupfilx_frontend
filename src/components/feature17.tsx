import {
  DollarSign,
  MessagesSquare,
  PersonStanding,
  Timer,
  Zap,
  ZoomIn,
} from "lucide-react";
import {TopAnimation} from "@/components/top-animaiton.tsx";

interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface Feature17Props {
  heading?: string;
  subheading?: string;
  features?: Feature[];
}

const Feature17 = ({
  heading = "Our Core Features",
  subheading = "Features",
  features = [
    {
      title: "Instant Content",
      description:
        "Turn Reddit stories into videos in seconds. Just input text — we handle narration, visuals, and subtitles automatically.",
      icon: <Timer className="size-4 md:size-6" />,
    },
    {
      title: "AI Voiceovers",
      description:
        "Realistic, expressive AI-generated voices bring your stories to life — no need to record anything.",
      icon: <Zap className="size-4 md:size-6" />,
    },
    {
      title: "Clean Subtitles",
      description:
        "Auto-generated, well-timed subtitles styled for TikTok, YouTube Shorts, and Instagram Reels.",
      icon: <ZoomIn className="size-4 md:size-6" />,
    },
    {
      title: "Mobile-Friendly",
      description:
        "Outputs are vertical, short-form videos optimized for social feeds — ready to upload and go viral.",
      icon: <PersonStanding className="size-4 md:size-6" />,
    },
    {
      title: "Free to Use",
      description:
        "No complex pricing or paywalls — generate and share videos without worrying about hidden fees.",
      icon: <DollarSign className="size-4 md:size-6" />,
    },
    {
      title: "Hands-Free Workflow",
      description:
        "Just paste text or a Reddit link — everything else is fully automated, so you can focus on growing your channel.",
      icon: <MessagesSquare className="size-4 md:size-6" />,
    },
  ],
}: Feature17Props) => {
  return (
    <section className="py-12 px-3" id="Feature17">
      <div className="container mx-auto max-w-7xl">
        <p className="mb-4 text-xs text-muted-foreground md:pl-5">
          {subheading}
        </p>
        <h2 className="text-3xl font-medium md:pl-5 lg:text-4xl">{heading}</h2>
        <div className="mx-auto mt-14 grid gap-x-20 gap-y-8 md:grid-cols-2 md:gap-y-6 lg:mt-20">
          {features.map((feature, idx) => (
            <TopAnimation>
              <div className="flex gap-6 rounded-lg md:block md:p-5" key={idx}>
              <span className="mb-8 flex size-10 shrink-0 items-center justify-center rounded-full bg-accent md:size-12">
                {feature.icon}
              </span>
                <div>
                  <h3 className="font-medium md:mb-2 md:text-xl">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground md:text-base">
                    {feature.description}
                  </p>
                </div>
              </div>
            </TopAnimation>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Feature17 };
