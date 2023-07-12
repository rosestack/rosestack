import axios from "axios";

import useSWR from "swr";

const useNpmVersion = (packageName: string, version = "latest") => {
  if ( packageName.startsWith("https://www.npmjs.com/package/") ) {
    packageName = packageName.replace("https://www.npmjs.com/package/", "");
  }

  const { data, error, isLoading } = useSWR<string>(`${ packageName }/${ version }`, (url) => {
    return axios.get(url, {
      baseURL: "https://registry.npmjs.org",
    }).then((response) => {
      return response.data.version;
    }).catch((error) => {
      throw error;
    });
  });

  return {
    data,
    error,
    isLoading,
  };
};

const useNpmDownloads = (packageName: string) => {
  if ( packageName.startsWith("https://www.npmjs.com/package/") ) {
    packageName = packageName.replace("https://www.npmjs.com/package/", "");
  }

  const { data, error, isLoading } = useSWR<string>(packageName, (url) => {
    return axios.get(url, {
      baseURL: "https://api.npmjs.org/downloads/point/last-year",
    }).then((response) => {
      return response.data.downloads;
    }).catch((error) => {
      throw error;
    });
  });

  return {
    data,
    error,
    isLoading,
  };
};

export {
  useNpmVersion,
  useNpmDownloads,
};