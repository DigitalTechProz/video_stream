"use client";

import React from 'react';
import Link from 'next/link';

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
}

const FooterLink: React.FC<FooterLinkProps> = ({ href, children }) => (
  <li>
    <Link href={href}>
      <span className="hover:text-white transition-colors duration-200">{children}</span>
    </Link>
  </li>
);

interface FooterColumnProps {
  title: string;
  links: Array<{ href: string; text: string }>;
}

const FooterColumn: React.FC<FooterColumnProps> = ({ title, links }) => (
  <div>
    <h2 className="text-white text-lg font-bold mb-4">{title}</h2>
    <ul className="space-y-2">
      {links.map((link, index) => (
        <FooterLink key={index} href={link.href}>{link.text}</FooterLink>
      ))}
    </ul>
  </div>
);

// SVG icon components
const TwitterIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
  </svg>
);

const FacebookIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const InstagramIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const LinkedinIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const YoutubeIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
  </svg>
);

const Footer: React.FC = () => {
  const columns: FooterColumnProps[] = [
    {
      title: "Company",
      links: [
        { href: "#", text: "About" },
        { href: "#", text: "Careers" },
        { href: "#", text: "Our Culture" },
        { href: "#", text: "Giving" },
        { href: "#", text: "Press Room" },
        { href: "#", text: "Partners" },
        { href: "#", text: "Buzz SA Merch" },
        { href: "#", text: "The BuzzSA Stream Blog" },
        { href: "#", text: "Advertise with Us" }
      ]
    },
    /*{
      title: "Plex Pass",
      links: [
        { href: "/premium", text: "Go Premium" },
        { href: "/labs", text: "Plex Labs" },
        { href: "/perks", text: "Get Perks" },
        { href: "/tidal", text: "TIDAL x Plex" }
      ]
    },*/
    {
      title: "Downloads",
      links: [
      /*  { href: "/server", text: "Plex Media Server" },*/
        { href: "#", text: "Apps & Devices" },
        { href: "#", text: "Where to Watch" }
      ]
    },
    {
      title: "Support",
      links: [
        { href: "#", text: "Finding Help" },
       /* { href: "/library", text: "Support Library" },
        { href: "/forums", text: "Community Forums" },*/
        { href: "#", text: "Billing Questions" },
       /* { href: "/status", text: "Status" },*/
       /* { href: "/bug-bounty", text: "Bug Bounty" },
        { href: "/cordcutter", text: "CordCutter" },*/
        { href: "#", text: "Get in Touch" }
      ]
    },
    {
      title: "Watch Free",
      links: [
        { href: "#hero", text: "Discover on BuzzSA Stream" },
        { href: "#moviesection", text: "Buzz Series" },
        { href: "#", text: "What to Watch" },
        /*{ href: "/hulu", text: "What to Watch on Hulu" },*/
       /* { href: "/a24", text: "A24 collection" },
        { href: "/movies", text: "Movies Database" }*/
      ]
    }
  ];

  return (
    <footer className="bg-black text-gray-400 py-8 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8">
          {columns.map((column, index) => (
            <FooterColumn key={index} {...column} />
          ))}
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-gray-700 pt-8">
          <div className="flex flex-wrap justify-center md:justify-start space-x-4 mb-4 md:mb-0">
            <span>© 2024 BuzzSA Stream</span>
            <Link href="#"><span className="hover:text-white transition-colors duration-200">Privacy & Legal</span></Link>
            <Link href="#"><span className="hover:text-white transition-colors duration-200">Ad Choices</span></Link>
            <Link href="#"><span className="hover:text-white transition-colors duration-200">Accessibility</span></Link>
            <Link href="#"><span className="hover:text-white transition-colors duration-200">Manage Cookies</span></Link>
          </div>
          <div className="flex space-x-4">
            <a href="#" aria-label="Twitter"><TwitterIcon /></a>
            <a href="#" aria-label="Facebook"><FacebookIcon /></a>
            <a href="#" aria-label="Instagram"><InstagramIcon /></a>
            <a href="#" aria-label="LinkedIn"><LinkedinIcon /></a>
            <a href="#" aria-label="YouTube"><YoutubeIcon /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;