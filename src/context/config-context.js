import { getTableData } from '@/lib/airtable';
import { AIRTABLE_TABLES } from '@/utils/constants';
import { createContext, useContext, useEffect, useState } from 'react';

const ConfigContext = createContext();

export const useConfig = () => useContext(ConfigContext);

export const ConfigProvider = ({ children }) => {
  const [configData, setConfigData] = useState(null);
  useEffect(() => {
    const getConfigDataOnPageLoad = async () => {
      const config = await getTableData({
        tableId: AIRTABLE_TABLES.CONFIG,
        queryName: 'getConfig',
      });
      setConfigData(config[0]);
    };
    getConfigDataOnPageLoad();
  }, []);

  return (
    <ConfigContext.Provider value={configData}>
      {children}
    </ConfigContext.Provider>
  );
};
