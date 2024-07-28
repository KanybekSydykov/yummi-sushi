export async function requestOtp(credentials,url,locale) {
    try {
      const res = await fetch(url, {
        cache: 'no-store',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language':`${locale}`,
        },
        body: JSON.stringify(credentials),
      });
  
      // if (!res.ok) {
      //   return {status: res.status,response: res};
      // }
  
      // Handle the fact that res.json() won't work
      const data = await res.json(); // Assume success based on no error
      const response = {data, status: res.status};
      return response;
    } catch (error) {
      return {status:error};
    }
  }


  export async function postData (credentials,token,url) {
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(credentials),
      });
  
      if (!res.ok) {
        return {status: res.status};
      }
  
      // Handle the fact that res.json() won't work
      const data = await res.json(); // Assume success based on no error
      const response = {data, status: res.status};
      return response;
    } catch (error) {
      throw new Error({ status: error.status || 500 });
    }
  }

  export async function getData(token, url,locale) {
    try {
      const headers = {
        'Content-Type': 'application/json',
        'Accept-Language':`${locale}`,
      };
  
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
  
      const res = await fetch(url, {
        cache: 'no-store',
        method: 'GET',
        headers: headers,
      });
  
      if (!res.ok) {
        return { status: res.status };
      }
  
      const data = await res.json(); // Assume success based on no error
      const response = { data, status: res.status };
      return response;
    } catch (error) {
      return new Error({ status: error.status || 500 }); // Return a default status if error.status is undefined
    }
  }
  

  export async function deleteData (token,url) {
    try {
      const res = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
  
      if (!res.ok) {
        return {status: res.status};
      }
  
      // Handle the fact that res.json() won't work
      const data = await res.json(); // Assume success based on no error
      const response = {data, status: res.status};
      return response;
    } catch (error) {
      return {status:error.status};
    }
  }
  export async function patchData (payload,token,url) {
    try {
      const res = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload),
      });
  
      if (!res.ok) {
        return {status: res.status};
      }
  
      // Handle the fact that res.json() won't work
      const data = await res.json(); // Assume success based on no error
      const response = {data, status: res.status};
      return response;
    } catch (error) {
      return {status:error.status};
    }
  }
  export async function putData (payload,token,url) {
    try {
      const res = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload),
      });
  
      if (!res.ok) {
        return {status: res.status};
      }
  
      // Handle the fact that res.json() won't work
      const data = await res.json(); // Assume success based on no error
      const response = {data, status: res.status};
      return response;
    } catch (error) {
      return {status:error.status};
    }
  }

