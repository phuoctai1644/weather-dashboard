import { useState, useEffect } from 'react';

const useSmoothLoading = (isLoading, minDelay = 500) => {
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    let timeout;
    if (!isLoading) {
      timeout = setTimeout(() => setShowLoading(false), minDelay);
    } else {
      setShowLoading(true);
    }

    return () => clearTimeout(timeout);
  }, [isLoading, minDelay]);

  return showLoading;
};

export default useSmoothLoading;
