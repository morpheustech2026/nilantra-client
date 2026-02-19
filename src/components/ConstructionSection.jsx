import React, { useEffect, useRef, useState } from "react";
import constructionVideo from "../assets/constvideo1.mp4";

export default function ConstructionSection() {

  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();

  }, []);



  return (

<section

ref={sectionRef}

className="

min-h-screen
flex items-center justify-center

px-6 md:px-20

bg-gradient-to-r
from-[#071c3a]
to-[#020c1b]

overflow-hidden

"

>


<div className="

max-w-7xl w-full

grid md:grid-cols-2

gap-16

items-center

">


{/* LEFT */}



<div

className={`

transform transition-all duration-1000 ease-out

${visible
? "translate-x-0 opacity-100"
: "-translate-x-32 opacity-0"
}

`}

>


{/* PREMIUM FINISH */}


<span className="

inline-block

text-yellow-400/80
border border-yellow-400/40

px-4 py-[3px]

rounded-full

text-xs

tracking-[3px]

uppercase

mb-5

">

PREMIUM FINISH

</span>




{/* HEADING — SERIF + ITALIC COMBO */}



<h2 className="

text-white

text-4xl md:text-5xl   /* size reduced */

font-serif             /* serif font */

font-light

leading-tight

mb-6

">

Luxury{" "}

<span className="

italic

text-yellow-500

font-serif

font-small

">

Construction

</span>

<br />

Solutions

</h2>




{/* TEXT */}


<p className="text-gray-300 text-lg mb-4 max-w-xl">

We provide high-quality construction services with expert craftsmanship
and premium materials.

</p>

<p
className={`

text-gray-400
text-lg
mb-10
max-w-xl

transition-opacity
duration-1000
delay-300

${visible
? "opacity-100"
: "opacity-0"
}

`}

>



Perfect for homes, villas, and commercial projects.

</p>




{/* BUTTON (same animation preserved) */}



<button className="

px-10 py-4

rounded-full

font-semibold

text-black

bg-gradient-to-r

from-yellow-400
to-yellow-600

hover:scale-105
active:scale-95

transition-all duration-300

shadow-lg

hover:shadow-yellow-500/40

relative overflow-hidden

before:absolute
before:inset-0

before:bg-white/20

before:translate-x-[-100%]

hover:before:translate-x-[100%]

before:transition-transform
before:duration-700

">

Explore Projects

</button>



</div>




{/* RIGHT VIDEO */}



<div

className={`

transform transition-all duration-1000 ease-out delay-300

${visible
? "translate-x-0 opacity-100"
: "translate-x-32 opacity-0"
}

`}

>


<video

src={constructionVideo}

autoPlay
muted
loop
playsInline

className="

w-full

rounded-2xl

shadow-2xl

"

/>


</div>



</div>


</section>

);

}
