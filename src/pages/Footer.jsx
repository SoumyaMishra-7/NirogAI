import { Heart, Twitter, Github, Linkedin, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-6 py-12 grid md:grid-cols-3 gap-8">
        
        {/* Brand Section */}
        <div>
          <Link to="/" className="flex items-center gap-2 mb-4">
            <Heart className="w-6 h-6 text-primary" />
            <span className="text-xl font-bold">NirogAI</span>
          </Link>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Your AI-powered healthcare companion – stay informed, stay healthy.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold text-foreground mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/get-started" className="hover:text-primary transition-colors">
                Get Started
              </Link>
            </li>
            <li>
              <Link to="/dashboard/symptoms" className="hover:text-primary transition-colors">
                Symptom Checker
              </Link>
            </li>
            <li>
              <Link to="/dashboard/VaccinationTracker" className="hover:text-primary transition-colors">
                Vaccination Tracker
              </Link>
            </li>
            <li>
              <Link to="/dashboard/ChatInterface" className="hover:text-primary transition-colors">
                Chat with AI
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Section */}
        <div>
          <h4 className="font-semibold text-foreground mb-3">Connect With Us</h4>
          <div className="flex gap-4">
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <Twitter className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer">
              <Github className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer">
              <Linkedin className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
            </a>
            <a href="mailto:contact@nirogai.com">
              <Mail className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t py-4 text-center text-sm text-muted-foreground">
        {new Date().getFullYear()} NirogAI. All rights reserved.
      </div>
    </footer>
  );
}
