import { useEffect } from 'react';

const useHubSpotChat = (hubSpotId) => {
  useEffect(() => {
    // Create the script element
    const script = document.createElement('script');
    script.src = `https://js.hs-scripts.com/${hubSpotId}.js`;
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup the script when the component unmounts
      document.body.removeChild(script);
    };
  }, [hubSpotId]); // Effect runs only when hubSpotId changes
};

export default useHubSpotChat;
