'use client';
import React, { useEffect, useState, Suspense } from 'react';
import HomePage from './HomePage';


export default function Home() {

  return (
    <Suspense>
      <HomePage />
    </Suspense>
  );
};