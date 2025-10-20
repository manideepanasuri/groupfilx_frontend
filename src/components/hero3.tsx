import { ArrowDownRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface Hero3Props {
  heading?: string;
  description?: string;
  buttons?: {
    primary?: { text: string; url: string };
    secondary?: { text: string; url: string };
  };
  reviews?: {
    count: number;
    avatars: { src: string; alt: string }[];
    rating?: number;
  };
}

const Hero3 = ({
  heading = "Watch Smarter, Together",
  description = "Discover the perfect movie for your group — GroupFlix blends everyone’s preferences to find films everyone will love. Say goodbye to endless scrolling and disagreements.",
  buttons = {
    primary: { text: "Sign Up", url: "/signup" },
    secondary: { text: "Get Started", url: "/login" },
  },
}: Hero3Props) => {
  return (
    <section id="Hero3" className="py-16 md:px-4 lg:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left - Content */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <h1 className="my-6 text-4xl font-bold lg:text-6xl xl:text-7xl leading-tight tracking-tight">
              {heading}
            </h1>
            <p className="mb-10 max-w-xl text-muted-foreground text-base md:text-lg lg:text-xl">
              {description}
            </p>
            <div className="flex w-full flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
              {buttons.primary && (
                <Button asChild className="w-full sm:w-auto">
                  <Link to={buttons.primary.url}>{buttons.primary.text}</Link>
                </Button>
              )}
              {buttons.secondary && (
                <Button asChild variant="outline" className="w-full sm:w-auto">
                  <Link to={buttons.secondary.url}>
                    {buttons.secondary.text}
                    <ArrowDownRight className="ml-2 size-4" />
                  </Link>
                </Button>
              )}
            </div>
          </div>
          {/* Right - Image */}
          <div className="flex justify-center lg:justify-end">
            <img
              src="/hero.png"
              alt="Group watching movie illustration"
              className="max-h-[700px] w-full rounded-lg object-cover object-center"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export { Hero3 };
