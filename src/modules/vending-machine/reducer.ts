import { initial } from 'lodash';
import React, { useReducer } from 'react';

export const TYPES = {
    INSERT: "INSERT",
    RESET: "RESET",
    PURCHASE: "PURCHASE",
    ALERT: "ALERT",
}

export const initialState = {
    credit: 0,
    lastPurchased: null,
    alert: '',
}

interface State {
    credit: number;
    lastPurchased: string | null;
    alert: string;
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
                alert: '',
            }
        }

        case TYPES.PURCHASE: {
            return {
                ...state,
                credit: payload ? state.credit - payload.price : state.credit,
                lastPurchased: payload.title,
                alert: '',
            }
        }

        case TYPES.ALERT: {
            return {
                ...state,
                alert: payload,
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