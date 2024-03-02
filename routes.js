const axios = require('axios');

// Replace 'YOUR_GOOGLE_MAPS_API_KEY' with your actual API key
const GOOGLE_MAPS_API_KEY = 'YOUR_GOOGLE_MAPS_API_KEY';

// Function to find the nearest warehouse
const findNearestWarehouse = async (originAddress, warehouses) => {
  try {
    // Convert origin address to coordinates using Geocoding API
    const originCoordinates = await getCoordinates(originAddress);

    // Convert warehouse addresses to coordinates
    const warehouseCoordinates = await Promise.all(
      warehouses.map(async (warehouse) => {
        return {
          id: warehouse.id,
          name: warehouse.name,
          address: warehouse.address,
          coordinates: await getCoordinates(warehouse.address),
        };
      })
    );

    // Calculate distances using Distance Matrix API
    const distances = await calculateDistances(originCoordinates, warehouseCoordinates);

    // Find the nearest warehouse
    const nearestWarehouse = findNearest(distances);

    return nearestWarehouse;
  } catch (error) {
    console.error('Error finding nearest warehouse:', error);
    throw error;
  }
};

// Function to get coordinates from address using Geocoding API
const getCoordinates = async (address) => {
  try {
    const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        address: address,
        key: GOOGLE_MAPS_API_KEY,
      },
    });

    const location = response.data.results[0].geometry.location;
    return {
      lat: location.lat,
      lng: location.lng,
    };
  } catch (error) {
    console.error('Error getting coordinates:', error);
    throw error;
  }
};

// Function to calculate distances using Distance Matrix API
const calculateDistances = async (origin, destinations) => {
  try {
    const response = await axios.get('https://maps.googleapis.com/maps/api/distancematrix/json', {
      params: {
        origins: `${origin.lat},${origin.lng}`,
        destinations: destinations.map(dest => `${dest.coordinates.lat},${dest.coordinates.lng}`).join('|'),
        key: GOOGLE_MAPS_API_KEY,
      },
    });

    const distances = response.data.rows[0].elements.map((element, index) => {
      return {
        id: destinations[index].id,
        name: destinations[index].name,
        distance: element.distance.value,
      };
    });

    return distances;
  } catch (error) {
    console.error('Error calculating distances:', error);
    throw error;
  }
};

// Function to find the nearest warehouse
const findNearest = (distances) => {
  const nearest = distances.reduce((prev, current) => (prev.distance < current.distance ? prev : current));
  return nearest;
};

module.exports = {
  findNearestWarehouse,
};