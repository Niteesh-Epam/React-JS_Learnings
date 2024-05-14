import React from "react";
import ThemeContext from "./ThemeContext";
import TranslationContext from "./TranslationContext";

function CombineContext({ providers, children }) {
  return providers.reduce(
    (AccumulatorProvider, Provider) => {
      console.log(AccumulatorProvider);
      return ({ children }) => (
        <AccumulatorProvider>
          <Provider>{children}</Provider>
        </AccumulatorProvider>
      );
    },
    ({ children }) => <>{children}</>
  )({ children });
}

export const AllProviders = ({ children }) => {
  return (
    <CombineContext providers={[ThemeContext, TranslationContext]}>
      {children}
    </CombineContext>
  );
};
