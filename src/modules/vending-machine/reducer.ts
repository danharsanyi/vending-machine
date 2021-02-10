import { initial } from 'lodash';
import React, { useReducer } from 'react';

export const TYPES = {
    INSERT: "INSERT",
    RESET: "RESET",
    PURCHASE: "PURCHASE",
}

export const initialState = {
    credit: 0,
    lastPurchased: null,
}

interface State {
    credit: number;
    lastPurchased: string | null;
}

interface Action {
    type: string;
    payload?: any;
}

export const vendingMachineReducer = ( state: State, action: Action ) => {
    const { type, payload } = action;

    switch ( type ) {
        case TYPES.INSERT: {
            return {
                ...state,
                credit: ( payload && typeof payload === "number" ) ? state.credit + payload : state.credit,
            }
        }

        case TYPES.PURCHASE: {
            return {
                ...state,
                credit: payload ? state.credit - payload.price : state.credit,
                lastPurchased: payload.title,
            }
        }

        case TYPES.RESET: {
            return {
                ...initialState,
            }
        }

        default: {
            return state;
        }
    }
}