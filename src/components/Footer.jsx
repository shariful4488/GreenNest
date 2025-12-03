import React from "react";

const InstagramIcon = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const FacebookIcon = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const PinterestIcon = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2C6.48 2 2 6.48 2 12c0 4.29 2.76 7.91 6.64 9.17-.1-.94-.04-2.02.26-3.08.31-1.07 1.63-6.9 1.63-6.9s-.42-.84-.42-2.07c0-1.94 1.12-3.39 2.51-3.39 1.18 0 1.76.88 1.76 1.94 0 1.18-.75 2.92-1.13 4.54-.31 1.34.67 2.45 2 2.45 2.4 0 4.07-2.6 4.07-5.96 0-3.32-2.3-5.65-6-5.65-4.14 0-6.9 3.12-6.9 6.64 0 1.3.48 2.37 1.15 3.02.13.12.16.2.13.33-.03.14-.1.4-.12.51-.07.38-.28 1.54-.33 1.77-.04.14-.14.18-.28.11-1.16-.62-1.89-2.31-1.89-4.32 0-3.92 3.32-7.53 8.87-7.53C17.27 4.47 22 8.16 22 12.77c0 3.73-2.09 6.65-4.95 7.02-.1.01-.2-.04-.26-.14-.04-.1-.05-.28-.02-.45.09-.43.43-1.8.54-2.22.06-.21.04-.37-.08-.57-.42-.66-1.12-1.18-1.92-1.18-1.55 0-2.82 1.44-2.82 3.42 0 2.05 1.32 3.75 3.32 3.75 1.35 0 2.33-.7 2.73-1.42.04-.08.06-.18.04-.28-.05-.28-.18-.76-.23-1.03-.09-.5-.31-1.3-.87-2.73z"></path>
  </svg>
);


const FooterLink = ({ href, children }) => (
  <a href={href} className="text-gray-700 hover:text-green-800 transition duration-300 relative group text-sm font-light">
    {children}
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-800 transition-all duration-300 group-hover:w-full"></span>
  </a>
);


const FooterSectionTitle = ({ children }) => (
  <h3 className="text-lg font-bold text-green-800 mb-4 pb-1">{children}</h3>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const navSections = [
    {
      title: "Quick Links",
      links: [
        { name: "Home", href: "/" },
        { name: "All Plants", href: "/plants" },
        { name: "Profile", href: "/profile" },
        { name: "Add Service", href: "/add-services" },
        
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Care Guides", href: "#resources" },
        { name: "About Us", href: "#about" },
        { name: "Privacy Policy", href: "#privacy" },
        { name: "Contact", href: "#contact" },
      ],
    },
  ];

  const socialLinks = [
    { icon: InstagramIcon, href: "https://www.instagram.com/", name: "Instagram", color: "text-pink-500" },
    { icon: FacebookIcon, href: "https://www.facebook.com/", name: "Facebook", color: "text-blue-600" },
    { icon: PinterestIcon, href: "https://www.pinterest.com/", name: "Pinterest", color: "text-red-600" },
  ];

  return (
    <footer className="font-[Inter] overflow-hidden">   
      <div className="bg-green-50 pt-12 pb-10 text-gray-800"> 
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
      
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-24">
            
            
            <div className="space-y-4 md:col-span-1">
              <h2 className="text-4xl font-extrabold flex items-center">
                <span className="text-green-900 ml-2">GreenNest</span>
              </h2>
                 
              <p className="text-gray-700 max-w-sm text-base leading-relaxed">
                Nurturing your home, naturally. We connect people with the perfect plants for a healthier, greener living space.
              </p>
            </div> 
            {navSections.map((section) => (
              <div key={section.title} className="space-y-4 md:col-span-1">
                <FooterSectionTitle>{section.title}</FooterSectionTitle>
                <ul className="space-y-3 flex flex-col">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <FooterLink href={link.href}>{link.name}</FooterLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

         
            <div className="space-y-4 md:col-span-1 md:text-right">
              <FooterSectionTitle>Follow Our Journey</FooterSectionTitle>
              <div className="flex justify-start md:justify-end space-x-6">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`transition duration-300 transform hover:scale-110 ${link.color}`} 
                  >
                    <link.icon className="w-7 h-7" fill="currentColor" />
                  </a>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
        

      <div className="bg-green-900 text-white py-4">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center text-sm">
              <p>&copy; {currentYear} GreenNest. All rights reserved.</p>
          </div>
      </div>
    </footer>
  );
};

export default Footer;
