import { render, screen, fireEvent } from '@testing-library/react';
import Modal from '../components/Modal';
import React from 'react';

describe('Modal Component', () => {
  let setIsShowMock;

  beforeEach(() => {
    setIsShowMock = vi.fn(); 
  });

  it('renders correctly when isShow is true', () => {
    render(
      <Modal isShow={true} setIsShow={setIsShowMock} title="Test Modal">
        <p>Modal Content</p>
      </Modal>
    );

    expect(screen.getByText('Test Modal')).toBeInTheDocument();
    expect(screen.getByText('Modal Content')).toBeInTheDocument();
  });

  it('does not render when isShow is false', () => {
    render(
      <Modal isShow={false} setIsShow={setIsShowMock} title="Test Modal">
        <p>Modal Content</p>
      </Modal>
    );

    expect(screen.queryByText('Test Modal')).not.toBeInTheDocument();
    expect(screen.queryByText('Modal Content')).not.toBeInTheDocument();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('Modal should close when close button is clicked', () => {
    render(
      <Modal isShow={true} setIsShow={setIsShowMock} title="Test Modal">
        <p>Modal Content</p>
      </Modal>
    );

    const closeButton = screen.getByRole('button');
    fireEvent.click(closeButton);

    expect(setIsShowMock).toHaveBeenCalledTimes(1);
    expect(setIsShowMock).toHaveBeenCalledWith(false);
  });


  it('renders correctly even when children is not provided', () => {
    render(<Modal isShow={true} setIsShow={setIsShowMock} title="Test Modal" />);
  
    expect(screen.getByText('Test Modal')).toBeInTheDocument();
    const content = screen.queryByText('Modal Content');
    expect(content).not.toBeInTheDocument();
  });
});
