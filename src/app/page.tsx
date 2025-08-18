"use client";

import { ModeToggle } from "@/components/theme-switcher";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion"
import { Clock, Heart, Star, ShoppingCart, Link, Smartphone } from "lucide-react";
import Image from "next/image";


export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <motion.div 
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-xl font-medium text-primary">Neatly</span>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex"
          >
            <Button variant="outline" className="mr-2">Sign In</Button>
            <Button className="mr-2">Get Started</Button>
          </motion.div>
        </div>
      </header>

      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl lg:text-6xl font-medium text-foreground mb-6">
                Turn Any Recipe Into
                <span className="text-primary block">Smart Shopping Lists</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Extract ingredients from any recipe website and generate organized shopping lists. 
                Combine multiple recipes, group by ingredient type, and never forget an item again.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="/create">
                <Button size="lg" className="text-base cursor-pointer">
                  <Link className="mr-2 h-5 w-5" />
                  Extract Recipe
                </Button>
                </a>
                <Button size="lg" variant="outline" className="text-base">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Create Shopping List
                </Button>
              </div>
              
              <div className="flex items-center gap-6 mt-8 pt-8 border-t border-border">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-chart-1 border-2 border-background"></div>
                    <div className="w-8 h-8 rounded-full bg-chart-2 border-2 border-background"></div>
                    <div className="w-8 h-8 rounded-full bg-chart-3 border-2 border-background"></div>
                  </div>
                  <span className="text-sm text-muted-foreground">5k+ organized cooks</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm text-muted-foreground ml-1">4.9/5 rating</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              
              {/* Floating cards */}
              <motion.div
                className="absolute -top-4 -left-4 bg-card border border-border rounded-xl p-4 shadow-lg"
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-chart-1" />
                  <span className="text-sm font-medium">15 min</span>
                </div>
              </motion.div>

              <Image
                src={'/shopping.jpg'}
                width={700}
                height={500}
                alt="image"
                className="rounded"
              />
              
              <motion.div
                className="absolute -bottom-4 -right-4 bg-card border border-border rounded-xl p-4 shadow-lg"
                animate={{ y: [5, -5, 5] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
              >
                <div className="flex items-center gap-2">
                  <Heart className="h-4 w-4 text-destructive fill-destructive" />
                  <span className="text-sm font-medium">2.1k likes</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-5xl font-medium text-foreground mb-4">
              Everything You Need to Shop Smart
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From recipe extraction to organized shopping lists, we&apos;ve got all the tools 
              to make meal planning efficient and stress-free.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Link,
                title: "Recipe URL Extraction",
                description: "Paste any recipe URL and instantly extract all ingredients with smart parsing"
              },
              {
                icon: ShoppingCart,
                title: "Smart Shopping Lists",
                description: "Generate organized shopping lists grouped by ingredient type and store layout"
              },
              {
                icon: Smartphone,
                title: "Export & Share",
                description: "Copy to clipboard, text to phone, or email your organized shopping lists"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="aspect-video rounded-lg overflow-hidden mb-4 bg-muted">
                      
                    </div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-lg bg-primary/5">
                        <feature.icon className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="font-medium text-foreground">{feature.title}</h3>
                    </div>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="bg-gradient-to-r from-primary to-primary/80 rounded-3xl p-12 text-center text-primary-foreground"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-5xl font-medium mb-4">
              Ready to Shop Smarter?
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Join thousands of organized home cooks who have streamlined their meal planning with Neatly. 
              Start extracting recipes and creating smart shopping lists today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="text-base">
                <Link className="mr-2 h-5 w-5" />
                Try Recipe Extraction
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <span className="font-medium text-foreground">Neatly</span>
              <ModeToggle/>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms</a>
              <a href="#" className="hover:text-foreground transition-colors">Support</a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            © 2025 Neatly. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
