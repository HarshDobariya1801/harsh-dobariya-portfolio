import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://harshdobariya.com"),
  title: "Harsh Dobariya — Software Engineer",
  description:
    "Harsh Dobariya is a Software Engineer in Arizona building backend systems, full-stack applications, and distributed systems in the United States.",
  keywords: [
    "Harsh Dobariya",
    "Software Engineer",
    "Full-Stack Developer",
    "React",
    "Node.js",
    "Distributed Systems",
  ],
  authors: [{ name: "Harsh Dobariya" }],
  creator: "Harsh Dobariya",
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Harsh Dobariya — Software Engineer",
    description:
      "Backend systems, full-stack applications, and distributed systems by a Software Engineer in Arizona.",
    type: "website",
    url: "https://harshdobariya.com",
    siteName: "Harsh Dobariya",
    images: [
      {
        url: "https://harshdobariya.com/og.png",
        width: 1200,
        height: 630,
        alt: "Harsh Dobariya, Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Harsh Dobariya — Software Engineer",
    description:
      "Backend systems, full-stack applications, and distributed systems by a Software Engineer in Arizona.",
    images: ["https://harshdobariya.com/og.png"],
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Harsh Dobariya",
  url: "https://harshdobariya.com",
  jobTitle: "Software Engineer",
  email: "mailto:dobariyaharsh10@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Tempe",
    addressRegion: "Arizona",
    addressCountry: "US",
  },
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "Arizona State University" },
    { "@type": "CollegeOrUniversity", name: "Gujarat Technological University" },
  ],
  sameAs: [
    "https://github.com/HarshDobariya1801",
    "https://www.linkedin.com/in/harsh-dobariya-962238183/",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){
  var root=document.documentElement;
  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var revealItems=Array.from(document.querySelectorAll('[data-reveal]'));
  if(reduce||!('IntersectionObserver' in window)){
    revealItems.forEach(function(item){item.classList.add('is-visible')});
  }else{
    root.classList.add('reveal-ready');
    var revealObserver=new IntersectionObserver(function(entries){
      entries.forEach(function(entry){if(entry.isIntersecting){entry.target.classList.add('is-visible');revealObserver.unobserve(entry.target)}});
    },{rootMargin:'0px 0px -8%',threshold:0.08});
    revealItems.forEach(function(item){revealObserver.observe(item)});
  }

  var header=document.querySelector('[data-site-header]');
  var navLinks=Array.from(document.querySelectorAll('[data-nav-link]'));
  function onScroll(){
    if(header)header.classList.toggle('is-scrolled',window.scrollY>18);
  }
  onScroll();
  window.addEventListener('scroll',onScroll,{passive:true});
  if('IntersectionObserver' in window){
    var sectionObserver=new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(!entry.isIntersecting)return;
        navLinks.forEach(function(link){
          if(link.hash==='#'+entry.target.id)link.setAttribute('aria-current','location');
          else link.removeAttribute('aria-current');
        });
      });
    },{rootMargin:'-18% 0px -70% 0px'});
    document.querySelectorAll('[data-nav-section]').forEach(function(section){sectionObserver.observe(section)});
  }

  var menu=document.querySelector('[data-mobile-nav]');
  if(menu){
    menu.addEventListener('toggle',function(){
      document.body.classList.toggle('menu-open',menu.open);
      if(menu.open)requestAnimationFrame(function(){var first=menu.querySelector('a');if(first)first.focus()});
    });
    menu.querySelectorAll('a').forEach(function(link){link.addEventListener('click',function(){menu.open=false;document.body.classList.remove('menu-open')})});
    document.addEventListener('keydown',function(event){
      if(event.key==='Escape'&&menu.open){menu.open=false;document.body.classList.remove('menu-open');var summary=menu.querySelector('summary');if(summary)summary.focus();return}
      if(event.key==='Tab'&&menu.open){
        var focusable=Array.from(menu.querySelectorAll('summary,a[href]'));var first=focusable[0];var last=focusable[focusable.length-1];
        if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus()}
        else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus()}
      }
    });
  }

  document.querySelectorAll('[data-copy-email]').forEach(function(button){
    button.addEventListener('click',async function(){
      var email=button.getAttribute('data-copy-email');
      try{
        await navigator.clipboard.writeText(email);
        var label=button.querySelector('span');var icon=button.querySelector('i');
        if(label)label.textContent='Copied';if(icon)icon.textContent='✓';
        window.setTimeout(function(){if(label)label.textContent='Copy email';if(icon)icon.textContent='⧉'},1800);
      }catch(error){window.location.href='mailto:'+email}
    });
  });

  if(!reduce&&'IntersectionObserver' in window){
    var countObserver=new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(!entry.isIntersecting)return;
        countObserver.unobserve(entry.target);
        var value=entry.target.getAttribute('data-count-value')||'';
        var match=value.match(/^([\\d,]+)(.*)$/);if(!match)return;
        var target=Number(match[1].replaceAll(',',''));var suffix=match[2];var start=performance.now();
        function tick(now){var progress=Math.min((now-start)/650,1);var eased=1-Math.pow(1-progress,3);var current=Math.round(target*eased);entry.target.textContent=(target>=1000?current.toLocaleString('en-US'):String(current))+suffix;if(progress<1)requestAnimationFrame(tick)}
        requestAnimationFrame(tick);
      });
    },{threshold:0.5});
    document.querySelectorAll('[data-count-value]').forEach(function(item){countObserver.observe(item)});
  }
})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </body>
    </html>
  );
}
