const { createContext, useContext, useState } = require('react');

const BedSelectionContext = createContext();

export const useBedSelection = () => useContext(BedSelectionContext);

export const BedSelectionProvider = ({ children }) => {
  const [bedSelection, setBedSelection] = useState([]);
  const value = {
    bedSelection,
    setBedSelection,
  };
  return (
    <BedSelectionContext.Provider value={value}>
      {children}
    </BedSelectionContext.Provider>
  );
};
