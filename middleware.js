import { NextResponse } from 'next/server'
import {sessionStatus} from './app/session'

//difine all the routes in this array which you want to protect and alos define those 
//down in congfigure -> matcher:
const  protectedRoutes = ['/dashboard','/stock','/sales','/security','/settings','/stock/physical-count']
// const token = localStorage.getItem(token);


export function middleware(request) {
//   const token = sessionStatus();
// console.log(token)
//   if (!token) {
//     if (!token && protectedRoutes.includes(request.nextUrl.pathname)){
//       const orignUrl = new URL('/login',request.url);
//       return NextResponse.redirect(orignUrl.toString())
//         }
      
//           return NextResponse.redirect(new URL('/login', request.url))
       // return NextResponse.redirect(new URL('/dashboard', request.url))
      // }
  //  if(sessionStatus){
  //    return NextResponse.redirect(new URL('/dashboard', request.url))
  //  }
       
  //  return NextResponse.redirect(new URL('/login', request.url))   
 
  
}
export const config = {
  matcher:['/','/dashboard','/stock','/sales','/security','/settings','/stock/physical-count']
}