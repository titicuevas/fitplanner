import React from 'react';
import { render, screen } from '@testing-library/react';
import Example from '../components/Example';

describe('Example Component', () => {
    it('renders correctly', () => {
        render(<Example />);
        expect(screen.getByText('Example Component')).toBeInTheDocument();
    });
}); 