let host = document.location.host;
// let apiUrl ='https://skillprobackend.azurewebsites.net/'
let apiUrl='http://192.168.1.52:7071/'
// if(host.includes('localhost')){
//   // apiUrl='http://portal.jcsoftwaresolution.in:6068/'
//   apiUrl='http://192.168.1.52:7071/'
// }

const environment = {
    api: apiUrl,
    map_api_key:'AIzaSyCbRhC6h9Pp43-5t_Knyrd_ewAdLMIJtCg',
    planTypeId:'65ead4e65cfbfd7a03ed102f',
    userRoleId:'65eac23ceac028f4dbfb1fbc',
    customerRoleId:'66026ea2f105ac23ab31e48e',
    glRoleId:'65fc4a1e2e22cff912335e12',
    adminRoleId:'65eab1d84e01e43033dc2438',
    professionType:'65fa7ad79ef95c639effcf1c',
    productTypeId:'64a7d198fa039f179c0320ca'
  };
  export default environment;
