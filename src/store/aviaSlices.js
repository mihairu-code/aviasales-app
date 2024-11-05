import ticketsArray from "./../configuration.js";
import { createSlice } from "@reduxjs/toolkit";

const aviaSlices = createSlice({
    name: "avia",
    initialState: {
        tickets: ticketsArray,     // список билетов
        visibledTickets: 5,
        filters: [],     // выбранные фильтры пересадок
        sort: "cheapest" // сортировка (например, по умолчанию "cheapest" — самый дешевый)
    },
    reducers: {
        setTickets(state, action) {
            console.log(state, action);
            state.tickets = action.payload;
        },
        setVisibledTickets(state, action) {
            state.visibledTickets = action.payload;
        },
        setFilter(state, action) {
            const filter = action.payload;
            if (state.filters.includes(filter)) {
                // если фильтр уже выбран, убираем его
                state.filters = state.filters.filter(f => f !== filter);
            } else {
                // иначе добавляем фильтр
                state.filters.push(filter);
            }
        },
        setSort(state, action) {
            state.sort = action.payload;
        }
    }
});

export const { setTickets, setFilter, setSort , setVisibledTickets} = aviaSlices.actions;
export default aviaSlices.reducer;
