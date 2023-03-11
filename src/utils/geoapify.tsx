export const apiKey = "12a08cf173ff47d3b9fe03f947629deb";



export const calculateRoutes = async(points : Array<any>) => {
  const requestOptions = {
    method: 'GET',
  };

  let waypoints = points.map( point => point.join(',')).join('|');
  const result = await fetch(`https://api.geoapify.com/v1/routing?waypoints=${waypoints}&mode=drive&apiKey=12a08cf173ff47d3b9fe03f947629deb`, requestOptions)
  return result.json();
  
}

