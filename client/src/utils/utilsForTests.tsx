import React, { ReactElement, ReactNode } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { configureStore, EnhancedStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { chatSlice, ChatState } from "../redux/Features/chatSlice";

interface RenderWithProvidersOptions {
  preloadedState?: ChatState; // Adjusted preloadedState type
  store?: EnhancedStore<{ chatState: ChatState }>;
}

export function renderWithProviders(
  ui: ReactElement, // Changed ReactNode to ReactElement
  {
    preloadedState = {
      messages: [],
      msg: "",
      room: "",
      name: "",
      isJoined: false,
    },
    store = configureStore({
      reducer: { chatState: chatSlice.reducer },
      preloadedState: { chatState: preloadedState }, // Provide preloadedState as chatState
    }),
    
    ...renderOptions
  }: RenderWithProvidersOptions = {}
) {
  function Wrapper({ children }: { children: ReactNode }) {
    return <Provider store={store}>{children}</Provider>;
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions } as RenderOptions) };
}
