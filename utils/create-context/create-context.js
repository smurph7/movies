import * as React from 'react';

export function createContext(componentName) {
  const Context = React.createContext(null);

  function Provider({ children, value }) {
    const memodValue = React.useMemo(() => value, [value]);
    return <Context.Provider value={memodValue}>{children}</Context.Provider>;
  }

  function useContext(consumerName) {
    const context = React.useContext(Context);
    if (!context) {
      throw new Error(`${consumerName} must be used within ${componentName}`);
    }
    return context;
  }

  Provider.displayName = `${componentName}Provider`;
  return [Provider, useContext];
}
