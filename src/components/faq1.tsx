import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {TopAnimation} from "@/components/top-animaiton.tsx";

interface FaqItem {
  question: string;
  answer: string;
}

interface Faq1Props {
  heading?: string;
  items?: FaqItem[];
}

const Faq1 = ({
                heading = "Frequently asked questions",
                items = [
                  {
                    question: "What does this app do?",
                    answer:
                      "This app automatically converts Reddit stories or your own text into engaging short-form videos with voiceovers, subtitles, and visuals.",
                  },
                  {
                    question: "Is it free to use?",
                    answer:
                      "Yes! You can generate videos for free. We may add premium features later, but the core functionality is completely free.",
                  },
                  {
                    question: "Can I use the videos on TikTok or YouTube Shorts?",
                    answer:
                      "Absolutely. The videos are formatted for vertical platforms like TikTok, YouTube Shorts, and Instagram Reels.",
                  },
                  {
                    question: "Do I need to record my own voice?",
                    answer:
                      "No. The app uses AI-generated voiceovers, so you don’t need to record anything manually.",
                  },
                  {
                    question: "Can I customize the voice or style?",
                    answer:
                      "Currently, the app picks a default style and voice, but support for voice/style selection is coming soon.",
                  },
                  {
                    question: "Can I upload my own background video?",
                    answer:
                      "Currently, the app picks a default background video, but support for background video selection is coming soon.",
                  },
                  {
                    question: "How long does it take to generate a video?",
                    answer:
                      "Most videos are ready in under 2 minute, depending on the story length and server load.",
                  },
                  {
                    question: "Do I need to install anything?",
                    answer:
                      "Nope! This is a fully web-based app. You can generate and download videos directly in your browser.",
                  },
                ]

              }: Faq1Props) => {
  return (
    <section className="py-12 px-3" id="FAQ's">
      <div className="container max-w-3xl mx-auto">
        <h1 className="mb-4 text-3xl font-semibold md:mb-11 md:text-4xl">
          {heading}
        </h1>
        <Accordion type="single" collapsible>
          {items.map((item, index) => (
            <TopAnimation>
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="font-semibold hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            </TopAnimation>

          ))}
        </Accordion>
      </div>
    </section>
  );
};

export {Faq1};
