import { PricingCalculator } from "@/components/pricing-calculator";
import Link from "next/link";

import { ArrowRight } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

export default function CloudPage() {
    return (
        <main className="min-h-screen bg-white text-zinc-950 font-sans selection:bg-zinc-100 selection:text-zinc-900">
            {/* Hero Section */}
            <section className="relative pt-16 pb-20 overflow-hidden">
                <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
                <div className="container mx-auto px-4 text-center">
                    <Badge variant="secondary" className="mb-4 bg-blue-50 text-blue-700 hover:bg-blue-100 px-2.5 py-0.5 border border-blue-100 text-xs font-normal rounded-full">
                        Traceway Cloud
                    </Badge>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-zinc-900">
                        Managed Traceway <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">for Teams</span>
                    </h1>
                    <p className="text-zinc-600 text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed font-medium">
                        Focus on shipping features, not managing infrastructure. Get all the power of Traceway with zero maintenance.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                        <Link href="http://cloud.tracewayapp.com/register" className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-all cursor-pointer h-10 px-6 bg-[#4ba3f7] text-white hover:bg-[#3b93e7] font-bold shadow-sm shadow-blue-400/20">
                                Start Free Trial <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                        <Link href="https://docs.tracewayapp.com/cloud" className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-all cursor-pointer h-10 px-6 border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-900">
                                How it works
                        </Link>
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section className="py-24 bg-zinc-50/50 border-y border-zinc-100">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-zinc-900 tracking-tight">Simple, predictable pricing</h2>
                        <p className="text-zinc-600 text-lg max-w-xl mx-auto">
                            Start for free and scale as you grow. No credit card required for the starter plan.
                        </p>
                    </div>

                    <PricingCalculator />
                </div>
            </section>

            {/* Cloud vs Self-Hosted Q&A */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4 max-w-3xl">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4 text-zinc-900 tracking-tight">Cloud FAQ</h2>
                        <p className="text-zinc-600 text-lg">
                            Common questions about Traceway Cloud, pricing, and support.
                        </p>
                    </div>

                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-support" className="border-b-zinc-200">
                            <AccordionTrigger className="text-zinc-900 hover:text-zinc-700 hover:no-underline text-left">
                                What support do Cloud customers get?
                            </AccordionTrigger>
                            <AccordionContent className="text-zinc-600 leading-relaxed">
                                All Cloud customers on a paid plan can open GitHub issues that are triaged with highest priority by our engineering team.
                                You are not routed to a help desk — you talk directly to the people who build Traceway.
                                Enterprise+ customers also receive a shared Slack channel with direct access to the Traceway team for real-time collaboration, incident support, and onboarding assistance.
                                Self-hosted and open-source users are welcome to open GitHub issues and participate in community discussions. We actively monitor and respond to all issues.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-overages" className="border-b-zinc-200">
                            <AccordionTrigger className="text-zinc-900 hover:text-zinc-700 hover:no-underline text-left">
                                Are there overage charges?
                            </AccordionTrigger>
                            <AccordionContent className="text-zinc-600 leading-relaxed">
                                No. Every plan has a fixed monthly price. If you approach your included volume, we will notify you in advance so you can decide whether to upgrade.
                                Your bill will never increase without your explicit approval. What you see on the pricing table is what you pay — no metered billing, no surprise line items, no usage-based surcharges.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-cost-at-scale" className="border-b-zinc-200">
                            <AccordionTrigger className="text-zinc-900 hover:text-zinc-700 hover:no-underline text-left">
                                How does Traceway Cloud compare on cost at scale?
                            </AccordionTrigger>
                            <AccordionContent className="text-zinc-600 leading-relaxed">
                                At the Enterprise tier, 200 million monthly events cost $499.99 — that is $0.0000025 per event.
                                Competitors like Datadog and Sentry charge orders of magnitude more at the same volume, often with additional per-host, per-seat, or overage fees on top.
                                For workloads beyond 200 million events, our Enterprise+ plan offers even cheaper per-event pricing with a dedicated SRE and shared Slack channel.
                                We price based on your actual infrastructure cost, not on a per-event markup, which means pricing stays reasonable even at billions of events per month.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-events" className="border-b-zinc-200">
                            <AccordionTrigger className="text-zinc-900 hover:text-zinc-700 hover:no-underline text-left">
                                What counts as an event?
                            </AccordionTrigger>
                            <AccordionContent className="text-zinc-600 leading-relaxed">
                                An event is any single issue (exception), HTTP request, or background task run that Traceway ingests.
                                Session replays, distributed trace spans, and custom metrics are included at no additional cost and do not count toward your event volume.
                                For example, if your application handles 50,000 HTTP requests and encounters 200 exceptions in a month, that is 50,200 events.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-fixed-costs" className="border-b-zinc-200">
                            <AccordionTrigger className="text-zinc-900 hover:text-zinc-700 hover:no-underline text-left">
                                How does &ldquo;fixed costs&rdquo; work for Cloud vs. Self-Hosted?
                            </AccordionTrigger>
                            <AccordionContent className="text-zinc-600 leading-relaxed">
                                Self-hosted Traceway runs on your own infrastructure with zero licensing cost — your only expense is the server itself, and ClickHouse compression keeps that minimal.
                                Traceway Cloud has fixed-price tiers: you pick a plan, pay that amount monthly, and there are no overage charges, per-event fees, or surprise line items.
                                In both cases, the cost is predictable. The difference is whether you manage the infrastructure yourself (self-hosted) or we manage it for you (cloud).
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-1" className="border-b-zinc-200">
                            <AccordionTrigger className="text-zinc-900 hover:text-zinc-700 hover:no-underline text-left">
                                Why use Traceway Cloud?
                            </AccordionTrigger>
                            <AccordionContent className="text-zinc-600 leading-relaxed">
                                Traceway Cloud is simply for teams that don't want to self-host. We run the exact same open-source code but manage the infrastructure, updates, and backups for you.
                                It allows you to focus on shipping features without worrying about maintaining an observability stack.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2" className="border-b-zinc-200">
                            <AccordionTrigger className="text-zinc-900 hover:text-zinc-700 hover:no-underline text-left">
                                Is the Open Source version limited?
                            </AccordionTrigger>
                            <AccordionContent className="text-zinc-600 leading-relaxed">
                                No. The code is 100% open source and fully featured. We do not gate features behind the cloud version.
                                The cloud offering exists solely for convenience and for users who prefer a managed service over self-hosting.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3" className="border-b-zinc-200">
                            <AccordionTrigger className="text-zinc-900 hover:text-zinc-700 hover:no-underline text-left">
                                Can I migrate from Cloud to Self-Hosted later?
                            </AccordionTrigger>
                            <AccordionContent className="text-zinc-600 leading-relaxed">
                                Yes, since the underlying software is the same, we can work with you to export your data and migrate to a self-hosted instance at any time.
                                You are never locked into our cloud platform.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </section>
        </main>
    );
}
