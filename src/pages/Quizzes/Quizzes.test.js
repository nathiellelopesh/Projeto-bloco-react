import { render, screen, waitFor } from '@testing-library/react';
import Quizz from './Quizz';

test('render react', () => {
	const resultado = render(<Quizz/>);
	screen.debug();
});