import React, { useState } from 'react';
import _ from 'lodash';
import clsx from 'clsx';
import { formatCurrency } from '../../utils/utils';
import { PRODUCTS, Product } from '../../utils/constants';
import * as Views from '../index';
import './app.css';

interface AppProps {};

export const App = ( {}: AppProps ) => {
    const [ credit, setCredit ] = useState( 0 );
    const [ lastPurchased, setLastPurchased ] = useState( {} );

    const hasCredit = credit > 0;

    const resetVendingMachine = () => {
        setCredit( 0 );
        setLastPurchased( {} );
    }

    return (
        <div className="container mx-auto mt-8">
            <div className="grid grid-cols-12 gap-10">
                <section className="grid grid-cols-12 col-span-full gap-4">
                    <div className="col-span-2">
                        <h2 className="text-3xl">Insert Coins</h2>
                        <p className="text-sm">Click a coin to insert</p>
                    </div>
                    <div className="col-span-8 grid grid-cols-6 gap-2 h-16">
                        <button className="transition duration-100 ease-in bg-gray-500 text-gray-800 opacity-50 font-semibold rounded-lg shadow-md hover:shadow-lg focus:outline-none" onClick={ () => alert( 'This vending machine does not accept 5c coins.' )}>5c</button>
                        <button className="transition duration-100 ease-in bg-white text-gray-900 font-semibold rounded-lg shadow-md hover:shadow-lg focus:outline-none" onClick={ () => setCredit( prevAmount => prevAmount + 10 )}>10c</button>
                        <button className="transition duration-100 ease-in bg-white text-gray-900 font-semibold rounded-lg shadow-md hover:shadow-lg focus:outline-none" onClick={ () => setCredit( prevAmount => prevAmount + 20 )}>20c</button>
                        <button className="transition duration-100 ease-in bg-white text-gray-900 font-semibold rounded-lg shadow-md hover:shadow-lg focus:outline-none" onClick={ () => setCredit( prevAmount => prevAmount + 50 )}>50c</button>
                        <button className="transition duration-100 ease-in bg-white text-gray-900 font-semibold rounded-lg shadow-md hover:shadow-lg focus:outline-none" onClick={ () => setCredit( prevAmount => prevAmount + 100 )}>$1.00</button>
                        <button className="transition duration-100 ease-in bg-white text-gray-900 font-semibold rounded-lg shadow-md hover:shadow-lg focus:outline-none" onClick={ () => setCredit( prevAmount => prevAmount + 200 )}>$2.00</button>
                    </div>
                    <div className="flex flex-col col-span-2 justify-center items-center">
                        <div className="c-credit_screen flex col-span-2 text-center bg-black justify-center items-center mb-2 p-2 rounded-sm">
                            <code className="text-md text-green-700">Available Credit: <span className="font-bold">{ formatCurrency( credit / 100 ) }</span></code>
                        </div>
                        <button className="py-2 px-4 transition duration-100 ease-in bg-red-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg focus:outline-none" onClick={ () => resetVendingMachine()}>Coin Return</button>
                    </div>
                </section>
                <section className="grid grid-cols-12 col-span-full">
                    <div className="col-span-2">
                        <h2 className="text-3xl">Select Item</h2>
                        <p className="text-sm">Click an item to buy</p>
                    </div>
                    <div className="grid grid-cols-6 auto-cols-min gap-2 col-span-8 justify-center">
                        { _.map( PRODUCTS, ( product: Product, key: string ) => {
                            const { price, title } = product;
                            const hasSufficientCredit = price <= credit;
                            const classes = clsx( "relative transition duration-100 ease-in font-semibold rounded-lg shadow-md hover:shadow-lg focus:outline-none px-4 py-2 col-span-2", hasSufficientCredit ? "bg-white text-gray-900" : "bg-gray-500 opacity-50 text-gray-800" );
                            return (
                                <button key={ key } className={ classes } onClick={() => {
                                    if ( !hasSufficientCredit ) return alert( 'Insufficient credit. Please insert more coins' );
                                    setLastPurchased( product );
                                    setCredit( prevAmount => prevAmount - price );
                                }}>
                                    <h4 className="text-2xl">{ title }</h4>
                                    <h5 className="absolute text-lg font-bold bg-green-500 top-0 right-0 rounded-tr-lg px-1">{ formatCurrency( price / 100 ) }</h5>
                                    <h6 className={ clsx("text-sm", { "text-green-500": hasSufficientCredit }) }>{ hasSufficientCredit ? "BUY!" : "Insufficient Credit" }</h6>
                                </button>
                            )
                        }) }
                    </div>
                </section>
                <section className="grid grid-cols-12 col-span-full">
                    <div className="col-span-2">
                        <h2 className="text-3xl">Enjoy!</h2>
                    </div>
                    { !_.isEmpty( lastPurchased ) && (
                        <div className="flex flex-col col-span-8 justify-center text-center">
                            <h2 className="text-3xl mb-2">Enjoy your { _.get( lastPurchased, 'title' )}!</h2>
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
}