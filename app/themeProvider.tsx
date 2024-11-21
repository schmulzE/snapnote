"use client";

import React from "react";
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { NextUIProvider } from '@nextui-org/react';


export const AuthProvider = ({ children} : {children: React.ReactNode }) => {
  return(
    <NextUIProvider>
      <NextThemesProvider
        attribute='class'
        defaultTheme='light'
        themes={['light', 'dark']}
      >   
      {children}
      </NextThemesProvider>
    </NextUIProvider>
  )
};
