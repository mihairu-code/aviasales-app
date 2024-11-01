const baseURL = 'https://aviasales-test-api.kata.academy';

async function getSearchId() {
    try {
        return await fetch(`${baseURL}/search`)
            .then(response => {
                if (!response.ok) {
                    throw Error(`Ошибка при получении searchId: ${response.statusText}`);
                }
                return response.json();
            })
            .then(obj  => obj.searchId);
    } catch (error) { // конец try
        console.error("Ошибка в функции searchId:", error.message);
        return null;
    }
}

const searchId = await getSearchId();

async function getTickets()  {
    try {
        return await fetch(`${baseURL}/tickets?searchId=${searchId}`)
            .then(response => response.json())
            .then(obj => {
                if (obj.stop) {console.log("Поиск завершен")}
                return obj.tickets
            })
            .then(tickets => tickets)

    } catch(error) {
        console.error("Ошибка в функции :", error.message);
        return null;
    }
}
const ticketsArray = await getTickets();


export default ticketsArray





