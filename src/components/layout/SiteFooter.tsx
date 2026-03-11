import React from "react";
import { Container } from "./Container";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/40 bg-muted/30 pt-16 pb-8">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-16">
          <div className="md:col-span-2">
            <span className="text-2xl font-bold tracking-tight inline-block mb-4">Picasso Barbershop</span>
            <p className="text-muted-foreground text-sm max-w-sm leading-relaxed mb-6">
              A premium salon experience based in Vilnius. Discover our branches and top-tier specialists.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium text-foreground mb-4">Explore</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Services</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Branches</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Gallery</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">About</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-foreground mb-4">Legal</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-border/50 text-center md:text-left text-sm text-muted-foreground/60 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} Picasso Barbershop. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-foreground transition-colors">Instagram</a>
            <a href="#" className="hover:text-foreground transition-colors">Facebook</a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
