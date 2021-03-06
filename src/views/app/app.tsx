import React, { useReducer, useState } from 'react';
import _ from 'lodash';
import clsx from 'clsx';
import { formatCurrency } from '../../utils/utils';
import { VALID_CURRENCY, PRODUCTS, Product } from '../../utils/constants';
import { TYPES, vendingMachineReducer, initialState } from '../../modules/vending-machine/reducer';
import * as Views from '../index';
import './app.css';

interface AppProps {};

export const App = ( {}: AppProps ) => {
    const [ state, dispatch ] = useReducer( vendingMachineReducer, initialState );
    const { alert, credit, lastPurchased } = state;

    const cheapestProductPrice = _.min( _.map( PRODUCTS, p => p.price ) );
    const canAffordCheapestProduct = cheapestProductPrice ? credit >= cheapestProductPrice : false;

    return (
        <>
            <div className={ clsx( "absolute text-center text-white bg-red-600 top-0 w-screen" ) }>
                <p className={ clsx( "text-sm font-bold", { "py-1": alert }) }>{ alert }</p>
            </div>
            <div className="container mx-auto mt-12">
                <div className="grid grid-cols-12 gap-10">
                    <section className="col-span-full">
                        <h1 className="text-4xl text-center underline">Vegan Chocolate Vending Machine &#127851;</h1>
                    </section>
                    <section className="grid grid-cols-12 col-span-full gap-4">
                        <div className="col-span-2">
                            <h2 className="text-3xl">Insert Coins</h2>
                            <p className="text-sm">Click a coin to insert</p>
                        </div>
                        <div className="col-span-8 grid grid-cols-6 gap-2 h-16">
                            <button className="transition duration-100 ease-in bg-gray-500 text-gray-800 opacity-50 font-semibold rounded-lg shadow-md hover:shadow-lg focus:outline-none" onClick={ () => dispatch({ type: TYPES.ALERT, payload: 'This vending machine does not accept 5c coins.' })}>{ formatCurrency( 5 / 100 ) }</button>
                            { VALID_CURRENCY.map( c => <button key={ c } className="transition duration-100 ease-in bg-white text-gray-900 font-semibold rounded-lg shadow-md hover:shadow-lg focus:outline-none" onClick={ () => dispatch({ type: TYPES.INSERT, payload: c })}>{ formatCurrency( c / 100 ) }</button> )}
                        </div>
                        <div className="flex flex-col col-span-2 justify-center items-center">
                            <div className="c-credit_screen flex col-span-2 text-center bg-black justify-center items-center mb-2 p-2 rounded-sm">
                                <code className="text-md text-green-700">Available Credit: <span className="font-bold">{ formatCurrency( credit / 100 ) }</span></code>
                            </div>
                            <button className="py-2 px-4 transition duration-100 ease-in bg-red-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg focus:outline-none" onClick={ () => dispatch({ type: TYPES.RESET })}>Coin Return</button>
                        </div>
                    </section>
                    <section className="grid grid-cols-12 col-span-full">
                        <div className="col-span-2">
                            <h2 className={ clsx( "text-3xl", { "text-gray-400": !canAffordCheapestProduct } )}>Select Item</h2>
                            <p className={ clsx( "text-sm", { "text-gray-400": !canAffordCheapestProduct } )}>Click an item to treat yourself!</p>
                        </div>
                        <div className="grid grid-cols-6 auto-cols-min gap-2 col-span-8 justify-center">
                            { _.map( PRODUCTS, ( product: Product, key: string ) => {
                                const { price, title } = product;
                                const hasSufficientCredit = price <= credit;
                                const classes = clsx( "relative transition duration-100 ease-in font-semibold rounded-lg shadow-md hover:shadow-lg focus:outline-none px-4 py-2 col-span-2", hasSufficientCredit ? "bg-white text-gray-900" : "bg-gray-500 opacity-50 text-gray-800" );
                                return (
                                    <button title={ title } key={ key } className={ classes } onClick={() => {
                                        if ( !hasSufficientCredit ) return dispatch({ type: TYPES.ALERT, payload: 'Insufficient credit. Please insert more coins.' });
                                        dispatch({ type: TYPES.PURCHASE, payload: product });
                                    }}>
                                        <h4 className="text-2xl">{ title }</h4>
                                        <h5 className="absolute text-white text-sm font-bold bg-green-600 top-0 right-0 rounded-tr-lg px-2">{ formatCurrency( price / 100 ) }</h5>
                                        <h6 className={ clsx("text-sm", { "text-green-600": hasSufficientCredit }) }>{ hasSufficientCredit ? "BUY!" : "Insufficient Credit" }</h6>
                                    </button>
                                )
                            }) }
                        </div>
                    </section>
                    <section className="grid grid-cols-12 col-span-full">
                        <div className="col-span-2">
                        <h2 className={ clsx( "text-3xl", { "text-gray-400": !lastPurchased } )}>Enjoy!</h2>
                        </div>
                        { lastPurchased && (
                            <div className="flex flex-col col-span-8 justify-center text-center">
                                <h2 className="text-3xl mb-2">Enjoy your { lastPurchased }! &#128523;</h2>
                            </div>
                        )}
                    </section>
                </div>
            </div>
        </>
    );
}