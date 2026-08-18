"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  PaperPlaneTilt as Send,
  Envelope as Mail,
  CircleNotch as Loader2,
  CheckCircle as CheckCircle2,
  Copy,
  Check,
  Clock,
} from "@phosphor-icons/react/ssr";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { sendEmail } from "@/app/actions/sendEmail";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [copied, setCopied] = useState(false);
  const [time, setTime] = useState("");

  const EMAIL = "iannmacabulos@gmail.com";

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Manila",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      };
      setTime(new Intl.DateTimeFormat("en-US", options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);
    const result = await sendEmail(formData);

    if (result.error) {
      setErrorMessage(result.error);
      setIsSubmitting(false);
    } else {
      setIsSuccess(true);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex w-full max-w-6xl mx-auto flex-col gap-12 p-4 pt-8 md:p-8 md:pt-20 lg:p-12 lg:pt-24">
      {/* --- HEADER --- */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-3xl"
      >
        <div className="flex items-center gap-3 mb-4">
          <Badge
            variant="outline"
            className="px-3 py-1 border-primary/20 text-primary bg-primary/5"
          >
            <span className="relative flex h-2 w-2 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Available for new projects
          </Badge>
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground mb-4">
          Let’s work together.
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          I’m currently looking for freelance opportunities or a full-time role.
          If you have a project that needs a clean, performant interface, I'd
          love to hear about it.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 xl:gap-20 items-start">
        {/* --- LEFT COLUMN: INFO & STEPS --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-5 flex flex-col gap-8"
        >
          {/* 1. Direct Contact */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Direct Contact
            </h3>
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-primary/0 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
              <div className="relative flex items-center gap-3 p-2 pr-2 rounded-xl border border-border bg-card/50">
                <div className="h-10 w-10 rounded-lg bg-background flex items-center justify-center shrink-0 border border-border/50">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate select-all">
                    {EMAIL}
                  </p>
                </div>
                <Button
                  onClick={handleCopy}
                  variant="ghost"
                  size="sm"
                  className="h-9 w-9 p-0 hover:bg-background hover:text-primary shrink-0 relative"
                >
                  <AnimatePresence mode="wait">
                    {copied ? (
                      <motion.div
                        key="check"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                      >
                        <Check className="w-4 h-4" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="copy"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                      >
                        <Copy className="w-4 h-4" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Button>
              </div>
            </div>
          </div>

          <div className="w-full h-px bg-border/50" />

          {/* 2. Timeline Steps */}
          <div className="space-y-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              What happens next?
            </h3>
            <div className="space-y-6">
              {/* STEP 1 */}
              <div className="flex gap-4">
                <div className="flex flex-col items-center flex-none">
                  <div className="flex-none h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold z-10 border border-primary/20 shadow-sm">
                    1
                  </div>
                  <div className="w-px h-full bg-border/50 my-2" />
                </div>
                <div className="pb-2 pt-2">
                  <h4 className="font-bold text-foreground">Send a Message</h4>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                    Fill out the form on the right. I'll receive an instant
                    notification via my personal API integration.
                  </p>
                </div>
              </div>

              {/* STEP 2 */}
              <div className="flex gap-4">
                <div className="flex flex-col items-center flex-none">
                  <div className="flex-none h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold z-10 border border-primary/20 shadow-sm">
                    2
                  </div>
                  <div className="w-px h-full bg-border/50 my-2" />
                </div>
                <div className="pb-2 pt-2">
                  <h4 className="font-bold text-foreground">I'll Respond</h4>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                    As a student, I balance this with my studies, but I
                    typically respond within the day.
                  </p>
                </div>
              </div>

              {/* STEP 3 */}
              <div className="flex gap-4">
                <div className="flex flex-col items-center flex-none">
                  <div className="flex-none h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold z-10 border border-primary/20 shadow-sm">
                    3
                  </div>
                </div>
                <div className="pt-2">
                  <h4 className="font-bold text-foreground">We Connect</h4>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                    If we're a good fit, we'll discuss your idea and how I can
                    help bring it to life.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* --- RIGHT COLUMN: FORM & TIME --- */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="lg:col-span-7 flex flex-col gap-6"
        >
          <Card className="border border-border/40 shadow-sm bg-card/30 overflow-hidden py-0">
            <CardContent className="p-5 md:p-6">
              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center py-10 space-y-4"
                >
                  <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center text-primary shadow-inner">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-foreground">
                      Message received!
                    </h3>
                    <p className="text-muted-foreground max-w-[280px] mx-auto text-sm">
                      Thank you for reaching out. I'll get back to you shortly.
                    </p>
                  </div>
                  <Button
                    onClick={() => setIsSuccess(false)}
                    variant="outline"
                    size="sm"
                    className="mt-2"
                  >
                    Send another message
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label
                        htmlFor="name"
                        className="text-xs font-semibold ml-1 text-muted-foreground uppercase tracking-wide"
                      >
                        Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="John Doe"
                        required
                        className="bg-background/50 focus:bg-background transition-colors h-9"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label
                        htmlFor="email"
                        className="text-xs font-semibold ml-1 text-muted-foreground uppercase tracking-wide"
                      >
                        Email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        required
                        className="bg-background/50 focus:bg-background transition-colors h-9"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="subject"
                      className="text-xs font-semibold ml-1 text-muted-foreground uppercase tracking-wide"
                    >
                      Subject
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      placeholder="Project Inquiry / Just saying hi"
                      required
                      className="bg-background/50 focus:bg-background transition-colors h-9"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="message"
                      className="text-xs font-semibold ml-1 text-muted-foreground uppercase tracking-wide"
                    >
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell me about your project..."
                      required
                      className="min-h-[120px] bg-background/50 focus:bg-background resize-none p-4 transition-colors"
                    />
                  </div>

                  {errorMessage && (
                    <div className="text-red-500 text-xs font-medium bg-red-500/10 p-2.5 rounded-md flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                      {errorMessage}
                    </div>
                  )}

                  <div className="pt-2">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="group relative w-full font-bold shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary/50 hover:-translate-y-0.5 active:translate-y-0.5 h-10 overflow-hidden"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center">
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Sending...
                        </span>
                      ) : (
                        <span className="flex items-center justify-center w-full">
                          Send Message
                          <div className="relative ml-2 flex items-center justify-center w-4 h-4">
                            {/* Outgoing icon */}
                            <Send className="absolute transition-all duration-300 ease-in group-hover:translate-x-6 group-hover:-translate-y-6 group-hover:opacity-0 group-hover:scale-50 group-hover:rotate-45" />
                            {/* Incoming icon */}
                            <Send className="absolute transition-all duration-300 delay-75 ease-out -translate-x-6 translate-y-6 opacity-0 scale-50 -rotate-45 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100 group-hover:scale-100 group-hover:rotate-0" />
                          </div>
                        </span>
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>

          {/* 3. Local Time Widget */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/30 border border-border/50">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-background flex items-center justify-center border border-border/50">
                <Clock className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                  My Local Time
                </span>
                <span className="text-sm font-medium text-foreground">
                  Pampanga, PH (GMT+8)
                </span>
              </div>
            </div>
            <div className="text-xl font-mono font-bold text-primary">
              {time || "--:--"}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}