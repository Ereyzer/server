API BASE_URL = 'https://my-server-app-introdution.herokuapp.com/'

get elements URL: BASE_URL

delete element by id ({ method: 'post', url: `${BASE_URL}${id}`, data: { data:
id, }, })

add elements ({ method: 'post', url: .BASE_URL, data: { data: customData, }, })
