const API_URL = process.env.NEXT_PUBLIC_API_CLIENT_URL;
const token = process.env.NEXT_PUBLIC_TOKEN_SECRET;

// create contact footer
export const createContactFooter = async (data: any) => {
  const response = await fetch(`${API_URL}/footer/contacts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

// delete contact footer
export const deleteContactFooter = async (id: string) => {
  try {
    const response = await fetch(`${API_URL}/footer/contacts/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// edit contact footer
export const editContactFooter = async (id: string, data: any) => {
  try {
    const response = await fetch(`${API_URL}/footer/contacts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// create social link footer
export const createSocialLinkFooter = async (data: any) => {
  try {
    const response = await fetch(`${API_URL}/footer/social`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// delete social link footer
export const deleteSocialLinkFooter = async (id: string) => {
  try {
    const response = await fetch(`${API_URL}/footer/social/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// edit social link footer
export const editSocialLinkFooter = async (id: string, data: any) => {
  try {
    const response = await fetch(`${API_URL}/footer/social/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//put introduction footer
export const setIntroductionFooter = async (data: any) => {
  try {
    const response = await fetch(`${API_URL}/footer/introduction`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
// put copy right footer
export const setCopyRightFooter = async (data: any) => {
  try {
    const response = await fetch(`${API_URL}/footer/copyright`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ text: data }),
    });
    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
