import { Poppins } from 'next/font/google'

// const figtree_init = Figtree({ weight:"400",subsets: ['latin'] });

const poppins_init = Poppins({ weight:['500','700'],subsets: ['latin'],variable:'--poppins-init'  });

// export const figtree = figtree_init.className;
export const poppins = poppins_init.variable;

