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
    const { getByText } = render( <App /> );
    fireEvent.click( getByText( "$0.05" ) );
    expect( getByText( "$0.00" )).to.exist;
});

it( 'should increase available credit when coins are inserted', () => {
    const { getByText } = render( <App /> );
    fireEvent.click( getByText( "$0.10" ) );
    fireEvent.click( getByText( "$0.50" ) );
    fireEvent.click( getByText( "$1.00" ) );
    fireEvent.click( getByText( "$1.00" ) );
    fireEvent.click( getByText( "$1.00" ) );
    fireEvent.click( getByText( "$0.20" ) );
    expect( getByText( "$3.80" )).to.exist;
});

it( 'should not allow a purchase if there is insufficient credit', () => {

});

it( 'should dispense product when selection is made', () => {

});

it( 'should reduce available credit once purchase has been made', () => {

});

it( 'should return coins when requested', () => {

});

