import React from 'react'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import { expect } from 'chai';
import { App } from './app';

it( 'renders', async () => {
    const { getByText } = render( <App /> );
    expect( getByText( "Insert Coins" )).to.exist;
});