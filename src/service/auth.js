import api from './api';

async function IsAuthenticate() {

  try {

    const token = sessionStorage.getItem('token')

    const result = await api.get('/v1/authenticate', {
      headers: {
        'Authorization': token
      }
    })

    return result.data;

  } catch (error) {

    return false
  }

}

export default IsAuthenticate;