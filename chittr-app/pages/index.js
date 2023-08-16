import React from 'react';
import Head from 'next/head';
import { useState } from "react";
import { extractInfo } from "../utils/helpers";


function Home() {
  return (
    <div>
      <Head>
        <title>Chittr.AI</title>
      </Head>
      <main>
        <h1>Welcome to the Chittr Chatbot</h1>
      </main>
    </div>
  );
}

export default Home;