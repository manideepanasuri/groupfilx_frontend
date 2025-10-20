import {
  Users,
  HeartHandshake,
  ThumbsUp,
  MessageCircle,
  Sparkles,
  Clock,
} from "lucide-react";
import { TopAnimation } from "@/components/top-animaiton.tsx";

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
  heading = "What Makes GroupFlix Unique",
  subheading = "Core Features",
  features = [
    {
      title: "Collaborative Recommendations",
      description:
        "Blends everyone’s preferences with AI-driven consensus algorithms to recommend movies the whole group will enjoy.",
      icon: <Users className="size-5 md:size-7 text-primary" />,
    },
    {
      title: "Mood-Based Suggestions",
      description:
        "Pick your group’s vibe—from comedy to romance—and get recommendations matched perfectly to your current mood.",
      icon: <Sparkles className="size-5 md:size-7 text-primary" />,
    },
    {
      title: "Voting and Polling System",
      description:
        "Finalize what to watch with fair, real-time voting—ensuring every movie night feels democratic and fun.",
      icon: <ThumbsUp className="size-5 md:size-7 text-primary" />,
    },
    {
      title: "Social Discovery",
      description:
        "See trending movies in your circle, explore what friends are watching, and get inspired by collective taste.",
      icon: <HeartHandshake className="size-5 md:size-7 text-primary" />,
    },
    {
      title: "Interactive Comments",
      description:
        "Discuss movies, share reactions, and chat live with your group—every movie becomes a shared experience.",
      icon: <MessageCircle className="size-5 md:size-7 text-primary" />,
    },
    {
      title: "Weekly Trends & Insights",
      description:
        "Discover your group’s weekly top picks, most discussed films, and compatibility scores to see how your tastes align.",
      icon: <Clock className="size-5 md:size-7 text-primary" />,
    },
  ],
}: Feature17Props) => {
  return (
    <section
      className="relative py-16 px-6 bg-gradient-to-b from-background via-muted/10 to-background"
      id="Feature17"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <p className="mb-2 text-sm uppercase tracking-widest text-primary/80">
            {subheading}
          </p>
          <h2 className="text-4xl font-semibold tracking-tight lg:text-5xl gradient-text">
            {heading}
          </h2>
        </div>

        <div className="grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-16">
          {features.map((feature, idx) => (
            <TopAnimation key={idx}>
              <div className="group relative rounded-xl border border-border/30 bg-card/50 p-6 backdrop-blur-md shadow-sm hover:shadow-lg hover:border-primary/40 transition-all duration-300">
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary/20 transition-all duration-300">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-lg mb-2 text-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </TopAnimation>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Feature17 };
