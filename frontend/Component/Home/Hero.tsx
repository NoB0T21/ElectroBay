'use client'
import { motion } from 'framer-motion'
import { ArrowRight, Link, MapPin } from 'lucide-react'
import React from 'react'

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-accent/10 to-background py-16 md:py-24">
        <div className=" text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/15 px-4 py-1.5 text-sm font-medium text-foreground mb-6">
              <MapPin className="h-4 w-4 text-primary" />
              Your neighborhood marketplace
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-bold leading-tight mb-4">
              Shop Local,<br />
              <span className="text-primary">Support Your Community</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">
              Discover handcrafted goods, fresh produce, and unique finds from stores right around the corner.
            </p>
            <Link href="/browse" className="gap-2 text-base px-8">
                Start Browsing <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>
  )
}

export default Hero
