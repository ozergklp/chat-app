import { act, screen, waitFor } from "@testing-library/react";
import RoomEnterForm from "../RoomEnterForm";
import { renderWithProviders } from "../../utils/utilsForTests";
import '@testing-library/jest-dom'
//jest.useFakeTimers();
import {setImmediate} from 'timers'

test("renders name label",  () => {

    renderWithProviders(<RoomEnterForm />);


    const nameLabel =  screen.getByText('Your Name:');

    expect(nameLabel).toBeInTheDocument();

});