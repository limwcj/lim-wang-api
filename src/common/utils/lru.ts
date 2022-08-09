import LRU from 'lru-cache';

const options = {
  max: 500,
  maxSize: 5000,
  sizeCalculation: (value, key) => {
    return 1;
  },
  ttl: 1000 * 30,
  allowStale: false,
  updateAgeOnGet: false,
  updateAgeOnHas: false,
};

export const cache = new LRU(options);
