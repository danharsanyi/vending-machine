import React from 'react'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import { expect } from 'chai';
import { App } from './app';

it( 'renders', () => {
    const { getByText } = render( <App /> );
    expect( getByText( "Insert Coins" )).to.exist;
});

it( 'should allow 10c, 20c, 50c, $1, $2 coins', () => {
    
});

it( 'should not allow invalid currency', () => {
    
});

it( 'should increase available credit when coins are inserted', () => {

});

it( 'should not allow a purchase if there is insufficient credit', () => {

});

it( 'should dispense product when selection is made', () => {

});

it( 'should reduce available credit once purchase has been made', () => {

});

it( 'should return coins when requested', () => {

});

