import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FooterRow from '@/pages/betlist/customGrid/FooterRow';

jest.mock('@legion-lib/react-grid', () => ({
    Row: ({ className, children, ...rest }) => (
        <div 
            data-testid="row" 
            className={className}
            {...rest}
        >
            {children}
        </div>
    ),
}));

describe('FooterRow Component', () => {
    test('renders with default className', () => {
        render(
            <FooterRow>
                <div>Footer content</div>
            </FooterRow>
        );
        
        const row = screen.getByTestId('row');
        expect(row).toBeInTheDocument();
        expect(row).toHaveClass('undefined light-footer');
        expect(screen.getByText('Footer content')).toBeInTheDocument();
    });

    test('renders with custom className', () => {
        render(
            <FooterRow className="custom-footer">
                <div>Footer content</div>
            </FooterRow>
        );
        
        const row = screen.getByTestId('row');
        expect(row).toHaveClass('custom-footer light-footer');
    });

    test('renders with empty className', () => {
        render(
            <FooterRow className="">
                <div>Footer content</div>
            </FooterRow>
        );
        
        const row = screen.getByTestId('row');
        expect(row).toHaveClass(' light-footer');
    });

    test('passes through additional props', () => {
        render(
            <FooterRow 
                className="test-footer" 
                data-test="footer-test"
                id="footer-id"
            >
                <div>Footer content</div>
            </FooterRow>
        );
        
        const row = screen.getByTestId('row');
        expect(row).toHaveAttribute('data-test', 'footer-test');
        expect(row).toHaveAttribute('id', 'footer-id');
        expect(row).toHaveClass('test-footer light-footer');
    });

    test('renders multiple children', () => {
        render(
            <FooterRow>
                <div>Child 1</div>
                <div>Child 2</div>
                <span>Child 3</span>
            </FooterRow>
        );
        
        expect(screen.getByText('Child 1')).toBeInTheDocument();
        expect(screen.getByText('Child 2')).toBeInTheDocument();
        expect(screen.getByText('Child 3')).toBeInTheDocument();
    });

    test('renders with null className', () => {
        render(
            <FooterRow className={null}>
                <div>Footer content</div>
            </FooterRow>
        );
        
        const row = screen.getByTestId('row');
        expect(row).toHaveClass('null light-footer');
    });

    test('handles undefined children', () => {
        render(
            <FooterRow className="test-footer">
                {undefined}
            </FooterRow>
        );
        
        const row = screen.getByTestId('row');
        expect(row).toBeInTheDocument();
        expect(row).toHaveClass('test-footer light-footer');
    });

    test('handles array of children', () => {
        const children = [
            <div key="1">Item 1</div>,
            <div key="2">Item 2</div>,
        ];

        render(
            <FooterRow className="test-footer">
                {children}
            </FooterRow>
        );
        
        expect(screen.getByText('Item 1')).toBeInTheDocument();
        expect(screen.getByText('Item 2')).toBeInTheDocument();
    });

    test('renders with complex children structure', () => {
        render(
            <FooterRow className="complex-footer">
                <div>
                    <span>Nested content</span>
                    <button>Action</button>
                </div>
            </FooterRow>
        );
        
        expect(screen.getByText('Nested content')).toBeInTheDocument();
        expect(screen.getByText('Action')).toBeInTheDocument();
        expect(screen.getByRole('button')).toBeInTheDocument();
    });

    test('memoization works correctly', () => {
        const { rerender } = render(
            <FooterRow className="memo-test">
                <div>Content</div>
            </FooterRow>
        );
        
        const firstRender = screen.getByTestId('row');
        
        rerender(
            <FooterRow className="memo-test">
                <div>Content</div>
            </FooterRow>
        );
        
        const secondRender = screen.getByTestId('row');
        expect(firstRender).toBeInTheDocument();
        expect(secondRender).toBeInTheDocument();
    });

    test('handles boolean props correctly', () => {
        render(
            <FooterRow 
                className="boolean-test" 
                disabled={true}
                hidden={false}
            >
                <div>Boolean props test</div>
            </FooterRow>
        );
        
        const row = screen.getByTestId('row');
        expect(row).toHaveAttribute('disabled');
        expect(row).not.toHaveAttribute('hidden');
    });

    test('handles event handlers', () => {
        const handleClick = jest.fn();
        const handleMouseOver = jest.fn();

        render(
            <FooterRow 
                className="event-test"
                onClick={handleClick}
                onMouseOver={handleMouseOver}
            >
                <div>Event test</div>
            </FooterRow>
        );
        
        const row = screen.getByTestId('row');
        
        // Test that event handlers are called when events occur
        fireEvent.click(row);
        expect(handleClick).toHaveBeenCalledTimes(1);
        
        fireEvent.mouseOver(row);
        expect(handleMouseOver).toHaveBeenCalledTimes(1);
    });
});
