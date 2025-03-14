import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center gap-2 backdrop-blur-sm bg-white/30 fixed w-[100vw] h-[100vh]">
      <div className="w-[15px] h-[70px] rounded-lg bg-red-400 transform rotate-[35deg]"></div>
      <div className="w-[15px] h-[70px] rounded-lg bg-yellow-400 transform rotate-[35deg]"></div>
      <div className="absolute w-[20px] h-[20px] rounded-full bg-green-400 animate-spin-loader mt-[25px] ml-[-5px]"></div>
      <style jsx>{`
        @keyframes spin-loader {
          0% {
            transform: rotate(0deg) translateX(40px) rotate(0deg);
          }
          100% {
            transform: rotate(360deg) translateX(40px) rotate(-360deg);
          }
        }
        .animate-spin-loader {
          animation: spin-loader 2s linear infinite;
          border-radius: 50%;
          border-right-color: transparent;
          border-bottom-color: transparent;
          -webkit-transition: all 0.5s ease-in;
          transition: all 0.5s ease-in;
        }
      `}</style>
    </div>
  );
};

export default Loading;

// import React , {useEffect} from 'react'
// import anime from 'animejs/lib/anime.es.js';
// const Loading = () => {

//     useEffect(() => {
//         anime({
//           targets: '.el',
//           translateX: function(el) {
//             return el.getAttribute('data-x');
//           },
//           translateY: function(el, i) {
//             return 50 + (-50 * i);
//           },
//           scale: function(el, i, l) {
//             return (l - i) + .25;
//           },
//           rotate: function() { return anime.random(-360, 360); },
//           borderRadius: function() { return ['50%', anime.random(10, 35) + '%']; },
//           duration: function() { return anime.random(1200, 1800); },
//           delay: function() { return anime.random(400, 1000); },
//           direction: 'alternate',
//           loop: true
//         });
//       }, []);
//   return (
//     <div className='text-[30px] backdrop-blur-sm bg-white/30  fixed w-[100vw] h-[100vh] flex justify-center items-center z-[1000]'>
//          <div className="w-[400px]">
//       <div className="el bg-customgreen text-white flex justify-center items-center" data-x="10">E</div>
//       <div className="el bg-customblue text-white flex justify-center items-center" data-x="200">U</div>
//       <div className="el bg-gray-300 text-white flex justify-center items-center" data-x="300">T</div> {/* Add one more div with a unique data-x attribute */}
//     </div>
//      {/* <span className='p-3 inline-flex rounded-full mr-5 animate-ping bg-sky-400 opacity-75'>
//      <span class="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
//         </span> Loading... */}
//     </div>
//   )
// }

// export default Loading
